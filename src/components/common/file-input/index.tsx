import { FC, useState, useRef, useEffect } from 'react'
import {
  InputComponent,
  InputContainer,
  InputFileName,
  ButtonStyled
} from './styled-components'
import { TProps } from './types'

const FileInput: FC<TProps> = ({
  onChange,
  name,
  placeholder,
  className
}) => {
  const inputRef = useRef(null)

  const [ fileName, setFileName ] = useState<string>()

  const onChangeCallback = () => {
    const file = inputRef.current as HTMLInputElement | null
    if (!file || !file.files) { return }
    const fileObject = file.files && file.files[0]
    if (fileObject) {
      setFileName(fileObject.name)
    }
    const reader = new FileReader()
    reader.readAsDataURL(file.files[0])
    reader.onloadend = function () {
      const data = reader.result
      onChange(
        data as string, // base64
        fileObject
      )
    }
  }

  return <InputContainer>
    <InputFileName>{fileName}</InputFileName>
    <InputComponent
      type='file'
      name={name}
      className={className}
      refProp={inputRef}
      onChange={(data) => {
        onChangeCallback()
        return data
      }}
      placeholder={placeholder}
    />
    <ButtonStyled appearance='additional' size='extra-small'>
      Choose file
    </ButtonStyled>
  </InputContainer>
}


export default FileInput