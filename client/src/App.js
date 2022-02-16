import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import './App.css'
import ApolloProvider from './ApolloProvider';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';

function App(props) {
  return (
    <ApolloProvider>
      <BrowserRouter>
        <Container className="pt-5">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
