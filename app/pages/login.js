import React from "react";
import { PageShell } from "../components/PageShell";

export default function LoginPage() {
  return (
    <PageShell title="Sign in">
      <form className="form" method="post" action="/api/login">
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" autoComplete="current-password" required />
        </label>
        <button type="submit">Sign in</button>
      </form>
    </PageShell>
  );
}
