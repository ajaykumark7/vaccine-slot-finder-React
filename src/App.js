import './App.css';
import Output from './components/Output/Output'
import Input from './components/Input/Input'
import React, { useEffect, useState } from "react";

function App() {
  const [vaccineSlotAPIResponse, setVaccineSlotAPIResponse] = useState(null);

  return (
    <main>
      <h1>Find & notify Corona vaccine availability</h1>
      <Input setVaccineSlotAPIResponse={setVaccineSlotAPIResponse}></Input>
      <Output vaccineSlotAPIResponse={vaccineSlotAPIResponse}></Output>
    </main>
  );

}

export default App;
