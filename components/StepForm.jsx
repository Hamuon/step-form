import React, { useState } from 'react';
import LoginModal from './molecules/modals/LoginModal';
import OtpModal from './molecules/modals/OtpModal';
const StepForm = () => {

    const [phone, setPhone] = useState("")
    const [step, setStep] = useState(1)

    const nextStep = () => {

        setStep(prevStep => prevStep + 1)
    };

    const prevStep = () => {

        setStep(prevStep => prevStep - 1)
    };


    switch (step) {
        case 1:
            return <LoginModal setPhone={setPhone} nextStep={nextStep} />;
        case 2:
            return <OtpModal phone={phone} prevStep={prevStep} />;
        default:
            return <LoginModal nextStep={nextStep} />

    }
};

export default StepForm;