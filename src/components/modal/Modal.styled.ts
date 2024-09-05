import styled from "styled-components";

export const ModalOverlary = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.25);
  color: #fff;
  max-width: 40rem;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;
export const ModalCloseIcon = styled.div`
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  color: #fff;
`;

export const ModalBody = styled.div`
  margin-top: 1rem;
  border-top: 0.01rem solid #ccc;
`;
