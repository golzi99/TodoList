import React, {ChangeEvent} from 'react';

type InputProps = {
    title: string,
    setTitle: (title: string) => void
}

export const Input = ({title, setTitle}: InputProps) => {

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <input value={title}
               onChange={onChangeInputHandler}/>
    );
};
