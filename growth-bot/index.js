import {
  SDK_VERSION,
  CeloNFTClient,
  Rarity,
  MINT_PRICES,
  RARITY_LABELS,
  celoMainnet,
  celoAlfajores,
  isMiniPayBrowser,
  truncateAddress,
  formatCELO,
} from '@phessophissy/cnmarket-sdk';

console.log('cnMarket SDK Growth Bot running...');
console.log('SDK Version:', SDK_VERSION);

// Smoke-check: verify exports are present
if (typeof CeloNFTClient !== 'function') {
  console.error('Smoke check failed: CeloNFTClient is not available.');
  process.exit(1);
}

if (typeof Rarity !== 'object') {
  console.error('Smoke check failed: Rarity enum is not available.');
  process.exit(1);
}

// Verify chain configs
if (!celoMainnet || celoMainnet.id !== 42220) {
  console.error('Smoke check failed: celoMainnet config is incorrect.');
  process.exit(1);
}

if (!celoAlfajores || celoAlfajores.id !== 44787) {
  console.error('Smoke check failed: celoAlfajores config is incorrect.');
  process.exit(1);
}

// Verify MINT_PRICES
const expectedCommon = BigInt('10000000000000000');
if (MINT_PRICES[Rarity.Common] !== expectedCommon) {
  console.error('Smoke check failed: MINT_PRICES.Common is incorrect.');
  process.exit(1);
}

// Verify utility functions
const truncated = truncateAddress('0x1234567890abcdef1234567890abcdef12345678');
if (!truncated.includes('...')) {
  console.error('Smoke check failed: truncateAddress is not working.');
  process.exit(1);
}

const formatted = formatCELO(BigInt('10000000000000000'));
if (!formatted.includes('CELO')) {
  console.error('Smoke check failed: formatCELO is not working.');
  process.exit(1);
}

// Verify isMiniPayBrowser (should return false in CI)
const miniPay = isMiniPayBrowser();
if (typeof miniPay !== 'boolean') {
  console.error('Smoke check failed: isMiniPayBrowser is not working.');
  process.exit(1);
}

console.log('✅ Smoke check passed: @phessophissy/cnmarket-sdk is working correctly.');
console.log('  - CeloNFTClient: available');
console.log('  - Rarity enum:', RARITY_LABELS);
console.log('  - Celo mainnet chainId:', celoMainnet.id);
console.log('  - Common mint price:', formatCELO(MINT_PRICES[Rarity.Common]));
console.log('  - MiniPay detected:', miniPay);
console.log('  - Address truncation:', truncated);
