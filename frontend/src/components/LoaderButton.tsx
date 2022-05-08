import React from 'react';
import Button from 'react-bootstrap/Button';
import { BsArrowRepeat } from 'react-icons/bs';
import './LoaderButton.css';

export interface ILoaderButtonProp {
    isLoading: boolean
    className: string
    disabled: boolean
    [x: string]: any
}

export default function LoaderButton({
    isLoading,
    className = '',
    disabled = false,
    ...props
}: ILoaderButtonProp) {
    return (
        <Button
        disabled={disabled || isLoading}
        className={`LoaderButton ${className}`}
        {...props}
        >
            {isLoading && <BsArrowRepeat className='spinning' />}
            {props.children}
        </Button>
    )
}