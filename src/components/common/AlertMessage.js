import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function SimpleAlert(props) {
    return (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity={props.status}>
           {props.message}
        </Alert>
    );
}
