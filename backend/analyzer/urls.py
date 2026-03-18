from django.urls import path
from .views import AnalyzeContractView, ReportListView, ReportDetailView

urlpatterns = [
    path("analyze/", AnalyzeContractView.as_view(), name="analyze"),
    path("reports/", ReportListView.as_view(), name="report-list"),
    path("reports/<int:pk>/", ReportDetailView.as_view(), name="report-detail"),
]
