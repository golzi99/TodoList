import React, {ChangeEvent} from 'react';

type InputProps = {
    title: string,
    setTitle: (title: string) => void,
    onEnter: () => void
}

export const Input = ({title, setTitle, onEnter}: InputProps) => {

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onEnterClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onEnter()
        }
    }

    return (
        <input value={title}
               onChange={onChangeInputHandler}
               onKeyDown={onEnterClick}
        />
    );
};




