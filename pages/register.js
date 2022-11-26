import React, { useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

import { DIVISIONS, POSITIONS } from '../utils/constant';

import Footer from '../components/Footer';

export default function Login() {
  const router = useRouter();

  const [passwordError, setPasswordError] = useState(false);

  function onSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const positionId = document.getElementById('positionId').value;
    const divisionId = document.getElementById('divisionId').value;
    const profilePic = document.getElementById('profilePic').files;

    let picFile;
    if (profilePic.length) {
      picFile = profilePic[0];
    }
    
   
    if (password === confirmPassword) {
      setPasswordError(false);

      let formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('password', password);
      formData.append('positionId', positionId);
      formData.append('divisionId', divisionId);

      if (profilePic.length) {
        formData.append('profilePic', picFile);
      }

      axios.post('http://localhost:8000/register', formData)
        .then(() => router.push({ pathname: '/login' }))
        .catch((error) => {
          console.error(error);
          setPasswordError(error.response.data.data);
        });
    } else {
      setPasswordError(true);
    }
  }

  return (
    <>
      <Head>
        <title>CheckPoint | Register</title>
        <meta name="description" content="CheckPoint" />
      </Head>

      <div className="container">
        <main className="main d-flex justify-content-center align-items-center pt-5 pb-5">
          <div id="main-form">
            <h1 className="text-center">Mendaftar ke CheckPoint</h1>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control id="name" placeholder="Nama karyawan" type="text" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nomor ponsel</Form.Label>
                <Form.Control id="phoneNumber" placeholder="087888990023" type="tel" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control id="email" placeholder="employee@company.com" type="email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Jabatan</Form.Label>
                <Form.Select id="positionId" aria-label="Jabatan">
                  <option hidden>Pilih jabatan</option>
                  {
                    Object.keys(POSITIONS).map(positionId => (
                      <option key={POSITIONS[positionId] + positionId} value={positionId}>
                        {POSITIONS[positionId]}
                      </option>
                    ))
                  }
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Divisi</Form.Label>
                <Form.Select id="divisionId" aria-label="Divisi">
                  <option hidden>Pilih divisi</option>
                  {
                    Object.keys(DIVISIONS).map(divisionId => (
                      <option key={DIVISIONS[divisionId] + divisionId} value={divisionId}>
                        {DIVISIONS[divisionId]}
                      </option>
                    ))
                  }
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control id="password" type="password"/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Konfirmasi password</Form.Label>
                <Form.Control id="confirmPassword" type="password" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Upload foto profil</Form.Label>
                <Form.Control id="profilePic" type="file" name="profile-pic" accept="image/*" />
              </Form.Group>

              {passwordError ? <p id="error">{passwordError}</p> : null}

              <div className="login-register">
                <p className="cta-redirect">
                  Sudah punya akun? {' '}
                  <Link href="/login" className="register">Masuk</Link>
                </p>
                <Button variant="dark" type="submit">
                  Daftar
                </Button>
              </div>
            </Form>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}