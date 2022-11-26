import React, { useEffect, useState } from 'react';

import Head from "next/head";
import { useRouter } from "next/router";

import axios from 'axios';
import _ from 'lodash';
import { Button, Form } from "react-bootstrap";
import { useCookies } from 'react-cookie';
import useSWR from 'swr';

import { AuthProvider } from '../../context/AuthContext';

import Footer from '../../components/Footer';
import ProfilePicture from "../../components/ProfilePicture";
import TopNavbar from "../../components/TopNavbar";

export default function Edit() {
  const router = useRouter();
  const { eid } = router.query;

  const [cookies, setCookies] = useCookies();

  const [changePassSuccess, setChangePassSuccess] = useState(false);
  const [changePassError, setChangePassError] = useState('');

  const [userData, setUserData] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');

  const { data: swrUserData, error } = useSWR(
    `http://localhost:8000/employee/${eid}`,
    (url) => axios.get(url).then((response) => response.data.data),
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (!_.isEmpty(swrUserData)) {
      setUserData(swrUserData[0]);
      setPhoneNumber(swrUserData[0].phone_number);
    }
  }, [swrUserData]);

  function onChangePassword(event) {
    event.preventDefault();
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const newPasswordConfirmation = document.getElementById('newPasswordConfirmation').value;

    if (newPassword !== newPasswordConfirmation) {
      setChangePassError('Password tidak cocok');
      setChangePassSuccess(false);
    } else {
      axios.put(
        'http://localhost:8000/auth/reset-password',
        {
          employeeId: cookies.employeeId,
          oldPassword,
          newPassword,
        }
      )
        .then(() => {
          setChangePassSuccess(true);
          setChangePassError('');
        })
        .catch((error) => {
          console.error(error);
          setChangePassError(error.response.data.data);
          setChangePassSuccess(false);
        });
    }
  }

  function onChangePhoneNumber(event) {
    event.preventDefault();
    setPhoneNumber(event.target.value);
  }

  function onChangePersonalData(event) {
    event.preventDefault();

    const phoneNumber = document.getElementById('phoneNumber').value;
    const profilePic = document.getElementById('profilePic').files;

    let formData = new FormData();
    formData.append('phoneNumber', phoneNumber);

    if (profilePic.length) {
      formData.append('profilePic', picFile);
    }

    axios.post(`http://localhost:8000/edit/${eid}`, formData)
      .then(() => router.push({ pathname: '/' }))
      .catch((error) => {
        console.error(error);
        setPasswordError(error.response.data.data);
      });
  }

  return (
    <AuthProvider>
      <Head>
        <title>CheckPoint | Edit profil</title>
        <meta name="description" content="CheckPoint" />
      </Head>

      <TopNavbar employeeId={eid} />
      <div className="container">
        <main className="main d-flex justify-content-center align-items-center pt-5 pb-5">
          <div>
            <div id="main-form" className="mb-5">
              <h2>Ubah foto dan nomor ponsel</h2>
              <Form onSubmit={onChangePersonalData}>
                <div className="d-flex justify-content-center mb-3">
                  <ProfilePicture
                    src={userData.photo_url}
                    alt="John Doe's Profile Picture"
                  />
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>Ubah foto profil</Form.Label>
                  <Form.Control id="profilePic" type="file" name="profile-pic" accep="image/*" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nomor ponsel</Form.Label>
                  <Form.Control
                    id="phoneNumber"
                    placeholder="087888990023"
                    type="tel"
                    value={phoneNumber}
                    onChange={onChangePhoneNumber}
                  />
                </Form.Group>

                <div className="clearfix">
                  <Button type="submit" variant="success" className="float-end">
                    Ubah
                  </Button>
                </div>
              </Form>
            </div>

            <div id="main-form">
              <h2>Ubah password</h2>
              <Form onSubmit={onChangePassword}>
                <Form.Group className="mb-3">
                  <Form.Label>Password lama</Form.Label>
                  <Form.Control type="password" id="oldPassword" name="oldPassword" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password baru</Form.Label>
                  <Form.Control type="password" id="newPassword" name="newPassword" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Konfirmasi password baru</Form.Label>
                  <Form.Control
                    type="password"
                    id="newPasswordConfirmation"
                    name="newPasswordConfirmation"
                  />
                </Form.Group>

                {changePassError ? <p id="error">{changePassError}</p> : null}
                {
                  changePassSuccess
                    ? <p className="text-success">Password berhasil diubah</p>
                    : null
                }

                <div className="clearfix">
                  <Button type="submit" className="float-end" variant="warning">
                    Ubah password
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </AuthProvider>
  );
}
