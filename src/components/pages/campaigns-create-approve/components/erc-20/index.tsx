import { FC, useState } from 'react'
import {
  InputsContainer,
  InputStyled,
  ButtonStyled,
  TextBold,
  NotesContainer,
  InstructionNoteStyled
} from '../../styled-components'
import { TProps } from './type'
import {
  Container
} from './styled-components'
import {
  WidgetComponent,
} from 'components/pages/common'
import LinksContents from '../links-contents'
import { RootState, IAppDispatch } from 'data/store';
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TTokenType, TLinkContent } from 'types'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
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

const Erc20: FC<ReduxType > = ({
  tokenStandard,
  setAssetsData,
  assetsData,
  children,
  sdk,
  claimPattern
}) => {

  const { type } = useParams<{ type: TTokenType }>()

  const getDefaultValues: () => TLinkContent = () => {
    return {
      linksAmount: '',
      tokenId: '',
      tokenAmount: '',
      type: tokenStandard || 'ERC20'
    }
  }

  const [
    formData,
    setFormData
  ] = useState<TLinkContent>(getDefaultValues())

  const checkIfDisabled = () => {
    return !formData.tokenAmount || !formData.linksAmount
  }

  return <WidgetComponent title='Add tokens to distribute'>
      <Container>
        <LinksContents
          type={type}
          sdk={sdk}
          claimPattern={claimPattern}
          data={assetsData}
          onRemove={(id) => {
            setAssetsData(assetsData.filter(item => item.id !== id))
          }}
        />
        <InputsContainer>
        <InputStyled
            value={formData.tokenAmount}
            placeholder='Amount per link'
            onChange={value => {
              if (/^[0-9.]+$/.test(value) || value === '') {
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
        <NotesContainer>
          <InstructionNoteStyled icon={<Icons.InputNoteIcon />} >
            <TextBold>Amount per link</TextBold> — amount of tokens that you would like to include in every link
          </InstructionNoteStyled>
          <InstructionNoteStyled icon={<Icons.InputNoteIcon />} >
            <TextBold>Number of links</TextBold> — number of claim links to be generated
          </InstructionNoteStyled>
          {children}
        </NotesContainer>
      </Container>
    </WidgetComponent>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Erc20)
