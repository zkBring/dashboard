import { FC } from 'react'
import { TProps } from './types'
import { TabsWrapper, Tab } from './styled-components'

const Tabs: FC<TProps> = ({
  setCollectionType,
  activeTab
}) => {
  return <TabsWrapper>
    <Tab
      onClick={() => {setCollectionType('ACTIVE')}}
      active={activeTab === 'ACTIVE'}
    >Active</Tab>
    <Tab
      onClick={() => {setCollectionType('ARCHIVED')}}
      active={activeTab === 'ARCHIVED'}
    >Archived</Tab>
  </TabsWrapper>
}

export default Tabs