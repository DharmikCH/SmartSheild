from rest_framework import serializers
from .models import Contract, Vulnerability


class VulnerabilitySerializer(serializers.ModelSerializer):
    lineNumber = serializers.IntegerField(source="line_number")
    unsafeCode = serializers.CharField(source="unsafe_code")
    safeCode = serializers.CharField(source="safe_code")

    class Meta:
        model = Vulnerability
        fields = [
            "id", "issue", "severity", "lineNumber",
            "description", "fix", "unsafeCode", "safeCode",
        ]


class ContractListSerializer(serializers.ModelSerializer):
    riskScore = serializers.IntegerField(source="risk_score")
    riskLevel = serializers.CharField(source="risk_level")
    analyzedAt = serializers.DateTimeField(source="analyzed_at")

    class Meta:
        model = Contract
        fields = ["id", "name", "riskScore", "riskLevel", "analyzedAt"]


class ContractDetailSerializer(serializers.ModelSerializer):
    riskScore = serializers.IntegerField(source="risk_score")
    riskLevel = serializers.CharField(source="risk_level")
    analyzedAt = serializers.DateTimeField(source="analyzed_at")
    vulnerabilities = VulnerabilitySerializer(many=True, read_only=True)

    class Meta:
        model = Contract
        fields = [
            "id", "name", "riskScore", "riskLevel",
            "analyzedAt", "vulnerabilities",
        ]
