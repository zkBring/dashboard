import { FC, useState } from 'react'
import {
  InputsContainer,
  InputStyled,
  ButtonStyled
} from '../../styled-components'
import { TProps } from './type'
import {
  Container
} from './styled-components'
import LinksContents from '../links-contents'
import { RootState, IAppDispatch } from 'data/store';
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TTokenType, TLinkContent } from 'types'
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

const Erc721: FC<ReduxType > = ({
  tokenStandard,
  setAssetsData,
  assetsData,
  claimPattern
}) => {
  console.log({ tokenStandard })

  const { type } = useParams<{ type: TTokenType }>()

  const getDefaultValues = () => {
    return {
      linksAmount: '',
      tokenId: '',
      tokenAmount: '',
      tokenType: tokenStandard || 'ERC721'
    }
  }

  const [
    formData,
    setFormData
  ] = useState<TLinkContent>(getDefaultValues())

  const checkIfDisabled = () => {
    if (claimPattern === 'mint') {
      return Boolean(assetsData.length)
    }
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
        placeholder={claimPattern === 'mint' ? 'Max token ID' : 'Token ID'}
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
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Erc721)
