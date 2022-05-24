import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import LoaderButton from '../components/LoaderButton';
import config from '../config';
import { API } from 'aws-amplify';
import { onError } from '../lib/errorLib';
import { s3upload } from '../lib/awsLib';
import './NewNote.css';

export default function NewNote() {
    const file = useRef<any>(null);
    const history = useHistory();
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return content.length > 0;
    }

    function handleFileChange(event: any) {
        file.current = event.target.files[0];
    }

    function createNote(note: any) {
        return API.post('notes', '/notes', {
            body: note
        });
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `${config.MAX_ATTACHMENT_SIZE /
                 1000000} MB 이하의 파일로 첨부해주세요.`
            );
            return;
        }

        setIsLoading(true);

        try {
            const attachment = file.current ? await s3upload(file.current) : null;
            await createNote({ content, attachment });
            history.push('/');
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    } 

    return (
        <div className='NewNote'>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='content'>
                    <Form.Control
                        value={content}
                        as='textarea'
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='file'>
                    <Form.Label>첨부파일</Form.Label>
                    <Form.Control onChange={handleFileChange} type='file'/>
                </Form.Group>
                <LoaderButton
                    block
                    type='submit'
                    size='lg'
                    variant='primary'
                    isLoading={isLoading}
                    disabled={!validateForm()}
                    className={''}
                >
                    만들기
                </LoaderButton>
            </Form>
        </div>
    )
}