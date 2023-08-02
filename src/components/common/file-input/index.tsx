import { FC, useState } from 'react'

const FileInput: FC = () => {
  const [ data, setData ] = useState<any>('')
  return <InputComponent
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
}


export default FileInput