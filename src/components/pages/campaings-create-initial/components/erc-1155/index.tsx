import { FC, useState, useEffect, useMemo } from 'react'
import {
  InputsContainer,
  InputStyled,
  ButtonStyled
} from '../../styled-components'
import wallets from 'configs/wallets'
import { TProps } from './type'
import {
  defineNativeTokenSymbol,
} from 'helpers'
import {
  Container
} from './styled-components'
import { TLinksContent, TLinkContent } from '../../types'
import LinksContents from '../links-contents'
import { RootState, IAppDispatch } from 'data/store';
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { TTokenType, TAssetsData, TSelectOption, TClaimPattern } from 'types'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import { CampaignActions } from 'data/store/reducers/campaign/types'
import { Dispatch } from 'redux'

const mapStateToProps = ({
  user: {
    address,
    provider,
    chainId,
    nativeTokenAmountFormatted,
    tokenAmountFormatted,
    loading: userLoading
  },
  campaign: {
    loading,
    decimals,
    symbol,
    claimPattern
  }
}: RootState) => ({
  loading,
  address,
  provider,
  decimals,
  chainId,
  symbol,
  nativeTokenAmountFormatted,
  tokenAmountFormatted,
  userLoading,
  claimPattern
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<CampaignActions>) => {
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
    ),
    clearCampaign: () => {
      dispatch(
        campaignActions.clearCampaign()
      )
    }
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatcherToProps> &
  TProps

const Erc1155: FC<ReduxType > = ({
  setTokenContractData,
  chainId,
  clearCampaign,
  setAssetsData,
  assetsData
}) => {

  const { type } = useParams<{ type: TTokenType }>()

  useEffect(() => {
    clearCampaign()
  }, [])

  const getDefaultValues = () => {
    return {
      linksAmount: '',
      tokenId: '',
      tokenAmount: '',
      id: assetsData.length
    }
  }

  const [
    formData,
    setFormData
  ] = useState<TLinkContent>(getDefaultValues())

  const [
    assetsParsed,
    setAssetsParsedValue
  ] = useState<TAssetsData>([])

  // export type TAsset = {
  //   amount?: string,
  //   id?: number | string,
  //   native_tokens_amount?: string,
  //   original_amount?: string,
  //   original_native_tokens_amount?: string
  // }


  const history = useHistory()

  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId })

  return <Container>
    <LinksContents
      type={type}
      data={assetsData}
      onRemove={(id) => {
        setAssetsData(assetsData.filter(item => item.id !== id))
      }}
    />
    <InputsContainer>
      <InputStyled
        value={formData.tokenId}
        placeholder='Token ID'
        onChange={value => {
          setFormData({ ...formData, tokenId: value })
          return value
        }}
      />
      <InputStyled
        value={formData.tokenAmount}
        placeholder='Copies per link'
        onChange={value => {
          setFormData({ ...formData, tokenAmount: value })
          return value
        }}
      />
      <InputStyled
        value={formData.linksAmount}
        placeholder='Number of links'
        onChange={value => {
          setFormData({ ...formData, linksAmount: value })
          return value
        }}
      />

      <ButtonStyled
        size='small'
        appearance='additional'
        onClick={() => {
          setAssetsData([ ...assetsData, formData ])
          setFormData(getDefaultValues())
        }}
      >
        + Add
      </ButtonStyled>
    </InputsContainer>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Erc1155)
