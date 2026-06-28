import React from "react";
import { PageShell } from "../components/PageShell";

export default function WellnessPage() {
  return (
    <PageShell title="Wellness entry">
      <form className="form" method="post" action="/api/wellness-entries">
        <label>
          Stress level
          <input name="stress_level" type="number" min="1" max="10" required />
        </label>
        <label>
          Work hours
          <input name="work_hours" type="number" min="0" max="24" step="0.25" required />
        </label>
        <label>
          Sleep hours
          <input name="sleep_hours" type="number" min="0" max="24" step="0.25" required />
        </label>
        <label>
          Mood
          <input name="mood" type="text" maxLength="80" required />
        </label>
        <label>
          Energy level
          <input name="energy_level" type="number" min="1" max="10" required />
        </label>
        <button type="submit">Save entry</button>
      </form>
    </PageShell>
  );
}
