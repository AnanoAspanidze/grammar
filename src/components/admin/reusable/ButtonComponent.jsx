import React from 'react';
import Button from '@material-ui/core/Button';

function ButtonComponent({ title, color, variant, size, ...props }) {
	return (
		<Button variant={variant} color={color} size={size} {...props}>
			{title}
		</Button>
	);
}

export default ButtonComponent;
