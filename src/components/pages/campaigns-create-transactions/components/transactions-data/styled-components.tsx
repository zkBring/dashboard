import styled from "styled-components"

export const TTable = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 40px;
`

export const TTableItem = styled.li`
  padding: 0;
  margin: 0;
  color: ${props => props.theme.secondaryTextColor};
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  line-height: 1;
`

export const TTableItemTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const TTableItemValue = styled.div`

`