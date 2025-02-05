import { useState } from 'react'
import { createPlateau, readInitialPosition, recordMoves } from './Rover'
import { Rover, Plateau } from './Rover'

const App = () => {
  const [instructions, setInstructions] = useState("5 5\n1 2 N\nLLMLMLMLMM");
  const rovers: Rover[] = [];

  const addInstructions = (e: React.MouseEvent<HTMLButtonElement>) => {
    const plateau = createPlateau(instructions.split("\n")[0].split(" "));
    for (let i = 1; i < instructions.split("\n").length; i = i + 2) {
      const position = instructions.split("\n")[i].split(" ");
      const moves = instructions.split("\n")[i + 1];
      rovers.push(readInitialPosition(position, moves, plateau));
      };
      return console.log(rovers);
  }

  for (const rover of rovers) {
    const roverrecordMoves(rover, plateau);
    console.log(finalPosition)
  }
    
  return (
    <>
      <div>
        <h1>Mars Rovers Simulator App</h1>
        <h2>Insert instructions and click 'SIMULATE'.</h2>
        <textarea
          value={instructions}
          placeholder='Add here'
          onChange={(e) => setInstructions(e.target.value)}
          rows={10}
          cols={30}
        />
      </div>
      <div>
         <button onClick={(e) => addInstructions(e)}>SIMULATE</button>
      </div>
    </>
  )
}

export default App;

// const input1 = [
//     "5 5",
//     "1 2 N",
//     "LMLMLMLMM",
//     "3 3 E",
//     "MMRMMRMRRM",
//     "2 5 W",
//     "MLMLLRMMM"
// ]

