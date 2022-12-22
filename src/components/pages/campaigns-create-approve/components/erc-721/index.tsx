import { FC, useState } from 'react'
import {
  InputsContainer,
  InputStyled,
  ButtonStyled,
  NotesContainer,
  TextBold
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
import {
  WidgetComponent,
  InstructionNote
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

  return <WidgetComponent title={claimPattern === 'mint' ?  'Specify amount of NFTs' : 'Add token IDs to distribute'}>
    <Container>
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
      <NotesContainer>
        <InstructionNote
          icon={<Icons.InputNoteIcon />}
        >
          {
            claimPattern === 'mint' ? 'Specify limit of tokens to be minted' : <><TextBold>Adding multiple IDs</TextBold> — You can add a range of IDs, by typing it the following way: 1-10</>
          }
        </InstructionNote>
      </NotesContainer>
    </Container>
  </WidgetComponent>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Erc721)
