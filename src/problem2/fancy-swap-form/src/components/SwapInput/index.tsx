import React from "react";
import { Input } from "antd";
import TokenSelector from "../TokenSelector";

interface SwapInputProps {
  label: string;
  imageUrl: string;
  tokenName: string;
  onSelectCurrency?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const SwapInput: React.FC<SwapInputProps> = ({
  label,
  imageUrl,
  tokenName,
  onSelectCurrency,
  onChange,
  value,
}) => {
  return (
    <div>
      <div className="label">{label}</div>
      <div className="smart-swap-form-input">
        <TokenSelector
          onSelectCurrency={onSelectCurrency}
          imageUrl={imageUrl}
          tokenName={tokenName}
        />
        <div className="input-container">
          <Input
            inputMode="decimal"
            value={value}
            onChange={onChange}
            size="large"
            pattern="^[0-9]*[.,]?[0-9]*$"
          />
          {/* <div className="balance-text">12412412412</div> */}
        </div>
      </div>
    </div>
  );
};

export default SwapInput;
