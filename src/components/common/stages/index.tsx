import { FC } from 'react'
import {
  TProps
} from './types'
import {
  Stage,
  StageConnector,
  StageIcon,
  StageTitle,
  StagesContainer
} from './styled-components'

const Stages: FC<TProps> = ({
  stages,
  className
}) => {
  return <StagesContainer className={className}>
    {stages.map((item, idx) => <>
      <Stage status={item.status}>
        <StageIcon status={item.status}>{item.icon}</StageIcon>
        <StageTitle>{item.title}</StageTitle>
      </Stage>
      {idx !== (stages.length - 1) && <StageConnector />}
    </>)}
  </StagesContainer>
}

export default Stages