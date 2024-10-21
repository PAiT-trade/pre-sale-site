"use client";
import { PagesWrapper } from "@/components/common/Common.styled";
import { useEffect } from "react";
import { sendEmail } from "@/lib/mail";

const Analyze: React.FC = () => {
  useEffect(() => {
    getData()
      .then(() => {})
      .catch(() => {});
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(`/api/sending-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: "", message: "", subject: "" }),
      });

      const data = await response.json();

      console.log("Mail data:", data);
    } catch (error) {}
  };
  return <PagesWrapper>APP</PagesWrapper>;
};

export default Analyze;
