import { BigNumber } from "ethers"

type TProps = {
  value: number | BigNumber
  max: number | BigNumber
  action?: () => void
  actionTitle?: string
  tokenSymbol: string
  tokenIcon: React.ReactNode
}


export default TProps