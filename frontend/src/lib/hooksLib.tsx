import { useState } from 'react';

export interface ISignupField {
    email: string
    password: string
    confirmPassword?: string
    confirmationCode?: string
};

export type UserSignupFields = [ISignupField, (e: any) => void];

export function useFormFields(initialState: ISignupField): UserSignupFields {
    const [fields, setValues] = useState<ISignupField>(initialState);

    return [
        fields,
        (event: any) => {
            setValues({
                ...fields,
                [event.target.id]: event.target.value
            });
        }
    ];
};
