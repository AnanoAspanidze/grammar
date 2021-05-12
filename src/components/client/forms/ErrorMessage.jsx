import React from 'react';
import styled from 'styled-components';

function ErrorMessage({ error }) {
	return <ErrorText>{error}</ErrorText>;
}

export default ErrorMessage;

const ErrorText = styled.span`
	display: block;
	margin-top: 4px;
	font-size: 14px;
	color: rgb(236, 12, 50);
	user-select: none;
`;
