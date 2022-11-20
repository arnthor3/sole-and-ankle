import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const variantToText = (val) => {
    if (val === "on-sale") return "Sale";
    return "Just Released!";
  };

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant !== "default" && (
            <Tag variant={variant}>{variantToText(variant)}</Tag>
          )}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price css={{ "--price-text-decoration": "line-through" }}>
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {typeof salePrice === "number" && (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          )}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 0 300px;
  padding-bottom: 24px;
`;

const displayToNone = (val) => {
  if (val === "default") return "none";
  return "inherit";
};

const background = (val) => {
  if (val === "on-sale") {
    return "#C5295D";
  }
  if (val === "new-release") {
    return "#6868D9";
  }
  return "inherit";
};

const Tag = styled.span`
  position: absolute;
  height: 32px;
  font-size: ${14 / 16}rem;
  color: white;
  top: 12px;
  right: -4px;
  background: ${(prop) => background(prop.variant)};
  border-radius: 2px;
  padding: 7px 10px 9px 9px;
  font-weight: 700;
  display: ${(prop) => displayToNone(prop.variant)};
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: var(--price-text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
