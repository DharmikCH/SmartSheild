import re


def analyze_contract(code: str) -> dict:
    """
    Analyze Solidity smart contract code for common vulnerabilities.
    Uses regex-based pattern matching to detect issues line by line.
    """
    lines = code.split('\n')
    vulnerabilities = []

    # --- 1. Reentrancy Detection ---
    # Look for external .call before state update
    # We track .call{...}( patterns and check if state update comes after
    call_pattern = re.compile(r'\.call\s*\{')
    state_update_pattern = re.compile(r'\b\w+\s*[\-\+\*]?=\s*')
    in_function = False
    function_start = 0
    call_line = None

    for i, line in enumerate(lines, start=1):
        stripped = line.strip()

        # Track function boundaries
        if re.search(r'\bfunction\b', stripped):
            in_function = True
            function_start = i
            call_line = None

        if call_pattern.search(stripped):
            call_line = i

        # If we find a state update AFTER a call in the same function scope
        if call_line and i > call_line and state_update_pattern.search(stripped):
            if not stripped.startswith('//') and not stripped.startswith('*'):
                vulnerabilities.append({
                    "issue": "Reentrancy Detected",
                    "severity": "Critical",
                    "lineNumber": call_line,
                    "description": "An external call is made before the contract state is updated, allowing attackers to re-enter the function.",
                    "fix": "Apply the checks-effects-interactions pattern: update all state variables before making external calls.",
                    "unsafeCode": (
                        "// Vulnerable: external call before state update\n"
                        "function withdraw(uint amount) public {\n"
                        '    (bool success, ) = msg.sender.call{value: amount}("");\n'
                        "    require(success);\n"
                        "    balances[msg.sender] -= amount; // state update AFTER call\n"
                        "}"
                    ),
                    "safeCode": (
                        "// Fixed: state update before external call\n"
                        "function withdraw(uint amount) public {\n"
                        "    balances[msg.sender] -= amount; // state update BEFORE call\n"
                        '    (bool success, ) = msg.sender.call{value: amount}("");\n'
                        "    require(success);\n"
                        "}"
                    ),
                })
                call_line = None  # reset so we don't double-count
                break  # one reentrancy per contract is enough

    # --- 2. Selfdestruct Detection ---
    selfdestruct_pattern = re.compile(r'selfdestruct\s*\(')
    for i, line in enumerate(lines, start=1):
        if selfdestruct_pattern.search(line):
            vulnerabilities.append({
                "issue": "Selfdestruct Detected",
                "severity": "Critical",
                "lineNumber": i,
                "description": "The contract uses selfdestruct, which permanently destroys the contract and sends remaining Ether to a designated address. This can be exploited if access is not properly restricted.",
                "fix": "Remove selfdestruct or restrict it with multi-sig approval and timelocks. Consider using a pause mechanism instead.",
                "unsafeCode": (
                    "// Vulnerable: selfdestruct with minimal protection\n"
                    "function destroy() public onlyOwner {\n"
                    "    selfdestruct(payable(owner));\n"
                    "}"
                ),
                "safeCode": (
                    "// Fixed: use a pause mechanism instead\n"
                    "bool public paused;\n\n"
                    "function pause() public onlyOwner {\n"
                    "    paused = true;\n"
                    "    emit ContractPaused(msg.sender);\n"
                    "}\n\n"
                    "modifier whenNotPaused() {\n"
                    '    require(!paused, "Contract is paused");\n'
                    "    _;\n"
                    "}"
                ),
            })
            break  # report once

    # --- 3. Unrestricted Mint Detection ---
    # Look for a mint function that lacks access control modifiers
    mint_func_pattern = re.compile(r'\bfunction\s+\w*[Mm]int\w*\s*\(')
    access_modifier_pattern = re.compile(
        r'\b(onlyOwner|onlyAdmin|onlyMinter|onlyRole|require\s*\(\s*msg\.sender\s*==)\b'
    )
    for i, line in enumerate(lines, start=1):
        if mint_func_pattern.search(line):
            # Check this line and the next few lines for access modifiers
            context = ' '.join(lines[i-1:min(i+3, len(lines))])
            if not access_modifier_pattern.search(context):
                vulnerabilities.append({
                    "issue": "Unrestricted Mint Function",
                    "severity": "High",
                    "lineNumber": i,
                    "description": "A mint function is defined without access control modifiers, allowing any user to mint tokens freely and inflate the supply.",
                    "fix": "Add an access control modifier like onlyOwner or implement role-based access control to restrict minting privileges.",
                    "unsafeCode": (
                        "// Vulnerable: anyone can call mint\n"
                        "function mint(address to, uint256 amount) public {\n"
                        "    _mint(to, amount);\n"
                        "}"
                    ),
                    "safeCode": (
                        "// Fixed: restricted to owner only\n"
                        "function mint(address to, uint256 amount) public onlyOwner {\n"
                        "    _mint(to, amount);\n"
                        "}"
                    ),
                })
                break

    # --- 4. Owner-only Withdraw Detection ---
    withdraw_pattern = re.compile(r'\bfunction\s+withdraw\b')
    only_owner_pattern = re.compile(r'\bonlyOwner\b')
    for i, line in enumerate(lines, start=1):
        if withdraw_pattern.search(line):
            context = ' '.join(lines[i-1:min(i+3, len(lines))])
            if only_owner_pattern.search(context):
                vulnerabilities.append({
                    "issue": "Owner-only Withdraw",
                    "severity": "Medium",
                    "lineNumber": i,
                    "description": "The withdraw function is restricted to the contract owner. While this provides some access control, it creates a centralization risk — a single compromised owner key can drain all funds.",
                    "fix": "Consider implementing a multi-sig wallet, timelock, or DAO-based governance for fund withdrawals to reduce single-point-of-failure risk.",
                    "unsafeCode": (
                        "// Risk: single owner controls all withdrawals\n"
                        "function withdraw() public onlyOwner {\n"
                        "    payable(owner).transfer(address(this).balance);\n"
                        "}"
                    ),
                    "safeCode": (
                        "// Improved: multi-sig or timelock pattern\n"
                        "uint256 public withdrawRequestTime;\n"
                        "uint256 public constant TIMELOCK = 2 days;\n\n"
                        "function requestWithdraw() public onlyOwner {\n"
                        "    withdrawRequestTime = block.timestamp;\n"
                        "}\n\n"
                        "function executeWithdraw() public onlyOwner {\n"
                        '    require(block.timestamp >= withdrawRequestTime + TIMELOCK, "Timelock active");\n'
                        "    payable(owner).transfer(address(this).balance);\n"
                        "}"
                    ),
                })
                break

    # --- 5. Unchecked Call Detection ---
    unchecked_call_pattern = re.compile(r'\.call\s*\{')
    return_check_pattern = re.compile(r'\(\s*bool\s+\w+')
    for i, line in enumerate(lines, start=1):
        if unchecked_call_pattern.search(line):
            # Check if the return value is captured
            context = ' '.join(lines[max(0, i-2):min(i+1, len(lines))])
            if not return_check_pattern.search(context):
                vulnerabilities.append({
                    "issue": "Unchecked External Call",
                    "severity": "High",
                    "lineNumber": i,
                    "description": "An external call using .call{} is made without checking the return value. If the call fails silently, the contract will continue execution with incorrect state.",
                    "fix": "Always capture and verify the return value of external calls using require() to ensure the call succeeded.",
                    "unsafeCode": (
                        "// Vulnerable: return value not checked\n"
                        'msg.sender.call{value: amount}("");\n'
                        "// execution continues even if call fails"
                    ),
                    "safeCode": (
                        "// Fixed: check return value\n"
                        '(bool success, ) = msg.sender.call{value: amount}("");\n'
                        'require(success, "Transfer failed");'
                    ),
                })
                break

    # --- Calculate Risk Score ---
    severity_points = {
        "Critical": 40,
        "High": 25,
        "Medium": 10,
    }
    risk_score = sum(severity_points.get(v["severity"], 0) for v in vulnerabilities)

    if risk_score >= 60:
        risk_level = "High"
    elif risk_score >= 30:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    # --- Severity Counts ---
    severity_counts = {"Critical": 0, "High": 0, "Medium": 0}
    for v in vulnerabilities:
        sev = v["severity"]
        if sev in severity_counts:
            severity_counts[sev] += 1

    # --- Health Checklist ---
    issues_found = {v["issue"] for v in vulnerabilities}

    health_checklist = [
        {
            "check": "Has access control (onlyOwner or similar)",
            "passed": bool(re.search(r'\b(onlyOwner|onlyAdmin|onlyRole)\b', code)),
        },
        {
            "check": "No use of selfdestruct",
            "passed": "Selfdestruct Detected" not in issues_found,
        },
        {
            "check": "No unchecked external calls",
            "passed": "Unchecked External Call" not in issues_found,
        },
        {
            "check": "No unrestricted mint function",
            "passed": "Unrestricted Mint Function" not in issues_found,
        },
        {
            "check": "No reentrancy vulnerabilities",
            "passed": "Reentrancy Detected" not in issues_found,
        },
    ]

    return {
        "vulnerabilities": vulnerabilities,
        "riskScore": risk_score,
        "riskLevel": risk_level,
        "severityCounts": severity_counts,
        "healthChecklist": health_checklist,
    }
