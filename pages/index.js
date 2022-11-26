import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import axios from 'axios';
import _ from 'lodash';
import { Button, Pagination, Table } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import useSWR from 'swr';

import { AuthProvider } from '../context/AuthContext';

import Footer from '../components/Footer';
import ProfilePicture from '../components/ProfilePicture';
import TopNavbar from '../components/TopNavbar';

import styles from '../styles/custom/Index.module.css';

export default function Home() {
  const [cookies, setCookies] = useCookies(['user']);
  const [userData, setUserData] = useState({});
  const [attendanceId, setAttendanceId] = useState(null);
  const [hasClockedIn, setClockedIn] = useState(false);

  const { data: swrUserData, error } = useSWR(
    `http://localhost:8000/employee/${cookies.employeeId}`,
    (url) => axios.get(url).then((response) => response.data.data),
    { revalidateOnFocus: false }
  );

  const { data: swrAttendanceData, errorAttendance, mutate: mutateAttendance } = useSWR(
    `http://localhost:8000/attendances/${cookies.employeeId}`,
    (url) => axios.get(url).then((response) => response.data.data),
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (!_.isEmpty(swrUserData)) {
      setUserData(swrUserData[0]);
      if (swrUserData[0].attendance_id) {
        setClockedIn(true);
        setAttendanceId(swrUserData[0].attendance_id);
      } 
    }

    return () => {}
  }, [swrUserData]);

  useEffect(() => {
    mutateAttendance();
  }, [hasClockedIn]);

  async function onClocking(status) {
    try {
      const response = await axios.post(
        `http://localhost:8000/clock?status=${status}`,
        {
          employeeId: cookies.employeeId,
          attendanceId
        }
      );

      if (response.status === 200) {
        setClockedIn(!hasClockedIn);
        setAttendanceId(response.data.data.attendanceId);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (_.isEmpty(swrUserData)) {
    return <h1>Loading...</h1>;
  } else if (error) {
    return <p>Loading failed</p>
  }

  return (
    <AuthProvider>
      <Head>
        <title>CheckPoint | Home</title>
        <meta name="description" content="CheckPoint" />
      </Head>

      <TopNavbar employeeId={1} />
      <div className="container">
        <main className="main">
          <div className="d-none d-md-flex align-items-md-center">
            <ProfilePicture
              src={null}
              alt="John Doe's Profile Picture"
            />

            <div id="profile-data" className="d-none d-md-flex flex-column justify-content-md-evenly">
              <h1 className={styles.title}>{userData.name}</h1>
              <p>{userData.division_name} | {userData.position_name}</p>
            </div>
          </div>

          <div className="d-block d-sm-block d-md-none">
            <div id="profile">
              <ProfilePicture
                src={null}
                alt="John Doe's Profile Picture"
              />
              <h1 className={styles.title}>{userData.name}</h1>
              <p className="department">{userData.division_name}</p>
              <p>{userData.position_name}</p>
            </div>
          </div>

          <div id="clock-in-out">
            <Button
              variant="warning"
              style={{ marginRight: '10px' }}
              onClick={() => onClocking('out')}
              disabled={!hasClockedIn}
            >
              Clock Out
            </Button>
            <Button varian="primary" onClick={() => onClocking('in')} disabled={hasClockedIn}>
              Clock In
            </Button>
          </div>

          {/* daterange filter */}
          <div
            style={{ margin: '10px 0' }}
            className="d-none d-md-flex flex-row justify-content-md-between"
          >
            <p>Filter berdasarkan tanggal</p>
            <div id='filter'>
              <div>
                <label className='filter-label'>Dari:</label>
                <input type="date" />
              </div>
              <div style={{ width: '10px' }} />
              <div>
                <label className='filter-label'>Hingga:</label>
                <input type="date" />
              </div>
            </div>
          </div>

          <div className="d-block d-sm-block d-md-none">
            <div style={{ height: '20px' }} />
            <p>Filter berdasarkan tanggal</p>
            <div style={{ height: '10px' }} />
            <div
              style={{ marginBottom: '10px' }}
              className="d-flex flex-row justify-content-between justify-content-between flex-wrap"
            >
              <div>
                <label className='filter-label'>Dari:</label>
                <input type="date" />

                <div className="d-block d-sm-none" style={{ height: '10px' }} />
              </div>
              <div>
                <label className='filter-label'>Hingga:</label>
                <input type="date" />
              </div>
            </div>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Clock In</th>
                <th>Clock Out</th>
              </tr>
            </thead>

            {
              !swrAttendanceData
                ? <p>Loading attendances...</p>
                : _.isEmpty(swrAttendanceData)
                ? <h2>No attendances available</h2>
                : errorAttendance
                ? <h2>Error getting attendances</h2>
                : <tbody>
                    {
                      swrAttendanceData.map((attendance) => (
                        <tr>
                          <td>{attendance.date}</td>
                          <td>{attendance.time_in}</td>
                          <td>{attendance.time_out}</td>
                        </tr>
                      ))
                    }
                  </tbody>
            }
          </Table>

          <div className="d-flex justify-content-center">
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </div>
        </main>
      </div>

      <Footer />
    </AuthProvider>
  );
}
