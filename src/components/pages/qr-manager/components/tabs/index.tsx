import { FC } from 'react'
import { TProps } from './types'
import { TabsWrapper, Tab } from './styled-components'

const Tabs: FC<TProps> = ({
  setQRManagerItemType,
  activeTab
}) => {
  return <TabsWrapper>
    <Tab
      onClick={() => {setQRManagerItemType('ACTIVE')}}
      active={activeTab === 'ACTIVE'}
    >Active</Tab>
    <Tab
      onClick={() => {setQRManagerItemType('ARCHIVED')}}
      active={activeTab === 'ARCHIVED'}
    >Archived</Tab>
  </TabsWrapper>
}

export default Tabs