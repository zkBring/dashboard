import React, { FC } from 'react'
import {
  BreadcrumbsWrapper,
  BreadcrumbsItem
} from './styled-components'
import Icons from 'icons'
import { TProps, TBreadCrubItem } from './types'

const Breadcrumbs: FC<TProps> = ({ items }) => {
  return <BreadcrumbsWrapper>
    {items.map((item: TBreadCrubItem, idx: number) => {
      return <BreadcrumbsItem status={item.status}>
        {item.title}
        {idx !== items.length - 1 && <Icons.BreadcrumbsIcon />}
      </BreadcrumbsItem>
    })}
  </BreadcrumbsWrapper>
}

export default Breadcrumbs