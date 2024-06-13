export type TDefineTitle = (path: string) => string
export type TDefineBreadcrumbs = (path: string) => any

export interface ILocationType {
  pathname: string
}

export type TProps = {
  children?: React.ReactNode
}