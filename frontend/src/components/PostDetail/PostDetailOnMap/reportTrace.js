import React, {useState, useRef, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from '@material-ui/core/styles';
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

const MAPBOX_TOKEN = "pk.eyJ1IjoiemxpNzg2IiwiYSI6ImNrbnF1NzcyYjBkcnAydm4wenhvN2J0YmEifQ.QU5fBqJ3Gy7vvu9xWEMIKg";
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}));

export default function TraceReporter() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Report
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Report New Find</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To report a new trace, please enter the lastest address when you see this pet,
                        then chose a date and time for your last seen. The point will show on the map.
                    </DialogContentText>
                    <form>
                        <TextField
                            id="datetime-local"
                            label="Find Date"
                            type="datetime-local"
                            defaultValue="2021-05-02T10:30"
                            width={200}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Address"
                        type="address"
                        fullWidth
                    />

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}