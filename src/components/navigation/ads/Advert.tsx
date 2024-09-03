import React from "react";
import {
  AdvertWrapper,
  AdvertLeftLabel,
  AdvertContent,
  AdvertContentItem,
} from "./Advert.styled";

interface AdvertProps {}
export const Advert: React.FC<AdvertProps> = () => {
  return (
    <AdvertWrapper>
      <AdvertLeftLabel>BREAKING: </AdvertLeftLabel>
      <AdvertContent>
        <AdvertContentItem>PAiT Launches at end of presale!</AdvertContentItem>
        <AdvertContentItem>
          Experts say PAiT will tripple your investment!
        </AdvertContentItem>
      </AdvertContent>
    </AdvertWrapper>
  );
};
