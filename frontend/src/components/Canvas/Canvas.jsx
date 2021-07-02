import React from 'react'
import './Canvas.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default function Canvas() {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',
        },
    }));

    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div>
            <span className={classes.root}>
                <TextField
                    id="outlined-full-width"
                    label="SPARQL Endpoint"
                    style={{ margin: 8, width: "83%" }}
                    margin="normal"
                    variant="outlined"
                    color="primary"
                />
                <button style={{margin: 8, width: "14%"}} className="btn btn-info">
                    Save Endpoint
                </button> 
            </span>
            <span>
                <button>Add Block</button>
            </span>
        </div>
    )
}
