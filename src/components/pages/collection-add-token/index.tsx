import { FC, useState } from 'react'
import {
  WidgetComponentStyled,
  Container,
  InputStyled,
  TextAreaStyled,
  PropertiesInputStyled,
  InputsContainer,
  ButtonStyled
} from './styled-components'
import {
  ThumbnailUpload,
  WidgetSubtitle,
  InputContainer,
  InputTitle,
  InputTitleAdditional,
  InputSubtitle,
  ButtonsContainer
} from 'components/pages/common'
import {
  PropertiesList
} from './components'
import { TClaimPattern, TCollection } from 'types'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { RootState, IAppDispatch} from 'data/store'
import { connect } from 'react-redux'
import * as asyncCollectionsActions from 'data/store/reducers/collections/async-actions'

const mapStateToProps = ({
  collections: { collections, loading },
}: RootState) => ({
  collections,
  loading
})

const defineIfButtonDisabled = (
  tokenName: string,
  description: string,
  loading: boolean
) => {
  return !tokenName || !description  || loading
}

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    createTokenERC1155: (
      collectionId: string,
      contractAddress: string,
      tokenName: string,
      description: string,
      claimPattern: TClaimPattern,
      copiesAmount: string,
      properties: Record<string, string>,
      file?: File,
      thumbnail?: string,
      callback?: () => void
    ) => dispatch(asyncCollectionsActions.createTokenERC1155(
      collectionId,
      contractAddress,
      tokenName,
      description,
      claimPattern,
      copiesAmount,
      properties,
      file,
      thumbnail,
      callback
    ))
  }
}

const renderCopiesContainer = (
  copiesAmount: string,
  setCopiesAmount: (value: string) => void,
  claimPattern: TClaimPattern
) => {
  if (claimPattern === 'mint') {
    return <InputContainer>
      <InputTitle>
        Number of copies &#x2192; 0
      </InputTitle>
      <InputSubtitle>
        You token will not be pre-minted, but will be minted in future using Claim Links when you will create Linkdrop campaign.
      </InputSubtitle>
    </InputContainer> 
  }
  return <InputContainer>
    <InputTitle>
      Number of copies
    </InputTitle>
    <InputStyled
      placeholder='e.g. 100'
      value={copiesAmount}
      onChange={(value) => {
        if (/^[0-9]+$/.test(value) || value === '') {
          setCopiesAmount(value)
        }
        return value
      }}
    />
  </InputContainer>
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const CollectionAddToken: FC<ReduxType> = ({
  collections,
  loading,
  createTokenERC1155
}) => {
  const { collection_id } = useParams<{collection_id: string}>()
  const collection: TCollection | undefined = collections.find(collection => String(collection.collection_id) === collection_id)
  const history = useHistory()

  const [ thumbnail, setThumbnail ] = useState<string>('')
  const [ file, setFile ] = useState<File | undefined>(undefined)
  const [ tokenName, setTokenName ] = useState<string>('')
  const [ description, setDescription ] = useState<string>('')
  const [ copiesAmount, setCopiesAmount ] = useState<string>('')
  const [ properties, setProperties ] = useState<Record<string, string>>({})
  const [ propertyName, setPropertyName ] = useState<string>('')
  const [ propertyValue, setPropertyValue ] = useState<string>('')

  if (!collection) {
    return <Redirect to='/collections' />
  }
  const { claim_pattern: claimPattern, token_address: tokenAddress, collection_id: collectionId } = collection

  return <Container>
    <WidgetComponentStyled title='Add token'>
      <WidgetSubtitle>Please fill in your basic collection data to proceed</WidgetSubtitle>

      <ThumbnailUpload
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        setFile={setFile}
        title='Upload a  file'
        note='(PNG. Max 100mb)'
      />

      <InputContainer>
        <InputTitle>
          Token Name 
          <InputTitleAdditional>(max. 200 symbols)</InputTitleAdditional>
        </InputTitle>
        <InputStyled
          placeholder='e.g. The Raffle Participation Pass NFT'
          value={tokenName}
          onChange={(value) => {
            setTokenName(value)
            return value
          }}
        />
      </InputContainer>

      <InputContainer>
        <InputTitle>
          Description
          <InputTitleAdditional>(optional)</InputTitleAdditional>
        </InputTitle>
        <TextAreaStyled
          placeholder='e.g. Here’s the Raffle Pass, all owners will be eligible to participate in our amazing upcoming campaign in collaboration with top web3 brands'
          value={description}
          onChange={(value) => {
            setDescription(value)
            return value
          }}
        />
      </InputContainer>

      {renderCopiesContainer(
        copiesAmount,
        setCopiesAmount,
        claimPattern
      )}

      <InputContainer>
        <InputTitle>
          Properties  (optional)
        </InputTitle>

        <PropertiesList properties={properties} onRemove={key => {
          setProperties(properties => {
            delete { ...properties }[key]
            return properties
          })
        }}/>

        <InputsContainer>
          <PropertiesInputStyled
            value={propertyName}
            placeholder='e.g. Event'
            onChange={value => {
              setPropertyName(value)
              return value
            }}
          />
          <PropertiesInputStyled
            value={propertyValue}
            placeholder='e.g. Raffle'
            onChange={value => {
              setPropertyValue(value)
              return value
            }}
          />

          <ButtonStyled
            size='extra-small'
            appearance='additional'
            disabled={!propertyValue || !propertyName || loading}
            onClick={() => {
              setPropertyValue('')
              setPropertyName('')
              setProperties({ ...properties, [propertyName]: propertyValue })
            }}
          >
            + Add
          </ButtonStyled>
        </InputsContainer>
      </InputContainer>

      <ButtonsContainer>
        <ButtonStyled
          disabled={defineIfButtonDisabled(
            tokenName,
            description,
            loading
          )}
          loading={loading}
          onClick={() => {
            createTokenERC1155(
              collectionId as string,
              tokenAddress as string,
              tokenName,
              description,
              claimPattern,
              copiesAmount || '0',
              properties,
              file,
              thumbnail,
              () => {
                history.push(`/collections/${collection_id}`)
              }
            )
          }}
          appearance='action'
        >
          Mint item
        </ButtonStyled>
      </ButtonsContainer>
    </WidgetComponentStyled>
  </Container>
} 

export default connect(mapStateToProps, mapDispatcherToProps)(CollectionAddToken)