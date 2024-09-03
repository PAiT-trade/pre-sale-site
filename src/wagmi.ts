import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base, mainnet, bsc } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Pait Pre-sale",
  projectId: "a7835a5ac54ad3f79080ac1126d56b4d",
  chains: [mainnet, base, bsc],
  ssr: true,
});
