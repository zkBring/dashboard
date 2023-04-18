import { FC, useState, useRef, useEffect } from 'react'
import { TProps } from './types'
import { checkAssetsFile, alertError } from 'helpers'
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
      if (!tokenStandard) {
        return alertError('No token standard provided')
      }
      if (
        (tokenStandard === 'ERC1155' && lines[0] !== "Token ID,Token amount,Links amount") ||
        (tokenStandard === 'ERC721' && lines[0] !== "Token ID") ||
        (tokenStandard === 'ERC20' && lines[0] !== "Token amount,Links amount")
      ) {
        return alertError('Invalid file. File should have an appropriate format. Please, download an example')
      }
     
      lines.shift()
      const assets = lines.map(item => {
        if (tokenStandard === 'ERC1155') {
          const [ token_id, token_amount, links_amount ] = item.split(',')
          return {
            tokenId: token_id ? token_id.trim() : undefined,
            tokenAmount: token_amount ? token_amount.trim() : undefined,
            linksAmount: links_amount ? links_amount.trim() : undefined,
            id: Math.random(),
            type: tokenStandard
          }
        } else if (tokenStandard === 'ERC721') {
          const [ token_id ] = item.split(',')
          return {
            tokenId: token_id ? token_id.trim() : undefined,
            tokenAmount: '',
            linksAmount: '',
            id: Math.random(),
            type: tokenStandard
          }
        } else {
          const [ token_amount, links_amount ] = item.split(',')
          return {
            tokenAmount: token_amount ? token_amount.trim() : undefined,            
            linksAmount: links_amount ? links_amount.trim() : undefined,
            tokenId: '',
            id: Math.random(),
            type: tokenStandard
          }
        }
      })
      const isValid: boolean = checkAssetsFile(assets, tokenStandard)
      if (!isValid) {
        return alertError('File is not valid')
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
          Read the information about the required file format <TextLink href='https://linkdrop-docs.notion.site/Using-CSV-to-add-tokens-217684e66db24b45b791a4a5a92c0585'>here</TextLink>
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
            refProp={inputRef}
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
