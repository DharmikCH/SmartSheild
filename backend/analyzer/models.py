from django.db import models


class Contract(models.Model):
    name = models.CharField(max_length=255, default="Unnamed Contract", blank=True)
    source_code = models.TextField()
    risk_score = models.IntegerField(default=0)
    risk_level = models.CharField(max_length=20, default="Low")
    analyzed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} — Risk: {self.risk_level} ({self.risk_score})"


class Vulnerability(models.Model):
    contract = models.ForeignKey(
        Contract, on_delete=models.CASCADE, related_name="vulnerabilities"
    )
    issue = models.CharField(max_length=255)
    severity = models.CharField(max_length=20)
    line_number = models.IntegerField(null=True, blank=True)
    description = models.TextField()
    fix = models.TextField()
    unsafe_code = models.TextField(default="")
    safe_code = models.TextField(default="")

    def __str__(self):
        return f"{self.issue} ({self.severity}) — Line {self.line_number}"

    class Meta:
        verbose_name_plural = "vulnerabilities"
