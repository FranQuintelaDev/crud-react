import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from '../components/Modal';


export default function UsersList() {

  const [users, setUsers] = useState();
  const [showModalUser, setShowModalUser] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {

    fetch("http://localhost:8080/api/users")
      .then(res => res.json())
      .then(
        (data) => {
          setUsers(data);
        }
      );

  }, [])

  const handleChangeUser = (event) => {
    console.log(event)
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const handleSubmitUser = (event) => {
    event.preventDefault();
    console.log(event);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          "firstName":userInfo.firstName,
          "lastName": userInfo.lastName,
          "email":userInfo.email,
          "phoneNumber":userInfo.phoneNumber
        })
    };

    fetch("http://localhost:8080/api/users", requestOptions)
      .then(res => res.json())
      .then(
        (data) => {
          console.log(data);
          setUsers(data);
        },
        (error) => {
        }
      );
  };

  return (
    <>
      <div className="cols">
        <h1 className="title">Users</h1>

        <button id="addUserButton" onClick={() => setShowModalUser(true)}>Add User</button>
      </div>


      {users ?
        <>
          <div id="users" className="rows">
            {users.map(user =>
              <Link to={"/users/" + user.id} key={user.id} id="user">
                <div className="card cols"  >
                  <img src="https://via.placeholder.com/150 " alt="Avatar" style={{ width: 'width:100%' }} />
                  <div className="container">
                    <h4><b>{user.firstName + ' ' + user.lastName}</b></h4>
                    <p>Click to see details</p>
                  </div>
                </div>
              </Link>
            )}
          </div>

        </> : <></>}

        <Modal title="Add User" id="addUserModal" onClose={() => setShowModalUser(false)} show={showModalUser}>
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
                  <button type="submit" id="addUserSubmitButton">Submit</button>
                </div>

              </form>
            </Modal>
            
    </>
  );

}


