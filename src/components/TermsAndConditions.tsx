import React from "react";
import styled from "styled-components";

const TermsAndConditions = () => {
  return (
    <Container>
      <Title>PAiT Token Sale Terms and Conditions</Title>
      <Paragraph>Effective Date: 2024 October 1</Paragraph>

      <Section>
        <SectionTitle>1. Acceptance of Terms</SectionTitle>
        <Paragraph>
          By participating in the PAiT Token sale, you agree to be bound by
          these Terms and Conditions. If you do not agree, do not purchase PAiT
          Tokens or use the website.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>2. Eligibility</SectionTitle>
        <Paragraph>
          You must be at least 18 years of age and comply with the legal and
          regulatory requirements of your jurisdiction to participate in the
          PAiT Token sale. The sale is not available to residents of
          jurisdictions where token sales or cryptocurrencies are prohibited.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>3. Token Purchase</SectionTitle>
        <List>
          <ListItem>
            <strong>3.1. No Investment Advice or Guarantee:</strong> The
            purchase of PAiT Tokens is a speculative transaction. PAiT Tokens do
            not constitute securities, and participation in the token sale
            should not be considered an investment or involve any expectation of
            profit.
          </ListItem>
          <ListItem>
            <strong>3.2. Purchase Process:</strong> The purchase of PAiT Tokens
            will be made through our website. You will need to transfer the
            required amount of USDC to the designated PAiT wallet address. Upon
            confirmation of payment, the purchased tokens will be credited to
            your specified wallet under the vesting schedule described in
            Section 4.
          </ListItem>
          <ListItem>
            <strong>3.3. Pricing and Token Allocation:</strong> The number of
            Tokens you receive will be calculated automatically based on the
            current token price displayed on the website at the time of your
            purchase. PAiT reserves the right to modify token pricing at any
            time.
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>4. Vesting and Unlocking</SectionTitle>
        <List>
          <ListItem>
            <strong>4.1. Vesting Schedule:</strong> Tokens purchased during the
            sale will be subject to the following vesting schedule.
          </ListItem>
          <ListItem>
            <strong>4.2. Delivery of Tokens:</strong> PAiT Tokens will be
            credited to your wallet through an escrow account, and you will gain
            access to your Tokens according to the vesting schedule.
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>5. No Refunds</SectionTitle>
        <Paragraph>
          All token purchases are final. PAiT will not provide refunds, except
          as required by Hong Kong law.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>6. Risk Disclosure</SectionTitle>
        <List>
          <ListItem>
            <strong>6.1. Volatility and Loss:</strong> Cryptocurrency markets
            are volatile. You acknowledge that the value of PAiT Tokens may
            fluctuate, and you could lose some or all of your funds. PAiT
            founders, team members, or affiliates will not be liable for any
            losses incurred from purchasing or holding PAiT Tokens.
          </ListItem>
          <ListItem>
            <strong>6.2. Regulatory Risk:</strong> Cryptocurrencies are subject
            to regulatory changes. By purchasing PAiT Tokens, you assume all
            legal risks, including the potential for future restrictions or
            prohibitions in your jurisdiction.
          </ListItem>
          <ListItem>
            <strong>6.3. Technology and Security:</strong> We use blockchain
            technology for the sale and distribution of PAiT Tokens. While we
            take reasonable measures to ensure security, blockchain technology
            is not immune to attacks or failures. PAiT will not be liable for
            technical malfunctions or security breaches.
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>7. Limitation of Liability</SectionTitle>
        <Paragraph>
          To the fullest extent permitted by Hong Kong law, PAiT, its founders,
          team members, and affiliates shall not be held liable for any damages
          arising out of or related to your purchase or use of PAiT Tokens,
          including, without limitation, direct, indirect, incidental,
          consequential, or punitive damages.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>8. No Ownership Rights</SectionTitle>
        <Paragraph>
          PAiT Tokens do not grant any ownership rights in the PAiT project,
          company, or any related entity. They are utility tokens intended to be
          used on the PAiT platform.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>9. Force Majeure</SectionTitle>
        <Paragraph>
          PAiT is not liable for any delay or failure in performance due to
          events beyond its control, including but not limited to acts of God,
          war, terrorism, cyber-attacks, labor disputes, technical failures, or
          government actions.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>10. Intellectual Property</SectionTitle>
        <Paragraph>
          All intellectual property on the website, including the PAiT name,
          logo, content, and platform design, is the exclusive property of PAiT
          or its licensors. Unauthorized use is prohibited.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>11. Indemnification</SectionTitle>
        <Paragraph>
          You agree to indemnify and hold harmless PAiT, its founders, team
          members, and affiliates from any claims, losses, damages, liabilities,
          and expenses arising out of your purchase, use, or inability to use
          PAiT Tokens.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>12. Termination and Suspension</SectionTitle>
        <Paragraph>
          PAiT reserves the right to terminate or suspend the sale of tokens or
          your access to the website at any time, for any reason, without
          notice.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>13. Governing Law and Dispute Resolution</SectionTitle>
        <Paragraph>
          These Terms and Conditions shall be governed by and construed in
          accordance with the laws of the Hong Kong Special Administrative
          Region (HKSAR). Any disputes arising from these terms or your purchase
          of PAiT Tokens shall be resolved through arbitration in accordance
          with the rules of the Hong Kong International Arbitration Centre
          (HKIAC). The arbitration proceedings shall be conducted in English.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>14. Amendments</SectionTitle>
        <Paragraph>
          PAiT reserves the right to amend these Terms and Conditions at any
          time without prior notice. It is your responsibility to review the
          Terms and Conditions regularly.
        </Paragraph>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
  color: #000;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: left;
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin: 10px 0;
  text-align: left;
`;

const Paragraph = styled.p`
  line-height: 1.5;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const List = styled.ul`
  margin: 10px 0;
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin: 5px 0;
`;

export default TermsAndConditions;
