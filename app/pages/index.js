import React from "react";
import { PrimaryButton } from "../components/Button";
import { PageShell } from "../components/PageShell";

export default function DashboardPage() {
  const metrics = [
    { label: "Average stress", value: "4.2" },
    { label: "Average sleep", value: "7.1h" },
    { label: "Weekly entries", value: "128" }
  ];

  return (
    <PageShell title="Employee Wellness Tracker">
      <section className="dashboard-grid">
        {metrics.map((metric) => (
          <article className="metric" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </section>
      <PrimaryButton label="Submit wellness entry" href="/wellness" />
    </PageShell>
  );
}
