import { FC } from 'react'
import { TProps } from './types'
import { TabsWrapper, Tab } from './styled-components'

const Tabs: FC<TProps> = ({
  setCampagnsType,
  activeTab
}) => {

  return null
  return <TabsWrapper>
    <Tab
      onClick={() => {setCampagnsType('ACTIVE')}}
      active={activeTab === 'ACTIVE'}
    >Active</Tab>
    <Tab
      onClick={() => {setCampagnsType('ARCHIVED')}}
      active={activeTab === 'ARCHIVED'}
    >Archived</Tab>
    <Tab
      onClick={() => {setCampagnsType('DRAFTS')}}
      active={activeTab === 'DRAFTS'}
    >Drafts</Tab>
  </TabsWrapper>
}

export default Tabs