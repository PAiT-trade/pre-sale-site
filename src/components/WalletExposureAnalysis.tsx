import { ExposureData } from "@/types/wallet_exposure";
import React from "react";
import styled from "styled-components";

interface WalletExposureAnalysisProps {
  exposure: null | ExposureData;
  wallet: string;
}

const WalletExposureAnalysis: React.FC<WalletExposureAnalysisProps> = ({
  exposure,
  wallet,
}) => {
  return exposure ? (
    <Container>
      <Section>
        <InfoItem>
          <Bold>Risk Score:</Bold>
          <Bold>
            {exposure.risk_score_detail.destination} /
            {exposure.risk_score_detail.source}
          </Bold>
        </InfoItem>
        <InfoItem>
          <Bold>Screened Address:</Bold>
          <Bold>{exposure.process_status}</Bold>
        </InfoItem>
      </Section>
    </Container>
  ) : (
    <div style={{ lineHeight: "1.5", fontSize: "1.2rem" }}>
      <p>
        The submitted address with address:
        <b>{` ${wallet} `}</b> <br />
      </p>

      <p>
        has not yet been processed into the Elliptic tool or does not exist on
        the blockchain.
      </p>
    </div>
  );
};

const Container = styled.div`
  padding: 20px;
  background-color: #343e56;
  border: 1px solid #343e56;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
`;

const Section = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const InfoItem = styled.p`
  font-size: 1em;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Bold = styled.p`
  font-weight: bold;
`;

export default WalletExposureAnalysis;
