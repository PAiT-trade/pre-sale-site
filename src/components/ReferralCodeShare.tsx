"use client";
import styled from "styled-components";
import { ShareSocial } from "react-share-social";
import { useState, useEffect } from "react";

export const ReferralCodeShare: React.FC<{
  referralCode: string;
}> = ({ referralCode }) => {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== "undefined") {
      setShareUrl(
        `${window.location.protocol}//${
          window.location.hostname
        }/?referral=${encodeURIComponent(referralCode)}`
      );
    }
  }, [referralCode]);

  return (
    <Wrapper>
      <h3>Share Your referral Code</h3>
      <ShareSocial
        url={shareUrl}
        socialTypes={["facebook", "twitter", "reddit", "email", "whatsapp"]}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #141824;
  padding: 1rem;
  border-radius: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  flex-direction: column;
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
