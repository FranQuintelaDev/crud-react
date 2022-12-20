import React from 'react';
import { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import Modal from '../components/Modal';
import { useNavigate } from "react-router-dom";

export default function UsersDetail() {

  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [showModalUser, setShowModalUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const { userId } = useParams();


  useEffect(() => {

    fetch("https://sandbox-demo.azuremicroservices.io/api/users/" + userId)
      .then(res => res.json())
      .then(
        (data) => {
          setUser(data);
        }
      );

  }, [userId])


  const handleChangeUser = (event) => {
    console.log(event)
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const handleSubmitUser = (event) => {
    event.preventDefault();
    console.log(event);

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          "firstName": userInfo.firstName,
          "lastName": userInfo.lastName,
          "email": userInfo.email,
          "phoneNumber": userInfo.phoneNumber
        })
    };

    fetch("https://sandbox-demo.azuremicroservices.io/api/users/" + userId, requestOptions)
      .then(res => res.json())
      .then(
        (data) => {
          console.log(data);
          setUser(data);
          setUserInfo(data)
        },
        (error) => {
        }
      );
  };

  const handleDeleteUser = () => {

    const requestOptions = {
      method: 'DELETE'
    };

    fetch("https://sandbox-demo.azuremicroservices.io/api/users/" + userId, requestOptions)
      .then(res => {
        console.log(res.json())
        navigate("/");
      },(error) => {
        }
      );
  };

  return (
    <>
      <div className="cols">
        <h1 className="title">User detail</h1>

        <button id="updateUserButton" onClick={() => setShowModalUser(true)}>Update User</button>
        <button id="deleteUserButton" onClick={() => setShowModalDeleteUser(true)}>Delete User</button>

      </div>
      {user ?
        <div id="userDetail" className="rows">
          <div className="card cols"  >
            <img src="https://via.placeholder.com/150 " alt="Avatar" style={{ width: 'width:100%' }} />
            <div className="container">
              <h4 id="userName"><b>{user.firstName + ' ' + user.lastName} </b></h4>
              <p>{user.phoneNumber}</p>
              <p>{user.email}</p>
            </div>
          </div>



        </div> : <></>}

      <Modal title="Add User" id="updateUserModal" onClose={() => setShowModalUser(false)} show={showModalUser}>
        <form onSubmit={handleSubmitUser}>

          <div>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="firstName"
              onChange={handleChangeUser}
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="lastName"
              onChange={handleChangeUser}
            />
          </div>
          <div>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              onChange={handleChangeUser}
            />
          </div>
          <div>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="phoneNumber"
              onChange={handleChangeUser}
            />
          </div>
          <div>
            <button type="submit" id="updateUserSubmitButton">Submit</button>
          </div>

        </form>
      </Modal>

      <Modal title="Delete User?" id="deleteUserModal" onClose={() => setShowModalDeleteUser(false)} show={showModalDeleteUser}>


        <div className='cols'>
          <button id="deleteUserModal" onClick={() => setShowModalDeleteUser(false)}>No</button>
          <button id="deleteUserModal" onClick={handleDeleteUser}>Yes</button>
        </div>
      </Modal>

    </>
  );

}


