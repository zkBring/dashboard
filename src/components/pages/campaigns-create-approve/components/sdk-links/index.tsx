import { FC, useState } from 'react'
import {
  InputsContainer,
  InputStyled,
  ButtonStyled
} from '../../styled-components'
import { TProps } from './types'
import {
  Container
} from './styled-components'
import LinksContents from '../links-contents'
import { RootState } from 'data/store';
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TTokenType, TLinkContent } from 'types'
import {
  WidgetComponent
} from 'components/pages/common'

const mapStateToProps = ({
  user: {
    address,
    provider,
    chainId,
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
  userLoading,
  claimPattern
})

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> &
  TProps

const SDKLinks: FC<ReduxType > = ({
  tokenStandard,
  setAssetsData,
  assetsData,
  sdk,
  claimPattern
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

  return <WidgetComponent title={tokenStandard === 'ERC20' ? 'Specify number of tokens' : 'Specify number of NFTs'}>
    <Container>
      <LinksContents
        type={type}
        data={assetsData}
        claimPattern={claimPattern}
        sdk={sdk}
        onRemove={(id) => {
          setAssetsData(assetsData.filter(item => item.id !== id))
        }}
      />
      <InputsContainer>
        <InputStyled
          value={formData.tokenId}
          placeholder={tokenStandard === 'ERC20' ? 'Number of tokens' : 'Number of NFTs'}
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
          size='extra-small'
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

// @ts-ignore
export default connect(mapStateToProps)(SDKLinks)
