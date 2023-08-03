import { FC, useState } from 'react'
import {
  WidgetStyled,
  ThumbnailContainer,
  Thumbnail,
  FileInputStyled,
  InputStyled,
  InputContainer, 
  InputTitleAdditional,
  InputTitle,
  WidgetSubtitleStyled,
  StyledRadio,
  InputTitleWithToggle,
  ToggleStyled,
  InputSubtitle,
  Buttons,
  ButtonStyled
} from './styled-components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import CollectionPlaceholder from 'images/collection-placeholder.png'

const mapStateToProps = ({
  collections: {
    collections,
    loading
  }
}: RootState) => ({
  collections,
  loading
})

type ReduxType = ReturnType<typeof mapStateToProps>

const CollectionsCreateInitial: FC<ReduxType> = ({
  loading
}) => {
  const [ thumbnail, setThumbnail ] = useState<string>('')
  const [ title, setTitle ] = useState<string>('')
  const [ symbol, setSymbol ] = useState<string>('')
  const [ mint, setMint ] = useState<boolean>(false)
  const [ SBT, setSBT ] = useState<boolean>(false)

  const radios = [
    {
      value: false,
      label: 'Transfer Pattern',
      note: 'tokens used with Claim Links will have to be pre-minted'
    }, {
      value: true,
      label: 'Mint Pattern (supports SBT)',
      note: 'tokens will not be pre-minted, but will be minted using Claim Links at claim'
    }
  ]

  return <WidgetStyled title='Collection setup'>
    <WidgetSubtitleStyled>
      Select the way you’d prefer to create and distribute tokens
    </WidgetSubtitleStyled>
    <InputContainer>
      <InputTitle>
        Collection Title <InputTitleAdditional>(max. 200 symbols)</InputTitleAdditional>
      </InputTitle>
      <InputStyled
        value={title}
        onChange={(value) => {
          setTitle(value)
          return value
        }}
      />
    </InputContainer>

    <InputContainer>
      <InputTitle>
        Collection Symbol <InputTitleAdditional>(optional, not more than 5 symbols recommended)</InputTitleAdditional>
      </InputTitle>
      <InputStyled
        value={symbol}
        onChange={(value) => {
          setSymbol(value)
          return value
        }}
        note='If you don’t know what a symbol is, keep it blank, and we will use the auto-generated one based on title'
      />
    </InputContainer>
    
    <ThumbnailContainer>
      <Thumbnail
        src={thumbnail || CollectionPlaceholder}
        alt='image'
      />
      <FileInputStyled
        onChange={(data) => {
          setThumbnail(data)
        }}
      />
    </ThumbnailContainer>

    <InputContainer>
      <InputTitle>
      Claim Pattern support <InputTitleAdditional>(for using with Linkdrop)</InputTitleAdditional>
      </InputTitle>
      <StyledRadio
        disabled={loading}
        radios={radios}
        value={mint}
        onChange={value => {
          setMint(value)
        }}
      />
    </InputContainer>

    <InputContainer>
      <InputTitleWithToggle>
        Make tokens non-transferrable (SBT)
        <ToggleStyled
          value={SBT}
          size='small'
          disabled={loading}
          onChange={((value) => {
            setSBT(value)
          })}
        />
      </InputTitleWithToggle>
      <InputSubtitle>
        If this setting is enabled, tokens minted within the collection could not be transferred, which makes them soulbound tokens. Please read docs to learn more about this setting and other options. 
      </InputSubtitle>
    </InputContainer>

    <Buttons>
      <ButtonStyled>
        Back
      </ButtonStyled>

      <ButtonStyled
        appearance='action'
      >
        Deploy Collection
      </ButtonStyled>
    </Buttons>
    
  </WidgetStyled>
}

export default connect(mapStateToProps)(CollectionsCreateInitial)