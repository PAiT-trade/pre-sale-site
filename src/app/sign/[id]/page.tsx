"use client";
import SignaturePad from "@/components/SaftDocument";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "@/app/solana/solana-provider";
import toast from "react-hot-toast";

export default function Home() {
  const [signature, setSignature] = useState(null);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { connected, publicKey } = useWallet();

  const submitDocument = (dataURL: any) => {
    if (!name || !email) {
      toast.error("Please enter your name and email");
      return;
    }
    setSignature(dataURL);
    console.log("Signature saved:", dataURL);
    //TODO: send and email with Gsuite
  };

  useEffect(() => {
    getData()
      .then(() => {})
      .catch(() => {});
  }, []);
  const getData = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.status === "success") {
        setName(data.user.name);
        setEmail(data.user.email);
      }
      console.log("User data:", data);
    } catch (error) {}
  };

  return (
    <div>
      {connected ? (
        <SignaturePad
          onSave={submitDocument}
          name={name}
          email={email}
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
            zIndex: 100,
          }}
        >
          <WalletButton>Connect Wallet</WalletButton>
        </div>
      )}
    </div>
  );
}
