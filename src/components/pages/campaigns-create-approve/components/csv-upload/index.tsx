import { FC, useState, FormEvent, useRef, useEffect } from 'react'
import { TProps } from './types'
import { checkAssetsFile, downloadAssetsAsCSV } from 'helpers'
import {
  PopupForm,
  WidgetButton,
  PopupFormContent,
  Buttons,
  PopupStyled,
  PopupTitle,
  PopupText,
  InputComponent,
  IconContainer
} from './styled-components'
import { TextLink } from 'components/common'
import Icons from 'icons'

const CSVUploadPopup: FC<TProps> = ({
  onClose,
  onUpload,
  tokenStandard
}) => {
  const inputRef = useRef(null)
  const [ data, setData ] = useState<any>('')
  useEffect(() => {
    if (!data) { return }
    onChangeCallback()
  }, [data])
  const onChangeCallback = () => {
    const file = inputRef.current as HTMLInputElement | null
    if (!file || !file.files) { return }
    const reader = new FileReader()
    reader.readAsBinaryString(file.files[0])
    reader.onloadend = function () {
      const lines = (reader.result as string).split('\n')
      if (lines[0] !== "Token ID,Token amount,Links amount") {
        return alert('Invalid file. File should have an appropriate format')
      }
     
      lines.shift()
      const assets = lines.map(item => {
        const [ token_id, token_amount, links_amount ] = item.split(',')
        return {
          tokenId: token_id ? token_id.trim() : undefined,
          tokenAmount: token_amount ? token_amount.trim() : undefined,
          linksAmount: links_amount ? links_amount.trim() : undefined,
          id: Math.random(),
          type: tokenStandard
        }
      })
      const isValid: boolean = checkAssetsFile(assets, tokenStandard)
      if (!isValid) {
        return alert()
      }
      onUpload(assets)
    }
  }
  return <PopupStyled
    onClose={() => {
      onClose()
    }}
  >
    <PopupForm>
      <PopupFormContent>
      <IconContainer>
        <Icons.SignInIcon />
      </IconContainer>
        <PopupTitle>Upload .csv file with links</PopupTitle>
        <PopupText>
          Read the information about the required file format <TextLink onClick={() => {
            downloadAssetsAsCSV([], 'example')
          }}>here</TextLink>
        </PopupText>
      </PopupFormContent>
      <Buttons>
        <WidgetButton
          appearance='action'
        >
          Select file
          <InputComponent
            type='file'
            value={data}
            name='file'
            customRef={inputRef}
            onChange={(value) => {
              console.log({ value })
              setData(value)
              return ''
            }}
            placeholder='Quantity'
          />
        </WidgetButton>
      </Buttons>
    </PopupForm>
  </PopupStyled>
}

export default CSVUploadPopup
