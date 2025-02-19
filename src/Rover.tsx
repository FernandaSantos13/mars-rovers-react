export const createPlateau = (input: string[]) => {
    const maxX = parseInt(input[0]);
    const maxY = parseInt(input[1]);
    return { maxX, maxY };
}

export type Plateau = ReturnType<typeof createPlateau>;
export type Rover = ReturnType<typeof readInitialPosition>;
export type History = ReturnType<typeof recordMoves>;

export const readInitialPosition = (position: string[], moves: string, plateau: Plateau) => {
    const x = parseInt(position[0]);
    const y = parseInt(position[1]);

    if (x > plateau.maxX || y > plateau.maxY || x < 0 || y < 0) {
        throw new Error("Out of bounds.");
    }
    const dir = position[2];

    if (!cardinals.includes(dir)) {
        throw new Error("Invalid direction.");
    }

    return { x, y, dir, moves }
}

export const cardinals = ['N', 'E', 'S', 'W'];


export const rotateLeft = (input: string) => {
    const index = cardinals.indexOf(input);

    if (index === 0) {
        return cardinals[cardinals.length - 1]
    }

    return cardinals[index - 1];
}


export const rotateRight = (input: string) => {
    const index = cardinals.indexOf(input);

    if (index === cardinals.length - 1) {
        return cardinals[0]
    }

    return cardinals[index + 1];
}

export const moveForward = (x: number, y: number, dir: string) => {
    if (dir === 'W') {
        return { newX: x - 1, newY: y }
    }

    if (dir === 'E') {
        return { newX: x + 1, newY: y }
    }

    if (dir === 'N') {
        return { newX: x, newY: y + 1 }
    }

    if (dir === 'S') {
        return { newX: x, newY: y - 1 }
    }

    return { newX: x, newY: y }

}

export const recordMoves = (rover: Rover, plateau: Plateau) => {
    let { dir, x, y } = rover;
    let position = { x, y, dir };
    let movesHistory = [position];
    for (const move of rover.moves) {
        if (move === 'R') {
            dir = rotateRight(dir);
            position = { x, y , dir }
        };

        if (move === 'L') {
            dir = rotateLeft(dir);
            position = { x, y , dir }
        };

        if (move === 'M') {
            const { newX, newY } = moveForward(x, y, dir);
            
            if (newX > plateau.maxX || newY > plateau.maxY || newX < 0 || newY < 0) {
                position = { x, y , dir }
            }

            x = newX;
            y = newY;
            position = { x, y , dir }
        };
        movesHistory.push(position);
    } 
    return movesHistory;   
}
