"use client";
import { PagesWrapper, PageTitle } from "@/components/common/Common.styled";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "@/app/solana/solana-provider";
import { NavbarSocialsItemWallet } from "@/components/navigation/nav/Navbar.styled";
import { useEffect, useState } from "react";
import { ExposureData } from "@/types/wallet_exposure";
import WalletExposureAnalysis from "@/components/WalletExposureAnalysis";

const Analyze: React.FC = () => {
  const { connected, publicKey } = useWallet();

  const [exposure, setExposure] = useState<ExposureData | null>(null);

  useEffect(() => {
    getData()
      .then((res) => {
        console.log("Data:", res);
        setExposure(res);
      })
      .catch(() => {});
  }, [exposure]);

  const getData = async () => {
    try {
      const response = await fetch(
        `/api/wallet-analyze/${`0x9b322e68bee8f7d6c1c4d32083e9fe159a36aab1`}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log("Wallet data:", data);

      return data?.exposure;
    } catch (error) {
      console.log("Error:", error);
      throw new Error("Error fetching data");
    }
  };
  return (
    <PagesWrapper>
      {connected ? (
        <div style={{ padding: "1rem" }}>
          <PageTitle>Analysis of you wallet </PageTitle>
          <WalletExposureAnalysis
            exposure={exposure}
            wallet={publicKey?.toBase58()!}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NavbarSocialsItemWallet>
            <WalletButton>Connect Wallet</WalletButton>
          </NavbarSocialsItemWallet>
        </div>
      )}
    </PagesWrapper>
  );
};

export default Analyze;
