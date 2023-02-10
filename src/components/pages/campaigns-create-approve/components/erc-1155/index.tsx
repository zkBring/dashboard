import { FC, useState } from 'react'
import {
  InputsContainer,
  InputStyled,
  ButtonStyled,
  TextBold,
  InstructionNoteStyled,
  NotesContainer
} from '../../styled-components'
import Icons from 'icons'
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
  nativeTokenAmountFormatted,
  tokenAmountFormatted,
  userLoading,
  claimPattern,
  tokenStandard
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
  assetsData,
  children,
  sdk
}) => {

  const { type } = useParams<{ type: TTokenType }>()

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

  const checkIfDisabled = () => {
    return !formData.tokenId || !formData.linksAmount || !formData.tokenAmount
  }

  return <WidgetComponent title='Add token IDs to distribute'>
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
          size='small'
          disabled={checkIfDisabled()}
          appearance='additional'
          onClick={() => {
            setAssetsData([ ...assetsData, {
              ...formData,
              id: assetsData.length
            }])
            setFormData(getDefaultValues())
            console.log({ formData, assetsData })
          }}
        >
          + Add
        </ButtonStyled>
      </InputsContainer>
      <NotesContainer>
        <InstructionNoteStyled icon={<Icons.InputNoteIcon />} >
          <TextBold>Copies per link</TextBold> — amount of copies that you would like to include in every link
        </InstructionNoteStyled>
        <InstructionNoteStyled icon={<Icons.InputNoteIcon />} >
          <TextBold>Number of links</TextBold> — number of claim links to be generated
        </InstructionNoteStyled>
        {children}
      </NotesContainer>
    </Container>
  </WidgetComponent>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Erc1155)
