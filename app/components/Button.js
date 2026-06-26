import Link from "next/link";
import React from "react";
import styled from "styled-components";

const ButtonLink = styled(Link)`
  align-items: center;
  background: #146c43;
  border-radius: 6px;
  color: #ffffff;
  display: inline-flex;
  font-weight: 600;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  text-decoration: none;
`;

export function PrimaryButton({ href, label }) {
  return <ButtonLink href={href}>{label}</ButtonLink>;
}
