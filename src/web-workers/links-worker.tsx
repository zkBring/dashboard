import LinkdropSDK from '@linkdrop/sdk'
import { expose } from 'comlink'
import { TLink, TAssetsData, TTokenType, TSingleLinkData } from 'types'
import { EXPIRATION_DATE } from 'configs/app'
import { encrypt } from 'lib/crypto'

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

  private parseLinkParams: TParseLinkParams =  (link, tokenType) => {
    const result: TSingleLinkData = {}
    const linkParams = link.split('?')[1]
    const linkParamsSplit = linkParams.split('&')
    const tokenAmount = linkParamsSplit.find(item => item.includes('tokenAmount'))
    const tokenId = linkParamsSplit.find(item => item.includes('tokenId'))
    const linkKey = linkParamsSplit.find(item => item.includes('linkKey'))
    const senderSignature = linkParamsSplit.find(item => item.includes('linkdropSignerSignature'))
  
    if (tokenType === 'ERC20') {
      result['token_id'] = null
      if (tokenAmount) {
        result['token_amount'] = tokenAmount.split('=')[1]
      }
    } else if (tokenType === 'ERC721') {
      result['token_amount'] = null
      if (tokenId) {
        result['token_id'] = tokenId.split('=')[1]
      }
    } else {
      if (tokenAmount) {
        result['token_amount'] = tokenAmount.split('=')[1]
      }
      if (tokenId) {
        result['token_id'] = tokenId.split('=')[1]
      }
    }
    if (linkKey) {
      result['link_key'] = linkKey.split('=')[1]
    }
    if (senderSignature) {
      result['sender_signature'] = senderSignature.split('=')[1]
    }
    return result
  }

  private createSDK (
    linkdropMasterAddress: string,
    factoryAddress: string,
    chain: string,
    jsonRpcUrl: string,
    apiHost: string,
    claimHost: string
  ) {
    this.sdk = new LinkdropSDK({
      claimHost,
      factoryAddress,
      chain,
      linkdropMasterAddress,
      jsonRpcUrl,
      apiHost
    })
  }

  private async createERC20Link (
    weiAmount: string,
    tokenAddress: string,
    wallet: string,
    tokenAmount: string,
    expirationTime: string,
    campaignId: string,
    signingKeyOrWallet: string
  ) {
    return await this.sdk?.generateLink({
      weiAmount,
      tokenAddress,
      wallet,
      tokenAmount,
      expirationTime,
      campaignId,
      signingKeyOrWallet
    })
  }

  private async createERC721Link (
    weiAmount: string,
    tokenAddress: string,
    wallet: string,
    tokenId: string,
    expirationTime: string,
    campaignId: string,
    signingKeyOrWallet: string
  ) {
    return await this.sdk?.generateLinkERC721({
      nftAddress: tokenAddress,
      wallet,
      expirationTime,
      campaignId,
      signingKeyOrWallet,
      tokenId,
      weiAmount
    })
  }

  private async createERC1155Link (
    weiAmount: string,
    tokenAddress: string,
    wallet: string,
    tokenId: string,
    tokenAmount: string,
    expirationTime: string,
    campaignId: string,
    signingKeyOrWallet: string
  ) {
    return await this.sdk?.generateLinkERC1155({
      nftAddress: tokenAddress,
      wallet,
      expirationTime,
      campaignId,
      signingKeyOrWallet,
      tokenId,
      tokenAmount,
      weiAmount
    })
  }

  public async generateLink(
    type: TTokenType,
    linkdropMasterAddress: string,
    factoryAddress: string,
    chain: string,
    jsonRpcUrl: string,
    apiHost: string,
    claimHost: string,
    assets: TAssetsData,
    sponsored: boolean,
    tokenAddress: string,
    wallet: string,
    id: string,
    signerKey: string,
    nativeTokensPerLink: string,
    dashboardKey: string
  ) : Promise<any> {
    try {
      this.createSDK(
        linkdropMasterAddress,
        factoryAddress,
        chain,
        jsonRpcUrl,
        apiHost,
        claimHost
      )
      for (let i = 0; i < assets.length; i++) {
        let result
        if (type === 'ERC20') {
          result = await this.createERC20Link(
            nativeTokensPerLink,
            tokenAddress,
            wallet,
            assets[i].amount || '0',
            EXPIRATION_DATE,
            id,
            signerKey
          )
        } else if (type === 'ERC721') {
          result = await this.createERC721Link(
            nativeTokensPerLink,
            tokenAddress,
            wallet,
            String(assets[i].id || '0'),
            EXPIRATION_DATE,
            id,
            signerKey
          )
        } else {
          result = await this.createERC1155Link(
            nativeTokensPerLink,
            tokenAddress,
            wallet,
            String(assets[i].id || '0'),
            assets[i].amount || '0',
            EXPIRATION_DATE,
            id,
            signerKey
          )
        }
        if (result) {
          const newLink = !sponsored ? `${result?.url}&manual=true` : result?.url
          const linkParsed = this.parseLinkParams(newLink, type)
          // - token_id - token id for the link (always 0 for ERC20 campaigns)
          // - token_amount - amount of tokens for the link (always 0 for ERC721 campaigns) 
          // - sender_signature - signature obtained by signing link id with the signer key  

          const linkData = {
            encrypted_link_key: encrypt(linkParsed.link_key as string, dashboardKey),
            token_id: linkParsed.token_id,
            token_amount: linkParsed.token_amount,
            link_id: result?.linkId,
            sender_signature: linkParsed.sender_signature,
            expiration_time: EXPIRATION_DATE,
            wei_amount: nativeTokensPerLink
          }
          const newLinkEncrypted = encrypt(newLink, dashboardKey)
          
          this.newLinks = [...this.newLinks, linkData]
          console.log(this.newLinks)
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