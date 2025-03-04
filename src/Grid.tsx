import { useState, useEffect } from "react";
import { Rover, Plateau, History } from './logic';

export const Grid = ({ plateau, movesHistory }: { plateau: Plateau, movesHistory: History[][][] }) => {
    const [currentRover, setCurrentRover] = useState(0);
    const [currentMove, setCurrentMove] = useState(0);  
    
    useEffect(() => {
        if (movesHistory.length === 0) return;
        const currentRoverMoves= movesHistory[currentRover];
        if(!currentRoverMoves) return;
        const interval = setInterval(() => {
            setCurrentMove((prev) => {
                if (prev < currentRoverMoves.length - 1) {
                    return prev +1;
                } else {
                    if (currentRover < movesHistory.length - 1) {
                        setCurrentRover((prevRover) => prevRover + 1);
                        return 0; 
                      } else {
                        return prev; 
                      }
                    }
                  });
                }, 2000);
                return () => clearInterval(interval);
    }, [currentRover, movesHistory]);
    return (    
        <>
            <div>
                <h2>Starting simulation...</h2>
                <p>Current Rover: {currentRover + 1}/{movesHistory.length} | Move: {currentMove}</p>
            </div>
            <div>
                <table>
                    <tbody>
                        {Array.from({ length: plateau.maxY + 1 }).map((_, row) => (
                            <tr key={row}>
                                {Array.from({ length: plateau.maxX + 1 }).map((_, col) => {
                                    const roverPos = movesHistory[currentRover]?.[currentMove];

                                    return (
                                        <td key={col} className="cell">
                                            {`${col} ${row}`/* {roverPos && roverPos.x === col && roverPos.y === (plateau.maxY - row) && roverPos.dir} */}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );  
}   