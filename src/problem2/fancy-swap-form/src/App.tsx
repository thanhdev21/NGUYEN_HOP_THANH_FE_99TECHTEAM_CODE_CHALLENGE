import { Button, Modal, notification } from "antd";
import { useState } from "react";
import "./App.css";
import SelectCurrencyModal from "./components/SelectCurrencyModal";
import { TOKEN_IMAGE_BASE_URL } from "./constants";
import useGetCurrenciesInfo from "./hooks/useGetCurrenciesInfo";
import { Currency, ShowTokenSelector, Token } from "./types";
import SmartSwapForm from "./components/SwapForm";

function App() {
  const { filteredCurrencies, onSearch } = useGetCurrenciesInfo();
  const [fromValue, setFromValue] = useState("0");
  const [toValue, setToValue] = useState("0");
  const [isSwapping, setIsSwapping] = useState(false);
  const [fromToken, setFromToken] = useState<Token>({
    imageUrl: `${TOKEN_IMAGE_BASE_URL}/BLUR.svg`,
    tokenName: "BLUR",
    mutable: true,
    currency: "BLUR",
    date: "2021-09-01",
    price: 0.20811525423728813,
  });

  const [toToken, setToToken] = useState<Token>({
    imageUrl: `${TOKEN_IMAGE_BASE_URL}/USDT.svg`,
    tokenName: "USDT",
    mutable: false,
    currency: "USDT",
    date: "2021-09-01",
    price: 1,
  });

  const [showTokenSelector, setShowTokenSelector] = useState<ShowTokenSelector>(
    {
      open: false,
      tokenType: "from",
    }
  );

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const toggleConfirmModal = () => {
    setShowConfirmModal(!showConfirmModal);
  };

  const handleSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  const onTokenSelectorClick = (tokenType: "from" | "to") => {
    setShowTokenSelector({ open: true, tokenType });
  };

  const onCloseTokenSelector = () => {
    setShowTokenSelector({
      open: false,
      tokenType: showTokenSelector.tokenType,
    });
  };

  const onSelectFromCurrency = () => {
    if (fromToken.mutable) {
      onTokenSelectorClick("from");
    }
  };

  const onSelectToCurrency = () => {
    if (toToken.mutable) {
      onTokenSelectorClick("to");
    }
  };

  const onSelectCurrency = (currency: Currency) => {
    if (showTokenSelector.tokenType === "from") {
      setFromToken({
        imageUrl: `${TOKEN_IMAGE_BASE_URL}/${currency.currency}.svg`,
        tokenName: currency.currency,
        mutable: true,
        currency: currency.currency,
        date: "2021-09-01",
        price: currency.price,
      });
    } else {
      setToToken({
        imageUrl: `${TOKEN_IMAGE_BASE_URL}/${currency.currency}.svg`,
        tokenName: currency.currency,
        mutable: true,
        currency: currency.currency,
        date: "2021-09-01",
        price: currency.price,
      });
    }
    setShowTokenSelector({
      open: false,
      tokenType: showTokenSelector.tokenType,
    });
    setFromValue("0");
    setToValue("0");
  };

  const onFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromValue(e.target.value);
    const rate = fromToken.price / toToken.price;
    setToValue(
      parseFloat(e.target.value) * rate
        ? (parseFloat(e.target.value) * rate || 0).toFixed(4).toString()
        : "0"
    );
  };

  const onToValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToValue(e.target.value);
    const rate = fromToken.price / toToken.price;
    setFromValue(
      parseFloat(e.target.value) / rate
        ? (parseFloat(e.target.value) / rate || 0).toFixed(4).toString()
        : "0"
    );
  };

  const onSwap = () => {
    if (fromValue === "0" || toValue === "0") {
      notification.error({
        message: "Invalid Swap",
        description: "Please input valid values to swap",
        key: "swap-error",
      });
      return;
    }
    toggleConfirmModal();
  };

  const handleClear = () => {
    setFromValue("0");
    setToValue("0");
  };

  const onConfirmSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      toggleConfirmModal();
      notification.success({
        message: "Swap successfully",
        description: "Your swap has been successfully completed",
        key: "swap-success",
      });
      handleClear();
    }, 5000);
  };

  return (
    <div className="smart-swap-form-container">
      <div className="title">Smart Currency Swap Form</div>
      <SmartSwapForm
        fromToken={fromToken}
        toToken={toToken}
        fromValue={fromValue}
        toValue={toValue}
        onSelectFromCurrency={onSelectFromCurrency}
        onSelectToCurrency={onSelectToCurrency}
        onFromValueChange={onFromValueChange}
        onToValueChange={onToValueChange}
        onSwap={onSwap}
        handleSwap={handleSwap}
      />
      <SelectCurrencyModal
        filteredCurrencies={filteredCurrencies}
        onSearch={onSearch}
        onSelectCurrency={onSelectCurrency}
        onCloseTokenSelector={onCloseTokenSelector}
        showTokenSelector={showTokenSelector}
        fromToken={fromToken}
        toToken={toToken}
      />
      <Modal
        title="Confirm Swap"
        open={showConfirmModal}
        footer={null}
        onCancel={toggleConfirmModal}
        onClose={toggleConfirmModal}
      >
        <div className="confirm-swap-item">
          <div className="confirm-value">{fromValue}</div>
          <div className="token-name">
            {fromToken.tokenName}
            <img src={fromToken.imageUrl} alt="" />
          </div>
        </div>
        <div className="divider">
          <img className="confirm-swap-icon" alt="" src="/swap.png" />
        </div>
        <div className="confirm-swap-item">
          <div className="confirm-value">{toValue}</div>
          <div className="token-name">
            {toToken.tokenName}
            <img src={toToken.imageUrl} alt="" />
          </div>
        </div>

        <Button
          loading={isSwapping}
          onClick={onConfirmSwap}
          className="confirm-swap-btn"
          type="primary"
          size="large"
        >
          Confirm Swap
        </Button>
      </Modal>
    </div>
  );
}

export default App;
