import React from "react";
import styled from "styled-components";

const Shell = styled.main`
  color: #17202a;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  margin: 0 auto;
  max-width: 960px;
  padding: 40px 24px;

  .dashboard-grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    margin: 24px 0;
  }

  .metric,
  .form {
    border: 1px solid #d9e2dd;
    border-radius: 8px;
    padding: 18px;
  }

  .metric span,
  label {
    color: #52635c;
    display: block;
    font-size: 14px;
  }

  .metric strong {
    display: block;
    font-size: 28px;
    margin-top: 8px;
  }

  .form {
    display: grid;
    gap: 16px;
    max-width: 420px;
  }

  input {
    border: 1px solid #aab8b0;
    border-radius: 6px;
    box-sizing: border-box;
    display: block;
    margin-top: 6px;
    min-height: 40px;
    padding: 8px 10px;
    width: 100%;
  }

  button {
    background: #146c43;
    border: 0;
    border-radius: 6px;
    color: #ffffff;
    cursor: pointer;
    font-weight: 600;
    min-height: 42px;
  }
`;

export function PageShell({ children, title }) {
  return (
    <Shell>
      <h1>{title}</h1>
      {children}
    </Shell>
  );
}
