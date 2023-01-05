import { RouteComponentProps } from 'react-router-dom'

export interface MatchParams {
  id: string;
}

export interface IProps extends RouteComponentProps<MatchParams> {
  connectWallet: () => void;
}