import React, { useState } from 'react'

function PasswordFieldContainer(props) {
    const [inputType, setinputType] = useState('password')
    const [isRedEyes, setIsRedEyes] = useState(false)


    const mouseEnter = () => {
        setIsRedEyes(true)
    }

    const mouseLeave = () => {
        setIsRedEyes(false)
    }

    const handleClick = () => {
        let typeValue = inputType;

        if(inputType === "password"){
            typeValue = "text"

        } else {
            typeValue = "password"
        }

        setinputType(typeValue)
    }

    const handleCopyAndPaste = (e) => {
        e.preventDefault();
        e.clipboardData.setData('text/plain', '');
    }


    return props.render(inputType, isRedEyes, handleClick, mouseEnter, mouseLeave, handleCopyAndPaste)
}

export default PasswordFieldContainer
