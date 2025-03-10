import { FC, useState, useEffect } from 'react'
import {
  InputStyled,
  WidgetComponentStyled,
  TextAreaStyled,
  Buttons
} from './styled-components'
import {
  Container,
  Aside
} from 'components/pages/common'
import {
  Breadcrumbs,
  Button
} from 'components/common'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import { useHistory } from 'react-router-dom'
import { CampaignActions } from 'data/store/reducers/campaign/types'
import { Dispatch } from 'redux'
import { preventPageClose } from 'helpers'
import Icons from 'icons'

const mapStateToProps = ({
  campaign: {
    tokenStandard,
    loading,
    title,
    tokenAddress,
    symbol,
    decimals,
    proxyContractAddress
  },
  campaigns: {
    campaigns
  },
  user: {
    chainId,
    address,
    contractsERC20,
    loading: userLoading,
    signer,
    tokenAmount
  }
}: RootState) => ({
  tokenStandard,
  loading,
  campaigns,
  chainId,
  tokenAmount,
  decimals,
  userLoading,
  address,
  symbol,
  title,
  tokenAddress,
  signer,
  contractsERC20,
  proxyContractAddress
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<CampaignActions>) => {
  return {
    setCampaignData: (
      title: string,
      description: string,
      callback: () => void
    ) => dispatch(
      campaignAsyncActions.setCampaignData(
        title,
        description,
        callback
      )
    )
  }
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const CampaignsCreateNew: FC<ReduxType> = ({
  setCampaignData,
  loading
}) => {
  const history = useHistory()

  useEffect(preventPageClose(), [])

  const [
    title,
    setTitle
  ] = useState<string>('')

  const [
    description,
    setDescription
  ] = useState<string>('')

  const defineIfNextDisabled = () => {
    return !title
  }
  
  return <>
    <Container>
      <Aside>
        <Breadcrumbs
          items={
            [
              {
                title: 'Audience'
              }, {
                title: 'Token',
              }, {
                title: 'Drop',
                status: 'current'
              }, {
                title: 'Launch'
              }
            ]
          }
        />
      </Aside>
  
      <WidgetComponentStyled title='What are you dropping?'>
        <InputStyled
          value={title}
          disabled={loading}
          icon={<Icons.InputDropIcon />}
          placeholder='e.g. LFG!'
          onChange={(value: string) => {
            setTitle(value)
            return value
          }}
          title='Drop name'
        />

        <TextAreaStyled
          value={description}
          disabled={loading}
          placeholder='Tell the world about your project'
          onChange={(value: string) => {
            setDescription(value)
            return value
          }}
          title='Drop description (optional)'
        />

        <Buttons>
          <Button
            appearance='action'
            disabled={defineIfNextDisabled()}
            onClick={() => {
              setCampaignData(
                title,
                description,
                () => {
                  history.push(`/campaigns/new/ERC20/transactions`)
                }
              )
            }}
          >
            Next
          </Button>

          <Button
            to={`/campaigns/new/ERC20/token-data`}
          >
            Back
          </Button>
        </Buttons>

        
      </WidgetComponentStyled>
    </Container>
  </>
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateNew)