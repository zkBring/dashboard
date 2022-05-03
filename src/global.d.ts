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
    
  }
  export = LinkdropSDK
}
