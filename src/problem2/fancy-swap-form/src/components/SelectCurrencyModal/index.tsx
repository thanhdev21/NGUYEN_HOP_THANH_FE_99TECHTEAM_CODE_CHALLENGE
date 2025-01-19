import { Input, Modal, ModalProps } from "antd";
import { Currency, ShowTokenSelector, Token } from "../../types";
import { TOKEN_IMAGE_BASE_URL } from "../../constants";

interface SelectCurrencyModalProps extends ModalProps {
  filteredCurrencies: Currency[];
  onSearch: (value: string) => void;
  onSelectCurrency: (currency: Currency) => void;
  onCloseTokenSelector: () => void;
  showTokenSelector: ShowTokenSelector;
  fromToken: Token;
  toToken: Token;
}

const SelectCurrencyModal: React.FC<SelectCurrencyModalProps> = ({
  filteredCurrencies,
  onSearch,
  onSelectCurrency,
  onCloseTokenSelector,
  showTokenSelector,
  fromToken,
  toToken,
}) => {
  return (
    <Modal
      onClose={onCloseTokenSelector}
      onCancel={onCloseTokenSelector}
      title={
        <div className="modal-title">
          <img
            className="token-image"
            alt=""
            src={
              showTokenSelector.tokenType === "from"
                ? fromToken.imageUrl
                : toToken.imageUrl
            }
          />
          <div>
            {showTokenSelector.tokenType === "from"
              ? fromToken.tokenName
              : toToken.tokenName}
          </div>
        </div>
      }
      footer={null}
      open={showTokenSelector.open}
      style={{ top: 40 }}
    >
      <Input
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search currency...."
        style={{ textAlign: "left", marginTop: 24 }}
        size="large"
      />
      <div className="currency-list">
        {filteredCurrencies.map((currency) => (
          <div
            onClick={() => {
              onSelectCurrency(currency);
            }}
            className="currency-item"
            key={currency.currency}
          >
            <img
              className="token-image"
              alt=""
              src={`${TOKEN_IMAGE_BASE_URL}/${currency.currency}.svg`}
              onError={(e) => {
                (
                  e.target as HTMLImageElement
                ).src = `${TOKEN_IMAGE_BASE_URL}/BLUR.svg`;
              }}
            />
            <div>{currency.currency}</div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default SelectCurrencyModal;
