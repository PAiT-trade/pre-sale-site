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
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Calculate index of first and last user in the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  // Slice the users to display only the current page
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Change page
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

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
          <Container>
            <PageTitle>PAiT Users </PageTitle>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>#</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Wallet</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Referral Earnings</TableHeader>
                </TableRow>
              </TableHead>
              <tbody>
                {currentUsers
                  .filter((item) => item.name)
                  .map((user, index) => (
                    <TableRow key={index}>
                      <TableData>{index + 1}</TableData>
                      <TableData>{user.name}</TableData>
                      <TableData>{user.wallet}</TableData>
                      <TableData>{user.email ? user.email : "N/A"}</TableData>
                      <TableData style={{ textAlign: "center" }}>
                        {user.referral_earnings ? user.referral_earnings : 0}
                      </TableData>
                    </TableRow>
                  ))}
              </tbody>
            </Table>

            <Pagination>
              <PageButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </PageButton>
              {[...Array(totalPages).keys()].map((number) => (
                <PageButton
                  key={number}
                  onClick={() => handlePageChange(number + 1)}
                  disabled={currentPage === number + 1}
                >
                  {number + 1}
                </PageButton>
              ))}
              <PageButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </PageButton>
            </Pagination>
          </Container>
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

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// Styled components
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: none;
  border: 1px solid #80dcd7;
  background-color: #343e56;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    background-color: #1c2130;
  }
`;
