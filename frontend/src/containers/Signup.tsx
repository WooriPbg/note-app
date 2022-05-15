import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import LoaderButton from '../components/LoaderButton';
import { Authentication, useAppContext } from '../lib/contextLib';
import { useFormFields } from '../lib/hooksLib';
import { Auth } from 'aws-amplify';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import './Signup.css';
import { onError } from '../lib/errorLib';

export default function Signup() {
    const [fields, handleFieldChange] = useFormFields({
        email: '',
        password: '',
        confirmPassword: '',
        confirmationCode: '',
    });
    const history = useHistory();
    const [newUser, setNewUser] = useState<ISignUpResult | null>(null);
    const { userHasAuthenticated } = useAppContext() as Authentication;
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    function validateConfirmationmForm() {
        return fields.confirmationCode!.length > 0;
    }

    async function handleSubmit(event: React.MouseEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsLoading(true);
        console.log('handlesubmit')

        try {
            const newUser = await Auth.signUp({
                username: fields.email,
                password: fields.password
            });
            setIsLoading(false);
            setNewUser(newUser);
        } catch (e) {
            // TODO: 인증코드 예외처리
            onError(e);
            setIsLoading(false);
        }
    }

    async function handleCofirmationSubmit(event: React.MouseEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log('handleconfirmationsubmit')
        setIsLoading(true);

        try {
            await Auth.confirmSignUp(fields.email, (fields.confirmationCode as string));
            await Auth.signIn(fields.email, fields.password);

            userHasAuthenticated(true);
            history.push('/');
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function renderConfirmationForm() {
        return (
            <Form onSubmit={handleCofirmationSubmit}>
                <Form.Group controlId='confirmationCode'>
                    <Form.Label>인증코드 확인</Form.Label>
                    <Form.Control
                    autoFocus
                    type='tel'
                    onChange={handleFieldChange}
                    value={fields.confirmationCode}
                    />
                    <Form.Text muted>이메일에서 인증코드를 확인해주세요.</Form.Text>
                </Form.Group>
                <LoaderButton
                    block
                    size='lg'
                    type='submit'
                    variant='success'
                    isLoading={isLoading}
                    disabled={!validateConfirmationmForm()}
                    className={''}
                    >
                        인증
                    </LoaderButton>
            </Form>
        );
    }

    function renderForm() {
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='email'>
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                        autoFocus
                        type='eamil'
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
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control
                        type='password'
                        value={fields.confirmPassword}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <LoaderButton
                    block
                    size='lg'
                    type='submit'
                    variant='success'
                    isLoading={isLoading}
                    disabled={!validateForm()}
                    className={''}
                >
                회원가입
                </LoaderButton>
            </Form>
        );
    }

    return (
        <div className='Signup'>
            {newUser === null ? renderForm() : renderConfirmationForm()}
        </div>
    );
 }