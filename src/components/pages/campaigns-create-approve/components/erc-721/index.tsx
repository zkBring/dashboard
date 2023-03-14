import { FC, useState } from 'react'
import {
  InputsContainer,
  InputStyled,
  ButtonStyled,
  NotesContainer,
  SelectStyled
} from '../../styled-components'
import { defineIfUserOwnsToken, shortenString } from 'helpers'
import { TProps } from './type'
import {
  Container,
  Header,
  WidgetTitleStyled
} from './styled-components'
import LinksContents from '../links-contents'
import { RootState, IAppDispatch } from 'data/store';
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TTokenType, TLinkContent, TClaimPattern, TOwnedTokens } from 'types'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import {
  WidgetComponent
} from 'components/pages/common'

const mapStateToProps = ({
  user: {
    address,
    provider,
    chainId,
    nativeTokenAmountFormatted,
    tokenAmountFormatted,
    loading: userLoading,
    nftTokens
  },
  campaign: {
    loading,
    decimals,
    symbol,
    claimPattern,
    tokenStandard,
    tokenAddress
  }
}: RootState) => ({
  loading,
  address,
  provider,
  decimals,
  chainId,
  symbol,
  tokenStandard,
  nativeTokenAmountFormatted,
  tokenAmountFormatted,
  userLoading,
  claimPattern,
  tokenAddress,
  nftTokens
})

const defineNFTTokensOptions = (nftTokens: TOwnedTokens, tokenAddress: string | null) => {
  if (!tokenAddress) { return [] }
  const token = nftTokens[tokenAddress]
  if (!token) { return [] }
  const options = token.tokens.map(singleToken => {
    return {
      label: `${singleToken.name || token.name} #${shortenString(singleToken.id)}`,
      value: singleToken
    }
  })
  return options
}

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    setTokenContractData: (
      provider: any,
      tokenAddress: string,
      type: TTokenType,
      address: string,
      chainId: number
    ) => campaignAsyncActions.setTokenContractData(
      dispatch,
      tokenAddress,
      provider,
      type,
      address,
      chainId
    )
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatcherToProps> &
  TProps

const createInputsContainer = (
  formData: TLinkContent,
  claimPattern: TClaimPattern,
  assetsData: TLinkContent[],
  setFormData: (link: TLinkContent) => void,
  setAssetsData: (newAssets: TLinkContent[]) => void,
  checkIfDisabled: () => boolean,
  getDefaultValues: () => TLinkContent
) => {
  return <InputsContainer>
    <InputStyled
      value={formData.tokenId}
      placeholder={claimPattern === 'mint' ? 'Amount' : 'Token ID'}
      disabled={claimPattern === 'mint' && Boolean(assetsData.length)}
      onChange={value => {
        const pattern = claimPattern === 'mint' ? /^[0-9]+$/ : /^[0-9-]+$/
        if (pattern.test(value) || value === '') {
          setFormData({ ...formData, tokenId: value })
        }
        return value
      }}
    />

    <ButtonStyled
      size='small'
      appearance='additional'
      disabled={checkIfDisabled()}
      onClick={() => {
        setAssetsData([ ...assetsData, {
          ...formData,
          id: assetsData.length
        }])
        setFormData(getDefaultValues())
      }}
    >
      + Add
    </ButtonStyled>
  </InputsContainer>
}

const createSelectContainer = (
  assetsData: TLinkContent[],
  setFormData: (link: TLinkContent) => void,
  setAssetsData: (newAssets: TLinkContent[]) => void,
  getDefaultValues: () => TLinkContent,
  nftTokens: TOwnedTokens,
  tokenAddress: string | null,
  userAddress: string,
  provider: any,
  checkIfDisabled: () => boolean,
) => {
  console.log({ checkIfDisabled: checkIfDisabled() })
  return <InputsContainer>
    <SelectStyled
      disabled={checkIfDisabled()}
      onChange={async ({ value }) => {
        const tokenId = typeof value === 'string' ? value : value.id
        const tokenAlreadyAdded = assetsData.find(asset => asset.tokenId === tokenId)
        if (tokenAlreadyAdded) {
          return alert(`Token #${tokenId} was already added`)
        }

        if (typeof value === 'string') {
          // if "not found" was clicked
          const userOwnership = await defineIfUserOwnsToken(
            userAddress,
            'ERC721',
            tokenAddress as string,
            provider,
            tokenId
          )

          if (!userOwnership.owns) {
            return alert(`Token #${tokenId} is not owned by current user`)
          }

          setAssetsData([
            ...assetsData, {
              tokenId: tokenId,
              tokenAmount: "1",
              linksAmount: "1",
              type: 'ERC721',
              id: assetsData.length,
              tokenName: 'Token ERC721'
            }
          ])

          
        } else {
          const tokenAlreadyAdded = assetsData.find(asset => asset.tokenId === value.id)
          if (tokenAlreadyAdded) {
            return alert(`Token #${tokenId} was already added`)
          }
          
          setAssetsData([
            ...assetsData, {
              tokenId: tokenId,
              tokenAmount: "1",
              linksAmount: "1",
              type: 'ERC721',
              id: assetsData.length,
              tokenImage: (value.media[0] || {}).gateway,
              tokenName: value.name
            }
          ])
          setFormData(getDefaultValues())
        }
      }}
      value={null}
      placeholder='Token ID'
      options={defineNFTTokensOptions(nftTokens, tokenAddress)}
      notFoundActiveCondition={(value) => {
        return value.length > 0 && (/^[0-9]+$/).test(value)
      }}
    />
  </InputsContainer>
}

const createTextInputOrSelect = (
  enabledInput: boolean,
  formData: TLinkContent,
  claimPattern: TClaimPattern,
  assetsData: TLinkContent[],
  setFormData: (link: TLinkContent) => void,
  setAssetsData: (newAssets: TLinkContent[]) => void,
  checkIfDisabled: () => boolean,
  getDefaultValues: () => TLinkContent,
  nftTokens: TOwnedTokens,
  tokenAddress: string | null,
  userAddress: string,
  provider: any
) => {

  if (claimPattern === 'mint' || enabledInput) {
    return createInputsContainer(
      formData,
      claimPattern,
      assetsData,
      setFormData,
      setAssetsData,
      checkIfDisabled,
      getDefaultValues
    )
  }

  return createSelectContainer(
    assetsData,
    setFormData,
    setAssetsData,
    getDefaultValues,
    nftTokens,
    tokenAddress,
    userAddress,
    provider,
    checkIfDisabled
  )

}

const Erc721: FC<ReduxType > = ({
  tokenStandard,
  setAssetsData,
  assetsData,
  claimPattern,
  children,
  sdk,
  tokenAddress,
  nftTokens,
  provider,
  address,
  loading,
  userLoading
}) => {

  const { type } = useParams<{ type: TTokenType }>()
  const [ oldStyleInputs, toggleOldStyleInputs ] = useState<boolean>(false)
  console.log({ loading, userLoading })
  const getDefaultValues: () => TLinkContent = () => {
    return {
      linksAmount: '',
      tokenId: '',
      tokenAmount: '',
      type: tokenStandard || 'ERC721'
    }
  }

  const [
    formData,
    setFormData
  ] = useState<TLinkContent>(getDefaultValues())

  const checkIfDisabled = () => {
    if (loading || userLoading) { return true }
    if (claimPattern === 'mint') {
      return Boolean(assetsData.length)
    }
    if (oldStyleInputs) {
      return !formData.tokenId || formData.tokenId.length === 0
    }
    return false
  }

  const checkIfTokensAvailable = () => {
    if (!tokenAddress) { return true }
    const tokenAmongOwned = nftTokens[tokenAddress] && nftTokens[tokenAddress].tokens.length > 0
    if (!tokenAmongOwned) { return true }
    return false
  }

  const addAllTokens = () => {
    if (!tokenAddress) { return true }
    const tokenAmongOwned = nftTokens[tokenAddress]
    if (!tokenAmongOwned) { return true }
    const assets: TLinkContent[] = tokenAmongOwned.tokens.map((token, idx) => {
      return {
        tokenId: token.id,
        linksAmount: '1',
        id: idx,
        type: 'ERC721',
        tokenImage: (token.media[0] || {}).gateway,
        tokenName: token.name
      }
    })

    setAssetsData(assets)
    setFormData(getDefaultValues())
  }

  return <WidgetComponent>
    <Header>
      <WidgetTitleStyled>
        {claimPattern === 'mint' ?  <span>
          Specify number of NFTs
        </span> : <span>
          Add token IDs <span onClick={() => { toggleOldStyleInputs(!oldStyleInputs) }}>to</span> distribute
        </span>}
      </WidgetTitleStyled>
      <ButtonStyled
        disabled={checkIfTokensAvailable()}
        appearance='additional'
        size='small'
        onClick={addAllTokens}
      >
        Select All
      </ButtonStyled>
    </Header>
    <Container>
      {createTextInputOrSelect(
        oldStyleInputs,
        formData,
        claimPattern,
        assetsData,
        setFormData,
        setAssetsData,
        checkIfDisabled,
        getDefaultValues,
        nftTokens,
        tokenAddress,
        address,
        provider
      )}
      <LinksContents
        type={type}
        claimPattern={claimPattern}
        sdk={sdk}
        data={assetsData}
        onRemove={(id) => {
          setAssetsData(assetsData.filter(item => item.id !== id))
        }}
      />
      <NotesContainer>
        {children}
      </NotesContainer>
    </Container>
  </WidgetComponent>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Erc721)
