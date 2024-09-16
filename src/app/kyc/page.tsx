"use client";

import { PagesWrapper, PageTitle } from "@/components/common/Common.styled";
import { VerifyKYC } from "@/components/kyc/VerifyKYC";

export default function KYC() {
  return (
    <PagesWrapper>
      <PageTitle>Let’s get you verified</PageTitle>
      <VerifyKYC />
    </PagesWrapper>
  );
}
