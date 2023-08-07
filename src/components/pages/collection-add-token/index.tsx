import { FC, useState } from 'react'
import {
  WidgetComponentStyled,
  Container,
  InputStyled,
  TextAreaStyled
} from './styled-components'
import {
  ThumbnailUpload,
  WidgetSubtitle,
  InputContainer,
  InputTitle,
  InputTitleAdditional
} from 'components/pages/common'

const CollectionAddToken: FC = () => {
  const [ thumbnail, setThumbnail ] = useState<string>('')
  const [ tokenName, setTokenName ] = useState<string>('')
  const [ description, setDescription ] = useState<string>('')
  const [ copiesAmount, setCopiesAmount ] = useState<string>('')

  return <Container>
    <WidgetComponentStyled title='Add token'>
      <WidgetSubtitle>Please fill in your basic collection data to proceed</WidgetSubtitle>

      <ThumbnailUpload
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        title='Collection Thumbnail'
        note='(at least 200x200 px)'
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

        <InputContainer>
          <InputTitle>
            Number of copies
          </InputTitle>
          <InputStyled
            placeholder='e.g. 100'
            value={copiesAmount}
            onChange={(value) => {
              setCopiesAmount(value)
              return value
            }}
          />
        </InputContainer>
    </WidgetComponentStyled>

  </Container>


  
} 

export default CollectionAddToken