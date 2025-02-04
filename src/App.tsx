import { useState } from 'react'
import { Rover } from './Rover'


const App = () => {
  //const [count, setCount] = useState(0)
  
  const handleSimulation = () => {
    return (
      console.log("Simulating...")
    );
  }
  
  return (
    <>
      <div>
        <h1>Mars Rovers simulator App</h1>
        <h2>For each rover you want to add, please click 'ADD NEW ROVER'. Provide the required information and click on 'SIMULATE'.</h2>
        <button onClick={Rover}>ADD NEW ROVER</button>
        <button onClick={handleSimulation}>SIMULATE</button>
      </div>

    </>
  )
}

export default App;
