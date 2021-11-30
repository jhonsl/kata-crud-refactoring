import React, {createContext } from 'react';
import Form from './components/Form';
import List from './components/List';
import Provider from './components/Provider';

const HOST_API = "http://localhost:8080/api";
const initialState = {
  todo: { list: [], item: {} }
};
const Store = createContext(initialState)

function App() {

  return (
    <div className="container mt-5">
      <Provider state = {initialState} store = {Store}>
        <Form url = {HOST_API} store = {Store}/>
        <List url = {HOST_API} store = {Store}/>
      </Provider>
    </div>
  );
}

export default App;