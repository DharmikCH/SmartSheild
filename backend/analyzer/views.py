import re
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Contract, Vulnerability
from .serializers import ContractListSerializer, ContractDetailSerializer, VulnerabilitySerializer
from .analysis_engine import analyze_contract


class AnalyzeContractView(APIView):
    """POST /api/analyze/ — Analyze a Solidity smart contract."""

    def post(self, request):
        code = request.data.get("code", "")
        name = request.data.get("name", "Unnamed Contract")

        if not code or not code.strip():
            return Response(
                {"error": "No Solidity code provided."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Run analysis
        result = analyze_contract(code)

        # Save contract
        contract = Contract.objects.create(
            name=name or "Unnamed Contract",
            source_code=code,
            risk_score=result["riskScore"],
            risk_level=result["riskLevel"],
        )

        # Save vulnerabilities
        for vuln in result["vulnerabilities"]:
            Vulnerability.objects.create(
                contract=contract,
                issue=vuln["issue"],
                severity=vuln["severity"],
                line_number=vuln["lineNumber"],
                description=vuln["description"],
                fix=vuln["fix"],
                unsafe_code=vuln["unsafeCode"],
                safe_code=vuln["safeCode"],
            )

        # Build response
        serializer = ContractDetailSerializer(contract)
        response_data = serializer.data
        response_data["healthChecklist"] = result["healthChecklist"]
        response_data["severityCounts"] = result["severityCounts"]

        return Response(response_data, status=status.HTTP_201_CREATED)


class ReportListView(APIView):
    """GET /api/reports/ — List all analyzed contracts."""

    def get(self, request):
        contracts = Contract.objects.all().order_by("-analyzed_at")
        serializer = ContractListSerializer(contracts, many=True)
        return Response(serializer.data)


class ReportDetailView(APIView):
    """GET /api/reports/<id>/ — Get full report for a contract."""

    def get(self, request, pk):
        try:
            contract = Contract.objects.get(pk=pk)
        except Contract.DoesNotExist:
            return Response(
                {"error": "Report not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = ContractDetailSerializer(contract)
        response_data = serializer.data

        # Re-run analysis to get healthChecklist and severityCounts
        result = analyze_contract(contract.source_code)
        response_data["healthChecklist"] = result["healthChecklist"]
        response_data["severityCounts"] = result["severityCounts"]

        return Response(response_data)
