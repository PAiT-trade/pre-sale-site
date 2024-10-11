"use client";
import styled from "styled-components";

export const ReferralCodeShare: React.FC<{
  referralCode: string;
}> = ({ referralCode }) => {
  return (
    <Wrapper>
      <h3>Your Referral Code</h3>
      <RawReferralCode>{referralCode}</RawReferralCode>
      <ReferralCodeBox>
        {window.location.protocol}//{window.location.hostname}/?referral=
        {encodeURIComponent(referralCode)}
      </ReferralCodeBox>
      <SocialLinks>
        <a href="">
          <img height={24} src="/x-logo.svg" alt="X" />
        </a>
        <a href="">
          <img height={24} src="/telegram-logo.svg" alt="X" />
        </a>
        <a href="">
          <img height={24} src="/facebook-logo.svg" alt="X" />
        </a>
      </SocialLinks>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #141824;
  padding: 1rem;
  border-radius: 1rem;
  width: 32rem;
`;

const RawReferralCode = styled.code`
  user-select: all;
  opacity: 0.8;
`;

const ReferralCodeBox = styled.div`
  user-select: all;
  background: #333e59;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.8rem;
  padding: 0 0.5rem;
`;
