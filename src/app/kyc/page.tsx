"use client";

import { VerifyKYC } from "@/components/kyc/VerifyKYC";
import styled from "styled-components";

export default function KYC() {
  return (
    <KYCWrapper>
      <VerifyKYC />
    </KYCWrapper>
  );
}

const KYCWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  background-color: #151720 !important;
  margin: 2rem;
  border-radius: 0.4rem;

  #veriff-root {
    width: 100%;
  }
`;
