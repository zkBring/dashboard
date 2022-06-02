type TContracts = {
  [networkId: string | number]: {
    factory: string;
  }
}

const contracts: TContracts = {
  4: {
    factory: '0xadEA4080b6B3cA8CaB081ce839B3693DbBA8d480'
  }, // rinkeby
  1: {
    factory: '0xadEA4080b6B3cA8CaB081ce839B3693DbBA8d480'
  }, // mainnet
  137: {
    factory: '0xadEA4080b6B3cA8CaB081ce839B3693DbBA8d480'
  }, // polygon
  1313161554: {
    factory: '0xe1C9135600e399eE87B4392Fc56ecC9F85C33713'
  }, // aurora
  80001: {
    factory: '0xadEA4080b6B3cA8CaB081ce839B3693DbBA8d480'
  }, // mumbai
  100: {
    factory: '0xadEA4080b6B3cA8CaB081ce839B3693DbBA8d480'
  } // xdai
}

export default contracts