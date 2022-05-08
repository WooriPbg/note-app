import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import LoaderButton from '../components/LoaderButton';
import { Auth } from 'aws-amplify';
import { Authentication, useAppContext } from '../lib/contextLib';
import { useHistory } from 'react-router-dom';
import './Login.css';
import { onError } from '../lib/errorLib';

export default function Login() {
    const { userHasAuthenticated } = useAppContext() as Authentication;
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    function validateForm() {
        return email.length > 0 && setPassword.length > 0;
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await Auth.signIn(email, password);
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control  
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

