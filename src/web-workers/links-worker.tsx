import LinkdropSDK from 'linkdrop-sdk'
import { expose } from 'comlink'
import { TLink, TAssetsData, TTokenType, TSingleLinkData } from 'types'
import { EXPIRATION_DATE } from 'configs/app'

type TParseLinkParams = (link: string, tokenType: TTokenType) => TSingleLinkData

export class LinksWorker {
  private newLinks: Array<TLink> = [];
  private sdk?: LinkdropSDK | null
  private cb: (value: number) => void;
  private currentPercentageFinished: number = 0;
  public constructor(
    cb: (value: number) => void
  ) {
    this.cb = cb
  }

  private createSDK (
    claimHost: string
  ) {
    const sdk = new LinkdropSDK({
      claimHostUrl: claimHost
    })
    this.sdk = sdk
  }

  private async createERC20Link (
    weiAmount: string,
    tokenAddress: string,
    tokenAmount: string,
    expirationTime: string,
    chainId: string | number,
    signingKeyOrWallet: string,
    encryptionKey: string,
    proxyContractAddress: string,
    proxyContractVersion: string
  ) {
    return await this.sdk?.utils.createLink(
      {
        amount: tokenAmount,
        links: '1',
        weiAmount,
        id: 'not defined'
      },
      signingKeyOrWallet,
      encryptionKey,
      'ERC20',
      tokenAddress,
      proxyContractAddress,
      Number(chainId),
      proxyContractVersion,
      expirationTime
    )
  }

  private async createERC721Link (
    weiAmount: string,
    tokenAddress: string,
    tokenId: string,
    expirationTime: string,
    chainId: string | number,
    signingKeyOrWallet: string,
    encryptionKey: string,
    proxyContractAddress: string,
    proxyContractVersion: string
  ) {
    return await this.sdk?.utils.createLink(
      {
        amount: 'not defined',
        links: '1',
        weiAmount,
        id: tokenId
      },
      signingKeyOrWallet,
      encryptionKey,
      'ERC721',
      tokenAddress,
      proxyContractAddress,
      Number(chainId),
      proxyContractVersion,
      expirationTime
    )
  }

  private async createERC1155Link (
    weiAmount: string,
    tokenAddress: string,
    tokenId: string,
    tokenAmount: string,
    expirationTime: string,
    chainId: string | number,
    signingKeyOrWallet: string,
    encryptionKey: string,
    proxyContractAddress: string,
    proxyContractVersion: string
  ) {
    return await this.sdk?.utils.createLink(
      {
        amount: tokenAmount,
        links: '1',
        weiAmount,
        id: tokenId
      },
      signingKeyOrWallet,
      encryptionKey,
      'ERC1155',
      tokenAddress,
      proxyContractAddress,
      Number(chainId),
      proxyContractVersion,
      expirationTime
    )
  }

  public async generateLink(
    type: TTokenType,
    linkdropMasterAddress: string,
    chainId: string | number,
    assets: TAssetsData,
    tokenAddress: string,
    signerKey: string,
    nativeTokensPerLink: string,
    dashboardKey: string,
    proxyContractAddress: string,
    proxyContractVersion: string
  ) : Promise<any> {
    try {
      this.createSDK(
        linkdropMasterAddress
      )
      for (let i = 0; i < assets.length; i++) {
        let result
        if (type === 'ERC20') {
          result = await this.createERC20Link(
            nativeTokensPerLink,
            tokenAddress,
            assets[i].amount || '0',
            EXPIRATION_DATE,
            chainId,
            signerKey,
            dashboardKey,
            proxyContractAddress,
            proxyContractVersion
          )
        } else if (type === 'ERC721') {
          result = await this.createERC721Link(
            nativeTokensPerLink,
            tokenAddress,
            String(assets[i].id || '0'),
            EXPIRATION_DATE,
            chainId,
            signerKey,
            dashboardKey,
            proxyContractAddress,
            proxyContractVersion
          )
        } else {
          result = await this.createERC1155Link(
            nativeTokensPerLink,
            tokenAddress,
            String(assets[i].id || '0'),
            assets[i].amount || '0',
            EXPIRATION_DATE,
            chainId,
            signerKey,
            dashboardKey,
            proxyContractAddress,
            proxyContractVersion
          )
        }
        console.log({ result })
        if (result) {
          const linkData = {
            encrypted_claim_code: result.encrypted_claim_code,
            token_id: String(assets[i].id || '0'),
            token_amount: assets[i].amount || '0',
            link_id: result.link_id,
            sender_signature: result.sender_signature,
            expiration_time: EXPIRATION_DATE,
            wei_amount: nativeTokensPerLink
          }
          
          this.newLinks = [...this.newLinks, linkData]
          const percentageFinished = Math.round(this.newLinks.length / assets.length * 100) / 100
          if (this.currentPercentageFinished < percentageFinished) {
            this.currentPercentageFinished = percentageFinished
            this.cb(this.currentPercentageFinished)
          }
        }
      }
      console.log('this.newLinks', this.newLinks)
      return this.newLinks
    } catch (e) {
      console.log({ e })
      return new Error('Some error occured')
    }
  }
}

expose(LinksWorker)