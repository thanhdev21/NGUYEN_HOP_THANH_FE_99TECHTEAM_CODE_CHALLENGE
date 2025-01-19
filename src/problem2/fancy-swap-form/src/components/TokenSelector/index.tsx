import React from "react";
import DownOutlined from "../Icons/DownOutlined";

interface TokenSelectorProps {
  imageUrl: string;
  tokenName: string;
  onSelectCurrency?: () => void;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  imageUrl,
  tokenName,
  onSelectCurrency,
}) => {
  return (
    <div onClick={onSelectCurrency} className="select-token-container">
      <img className="token-image" alt="" src={imageUrl} />
      <div className="token-name">{tokenName}</div>
      <DownOutlined />
    </div>
  );
};

export default TokenSelector;
