import './App.css';
import Output from './components/Output/Output'
import Input from './components/Input/Input'
import React from "react";
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import reducer from './store/reducer'
import Navbar from 'react-bootstrap/Navbar';

const store = createStore(reducer);
const styles = {
  navbar: {
      maxWidth:"720px",
      justifyContent:"space-evenly !important"
  }
}
function App() {
  return (
    <main>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Kerala COVID-19 Vaccine Slot Finder</Navbar.Brand>
      </Navbar>
      <Provider store={store}>
        <Input></Input>
        <Output></Output>
      </Provider>
    </main>
  );

}

export default App;
