"use client";
import { useEffect, useState } from "react";
import { PagesWrapper, PageTitle } from "@/components/common/Common.styled";
import { WalletButton } from "../solana/solana-provider";
import styled from "styled-components";
import { useAnalyzedWallet } from "@/context/connect-wallet-context";
import toast from "react-hot-toast";
import { User } from "@prisma/client";

export default function KYC() {
  const { connected, publicKey, isValidWallet, disconnect } =
    useAnalyzedWallet();

  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    if (connected && publicKey) {
      if (isValidWallet) {
        console.log("Connected to wallet", publicKey);
        getData()
          .then(() => {})
          .catch(() => {});
      } else {
        toast.error(
          "This wallet is not valid. It might be a compromised wallet, please use another one"
        );
        disconnect();
      }
    }
  }, [connected, publicKey, isValidWallet]);

  const getData = async () => {
    try {
      const response = await fetch(`/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log("Users data:", data?.users);

      setUsers(data?.users);
    } catch (error) {
      console.log("Error:", error);
      throw new Error("Error fetching data");
    }
  };
  return (
    <PagesWrapper>
      {connected ? (
        <div style={{ padding: "1rem" }}>
          <PageTitle>PAiT Users </PageTitle>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Wallet</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Referral Earnings</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {users
                .filter((item) => item.name)
                .map((user, index) => (
                  <TableRow key={index}>
                    <TableData>{user.id}</TableData>
                    <TableData>{user.name}</TableData>
                    <TableData>{user.wallet}</TableData>
                    <TableData>{user.email}</TableData>
                    <TableData style={{ textAlign: "center" }}>
                      {user.referral_earnings ? user.referral_earnings : 0}
                    </TableData>
                  </TableRow>
                ))}
            </tbody>
          </Table>
        </div>
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
    </PagesWrapper>
  );
}

// Styled components
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
`;

const TableHead = styled.thead`
  padding: 12px 15px;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr``;

const TableHeader = styled.th`
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
  font-weight: bold;
`;

const TableData = styled.td`
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;
