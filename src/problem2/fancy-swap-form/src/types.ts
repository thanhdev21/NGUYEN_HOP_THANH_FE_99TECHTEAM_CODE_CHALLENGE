export interface Currency {
  currency: string;
  date: string;
  price: number;
}

export interface Token extends Currency {
  imageUrl: string;
  tokenName: string;
  mutable?: boolean;
}

export interface ShowTokenSelector {
  open: boolean;
  tokenType: "from" | "to";
}
