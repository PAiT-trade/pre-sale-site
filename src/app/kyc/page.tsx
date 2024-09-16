"use client";

import { PagesWrapper, PageTitle } from "@/components/common/Common.styled";
import { VerifyKYC } from "@/components/kyc/VerifyKYC";

export default function KYC() {
  return (
    <PagesWrapper>
      <PageTitle>Pait KYC & AML Verification</PageTitle>
      <VerifyKYC />
    </PagesWrapper>
  );
}
