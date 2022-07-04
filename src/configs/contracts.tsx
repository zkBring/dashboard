type TContracts = {
  [networkId: string | number]: {
    factory: string;
  }
}

const contracts: TContracts = {
  4: {
    factory: '0xFe72EeE0b4C8807C27B420bf4197D37d0f4A0d4B'
  }, // rinkeby
  1: {
    factory: '0xFe72EeE0b4C8807C27B420bf4197D37d0f4A0d4B'
  }, // mainnet
  137: {
    factory: '0xFe72EeE0b4C8807C27B420bf4197D37d0f4A0d4B'
  }, // polygon
  1313161554: {
    factory: '0xe1C9135600e399eE87B4392Fc56ecC9F85C33713'
  }, // aurora
  80001: {
    factory: '0xFe72EeE0b4C8807C27B420bf4197D37d0f4A0d4B'
  }, // mumbai
  100: {
    factory: '0xFe72EeE0b4C8807C27B420bf4197D37d0f4A0d4B'
  } // xdai
}

export default contracts