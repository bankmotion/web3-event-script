const constant = {
  BlockName: {
    Initial: "initial",
    TyrhBlock: "tyrh",
  },
  LiquidEventType: {
    Tyrh: 0,
    Burn: 1,
    Water: 2,
    Plant: 3,
    Seed: 4,
    Holy: 5,
  },
  SproutHouseObjectId: {
    Id: 0,
    Owner: 1,
    Amount: 2,
    Yield: 3,
    Timestamp: 4,
    NftId: 5,
    Finished: 6,
  },
  SeedBankUserInfoObjectId: {
    Amount: 0,
    SeedAmount: 1,
    LifeCycle: 2,
    StartTimestamp: 3,
    LastClaimTimestamp: 4,
    NftIds: 5,
    IsStaking: 6,
  },
  PlantationTreeObjectId: {
    Id: 0,
    TypeId: 1,
    Owner: 2,
    Weight: 3,
    StepStartTimestamp: 4,
    StepEndTimestamp: 5,
    CurrentStep: 6,
    GrowthTime: 7,
    WaterAmount: 8,
    PlantAmount: 9,
    GrownUp: 10,
  },
  PlantationNftId: {
    Cattails: 0,
    Bush: 1,
    Tree: 2,
    Pine: 3,
    Plam: 4,
    Sherman: 5,
  }
};

export default constant;
