import { FC, useState } from 'react'
import {
  WidgetStyled,
  InputStyled,
  WidgetSubtitleStyled,
  StyledRadio,
  InputTitleWithToggle,
  ToggleStyled,
  ButtonStyled
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import {
  ThumbnailUpload,
  InputTitleAdditional,
  InputTitle,
  InputContainer,
  InputSubtitle,
  ButtonsContainer
} from 'components/pages/common'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import * as asyncCollectionsActions from 'data/store/reducers/collections/async-actions'

const defineIfButtonDisabled = (
  title: string,
  symbol: string,
  thumbnail: string,
  loading: boolean
) => {
  return !title || !symbol || !thumbnail || loading
}

const mapStateToProps = ({
  collections: {
    collections,
    loading
  }
}: RootState) => ({
  collections,
  loading
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    createCollectionERC1155: (
      title: string,
      symbol: string,
      mint: boolean,
      sbt: boolean,
      file?: File,
      thumbnail?: string,
      callback?: () => void
    ) => dispatch(asyncCollectionsActions.createCollectionERC1155(
      title,
      symbol,
      mint,
      sbt,
      file,
      thumbnail,
      callback
    ))
  }
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const CollectionsCreateInitial: FC<ReduxType> = ({
  loading,
  createCollectionERC1155
}) => {
  const [ thumbnail, setThumbnail ] = useState<string>('')
  const [ title, setTitle ] = useState<string>('')
  const [ symbol, setSymbol ] = useState<string>('')
  const [ mint, setMint ] = useState<boolean>(false)
  const [ file, setFile ] = useState<File | undefined>(undefined)
  const [ sbt, setSbt ] = useState<boolean>(false)
  const history = useHistory()

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
        disabled={loading}
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
        disabled={loading}
        value={symbol}
        onChange={(value) => {
          setSymbol(value.toUpperCase())
          return value
        }}
        note='If you don’t know what a symbol is, keep it blank, and we will use the auto-generated one based on title'
      />
    </InputContainer>

    <ThumbnailUpload
      thumbnail={thumbnail}
      setThumbnail={setThumbnail}
      title='Collection Thumbnail'
      setFile={setFile}
      note='(at least 200x200 px)'
    />

    <InputContainer>
      <InputTitle>
      Claim Pattern support <InputTitleAdditional>(for using with Linkdrop)</InputTitleAdditional>
      </InputTitle>
      <StyledRadio
        disabled={loading}
        radios={radios}
        value={mint}
        onChange={value => {
          if (!value) {
            setSbt(false)
          }
          setMint(value)
        }}
      />
    </InputContainer>

    {false && mint && <InputContainer>
      <InputTitleWithToggle>
        Make tokens non-transferrable (SBT)
        <ToggleStyled
          value={sbt}
          size='small'
          disabled={true} // for now we disable it
          onChange={((value) => {
            setSbt(value)
          })}
        />
      </InputTitleWithToggle>
      <InputSubtitle>
        If this setting is enabled, tokens minted within the collection could not be transferred, which makes them soulbound tokens. Please read docs to learn more about this setting and other options. 
      </InputSubtitle>
    </InputContainer>}

    <ButtonsContainer>
      <ButtonStyled>
        Back
      </ButtonStyled>

      <ButtonStyled
        appearance='action'
        loading={loading}
        disabled={defineIfButtonDisabled(title, symbol, thumbnail, loading)}
        onClick={() => {  
          createCollectionERC1155(
            title,
            symbol,
            mint,
            sbt,
            file,
            thumbnail,
            () => history.push('/collections')
          )
        }}
      >
        Deploy Collection
      </ButtonStyled>
    </ButtonsContainer>
    
  </WidgetStyled>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CollectionsCreateInitial)