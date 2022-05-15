import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import LoaderButton from '../components/LoaderButton';
import { Auth } from 'aws-amplify';
import { Authentication, useAppContext } from '../lib/contextLib';
import { useHistory } from 'react-router-dom';
import './Login.css';
import { onError } from '../lib/errorLib';
import { useFormFields } from '../lib/hooksLib';

export default function Login() {
    const { userHasAuthenticated } = useAppContext() as Authentication;
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: '',
        password: ''
    })
    const history = useHistory();

    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await Auth.signIn(fields.email, fields.password);
            userHasAuthenticated(true);
            history.push('/') // 로그인 시 이동 경로
        } catch (e: unknown) {
            onError(e);
            setIsLoading(false);
        }
    }

    return (
        <div className='Login'>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='email'>
                    <Form.Label>이메일</Form.Label>
                    <Form.Control 
                    autoFocus 
                    type='email'
                    value={fields.email}
                    onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control  
                    type='password'
                    value={fields.password}
                    onChange={handleFieldChange}
                    />
                </Form.Group>
                <LoaderButton
                    block
                    size='lg'
                    type='submit'
                    isLoading={isLoading}
                    disabled={!validateForm()}
                    className={''}
                    >
                    로그인
                </LoaderButton>
            </Form>
        </div>
    )
}

