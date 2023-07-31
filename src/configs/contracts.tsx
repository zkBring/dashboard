type TContracts = {
  [networkId: string | number]: {
    factory: string
    minter_role: string
    fee_manager: string
  }
}

const contracts: TContracts = {
  1: {
    factory: '0x50dADaF6739754fafE0874B906F60688dB483855',
    minter_role: '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6',
    fee_manager: '0xec0d80f76846e2dd0c2877f7f23d6450fe84d34e'
  }, // mainnet
  137: {
    factory: '0x50dADaF6739754fafE0874B906F60688dB483855',
    minter_role: '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6',
    fee_manager: '0xec0d80f76846e2dd0c2877f7f23d6450fe84d34e'
  }, // polygon
  5: {
    factory: '0x50dADaF6739754fafE0874B906F60688dB483855',
    minter_role: '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6',
    fee_manager: '0xec0d80f76846e2dd0c2877f7f23d6450fe84d34e'
  },
  80001: {
    factory: '0x50dADaF6739754fafE0874B906F60688dB483855',
    minter_role: '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6',
    fee_manager: '0xec0d80f76846e2dd0c2877f7f23d6450fe84d34e'
  }, // mumbai
  8453: {
    factory: '0xa81880C06e925Ad1412773D621425796467A9C61',
    minter_role: '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6',
    fee_manager: '0xec0d80f76846e2dd0c2877f7f23d6450fe84d34e'
  },
  84531: {
    factory: '0xa81880C06e925Ad1412773D621425796467A9C61',
    minter_role: '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6',
    fee_manager: '0xec0d80f76846e2dd0c2877f7f23d6450fe84d34e'
  }
}

export default contracts