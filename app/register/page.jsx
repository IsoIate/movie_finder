'use client'

import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const formDataChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const formSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = formData;
        const postData = { name, email, password };

        if (!name || !email || !password || !confirmPassword) {
            setError('모든 항목을 입력해주세요.');
            setSuccess('');
            return;
        }

        if (name.length < 4 || password.length < 4 || confirmPassword.length < 4) {
            setError('이름, 패스워드는 최소 4자 이상이어야 합니다.');
            setSuccess('');
            return;
        }

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            setSuccess('');
            return;
        }

        axios.post("/api/register", postData)
            .then((res) => {
                setSuccess(`회원가입이 완료되었습니다! \n잠시 후 메인페이지로 이동합니다.`);
                setError('');
                setTimeout(() => {
                    location.href = ("/");
                }, 3000)
            })
            .catch((e) => {
                if (e.response)
                    alert(`에러가 발생했습니다.\n${e.response.data.error}`)
                else
                    alert(`에러가 발생했습니다.\n${e.message}`)
            })
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '500px' }}>
            <h2 className="mb-4 text-center">회원가입</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={formSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="이름을 입력하세요"
                        name="name"
                        value={formData.name}
                        onChange={formDataChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="이메일을 입력하세요"
                        name="email"
                        value={formData.email}
                        onChange={formDataChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="비밀번호"
                        name="password"
                        value={formData.password}
                        onChange={formDataChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="비밀번호 확인"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={formDataChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    가입하기
                </Button>
            </Form>
        </Container>
    );
};

export default Register;
