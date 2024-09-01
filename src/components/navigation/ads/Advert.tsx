import React from "react";
import { AdvertWrapper, AdvertLeftLabel, AdvertContent } from "./Advert.styled";

interface AdvertProps {}
export const Advert: React.FC<AdvertProps> = () => {
  return (
    <AdvertWrapper>
      <AdvertLeftLabel>BREAKING: </AdvertLeftLabel>
      <AdvertContent>List</AdvertContent>
    </AdvertWrapper>
  );
};
