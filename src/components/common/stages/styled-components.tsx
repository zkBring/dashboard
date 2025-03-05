import styled, { css } from "styled-components"
import { TStageStatus } from 'types'


export const StagesContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const Stage = styled.div<{
  status: TStageStatus
}>`
  display: flex;
  align-items: center;
  gap: 12px;

  ${props => {
    if (props.status === 'next') {

      return css`
        color: ${props.theme.stageNextTextColor};
      `
    }

    if (props.status === 'current') {
      return css`
        color: ${props.theme.stageCurrentTextColor};
      `
    }

    if (props.status === 'done') {
      return css`
        color: ${props.theme.stageDoneTextColor};
      `
    }
  }}
`


export const StageConnector = styled.div`
  height: 10px;
  width: 1px;
  border-left: 2px solid ${props => props.theme.primaryBorderColor};
  margin-left: 17px;
`


export const StageIcon = styled.div<{
  status: TStageStatus
}>`
  width: 36px;
  height: 36px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => {
    if (props.status === 'next') {
      return css`
        border: 2px solid ${props.theme.stageNextBorderColor};
        background-color: ${props.theme.stageNextBackgroundColor};
        color: ${props.theme.stageNextIconColor};
        svg {
          path {
            fill: ${props.theme.stageNextIconColor};
          }
        }
      `
    }

    if (props.status === 'current') {
      return css`
        border: 2px solid ${props.theme.stageCurrentBorderColor};
        background-color: ${props.theme.stageCurrentBackgroundColor};
        color: ${props.theme.stageCurrentIconColor};
        svg {
          path {
            fill: ${props.theme.stageCurrentIconColor};
          }
        }
      `
    }

    if (props.status === 'done') {
      return css`
        border: 2px solid ${props.theme.stageDoneBorderColor};
        background-color: ${props.theme.stageDoneBackgroundColor};
        color: ${props.theme.stageDoneIconColor};
        svg {
          path {
            fill: ${props.theme.stageDoneIconColor};
          }
        }
      `
    }
  }}
`

export const StageTitle = styled.div`

`