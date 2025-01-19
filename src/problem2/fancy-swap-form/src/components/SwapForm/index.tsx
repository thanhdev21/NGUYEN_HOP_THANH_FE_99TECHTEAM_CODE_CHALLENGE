import { Button } from "antd";
import SwapInput from "../SwapInput";
import { Token } from "../../types";

interface SmartSwapFormProps {
  fromToken: Token;
  toToken: Token;
  fromValue: string;
  toValue: string;
  onSelectFromCurrency: () => void;
  onSelectToCurrency: () => void;
  onFromValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSwap: () => void;
  handleSwap: () => void;
}

const SmartSwapForm: React.FC<SmartSwapFormProps> = ({
  fromToken,
  toToken,
  fromValue,
  toValue,
  onSelectFromCurrency,
  onSelectToCurrency,
  onFromValueChange,
  onToValueChange,
  onSwap,
  handleSwap,
}) => {
  return (
    <>
      <SwapInput
        label="From"
        imageUrl={fromToken.imageUrl}
        tokenName={fromToken.tokenName}
        onSelectCurrency={onSelectFromCurrency}
        onChange={onFromValueChange}
        value={fromValue}
      />
      <div className="divider">
        <img
          onClick={handleSwap}
          className="swap-icon"
          alt=""
          src="/swap.png"
        />
      </div>
      <SwapInput
        label="To"
        imageUrl={toToken.imageUrl}
        tokenName={toToken.tokenName}
        onSelectCurrency={onSelectToCurrency}
        onChange={onToValueChange}
        value={toValue}
      />
      <Button
        onClick={onSwap}
        className="confirm-swap-btn"
        type="primary"
        size="large"
      >
        Swap
      </Button>
    </>
  );
};

export default SmartSwapForm;
