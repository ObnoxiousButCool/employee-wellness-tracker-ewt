import React from "react";
import { PrimaryButton } from "../components/Button";
import { PageShell } from "../components/PageShell";

export default function DashboardPage() {
  const [metrics, setMetrics] = React.useState([]);

  React.useEffect(() => {
    // Defect 6: load dashboard metrics from the protected API instead of static strings.
    fetch("/api/dashboard")
      .then((response) => response.json())
      .then((data) => setMetrics(Array.isArray(data) ? data : []))
      .catch(() => setMetrics([]));
  }, []);

  return (
    <PageShell title="Employee Wellness Tracker">
      <section className="dashboard-grid">
        {metrics.map((metric) => (
          <article className="metric" key={metric.department_id}>
            <span>Department {metric.department_id}</span>
            <strong>{Number(metric.average_stress).toFixed(1)} stress</strong>
            <span>{Number(metric.average_sleep).toFixed(1)}h sleep</span>
            <span>{metric.entry_count} entries</span>
          </article>
        ))}
      </section>
      <PrimaryButton label="Submit wellness entry" href="/wellness" />
    </PageShell>
  );
}
