/** NFT rarity levels */
export enum Rarity {
  Common = 0,
  Rare = 1,
  Legendary = 2,
}

/** Mint prices in wei (CELO) */
export const MINT_PRICES: Record<Rarity, bigint> = {
  [Rarity.Common]: BigInt("10000000000000000"),    // 0.01 CELO
  [Rarity.Rare]: BigInt("30000000000000000"),       // 0.03 CELO
  [Rarity.Legendary]: BigInt("50000000000000000"),  // 0.05 CELO
};

export const RARITY_LABELS: Record<Rarity, string> = {
  [Rarity.Common]: "Common",
  [Rarity.Rare]: "Rare",
  [Rarity.Legendary]: "Legendary",
};

export interface RarityColorSet {
  bg: string;
  text: string;
  border: string;
  gradient: string;
}

/** Tailwind CSS classes for each rarity tier */
export const RARITY_COLORS: Record<Rarity, RarityColorSet> = {
  [Rarity.Common]: {
    bg: "bg-gray-500",
    text: "text-gray-100",
    border: "border-gray-500",
    gradient: "from-slate-400 to-gray-600",
  },
  [Rarity.Rare]: {
    bg: "bg-blue-500",
    text: "text-blue-100",
    border: "border-blue-500",
    gradient: "from-blue-400 to-purple-600",
  },
  [Rarity.Legendary]: {
    bg: "bg-yellow-500",
    text: "text-yellow-100",
    border: "border-yellow-500",
    gradient: "from-yellow-400 to-orange-600",
  },
};

export type Address = `0x${string}`;

export interface CeloNFTSDKConfig {
  /** Deployed CeloNFT contract address */
  nftAddress: Address;
  /** Deployed NFTMarketplace contract address */
  marketplaceAddress: Address;
  /** Optional: custom RPC URL (defaults to https://forno.celo.org) */
  rpcUrl?: string;
}

export interface NFTListing {
  tokenId: bigint;
  seller: Address;
  price: bigint;
}

export interface MintResult {
  hash: Address;
  tokenId?: bigint;
  rarity: Rarity;
}

export interface NFTToken {
  tokenId: bigint;
  owner: Address;
  rarity: Rarity;
  tokenURI: string;
}

/** Returns true if the string is a valid checksummed or lowercase Ethereum address */
export function isValidAddress(address: string): address is Address {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}

/**
 * Parse a raw uint8 rarity value from the contract into the Rarity enum.
 * Throws if the value is out of range.
 */
export function parseRarity(raw: number | bigint): Rarity {
  const n = Number(raw);
  if (n === Rarity.Common) return Rarity.Common;
  if (n === Rarity.Rare) return Rarity.Rare;
  if (n === Rarity.Legendary) return Rarity.Legendary;
  throw new RangeError(`Unknown rarity value: ${n}`);
}
