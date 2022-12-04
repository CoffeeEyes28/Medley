import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';




import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';
import Container from '@mui/material/Container';
import NavBar from './components/NavBar';


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:3000/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Header />
      <Router>
        <NavBar/> 
        <div>
          <div>
            <Routes>
              <Route
                path="/"
                element={<Home />}
            />
              <Route
                path="/me"
                element={<Profile allowDelete={true} />}
              />
              <Route
                path="/:username"
                element={<Profile allowDelete={false}/>}
              />
              <Route
                path="/about"
                element={<About />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
