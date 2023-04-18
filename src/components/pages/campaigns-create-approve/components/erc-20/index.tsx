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
  Container,
  Header,
  WidgetTitleStyled,
  TokenBalance,
  TokenBalanceValue
} from './styled-components'
import {
  WidgetComponent,
} from 'components/pages/common'
import { defineIfUserHasEnoughERC20Tokens } from 'helpers'
import LinksContents from '../links-contents'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { Tooltip } from 'components/common'
import { useParams } from 'react-router-dom'
import { TTokenType, TLinkContent } from 'types'
import Icons from 'icons'
import { utils, BigNumber } from 'ethers'

const mapStateToProps = ({
  user: {
    address,
    provider,
    chainId,
    loading: userLoading,
    tokenAmount
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
  tokenAmount,
  userLoading,
  claimPattern
})


type ReduxType = ReturnType<typeof mapStateToProps> &
  TProps

const Erc20: FC<ReduxType > = ({
  tokenStandard,
  setAssetsData,
  assetsData,
  children,
  sdk,
  claimPattern,
  symbol,
  decimals,
  tokenAmount
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
    return !formData.tokenAmount ||
           !formData.linksAmount ||
           formData.tokenAmount === '0' ||
           formData.linksAmount === '0'
  }

  const tokenAmountFormatted = tokenAmount && decimals ? utils.formatUnits(tokenAmount, decimals) : '0'

  return <WidgetComponent>
      <Header>
        <WidgetTitleStyled>Add tokens to distribute</WidgetTitleStyled>
        {tokenAmount && <TokenBalance>
          Token balance: <Tooltip text={`${tokenAmountFormatted} ${symbol}`}><TokenBalanceValue>{tokenAmountFormatted}</TokenBalanceValue> {symbol}</Tooltip>
        </TokenBalance>}
      </Header>
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
            size='extra-small'
            appearance='additional'
            disabled={checkIfDisabled()}
            onClick={() => {
              const hasEnoughTokens = defineIfUserHasEnoughERC20Tokens(
                tokenAmount as BigNumber,
                formData.tokenAmount as string,
                formData.linksAmount as string,
                decimals,
              )
              if (!hasEnoughTokens) {
                return alert(`Not enough tokens on balance. Current balance: ${tokenAmountFormatted} ${symbol}`)
              }
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

export default connect(mapStateToProps)(Erc20)
