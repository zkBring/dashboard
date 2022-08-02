type TContracts = {
  [networkId: string | number]: {
    factory: string;
    minter_role: string;
  }
}

const contracts: TContracts = {
  4: {
    factory: '0x9A9E408171Bd8A497bbe89D149A8eb37B231bE7a',
    minter_role: '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
  }, // rinkeby
  1: {
    factory: '0x9A9E408171Bd8A497bbe89D149A8eb37B231bE7a',
    minter_role: '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
  }, // mainnet
  137: {
    factory: '0x9A9E408171Bd8A497bbe89D149A8eb37B231bE7a',
    minter_role: '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
  }, // polygon
  1313161554: {
    factory: '0x9A9E408171Bd8A497bbe89D149A8eb37B231bE7a',
    minter_role: '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
  }, // aurora
  80001: {
    factory: '0x9A9E408171Bd8A497bbe89D149A8eb37B231bE7a',
    minter_role: '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
  }, // mumbai
  100: {
    factory: '0x9A9E408171Bd8A497bbe89D149A8eb37B231bE7a',
    minter_role: '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
  } // xdai
}

export default contracts