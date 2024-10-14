"use client";
import { useEffect } from "react";
import { PagesWrapper } from "@/components/common/Common.styled";

export default function KYC() {
  useEffect(() => {
    sendMail();
  }, []);
  const sendMail = async () => {
    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: "omambias", subject: "data" }),
      });
      const result = await response.json();
      if (result.status === "success") {
      } else {
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return <PagesWrapper>CONTENT</PagesWrapper>;
}
