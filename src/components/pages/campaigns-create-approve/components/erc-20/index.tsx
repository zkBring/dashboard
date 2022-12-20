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

const Erc20: FC<ReduxType > = ({
  tokenStandard,
  setAssetsData,
  assetsData
}) => {

  const { type } = useParams<{ type: TTokenType }>()

  const getDefaultValues = () => {
    return {
      linksAmount: '',
      tokenId: '',
      tokenAmount: '',
      id: assetsData.length,
      tokenType: tokenStandard || 'ERC20'
    }
  }

  const [
    formData,
    setFormData
  ] = useState<TLinkContent>(getDefaultValues())

  const checkIfDisabled = () => {
    return !formData.tokenAmount || !formData.linksAmount
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
          setAssetsData([ ...assetsData, formData ])
          setFormData(getDefaultValues())
          console.log({ formData,  })
        }}
      >
        + Add
      </ButtonStyled>
    </InputsContainer>
  </Container>
  // return <Container>
  //   <WidgetContent>
  //     <WidgetOptions>

  //       {/* <UserAssets>
  //         {symbol && symbol !== nativeTokenSymbol && tokenAmountFormatted && <UserAsset>
  //           Balance {symbol}: {tokenAmountFormatted}
  //         </UserAsset>}
  //       </UserAssets> */}
        
  //       <StyledRadio
  //         disabled={Boolean(campaign)}
  //         label='Claim pattern'
  //         radios={[
  //           { label: 'Mint (tokens will be minted to user address at claim)', value: 'mint' },
  //           { label: 'Transfer (tokens should be preminted, and will be transferred to user address at claim)', value: 'transfer' }
  //         ]}
  //         value={radio}
  //         onChange={value => setRadio(value)}
  //       />
  //       <SelectComponent
  //         options={walletsOptions}
  //         value={currentWallet}
  //         onChange={value => setCurrentWallet(value)}
  //         placeholder='Choose wallet'
  //       />
  //       <WidgetButton
  //         title='Next'
  //         appearance='action'
  //         onClick={() => {
  //           // setAssetsData(
  //           //   assetsParsed,
  //           //   currentWallet,
  //           //   radio,
  //           //   () => {
  //           //     if (tokenAddress === NATIVE_TOKEN_ADDRESS) {
  //           //       if (campaign) {
  //           //         return history.push(`/campaigns/edit/${type}/${campaign.campaign_id}/secure`)
  //           //       }
  //           //       return history.push(`/campaigns/new/${type}/secure`)
  //           //     }
  //           //     if (campaign) {
  //           //       return history.push(`/campaigns/edit/${type}/${campaign.campaign_id}/approve`)
  //           //     }
  //           //     history.push(`/campaigns/new/${type}/approve`)
  //           //   }
  //           // )
  //         }}
  //         disabled={defineIfButtonDisabled()}
  //       />
  //     </WidgetOptions>
  //     {chainId && <Aside
  //       symbol={symbol}
  //       type={type}
  //       assets={assetsParsed}
  //       chainId={chainId}
  //     />}
  //   </WidgetContent>      
  // </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Erc20)
