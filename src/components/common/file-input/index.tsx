import { FC, useState, useRef, useEffect } from 'react'
import {
  InputComponent,
  InputContainer,
  InputFileName,
  ButtonStyled
} from './styled-components'
import { TProps } from './types'
import { TFileFormat } from 'types'

const FileInput: FC<TProps> = ({
  onChange,
  name,
  placeholder,
  className,
  sizeAllowed,
  formatAllowed
}) => {
  const inputRef = useRef(null)

  const [ fileName, setFileName ] = useState<string>()

  const onChangeCallback = () => {
    const file = inputRef.current as HTMLInputElement | null
    if (!file || !file.files) { return }
    const fileObject = file.files && file.files[0]
    console.log({ fileObject })
    if (fileObject) {
      if (sizeAllowed) {
        if (sizeAllowed < fileObject.size) {
          return alert(`Allowed size is ${sizeAllowed}. Size of the file is ${fileObject.size}`)
        }
        
      }
      if (formatAllowed) {
        console.log({ formatAllowed, type: fileObject.type })
        if (!formatAllowed.includes(fileObject.type as TFileFormat)) {
          return alert(`Format ${fileObject.type} is not allowed`)
        }
      }
      
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