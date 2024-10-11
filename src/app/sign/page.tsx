"use client";
import SignaturePad from "@/components/SaftDocument";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Home() {
  const [signature, setSignature] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { connected, publicKey } = useWallet();

  const handleSave = (dataURL: any) => {
    setSignature(dataURL);
    console.log("Signature saved:", dataURL);

    // send the document to the email
    //
  };

  return (
    <div>
      <SignaturePad
        onSave={handleSave}
        name={name}
        email={email}
        setName={setName}
        setEmail={setEmail}
        address={publicKey?.toBase58()}
        showSignature={true}
      />
    </div>
  );
}
