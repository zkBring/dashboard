import { FC, useState } from 'react'
import { TCollectionToken } from 'types'
import {
  TokenImage,
  Container,
  TokenData,
  TokenVideo,
  TokenContent,
  TokenControls,
  TokenHeader,
  TokenAmount,
  TokenTitle,
  TokenHeaderContent,
  TokenProperties,
  TokenProperty,
  TokenPropertyTitle,
  TokenPropertyValue,
  ButtonStyled,
  TokenDescriptionTitle,
  TokenDescriptionText,
  ExpandButton
} from './styled-components'
import { useHistory } from 'react-router-dom'
import { IAppDispatch } from 'data/store'
import CollectionPlaceholder from 'images/collection-placeholder.png'
import * as asyncCollectionsActions from 'data/store/reducers/collections/async-actions'
import { connect } from 'react-redux'
import { TProps } from './types'
import Icons from 'icons'
import LinksAmountPopup from '../links-amount-popup'

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    createClaimLinks: (
      collection_id: string,
      token_id: string,
      links_amount: string,
      callback: (location: string) => void
    ) => {
      return dispatch(asyncCollectionsActions.createClaimLinks(
        collection_id,
        token_id,
        links_amount,
        'ERC1155',
        callback
      ))
    }
  }
}

const renderButton = (
  setShowPopup: (value: boolean) => void,
  manageRedirect: () => void,
  campaignId?: string | null
) => {
  if (campaignId) {
    return <ButtonStyled
      size='extra-small'
      onClick={manageRedirect}
    >
      Manage links
    </ButtonStyled>
  }

  return <ButtonStyled
    appearance='action'
    size='extra-small'
    onClick={() => {
      setShowPopup(true)
    }}
  >
    Create links
  </ButtonStyled>
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapDispatcherToProps> & TCollectionToken & TProps

export const Token: FC<ReduxType> = ({
  name,
  description,
  copies,
  properties,
  token_id,
  campaignId,
  thumbnail,
  collectionId,
  createClaimLinks
}) => {
  const history = useHistory()
  const [ showPopup, setShowPopup ] = useState<boolean>(false)
  const [ expanded, setExpanded ] = useState<boolean>(false)

  const renderThumbnail = () => {
    if (!thumbnail) {
      return <TokenImage
        src={CollectionPlaceholder}

        // @ts-ignore
        alt={name}
      />
    }
    if (thumbnail.includes('video')) {
      return <TokenVideo autoPlay loop muted key={thumbnail}>
        <source src={thumbnail} />
        Your browser does not support the video tag.
      </TokenVideo>
    }
    return <TokenImage
      src={thumbnail}
      alt={name}
    />
  }

  const tokenExpandable = Boolean(Object.keys(properties || {}).length > 0 || description)

  return <Container>
    {showPopup && <LinksAmountPopup
      onClose={() => setShowPopup(false)}
      onSubmit={(links_amount) => {
        createClaimLinks(
          collectionId,
          token_id,
          links_amount,
          (location: string) => history.push(location)
        )
      }}
      initialValue={copies === '0' ? '1' : copies}
      limit={copies === '0' ? undefined : copies}
    />}

    <TokenHeader>
      <ExpandButton
        expanded={expanded}
        disabled={!tokenExpandable}
        onClick={() => {
          if (!tokenExpandable) { return }
          setExpanded(!expanded)
        }}
      >
        <Icons.ExpandArrowVerticalIcon />
      </ExpandButton>
      {renderThumbnail()}
      <TokenHeaderContent>
        <TokenTitle>{name} #{token_id}</TokenTitle>
        <TokenAmount>{copies} NFT</TokenAmount>
      </TokenHeaderContent>

      <TokenControls>
        {renderButton(
          setShowPopup,
          () => {
            if (campaignId) {
              history.push(`/campaigns/${campaignId}`)
              return
            }
            alert('campaignId not available')
            
          },
          campaignId
        )}
      </TokenControls>
    </TokenHeader>

    {expanded && <TokenContent>
      <TokenData>
        {description && <>
          <TokenDescriptionTitle>Description</TokenDescriptionTitle>
          <TokenDescriptionText>{description}</TokenDescriptionText>
        </>}

        {properties && Object.entries(properties).length > 0 && <TokenProperties>
          {Object.entries(properties).map(([title, value]) => {
            return <TokenProperty>
              <TokenPropertyTitle>{title}</TokenPropertyTitle>
              <TokenPropertyValue>{value}</TokenPropertyValue>
            </TokenProperty>
          })}
        </TokenProperties>}
      </TokenData>
    </TokenContent>}
  </Container>  
}

export default connect(null, mapDispatcherToProps)(Token)
