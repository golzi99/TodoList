import React from 'react';

type ButtonProps = {
    title: string,
    callBack: () => void,
    disabled?: boolean,
    classes?: string
}

export const Button = ({title, callBack, disabled, classes}: ButtonProps) => {

    const onClickButtonHandler = () => {
        callBack()
    }

    return (
        <button
            className={classes}
            onClick={onClickButtonHandler}
            disabled={disabled}>
            {title}
        </button>
    );
};
