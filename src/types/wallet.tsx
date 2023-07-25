import TTokenType from "./token-type"

type TWallet = {
  id: string
  name: string
  chains: string[]
  token_types: (TTokenType | null)[]
}

export default TWallet