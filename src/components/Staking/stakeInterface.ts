export interface StakeInfo {
  totalAmount: number;
  stakeCount: number;
}

export interface BonfireUserInfo {
  amount: number;
  timestamp: number;
}

export interface SproutHouseStaking {
  id: number;
  owner: string;
  amount: number;
  yield: number;
  timestamp: number;
  nftId: number;
  finished: boolean;
}
