import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import axios from 'axios';
import _ from 'lodash';
import { Table } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import useSWR from 'swr';

import { AdminAuthProvider } from '../../context/AdminAuthContext';

import Footer from '../../components/Footer';
import ProfilePicture from '../../components/ProfilePicture';
import TopNavbar from '../../components/TopNavbar';

import styles from '../../styles/custom/Index.module.css';

function EditRow({ eid, name }) {
  return (
    <td>
      <div className="d-flex flex-row justify-content-between">
        <p>{name}</p>
        <Link href={`/admin/edit/${eid}`}>Edit</Link>
      </div>
    </td>
  );
}

export default function Home() {
  const [cookies, setCookies] = useCookies();

  const [adminData, setAdminData] = useState({});

  const { data: swrAdminData, error } = useSWR(
    `http://localhost:8000/employee/${cookies.adminId}`,
    (url) => axios.get(url).then((response) => response.data.data),
    { revalidateOnFocus: false }
  );

  const { data: swrAttendanceData, errorAttendance } = useSWR(
    'http://localhost:8000/admin/attendances/',
    (url) => axios.get(url).then((response) => response.data.data),
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (!_.isEmpty(swrAdminData)) {
      setAdminData(swrAdminData[0]);
    }

    return () => { }
  }, [swrAdminData]);

  return (
    <AdminAuthProvider>
      <Head>
        <title>CheckPoint | Home</title>
        <meta name="description" content="CheckPoint" />
      </Head>

      {
        _.isEmpty(swrAdminData)
          ? <h1>Loading...</h1>
          : error
          ? <p>Loading failed</p>
          : <>
              <TopNavbar title="CheckPoint | Admin" isAdmin />
              <div className="container">
                <main className="main">
                  <div className="d-none d-md-flex align-items-md-center">
                    <ProfilePicture
                      src={adminData.photo_url}
                      alt={`${adminData.name}'s Profile Picture`}
                    />

                    <div id="profile-data" className="d-none d-md-flex flex-column justify-content-md-evenly">
                      <h1 className={styles.title}>{adminData.name}</h1>
                      <p>Administrator</p>
                    </div>
                  </div>

                  <div className="d-block d-sm-block d-md-none">
                    <div id="profile">
                      <ProfilePicture
                        src={adminData.photo_url}
                        alt={`${adminData.name}'s Profile Picture`}
                      />
                      <h1 className={styles.title}>{adminData.name}</h1>
                      <p>Administrator</p>
                    </div>
                  </div>

                  {/* daterange filter */}
                  <div
                    style={{ margin: '10px 0' }}
                    className="d-none d-md-flex flex-row justify-content-md-between"
                  >
                    {/* <p>Filter berdasarkan tanggal</p>
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
                    </div> */}
                  </div>

                  <div className="d-block d-sm-block d-md-none">
                    <div style={{ height: '20px' }} />
                    {/* <p>Filter berdasarkan tanggal</p>
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
                    </div> */}
                  </div>

                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th>Tanggal</th>
                        <th>Clock In</th>
                        <th>Clock Out</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        !swrAttendanceData
                          ? <tr>
                            <td colSpan={3}>Loading attendances...</td>
                          </tr>
                          : _.isEmpty(swrAttendanceData)
                          ? <tr>
                            <td colSpan={3}>No attendances available</td>
                          </tr>
                          : errorAttendance
                          ? <tr>
                            <td colSpan={3}>Error getting attendances</td>
                          </tr>
                          : swrAttendanceData.map((attendance) => (
                            <tr key={attendance.attendance_id}>
                              <EditRow eid={attendance.employee_id} name={attendance.name} />
                              <td>{attendance.date}</td>
                              <td>{attendance.time_in}</td>
                              <td>{attendance.time_out}</td>
                            </tr>
                          ))
                      }
                    </tbody>
                    {/* <tbody>
                      <tr>
                        <EditRow eid="1" name="John Doe" />
                        <td>2022-10-10</td>
                        <td>07:30:00</td>
                        <td>18:00:05</td>
                      </tr>
                      <tr>
                        <EditRow eid="1" name="John Doe" />
                        <td>2022-10-10</td>
                        <td>07:30:00</td>
                        <td>18:00:05</td>
                      </tr>
                      <tr>
                        <EditRow eid="1" name="John Doe" />
                        <td>2022-10-10</td>
                        <td>07:30:00</td>
                        <td>18:00:05</td>
                      </tr>
                      <tr>
                        <EditRow eid="1" name="John Doe" />
                        <td>2022-10-10</td>
                        <td>07:30:00</td>
                        <td>18:00:05</td>
                      </tr>
                    </tbody> */}
                  </Table>
                </main>
              </div>
            </>
      }

      <Footer />
    </AdminAuthProvider>
  );
}
