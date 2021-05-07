import React from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
        flexGrow: 1,
        zIndex:1000
    },
    img: {
        height: 300,
        width: '100%',
        objectFit: 'cover',
        overflow: 'hidden',
        display: 'block'
    },
    button:{
        color:'darkgrey'
    }
}));

export default function Carousel({urls}) {
    const classes = useStyles();
    const theme = useTheme();
    const [activeImg, setActiveImg] = React.useState(0);
    const maxImgs = urls.length;


    const handleNext = () => {
        setActiveImg((img) => img + 1);
    };

    const handleBack = () => {
        setActiveImg((img) => img - 1);
    };

    return (
        <div className={classes.root}>
            <img
                className={classes.img}
                src={`${process.env.PUBLIC_URL}/assets/petImages/${urls[activeImg]}`}
                alt={`${process.env.PUBLIC_URL}/assets/petImages/${urls[activeImg]}`}
            />
            <MobileStepper
                variant="dots"
                steps={maxImgs}
                position="static"
                activeStep={activeImg}
                className={[classes.root, classes.stepper].join(' ')}
                nextButton={
                    <Button size="small" className={classes.button} onClick={handleNext} disabled={activeImg === maxImgs - 1}>
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" className={classes.button} onClick={handleBack} disabled={activeImg === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    </Button>
                }
            />
        </div>
    );
}
