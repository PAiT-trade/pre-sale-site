"use client";
import SignaturePad from "@/components/SaftDocument";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "@/app/solana/solana-provider";
import { NavbarSocialsItemWallet } from "@/components/navigation/nav/Navbar.styled";

interface QueryParams {
  params: {
    id: string; // The dynamic route parameter
  };
}

const Home: React.FC<QueryParams> = ({ params }) => {
  const [email, setEmail] = useState("");
  const [tokens, setTokens] = useState("");
  const [name, setName] = useState("");
  const { connected, publicKey } = useWallet();

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
          setName={setName}
          setEmail={setEmail}
          address={publicKey?.toBase58()}
          showSignature={true}
        />
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
    </div>
  );
};

export default Home;
