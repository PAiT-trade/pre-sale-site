import { Keypair } from "@solana/web3.js";

export function createWallet() {
  const keypair = Keypair.generate();
  return keypair;
}

export function getWalletPublicKey(keypair: Keypair) {
  return keypair.publicKey.toBase58();
}

export function getWalletPrivateKey(keypair: Keypair) {
  return Buffer.from(keypair.secretKey).toString("base64");
}
