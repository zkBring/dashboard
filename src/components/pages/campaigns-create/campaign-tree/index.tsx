import { FC, useState, useEffect } from 'react'
import {
  WidgetTextarea,
  WidgetControls,
  WidgetButton,
  DoubleWidget,
  Title,
  Table,
  TableItem,
  TableWidget,
  TableItemImage,
} from '../styled-components'
import { RootState } from 'data/store';
import communities from 'configs/communities'
import Icons from 'icons'
import { TTokenType } from 'types'
import {
  Widget
} from 'components/common'
import { buildMerkleTreeERC1155, buildMerkleTreeERC20, buildMerkleTreeERC721 } from '@drop-protocol/drop-sdk'
import { useHistory } from 'react-router-dom'

import {
  parseDataERC20,
  parseDataERC1155,
  parseDataERC721
} from 'helpers'

import * as campaignActions from 'data/store/reducers/campaign/actions'
import { ContractActions } from 'data/store/reducers/contract/types'

import { Dispatch } from 'redux';
import { connect } from 'react-redux'

interface INameToValueMap {
  [key: string]: any;
}

type TProps = {
  cancel: () => void
}

const mapStateToProps = ({
  campaign: { type, tokenAddress, decimals },
  user: { provider }
}: RootState) => ({
  loadedCommunities: communities,
  type, tokenAddress, provider, decimals
})
const mapDispatcherToProps = (dispatch: Dispatch<ContractActions>) => {
  return {
    // setMerkleTree: (merkleTree: any) => dispatch(newRetroDropActions.setMerkleTree(merkleTree)),
  }
}
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> & TProps


const defineTreePlaceholder = (type: TTokenType | null) : string => {
  switch (type) {
    case 'erc1155':
      return `Be careful and paste info in the following order:

Receiver address, token ID, amount
Example:
0x70dfbd1149250eddeae6ed2381993b517a1c9ce8, 1, 1
0x203477162865dd22488a60e3e478e7795af95052, 2, 1
0x2693ad693d042b9c04d2dce0a44a7608ea1f7d47, 1, 2

and so on
`
    case 'erc721':
      return `Be careful and paste info in the following order:

Receiver address, token ID
Example:
0x70dfbd1149250eddeae6ed2381993b517a1c9ce8, 1
0x203477162865dd22488a60e3e478e7795af95052, 2
0x2693ad693d042b9c04d2dce0a44a7608ea1f7d47, 1

and so on
` 
    case 'erc20':
      return `Be careful and paste info in the following order:

Receiver address, amount
Example:
0x70dfbd1149250eddeae6ed2381993b517a1c9ce8, 10
0x203477162865dd22488a60e3e478e7795af95052, 20
0x2693ad693d042b9c04d2dce0a44a7608ea1f7d47, 10

and so on
` 
    default: return ''
  }
}

type TCreateDefaultRecipientsValue = (dropType: TTokenType | null) => string

const createRecipientsTitle: TCreateDefaultRecipientsValue = (type) => {
  switch (type) {
    case 'erc1155':
      return 'Receiver address, token ID, amount'
    case 'erc721':
      return 'Receiver address, token ID'
    case 'erc20':
      return 'Receiver address, amount'
    default:
      return ''
  }
}

const CampaignTree: FC<ReduxType> = ({
  cancel,
  loadedCommunities,
  type,
  tokenAddress,
  decimals,
}) => {

  const [ recipientsValue, setRecipientsValue ] = useState('')
  const history = useHistory()

  const createTree = async (type: TTokenType, recipientsValue: string, tokenAddress: string): Promise<boolean> => {
    let recipientsData
    let merkleData
    if (type === 'erc1155') {
      recipientsData = parseDataERC1155(type, recipientsValue)
      if (!recipientsData) {
        return false
      }
      // merkleData = buildMerkleTreeERC1155(recipientsData)
    }

    if (type === 'erc721') {
      recipientsData = parseDataERC721(type, recipientsValue)
      if (!recipientsData) {
        return false
      }
      // merkleData = buildMerkleTreeERC721(recipientsData)
    }

    if (type === 'erc20' && decimals) {
      recipientsData = parseDataERC20(type, recipientsValue, decimals)
      if (!recipientsData) {
        return false
      }
      // merkleData = buildMerkleTreeERC20(recipientsData)
      
    }

    if (recipientsData && merkleData) {
      console.log({ recipientsValue })
      // setRecipientsOriginalValue(recipientsValue)
      // setRecipients(recipientsData)
      // setMerkleTree(merkleData)
      
      return true
    }
    return false
  }


  return <DoubleWidget>
    <Widget>
      <WidgetTextarea
        title={createRecipientsTitle(type)}
        onChange={value => { setRecipientsValue(value); return value }}
        value={recipientsValue}
        placeholder={defineTreePlaceholder(type)}
      />
      <WidgetControls>
        <WidgetButton
          title='Start over'
          appearance='default'
          onClick={cancel}
        />
        <WidgetButton
          title='Parse data'
          appearance='default'
          disabled={!recipientsValue}
          onClick={async () => {
            if (!type || !tokenAddress) return
            const validTree = await createTree(type, recipientsValue, tokenAddress)
            if (!validTree) {
              return alert('Error in tree format')
            }
            // completeStep('create_tree')
            history.push(`/campaigns/new?step=publish_ipfs`)
          }}
        />
      </WidgetControls>
    </Widget>
    <TableWidget>
      <Title>Popular communities</Title>
      <Table>
        {loadedCommunities.map((item: INameToValueMap) => {
          const image = communities[item.id]
          return <>
            <TableItem>
              <TableItemImage src={image.logo} alt={item.name || 'Untitled'} />
              {item.name || 'Untitled'}
            </TableItem>
            <TableItem onClick={_ => {
            }}>
              Download CSV <Icons.DownloadIcon />
            </TableItem>
          </>
        })}
      </Table>
    </TableWidget>
  </DoubleWidget>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignTree)

