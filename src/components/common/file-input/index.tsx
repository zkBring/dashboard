import { FC, useState, useRef, useEffect } from 'react'
import { InputComponent } from './styled-components'
import { TProps } from './types'

const FileInput: FC<TProps> = ({
  onChange,
  name,
  placeholder,
  className
}) => {
  const [ data, setData ] = useState<any>('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (!data) { return }
    onChangeCallback()
  }, [data])


  const onChangeCallback = () => {
    const file = inputRef.current as HTMLInputElement | null
    if (!file || !file.files) { return }
    const fileObject = file.files && file.files[0]
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

  return <InputComponent
    type='file'
    value={data}
    name={name}
    className={className}
    refProp={inputRef}
    onChange={(data) => {
      onChangeCallback()
      return data
    }}
    placeholder={placeholder}
  />
}


export default FileInput