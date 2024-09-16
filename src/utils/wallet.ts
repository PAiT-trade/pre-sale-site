import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";
import * as bs58 from "bs58";

export const createWallet = async () => {
  // Generate a 12-word mnemonic
  const mnemonic = bip39.generateMnemonic();
  console.log("Mnemonic:", mnemonic);

  // Derive seed from mnemonic
  const seed = await bip39.mnemonicToSeed(mnemonic);

  // Derive Solana-compatible keypair from the seed
  const derivationPath = "m/44'/501'/0'/0'"; // Solana derivation path
  const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;
  const keypair = Keypair.fromSeed(derivedSeed);

  console.log("Public Key:", keypair.publicKey.toBase58());
  console.log("Private Key (Secret):", bs58.encode(keypair.secretKey));
  return {
    mnemonic,
    publicKey: keypair.publicKey.toBase58(),
    privateKey: bs58.encode(keypair.secretKey),
    keypair: keypair,
  };
};
