import { TCollectionType } from '../../types'

export type TProps = {
  setCollectionType: (collectionType: TCollectionType ) => void
  activeTab: TCollectionType
}