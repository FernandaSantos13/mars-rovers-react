import { useState } from 'react'
import { createPlateau, readInitialPosition, recordMoves } from './Rover'
import { Rover, Plateau, History } from './Rover'
import { Grid } from './Grid';
import './App.css';

const App = () => {
  const [instructions, setInstructions] = useState<string>("");
  const [rovers, setRovers] = useState<Rover[]>([]);
  const [plateau, setPlateau] = useState<Plateau | null>(null);
  const [allHistory, setAllHistory] = useState<History[]>([]);

  const addInstructions = () => {
    const newPlateau = createPlateau(instructions.split("\n")[0].split(" "));
      setPlateau(newPlateau);

      const newRovers: Rover[] = [];
      const newHistory: History[] = [];

    for (let i = 1; i < instructions.split("\n").length; i = i + 2) {
      const position = instructions.split("\n")[i].split(" ");
      const moves = instructions.split("\n")[i + 1];
      const rover = readInitialPosition(position, moves, newPlateau);
      newRovers.push(rover);
      const history = [{x: rover.x,y: rover.y, dir: rover.dir}, ...recordMoves(rover, newPlateau)];
        newHistory.push(...history);
    };
    setRovers(newRovers);
    setAllHistory(newHistory);
    return (console.log(newRovers, newHistory));
  };

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
        <button onClick={addInstructions}>SIMULATE</button>
        </div>
        {plateau && <Grid plateau={plateau} movesHistory={allHistory} />}
    </>
  );
};

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

// 5 5
// 1 2 N
// LMLMLMLMM
// 3 3 E
// MMRMMRMRRM
// 2 5 W
// MLMLLRMMM