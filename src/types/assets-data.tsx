export type TERC1155Assets = {
  id: string,
  amount: string,
  nativeTokensAmount: string
}[]

export type TERC721Assets = {
  id: string,
  nativeTokensAmount: string
}[]


export type TERC20Assets = {
  amount: string,
  nativeTokensAmount: string
}[]


type TAssetsData = TERC1155Assets | TERC721Assets | TERC20Assets

export default TAssetsData