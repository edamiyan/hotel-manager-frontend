import React from 'react';
import {Button} from "react-bootstrap";

const PrimaryButton = ({children, ...props}) => {
    return (
        <Button {...props}>
            {children}
        </Button>
    );
};

export default PrimaryButton;

