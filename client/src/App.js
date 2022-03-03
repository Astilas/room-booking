import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import './App.css'
import ApolloProvider from './ApolloProvider';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage'

import { AuthProvider } from './context/auth';
import { EventProvider } from './context/events';
import { RoomProvider } from './context/rooms';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';

function App(props) {
  return (
    <ApolloProvider>
      <AuthProvider>
        <EventProvider>
          <RoomProvider>
            <BrowserRouter>
              <Container className="pt-5">
                <Routes>
                  <Route exact path='/' element={<ProtectedRoute/>} >
                    <Route exact path='/' element={<Home />} />
                  </Route>
                  <Route exact path='/' element={<GuestRoute/>} >
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                  </Route>
                  <Route path='*' element={<ErrorPage />} />
                </Routes>
              </Container>
            </BrowserRouter>
          </RoomProvider>
        </EventProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
