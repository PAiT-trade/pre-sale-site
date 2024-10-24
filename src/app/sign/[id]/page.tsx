"use client";
import SignaturePad from "@/components/SaftDocument";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "@/app/solana/solana-provider";
import { NavbarSocialsItemWallet } from "@/components/navigation/nav/Navbar.styled";
import { useAnalyzedWallet } from "@/context/connect-wallet-context";
import toast from "react-hot-toast";
import { ConnectWalletButtonExtends } from "@/components/common/Common";
import { PagesWrapper } from "@/components/common/Common.styled";

interface QueryParams {
  params: {
    id: string; // The dynamic route parameter
  };
}

const Home: React.FC<QueryParams> = ({ params }) => {
  const [email, setEmail] = useState("");
  const [tokens, setTokens] = useState("");
  const [name, setName] = useState("");
  const [telegram, setTelegram] = useState("");
  const { connected, publicKey, isValidWallet, disconnect } =
    useAnalyzedWallet();

  useEffect(() => {
    if (connected && publicKey) {
      if (isValidWallet) {
        console.log("Connected to wallet", publicKey);
      } else {
        toast.error(
          "This wallet is not valid. It might be a compromised wallet, please use another one"
        );
        disconnect();
      }
    }
  }, [connected, publicKey, isValidWallet]);

  const { id } = params;

  const submitDocument = (dataURL: any) => {
    // window.location.href = "/";
  };

  useEffect(() => {
    getData()
      .then(() => {})
      .catch(() => {});
  }, []);
  const getData = async () => {
    try {
      const response = await fetch(`/api/get-purchase/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log("User data:", data);

      if (data?.purchase) {
        setName(data.purchase?.user?.name);
        setEmail(data.purchase?.user?.email);
        setTokens(data.purchase?.pait_tokens);
      }
    } catch (error) {}
  };

  return (
    <div>
      {connected ? (
        <SignaturePad
          onSave={submitDocument}
          name={name}
          email={email}
          purchaseId={Number(id)}
          tokens={Number(tokens)}
          telegram={telegram}
          setTelegram={setTelegram}
          setName={setName}
          setEmail={setEmail}
          address={publicKey!}
          showSignature={true}
        />
      ) : (
        <PagesWrapper>
          <ConnectWalletButtonExtends>
            <WalletButton>Connect Wallet</WalletButton>
          </ConnectWalletButtonExtends>
        </PagesWrapper>
      )}
    </div>
  );
};

export default Home;
