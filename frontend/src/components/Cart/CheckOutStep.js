import React from 'react'
import './CheckOutStep.css'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

function CheckOutStep({ activeStep }) {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />

        },
        {
            label: <Typography> Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />

        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />

        },
    ]

    const stepStyle = {
        boxSizing: "border-box"
    }
    return (
        <>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
                {steps.map((item, index) => (
                    <Step key={index}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel
                            style={{
                                color: activeStep >= index ? "#D19C97" : "grey",
                            }}
                            icon={item.icon}>{item.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </>
    )
}

export default CheckOutStep
