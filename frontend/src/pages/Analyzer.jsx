import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeContract } from '../api';

const EXAMPLE_CONTRACT = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableVault {
    mapping(address => uint256) public balances;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    // Vulnerability 1: Reentrancy — external call before state update
    function withdraw(uint256 amount) public onlyOwner {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        balances[msg.sender] -= amount;  // State update AFTER call
    }

    // Vulnerability 2: Selfdestruct
    function destroy() public onlyOwner {
        selfdestruct(payable(owner));
    }

    // Vulnerability 3: Unrestricted mint — no access control
    function mint(address to, uint256 amount) public {
        balances[to] += amount;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}`;

export default function Analyzer() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setCode(event.target.result);
      if (!name) setName(file.name.replace('.sol', ''));
    };
    reader.readAsText(file);
  };

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError('Please paste or upload Solidity smart contract code to analyze.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const result = await analyzeContract(code, name || 'Unnamed Contract');
      navigate(`/report/${result.id}`);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        'An error occurred while analyzing the contract. Please check the backend server.'
      );
    } finally {
      setLoading(false);
    }
  };

  const loadExample = () => {
    setCode(EXAMPLE_CONTRACT);
    setName('VulnerableVault');
    setError('');
  };

  return (
    <div className="max-w-[820px] mx-auto space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-[26px] font-bold text-gray-900 tracking-tight">Smart Contract Analyzer</h1>
        <p className="text-[13px] text-gray-500 mt-1">
          Paste or upload your Solidity code to scan for security vulnerabilities.
        </p>
      </div>

      {/* Main card */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 space-y-5">
        {/* Contract name */}
        <div>
          <label className="block text-[13px] font-semibold text-gray-700 mb-1.5" htmlFor="contract-name">
            Contract Name
            <span className="text-gray-400 font-normal ml-1">(optional)</span>
          </label>
          <input
            id="contract-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., MyToken, VaultContract"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[13px] text-gray-700 placeholder-gray-400 outline-none focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
          />
        </div>

        {/* Code textarea */}
        <div>
          <label className="block text-[13px] font-semibold text-gray-700 mb-1.5" htmlFor="contract-code">
            Solidity Source Code
          </label>
          <textarea
            id="contract-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Paste your Solidity smart contract code here..."
            rows={16}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] text-gray-800 placeholder-gray-400 font-mono outline-none focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all resize-y leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 text-[13px] font-medium rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload .sol
            <input
              type="file"
              accept=".sol"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
          </label>

          <button
            onClick={loadExample}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 text-[13px] font-medium rounded-xl hover:bg-gray-50 transition-colors"
            id="load-example-btn"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Load Example
          </button>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="ml-auto inline-flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white text-[13px] font-semibold rounded-xl hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
            id="analyze-btn"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analyzing...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Analyze Contract
              </>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl" id="error-card">
            <svg className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[13px] text-red-700">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
