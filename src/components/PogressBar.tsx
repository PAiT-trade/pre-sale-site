import React from "react";
import styled from "styled-components";

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <ProgressBarContainer>
      <Progress progress={progress} />
    </ProgressBarContainer>
  );
};

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: #27334e;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
`;

const Progress = styled.div<{ progress: number }>`
  background-color: #4daa90;
  height: 100%;
  width: ${({ progress }) => progress}%;
  transition: width 0.3s ease-in-out;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: ${({ progress }) =>
    progress === 100 ? "10px" : "10px 0 0 10px"};
`;
