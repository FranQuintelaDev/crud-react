import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import './custom.css';
import Users from './pages/Users';
import UsersDetail from './pages/UsersDetail';
import UsersList from './pages/UsersList';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Routes>
          <Route
            path="*"
            element={
              <Navigate to="/users" />
            }
          />

          <Route path="/users" element={<Users />}>

            <Route
              path="/users/:userId"
              element={<UsersDetail />}
            />
            <Route path="" element={<UsersList />} />
          </Route>
        </Routes>
      </Layout>
    );
  }
}
