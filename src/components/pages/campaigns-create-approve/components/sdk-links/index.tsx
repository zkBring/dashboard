import { FC, useState } from 'react'
import {
  InputsContainer,
  InputStyled,
  ButtonStyled,
  NotesContainer,
  TextBold,
  InstructionNoteStyled
} from '../../styled-components'
import { TProps } from './types'
import {
  Container
} from './styled-components'
import LinksContents from '../links-contents'
import { RootState, IAppDispatch } from 'data/store';
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TTokenType, TLinkContent } from 'types'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import {
  WidgetComponent
} from 'components/pages/common'
import Icons from 'icons'

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

const SDKLinks: FC<ReduxType > = ({
  tokenStandard,
  setAssetsData,
  assetsData,
  sdk
}) => {
  const { type } = useParams<{ type: TTokenType }>()

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
    return Boolean(assetsData.length)
  }

  return <WidgetComponent title='Specify number of NFTs'>
    <Container>
      <LinksContents
        type={type}
        data={assetsData}
        sdk={sdk}
        onRemove={(id) => {
          setAssetsData(assetsData.filter(item => item.id !== id))
        }}
      />
      <InputsContainer>
        <InputStyled
          value={formData.tokenId}
          placeholder='Number of NFTs'
          disabled={Boolean(assetsData.length)}
          onChange={value => {
            const pattern = /^[0-9]+$/
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
  </WidgetComponent>
}

export default connect(mapStateToProps, mapDispatcherToProps)(SDKLinks)
