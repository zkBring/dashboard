declare module '@linkdrop/sdk' {
  interface ISDK {
    linkdropMasterAddress: string,
    factoryAddress: string,
    chain?: string, // = 'mainnet'
    jsonRpcUrl?: string, //  = getJsonRpcUrl(chain)
    apiHost?: string, //  = `https://${chain}.linkdrop.io
    claimHost?: string // 'https://claim.linkdrop.io'
  }

  class LinkdropSDK implements ISDK {
    constructor(params: ISDK)
    getProxyAddress: (campaignId: string) => string
    generateLink: ({
      signingKeyOrWallet,
      weiAmount,
      tokenAddress,
      tokenAmount,
      expirationTime = 12345678910,
      campaignId,
      wallet
    }: {
      signingKeyOrWallet: string,
      weiAmount: string,
      tokenAddress: string,
      wallet: string,
      tokenAmount: string,
      expirationTime: string,
      campaignId: string
    }) => {
      url: string,
      linkId: string,
      linkKey: string,
      linkdropSignerSignature: string
    }
  }
  export = LinkdropSDK
}
