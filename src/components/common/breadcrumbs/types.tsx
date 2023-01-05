export type TBreadCrubItem = {
  title?: string,
  status?: 'current' | 'done'
}

export type TProps = {
  items: TBreadCrubItem[]
}