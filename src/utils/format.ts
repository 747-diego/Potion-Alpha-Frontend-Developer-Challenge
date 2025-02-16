
export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatUSD = (num: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

export const formatWalletAddress = (address: string, isMobile = false) => {
  if (address.includes('...')) return address;
  return isMobile ? `...${address.slice(-3)}` : `${address.slice(0, 6)}...${address.slice(-6)}`;
};
