import { useState } from 'react';

export const Rover = () => {
    const [newCoordinates, setNewCoordinates] = useState<string>('');
    const [newMovements, setNewMovements] = useState<string>('');

    const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCoordinates(e.target.value);
    };
    const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMovements(e.target.value);
    };


    const handleCoordinates = () => {
        if (newCoordinates.trim() !== '') {
            onClick(newCoordinates.trim());
            setNewCoordinates('');
        };
    };

    const handleMovements = () => {
        if (newMovements.trim() !== '') {
            onClick(newMovements.trim());
            setNewMovements('');
        };
    };
    
    return (
        <>
            <div>
                <input
                    type="text"
                    value={newCoordinates}
                    onChange={handleInputChange1}
                    placeholder='Add the coordinates of the rover. ex: 1 2 N'
                />
                <button onClick={handleCoordinates}>ADD</button>
            </div>

            <div>
                <input
                    type="text"
                    value={newMovements}
                    onChange={handleInputChange2}
                    placeholder='Add the list of movements of the rover. ex: LMLMLMLMM'
                />
                <button onClick={handleMovements}>ADD</button>
            </div>

        </>

    );
};

