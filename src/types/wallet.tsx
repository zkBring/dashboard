import TTokenType from "./token-type"

type TWallet = {
  id: string
  name: string
  chains: string[]
  token_types: (TTokenType | null)[]
  available_for_not_sponsored: boolean
  available_for_client: string[]
}

export default TWallet