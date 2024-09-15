import { CONFIGS } from "@/config";
import { createVeriffFrame, MESSAGES } from "@veriff/incontext-sdk";
import Veriff from "@veriff/js-sdk";

import React, { useEffect } from "react";
import toast from "react-hot-toast";

export const VerifyKYC = () => {
  // veriff
  useEffect(() => {
    console.log("VERIFF_API_KEY", CONFIGS.VERIFF_API_KEY);
    if (!CONFIGS.VERIFF_API_KEY) {
      toast.error("Please set the VERIFF_API_KEY in the . env file");
      return;
    }
    const veriff = Veriff({
      apiKey: CONFIGS.VERIFF_API_KEY,
      parentId: "veriff-root",
      onSession: function (err, response) {
        // redirect
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
            }
          },
        });
      },
    });

    veriff.mount();
  }, [CONFIGS.VERIFF_API_KEY]);

  return <div id="veriff-root" style={{ width: "400px" }}></div>;
};
