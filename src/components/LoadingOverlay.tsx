import { useLoading } from "@/context/loading-context";
import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const LoadingMessage = styled.div`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  background-color: #080b15;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${rotate} 1s linear infinite;
`;

const LoadingOverlay = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <Overlay>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <Spinner />
        <LoadingMessage>Please wait as we process ...</LoadingMessage>
      </div>
    </Overlay>
  );
};

export default LoadingOverlay;
