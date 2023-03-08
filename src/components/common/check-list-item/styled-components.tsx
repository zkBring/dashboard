import styled, { css } from 'styled-components'

export const Container = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 24px;
	text-align: left;
`

export const CheckBox = styled.div<{ checked: boolean }>`
	display: flex;
	align-items: center;
	min-width: 16px;
	justify-content: center;
	height: 16px;
	border-radius: 16px;
	background-color: ${props => props.theme.primaryBorderColor};
	margin-right: 10px;

	${props => props.checked && css`
		background-color: ${props => props.theme.primaryHighlightColor};
	`}
`

export const Title = styled.h3`
	font-size: 16px;
	font-weight: 500;
	margin: 0;
`