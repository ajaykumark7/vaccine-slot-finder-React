import './App.css';
import Output from './components/Output/Output'
import Input from './components/Input/Input'
import React from "react";
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import reducer from './store/reducer'

const store = createStore(reducer);

function App() {
  return (
    <main>
      <h1>Find & notify Corona vaccine availability</h1>
      <Provider store={store}>
        <Input></Input>
        <Output></Output>
      </Provider>
    </main>
  );

}

export default App;
