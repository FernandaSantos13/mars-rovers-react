import { useEffect, useState } from 'react'
import { createPlateau, readInitialPosition, recordMoves } from './logic'
import { Rover, Plateau } from './logic'
import './App.css';

const App = () => {
  const [instructions, setInstructions] = useState<string>("");
  const [rovers, setRovers] = useState<Rover[]>([]);
  const [plateau, setPlateau] = useState<Plateau | null>(null);
  const [movesHistory, setMovesHistory] = useState<
  { x: number; y: number; dir: string }[][]
>([]);
  const [moveIndex, setMoveIndex] = useState(0);
  const [currentRover, setCurrentRover] = useState(0);

  useEffect(() => {
    if (movesHistory.length === 0) return;

    let intervalId = setInterval(() => {
      setMoveIndex((prevMoveIndex) => {
        const nextMoveIndex = prevMoveIndex + 1;
        if (nextMoveIndex >= movesHistory[currentRover].length) {
          setCurrentRover((prevRover) => {
            const nextRover = prevRover + 1;
            if (nextRover >= movesHistory.length) {
              clearInterval(intervalId);
              return prevRover;
            }
            setMoveIndex(0);
            return nextRover;
          });
          return 0;
        }
        return nextMoveIndex;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [movesHistory, currentRover]);

  const runSimulation = () => {
    const newPlateau = createPlateau(instructions.split("\n")[0].split(" "));
      setPlateau(newPlateau);
      const newRovers: Rover[] = [];
      const newMovesHistory: { x: number; y: number; dir: string }[][] = [];

    for (let i = 1; i < instructions.split("\n").length; i = i + 2) {
      const position = instructions.split("\n")[i].split(" ");
      const moves = instructions.split("\n")[i + 1];
      const newRover = readInitialPosition(position, moves, newPlateau);
      newRovers.push(newRover);
      const roverMoves = recordMoves(newRover, newPlateau);
      newMovesHistory.push(roverMoves);
    };

    setRovers(newRovers);
    setMovesHistory(newMovesHistory);
    setMoveIndex(0);
    setCurrentRover(0);
  };

  const currentMove = movesHistory[currentRover]?.[moveIndex];


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
        <button onClick={runSimulation}>SIMULATE</button>
        
        {plateau && (
        <>
        <div>
          <h3>Current Rover: {currentRover + 1}</h3>
          <h3>Move Count: {moveIndex + 1}</h3>
        </div>
        <table>
          <tbody>
            {Array.from(Array(plateau.maxY + 1).keys()).map((y) => (
              <tr key={y}>
                {Array.from(Array(plateau.maxX + 1).keys()).map((x) => (
                  <td style={{ border: "1px solid red", width: "30px", height: "30px", textAlign: "center" }} key={x}>
                    {currentMove && x === currentMove.x && y === (plateau.maxY - currentMove.y) && currentMove.dir}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </>
      )}
      </div>
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