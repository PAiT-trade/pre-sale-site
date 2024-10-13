import { useEffect } from "react";
import { CONFIGS } from "@/config";
import { createVeriffFrame, MESSAGES } from "@veriff/incontext-sdk";
import toast from "react-hot-toast";
interface VerifyKYCProps {
  wallet: string;
}
export const VerifyKYC: React.FC<VerifyKYCProps> = ({ wallet }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const { Veriff } = require("@veriff/js-sdk");
      if (!CONFIGS.VERIFF_API_KEY) {
        toast.error("Please set the VERIFF_API_KEY in the .env file");
        return;
      }
      const veriff = Veriff({
        host: "https://stationapi.veriff.com",
        apiKey: CONFIGS.VERIFF_API_KEY,
        parentId: "veriff-root",
        onSession: function (err: any, response: any) {
          if (err) {
            toast.error("Error initializing session");
            return;
          }

          const redirectUrl = response.verification.url;
          window.location.href = redirectUrl;

          createVeriffFrame({
            url: redirectUrl,
            onEvent: function (msg) {
              switch (msg) {
                case MESSAGES.CANCELED:
                  toast.error("Verification canceled");
                  break;
                case MESSAGES.FINISHED:
                  toast.success("Verification finished");
                  break;
                case MESSAGES.STARTED:
                  toast.success("Verification started");
                  break;
                default:
                  toast.error("Unknown message received");
              }
            },
          });
        },
      });

      veriff.mount({
        formLabel: {
          firstName: "First Name",
          lastName: "Last Name",
          vendorData: "Wallet",
        },
        submitBtnText: "Get verified",
        loadingText: "Please wait...",
      });

      veriff.setParams({
        person: {
          firstName: "",
          lastName: "",
        },
        vendorData: wallet,
      });
      veriff.mount({
        submitBtnText: "Get verified",
      });
    }
  }, [CONFIGS.VERIFF_API_KEY]);

  return <div id="veriff-root" style={{ width: "400px" }}></div>;
};
