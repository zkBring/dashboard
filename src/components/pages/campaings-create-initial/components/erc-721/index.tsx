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
import { TLinksContent } from '../../types'
import LinksContents from '../links-contents'
import { RootState, IAppDispatch } from 'data/store';
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { TTokenType, TAssetsData, TLinkContent } from 'types'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'


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
    claimPattern,
    tokenStandard
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
  claimPattern
})

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

const Erc1155: FC<ReduxType > = ({
  tokenStandard,
  setAssetsData,
  assetsData
}) => {
  console.log({ tokenStandard })

  const { type } = useParams<{ type: TTokenType }>()

  const getDefaultValues = () => {
    return {
      linksAmount: '',
      tokenId: '',
      tokenAmount: '',
      id: assetsData.length,
      tokenType: tokenStandard || 'ERC721'
    }
  }

  const [
    formData,
    setFormData
  ] = useState<TLinkContent>(getDefaultValues())

  const checkIfDisabled = () => {
    return !formData.tokenId || formData.tokenId.length === 0
  }

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

      <ButtonStyled
        size='small'
        appearance='additional'
        disabled={checkIfDisabled()}
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
