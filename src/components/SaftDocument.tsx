import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface SignaturePadProps {
  onSave?: (url: string) => void;
  name?: string;
  email?: string;
  setName?: (name: string) => void;
  setEmail?: (email: string) => void;
  showSignature: boolean;
  address?: string;
  tokens?: number;
}

const SignaturePad: React.FC<SignaturePadProps> = ({
  onSave,
  email,
  name,
  setName,
  setEmail,
  showSignature,
  tokens,
  address,
}) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [currentDate, setCurrentDate] = useState<{
    human: string;
    decimal: string;
  }>({
    human: "",
    decimal: "",
  });

  useEffect(() => {
    setCurrentDate({
      human: moment(new Date()).format("MMMM, D YYYY"),
      decimal: moment(new Date()).format("YYYY-MM-DD"),
    });

    console.log("Current: ", currentDate);
  }, []);

  const startDrawing = (e: any) => {
    isDrawing.current = true;
    const canvas: any = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }
  };

  const draw = (e: any) => {
    if (!isDrawing.current) return;
    const canvas: any = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas: any = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const saveSignature = () => {
    const canvas: any = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL("image/png");

      if (onSave) {
        onSave(dataURL);
      }
    }
  };

  useEffect(() => {
    const canvas: any = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
    }
  }, []);

  const downloadDocument = () => {
    const input = document.getElementById("document-section");
    if (input) {
      html2canvas(input).then(
        (canvas: {
          toDataURL: (arg0: string) => any;
          height: number;
          width: number;
        }) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "pt", "a4");
          const imgWidth = 190; // Adjust as needed
          const pageHeight = pdf.internal.pageSize.height;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;

          let position = 0;

          pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
          pdf.save("legal_agreement.pdf");
        }
      );
    }
  };

  return (
    <>
      <div
        id="document-section"
        style={
          {
            // maxWidth: "800px",
          }
        }
      >
        <DocumentContainer>
          <Title>Token Sale Agreement</Title>
          <Subtitle>Effective as of {currentDate.human}</Subtitle>
          <Paragraph>
            This Token Sale Agreement (hereinafter the "Agreement") sets forth
            the terms governing your acquisition of the Company's tokens "PAiT"
            (hereinafter the "Token"). This Agreement is made between PAiT LAB
            LIMITED, co.nr: 76685422, with a correspondence address at Unit 2A,
            17/F Glenealy Tower, No. 1 Glenealy, Central, Hong Kong (hereinafter
            the "Company"), and you as the acquirer of the Token.
          </Paragraph>
          <Paragraph>
            You represent and warrant to the Company that you are legally
            entitled and eligible to engage in economic activity under
            applicable law; you are not under 18 years old, have full legal
            capacity, are not from a Restricted Territory, and are not a US
            citizen.
          </Paragraph>
          <Paragraph>
            If you represent a legal entity, you warrant that you have the
            authority to bind that entity. If you represent another party, you
            warrant that you have the authority to bind that party and that the
            party has read and agrees to the terms of this Agreement and other
            supporting documents provided by the Company.
          </Paragraph>
          <Subtitle>DEFINITIONS:</Subtitle>
          <Paragraph>
            "Confidential Information" means any information disclosed by the
            Company or its representatives that is confidential by nature or
            under circumstances reasonably deemed confidential. Confidential
            Information includes: (1) non-public information regarding the
            Company or its acquirers, owners, customers, business plans,
            marketing activities, financial matters, and other business matters;
            and (2) third-party information that the Company treats as
            confidential.
          </Paragraph>
          <Paragraph>
            "Content" means works in the literary, artistic, and scientific
            domains, including texts, code, software, methods, data, images,
            pictures, video, music, audio, or other materials and publications.
          </Paragraph>
          <Paragraph>
            “Restricted Territory” includes Afghanistan, Bosnia and Herzegovina,
            Central African Republic, Cuba, the Democratic Republic of the
            Congo, Democratic People's Republic of Korea (North Korea), Eritrea,
            Ethiopia, Guinea-Bissau, Iran, Iraq, Libya, Lebanon, Somalia, South
            Sudan, Sudan, Syria, Uganda, Vanuatu, Yemen, and the Crimea region
            or any other areas subject to sanctions by Canada and the United
            Nations.
          </Paragraph>
          <Paragraph>
            "Site" means website www.pait.fi , or any other website associated
            with the Company."
          </Paragraph>
          <Paragraph>
            "Terms" means the Site terms and conditions, privacy policy, risk
            statement, and any other document published on the Site, including
            restrictions described in the Company's Content and on the Site. In
            case of a conflict between the Terms and this Agreement, this
            Agreement shall prevail.
          </Paragraph>
          <Subtitle>1. GENERAL TERMS</Subtitle>
          <Paragraph>
            1.1. You agree to be bound by all applicable terms, conditions, and
            laws regarding your acquisition of Tokens. You must read and
            understand the Risk Disclosure and the Terms. You certify that you
            acquire Tokens for personal satisfaction and use, to support the
            Company, and not for investment or other financial purposes. You
            acknowledge that the Token may decrease in value or become
            worthless. If you do not understand any provisions of the Agreement,
            Terms, or other documents, you should contact the Company via the
            provided communication channels.
          </Paragraph>
          <Paragraph>
            1.2. Third parties may publish Content accessible to you. Such
            Content may be subject to different rules, and you must familiarize
            yourself with these rules. Your use of third-party Content is at
            your own risk. The Company is not liable for any payments, damages,
            or losses due to your use of third-party Content. The Company is not
            responsible for the accuracy, availability, or accessibility of such
            Content, including network information, fee information, or other
            data. The Company may edit, publish, and delete the Content.
          </Paragraph>

          <Subtitle>2. SECURITY TERMS AND DATA PRIVACY PROTECTION</Subtitle>
          <Paragraph>
            2.1. You must deploy appropriate technical and security measures to
            secure access to (a) any device associated with your access point,
            (b) private keys required to access your Solana address or Tokens,
            and (c) your username, password, and other credentials. If you lose
            access to a device associated with your account, the Company may
            grant access to your account to another party providing additional
            credentials. The Company may determine the required credentials,
            which may include notarized identification, in-person meetings,
            photo proof of identity, video identification, and copies of
            identification documents.
          </Paragraph>
          <Paragraph>
            2.2. Upon request, you shall provide the Company with any additional
            information needed to comply with applicable law, including but not
            limited to ID cards, passports, driver’s licenses, or other
            documents and proof.
          </Paragraph>
          <Paragraph>
            2.3. The Company may collect statistical information about your
            activity, including your activity on the Site and logins to various
            platforms, for marketing or related purposes. The Company may use
            your IP address to verify you and your Token. The Company will not
            release your personal identification or identifiable data to third
            parties without your consent, except as provided here or in
            accordance with the Terms or the Company's Privacy Policy.
          </Paragraph>

          <Subtitle>3. PURCHASE AND DELIVERY OF TOKEN</Subtitle>
          <Paragraph>
            3.1. You agree to pay for and acquire Tokens in accordance with
            Appendix Nr.1 of this Agreement. The Company agrees to sell you the
            Tokens on the terms of this Agreement. Your acquisition is final and
            non-refundable. The Company shall not provide any refund of the
            acquisition price under any circumstances unless otherwise specified
            on the Site.
          </Paragraph>
          <Paragraph>
            3.2. Aquared PAiT tokens{" "}
            <b>{tokens ? tokens : " ............. "}</b>
            will be credited to your wallet{" "}
            <b>{address ? address : " ............. "}</b> through the escrow
            account no later than the TGE. 5% unlock on TGE, 1 month cliff, 4
            months linear vesting.
          </Paragraph>

          <Paragraph>
            3.3. All deliveries from the Sale shall be made online. Deliveries
            shall be made to your Solana account, or another wallet related to
            your acquisition of Tokens.
          </Paragraph>
          <Paragraph>
            3.4. If you acquire cryptocurrency using a third-party payment
            processor, that processor acts as your agent, and the Company is not
            responsible for the actions of such an agent. You are responsible
            for ensuring the Company receives the amount of cryptocurrency you
            sent. The Company is not responsible for any financial losses or
            damages when using third-party payment processors.
          </Paragraph>
          <Subtitle>4. REGULATORY COMPLIANCE AND TAXES</Subtitle>
          <Paragraph>
            4.1. All fees and charges that you must pay in accordance with
            national and international laws are your responsibility. You shall
            provide the Company with any information it requests to determine
            whether the Company is subject to VAT or other taxes. We may require
            you to provide tax exemption certificates. If deductions or
            withholdings are required by law, you shall notify the Company and
            pay additional sums to ensure that the net amount is equal to the
            amount the Company would have received if no deduction or
            withholding had occurred. You shall provide documentation showing
            that the deducted and withheld amounts have been paid to taxing
            authorities.
          </Paragraph>
          <Subtitle>5. YOUR RESPONSIBILITIES</Subtitle>
          <Paragraph>
            5.1. You are responsible for setting up the software that provides
            your access to Tokens. Your credentials are for your personal use
            and shall not be accessible to any third party.
          </Paragraph>
          <Paragraph>
            5.2. You shall comply with the Agreement, Terms, and applicable
            laws. If you violate the Agreement, Terms, or applicable laws, the
            Company may act against you.
          </Paragraph>
          <Subtitle>6. PROPRIETARY RIGHTS</Subtitle>
          <Paragraph>
            6.1. If you provide any ideas to the Company or its personnel, the
            Company is entitled to use those ideas without restriction. You
            assign to the Company all rights, interests, and titles in and to
            the ideas and agree to assist the Company in maintaining these
            rights.
          </Paragraph>
          <Paragraph>
            6.2. By using any services of the Company, Token, or Site, you do
            not obtain any proprietary rights in any Content.
          </Paragraph>
          <Paragraph>
            6.3. The Company holds all rights, interests, and titles in all
            intellectual property, including works, inventions, discoveries,
            processes, trademarks, formulae, compositions, methods, techniques,
            information, and data, whether copyrightable, patentable, or
            trademarkable. You may not use any of the Company's intellectual
            property except for personal use with one copy on each device.
          </Paragraph>
          <Subtitle>7. LIMITATIONS OF LIABILITY</Subtitle>
          <Paragraph>
            7.1. The Company and its affiliates or contractors shall not be
            liable for any direct, indirect, or other damages for loss of
            profits, goodwill, use, or information, even if advised of the
            possibility of such damage. The Company and its affiliates or
            contractors will not be responsible for compensation or damages
            arising from: (i) your inability to use the Token, including
            suspension or termination of this Agreement due to force majeure;
            (ii) the cost of replacement; (iii) any losses or burdens related to
            the Agreement or your access to the Token; or (iv) changes to,
            destruction, damage, loss, or failure to preserve data, including
            records, keys, and credentials regarding the Token.
          </Paragraph>
          <Paragraph>
            7.2. You waive your right to demand a refund of any virtual currency
            you paid the Company in the Sale under any circumstances.
          </Paragraph>
          <Paragraph>8. RISKS AND DISCLAIMERS</Paragraph>
          <Paragraph>
            8.1. You agree that Tokens, blockchain technology, cryptocurrencies,
            the Solana protocol, Solana, and other cryptocurrencies are new
            technologies and not under the Company's control. You accept all
            risks of loss and damage arising from the use of these technologies.
          </Paragraph>
          <Paragraph>
            8.2. The Token is provided on an "as is" basis. The Company and its
            affiliates and contractors make no warranties or representations
            regarding the Token, Site, or Content, including warranties that
            they will be available, free of illegal components and errors, or
            secure. The Company disclaims all warranties, including fitness for
            a particular purpose, satisfactory quality, merchantability, or
            non-infringement.
          </Paragraph>
          <Paragraph>
            8.3. Transactions using these technologies are risky. The Company is
            not responsible for any loss of data, Solana, Token, software, or
            devices resulting from any type of failure.
          </Paragraph>
          <Subtitle>9. INDEMNIFICATION</Subtitle>
          <Paragraph>
            9.1. You shall defend, indemnify, and hold harmless the Company, its
            affiliates, contractors, employees, managers, directors, and
            representatives from any liabilities, damages, claims, losses,
            costs, and expenses (including attorneys’ fees) relating to a
            third-party claim concerning this Agreement or your use of Tokens.
            If the Company or its affiliates must respond to a legal action, you
            will reimburse the Company's attorneys’ fees and resources spent on
            handling the third-party legal action.
          </Paragraph>
          <Subtitle>10. TERM AND TERMINATION</Subtitle>
          <Paragraph>
            10.1. The term of this Agreement begins on the Effective Date and
            continues until terminated.
          </Paragraph>
          <Paragraph>
            10.2. This Agreement terminates upon your acquisition and delivery
            of Tokens. The Company may also terminate this Agreement if you
            breach any term of this Agreement, Terms, or applicable law.
          </Paragraph>
          <Paragraph>
            10.3. Upon termination, the following terms apply: (i) all your
            rights under this Agreement terminate; (ii) you are not entitled to
            any refund; (iii) you must return or destroy all Content as required
            by the Company; and (iv) Clauses 4, 5.1, 6, 7, 8, 9, 10.3, and 11
            remain in effect. The Company is not liable for any damages to you,
            including loss of credentials or access to the Site, your account,
            or device.
          </Paragraph>
          <Subtitle>11. MISCELLANEOUS</Subtitle>
          <Paragraph>
            11.1. You may use Confidential Information solely for acquiring
            Tokens under this Agreement and in accordance with the Agreement.
            You shall not disclose Confidential Information during the term of
            this Agreement and for five years thereafter. You shall take all
            reasonable measures to prevent unauthorized disclosure or use of
            Confidential Information.
          </Paragraph>
          <Paragraph>
            11.2. The Company and its affiliates are not liable for failure or
            delay in fulfilling obligations due to causes beyond their control,
            including technical failures, natural disasters, blockages,
            embargoes, riots, government acts, terrorist acts, war, or changes
            in technology.
          </Paragraph>
          <Paragraph>
            11.3. The Company and you are independent contractors, and no party
            is an agent of the other
          </Paragraph>
          <Paragraph>
            11.4. This Agreement does not transfer any security or beneficiary
            rights to any individual or entity.
          </Paragraph>
          <Paragraph>
            11.5. You shall comply with all applicable import, export,
            re-import, and re-export compliance and laws, including economic
            sanctions programs.
          </Paragraph>
          <Paragraph>
            11.6. The Company may provide notice under this Agreement by posting
            on the Site or via communication means, including email. Notices are
            effective upon posting or sending. The Company is not responsible
            for your inability to receive notice. To send notice to the Company,
            use available communication means. All notices must be in English.
          </Paragraph>
          <Paragraph>
            11.7. You may not assign rights or obligations under this Agreement
            or sublicense or delegate rights or obligations without the
            Company's consent.
          </Paragraph>
          <Paragraph>
            11.8. The Company's failure to enforce any rights under this
            Agreement does not waive those rights. All waivers must be in
            writing.
          </Paragraph>
          <Paragraph>
            11.9. If any part of this Agreement is found to be void or
            unenforceable, the remaining parts remain in force. Void or
            unenforceable portions shall be interpreted to reflect the original
            intent.
          </Paragraph>
          <Paragraph>
            11.10. Any disputes related to this Agreement shall be resolved by
            negotiation or through the courts of Canada. The governing law is
            the substantive law of Canada.
          </Paragraph>
          <Paragraph>
            11.11. This Agreement, including the Terms, is the entire agreement
            between you and the Company, superseding all prior communications
            and agreements.
          </Paragraph>
          <Paragraph>
            11.12. In case of a conflict between a translated version of this
            Agreement and the English version, the English version prevails.
          </Paragraph>
          <Paragraph></Paragraph>
          <Paragraph></Paragraph>
          <Paragraph></Paragraph>
          {showSignature && (
            <SignatureContainer>
              <SecondPartySignature>
                <UserInputGroup>
                  <UserInputLabel>Name: </UserInputLabel>
                  <UserInput
                    value={name}
                    onChange={(e) => {
                      if (setName) {
                        setName(e.target.value);
                      }
                    }}
                    placeholder="Your Full Name"
                  />
                </UserInputGroup>

                <UserInputGroup>
                  <UserInputLabel>Email: </UserInputLabel>
                  <UserInput
                    value={email}
                    onChange={(e) => {
                      if (setEmail) {
                        setEmail(e.target.value);
                      }
                    }}
                    placeholder="email@email.com"
                  />
                </UserInputGroup>

                <UserInputGroup>
                  <UserInputLabel>Date: </UserInputLabel>
                  <UserInput value={currentDate.decimal} />
                </UserInputGroup>

                <UserInputGroup>
                  <UserInputLabel>Signature: </UserInputLabel>
                  <canvas
                    ref={canvasRef}
                    height={70}
                    style={{
                      border: "1px solid #000",
                      cursor: "crosshair",
                      backgroundColor: "white",
                    }}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                  />
                </UserInputGroup>
              </SecondPartySignature>
              <OwnerPartySignature>
                <OwnerPartySignatureImg src="/owner.png" />
              </OwnerPartySignature>
            </SignatureContainer>
          )}
        </DocumentContainer>
      </div>
      {showSignature && (
        <Container>
          <Button onClick={clearCanvas}>Clear</Button>
          <Button onClick={saveSignature}>Save Signature</Button>
        </Container>
      )}
    </>
  );
};

export default SignaturePad;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
  border: 1px solid #ccc;
  font-family: Arial, sans-serif;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const DocumentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
  font-family: Arial, sans-serif;
  background-color: #fff;
`;

const Title = styled.h1`
  text-align: left;
  font-size: 24px;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 20px;
  margin: 20px 0 10px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin: 10px 0;
`;

const SignatureContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  margin-top: 2rem;
`;

const SecondPartySignature = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const UserInputGroup = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
`;
const UserInputLabel = styled.div``;
const UserInput = styled.input`
  outline-width: 0;
  padding: 0.3rem;
  border: 0;
  overflow: 0;
  border-bottom: 3px dotted #000;
  width: 100%;
`;

const OwnerPartySignature = styled.div``;
const OwnerPartySignatureImg = styled.img``;

const SignatureLine = styled.div`
  border-bottom: 1px solid #000;
  width: 300px;
  margin: 20px auto;
`;

const Button = styled.button`
  border: 2px solid #80dcd7;
  padding: 0.5rem 1.2rem;
  outline-width: 0;
  cursor: pointer;
`;

const SignatureText = styled.p`
  font-size: 14px;
  margin: 5px 0;
`;