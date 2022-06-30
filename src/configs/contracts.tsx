type TContracts = {
  [networkId: string | number]: {
    factory: string;
  }
}

const contracts: TContracts = {
  4: {
    factory: '0x33C5640DD2C448bB7c3Dcca8ade3268fED092403'
  }, // rinkeby
  1: {
    factory: '0x33C5640DD2C448bB7c3Dcca8ade3268fED092403'
  }, // mainnet
  137: {
    factory: '0x33C5640DD2C448bB7c3Dcca8ade3268fED092403'
  }, // polygon
  1313161554: {
    factory: '0xe1C9135600e399eE87B4392Fc56ecC9F85C33713'
  }, // aurora
  80001: {
    factory: '0x33C5640DD2C448bB7c3Dcca8ade3268fED092403'
  }, // mumbai
  100: {
    factory: '0x33C5640DD2C448bB7c3Dcca8ade3268fED092403'
  } // xdai
}

export default contracts