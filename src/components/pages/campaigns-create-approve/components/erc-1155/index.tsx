import { FC, useState } from 'react'
import {
  InputsContainer,
  InputStyled,
  ButtonStyled,
  TextBold,
  InstructionNoteStyled,
  NotesContainer,
  SelectStyled
} from '../../styled-components'
import Icons from 'icons'
import { TProps } from './type'
import {
  Container,
  Header,
  WidgetTitleStyled
} from './styled-components'
import LinksContents from '../links-contents'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TTokenType, TLinkContent, TAlchemyNFTToken } from 'types'
import {
  WidgetComponent
} from 'components/pages/common'
import { alertError, defineIfUserOwnsToken, shortenString, defineNetworkName } from 'helpers'
import { EditPopup } from './components'
import { plausibleApi } from 'data/api'

const mapStateToProps = ({
  user: {
    address,
    provider,
    chainId,
    loading: userLoading,
    nfts
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
  userLoading,
  claimPattern,
  tokenStandard,
  tokenAddress,
  nfts
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {}
}

const defineNFTTokensOptions = (nftTokens: TAlchemyNFTToken[], tokenAddress: string | null) => {
  if (!tokenAddress) { return [] }
  const options = nftTokens.map(singleToken => {
    return {
      label: `${singleToken.title} #${shortenString(singleToken.tokenId)} (x ${singleToken.balance})`,
      value: singleToken
    }
  })
  return options
}

const createInputsContainer = (
  formData: TLinkContent,
  assetsData: TLinkContent[],
  setFormData: (link: TLinkContent) => void,
  setAssetsData: (newAssets: TLinkContent[]) => void,
  checkIfDisabled: () => boolean,
  getDefaultValues: () => TLinkContent
) => {
  return <InputsContainer>
    <InputStyled
      value={formData.tokenId}
      placeholder='Token ID'
      onChange={value => {
        if (/^[0-9]+$/.test(value) || value === '') {
          setFormData({ ...formData, tokenId: value })
        }
        return value
      }}
    />
    <InputStyled
      value={formData.tokenAmount}
      placeholder='Copies per link'
      onChange={value => {
        if (/^[0-9]+$/.test(value) || value === '') {
          setFormData({ ...formData, tokenAmount: value })
        }
        return value
      }}
    />
    <InputStyled
      value={formData.linksAmount}
      placeholder='Number of links'
      onChange={value => {
        if (/^[0-9]+$/.test(value) || value === '') {
          setFormData({ ...formData, linksAmount: value })
        }
        return value
      }}
    />

    <ButtonStyled
      size='extra-small'
      disabled={checkIfDisabled()}
      appearance='additional'
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
  nfts: TAlchemyNFTToken[],
  tokenAddress: string | null,
  userAddress: string,
  provider: any,
  checkIfDisabled: () => boolean
) => {
  return <InputsContainer>
    <SelectStyled
      disabled={checkIfDisabled()}
      onChange={async ({ value }: { value: string | TAlchemyNFTToken }) => {
        const tokenId = typeof value === 'string' ? value : value.tokenId
        const tokenAlreadyAdded = assetsData.find(asset => asset.tokenId === tokenId)
        if (tokenAlreadyAdded) {
          return alertError(`Token #${tokenId} was already added`)
        }

        if (typeof value === 'string') {
          // if "not found" was clicked
          const userOwnership = await defineIfUserOwnsToken(
            userAddress,
            'ERC1155',
            tokenAddress as string,
            provider,
            tokenId
          )

          if (!userOwnership.owns) {
            return alertError(`Token #${tokenId} is not owned by current user`)
          }

          setAssetsData([
            ...assetsData, {
              tokenId: tokenId,
              tokenAmount: "1",
              linksAmount: "1",
              type: 'ERC1155',
              id: assetsData.length,
              tokenName: 'Token ERC1155'
            }
          ])
        } else {          
          setAssetsData([
            ...assetsData, {
              tokenId: tokenId,
              tokenAmount: "1",
              linksAmount: String(value.balance),
              type: 'ERC1155',
              id: assetsData.length,
              tokenImage: (value.media[0] || {}).gateway,
              tokenName: value.title
            }
          ])
        }
        setFormData(getDefaultValues())
      }}
      value={null}
      placeholder='Token ID'
      options={defineNFTTokensOptions(nfts, tokenAddress)}
      notFoundActiveCondition={(value) => {
        return value.length > 0 && (/^[0-9]+$/).test(value)
      }}
    />
  </InputsContainer>
}

const createTextInputOrSelect = (
  enabledInput: boolean,
  formData: TLinkContent,
  assetsData: TLinkContent[],
  setFormData: (link: TLinkContent) => void,
  setAssetsData: (newAssets: TLinkContent[]) => void,
  checkIfDisabled: () => boolean,
  getDefaultValues: () => TLinkContent,
  nfts: TAlchemyNFTToken[],
  tokenAddress: string | null,
  userAddress: string,
  provider: any
) => {

  if (enabledInput) {
    return createInputsContainer(
      formData,
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
    nfts,
    tokenAddress,
    userAddress,
    provider,
    checkIfDisabled
  )

}

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatcherToProps> &
  TProps

const Erc1155: FC<ReduxType > = ({
  tokenStandard,
  setAssetsData,
  assetsData,
  children,
  sdk,
  claimPattern,
  nfts,
  tokenAddress,
  address,
  provider,
  loading,
  userLoading,
  chainId
}) => {
  

  const { type } = useParams<{ type: TTokenType }>()
  const [ oldStyleInputs, toggleOldStyleInputs ] = useState<boolean>(false)
  const getDefaultValues: () => TLinkContent = () => {
    return {
      linksAmount: '',
      tokenId: '',
      tokenAmount: '',
      type: tokenStandard || 'ERC1155'
    }
  }

  const [
    formData,
    setFormData
  ] = useState<TLinkContent>(getDefaultValues())

  const [
    itemToEdit,
    setItemToEdit
  ] = useState<number | null>(null)

  const checkIfDisabled = () => {
    if (userLoading || loading) { return true }
    if (oldStyleInputs) {
      return !formData.tokenId || !formData.linksAmount || !formData.tokenAmount
    }
    return false
  }

  const checkIfAllTokensDisabled = () => {
    if (!tokenAddress) { return true }
    if (!nfts || nfts.length === 0) { return true }
    return false
  }

  const addAllTokens = async () => {
    if (!tokenAddress) { return }
    const assets: TLinkContent[] = nfts.map((token, idx) => {
      return {
        tokenId: token.tokenId,
        linksAmount: String(token.balance),
        id: idx,
        type: 'ERC1155',
        tokenImage: (token.media[0] || {}).gateway,
        tokenName: token.title,
        tokenAmount: "1"
      }
    })
    plausibleApi.invokeEvent({
      eventName: 'camp_step3_selectall',
      data: {
        network: defineNetworkName(chainId),
        token_type: tokenStandard as string,
      }
    })
    setAssetsData(assets)
    setFormData(getDefaultValues())
  }

  return <WidgetComponent>
    {itemToEdit !== null && <EditPopup
      onClose={() => {
        setItemToEdit(null)
      }}
      assets={assetsData}
      id={itemToEdit}
      onUpdate={(assetId, linksAmount) => {
        const assetsDataUpdated = assetsData.map(asset => {
          if (asset.id === assetId) {
            return {
              ...asset,
              linksAmount: linksAmount
            }
          }
          return asset
        })
        setAssetsData(assetsDataUpdated)
        setItemToEdit(null)
      }}
    />}
    <Header>
      <WidgetTitleStyled>
        <span>
          Add token IDs <span onClick={async () => {
            const newValue = !oldStyleInputs
            if (newValue) {
              plausibleApi.invokeEvent({
                eventName: 'camp_step3_range',
                data: {
                  network: defineNetworkName(chainId),
                  token_type: tokenStandard as string
                }
              })
            }
            toggleOldStyleInputs(newValue)
          }}>to</span> distribute
        </span>
      </WidgetTitleStyled>

      <ButtonStyled
        disabled={checkIfAllTokensDisabled()}
        appearance='additional'
        size='extra-small'
        onClick={addAllTokens}
      >
        Select All
      </ButtonStyled>
    </Header>
    <Container>
      {createTextInputOrSelect(
        oldStyleInputs,
        formData,
        assetsData,
        setFormData,
        setAssetsData,
        checkIfDisabled,
        getDefaultValues,
        nfts,
        tokenAddress,
        address,
        provider
      )}
      <LinksContents
        type={type}
        data={assetsData}
        claimPattern={claimPattern}
        sdk={sdk}
        onRemove={(id) => {
          setAssetsData(assetsData.filter(item => item.id !== id))
        }}
        onEdit={(id) => {
          setItemToEdit(id)
        }}
      />
      
      <NotesContainer>
        {oldStyleInputs && <><InstructionNoteStyled icon={<Icons.InputNoteIcon />} >
          <TextBold>Copies per link</TextBold> — amount of copies that you would like to include in every link
        </InstructionNoteStyled>
        <InstructionNoteStyled icon={<Icons.InputNoteIcon />} >
          <TextBold>Number of links</TextBold> — number of claim links to be generated
        </InstructionNoteStyled></>}
        {children}
      </NotesContainer>
    </Container>
  </WidgetComponent>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Erc1155)
