export enum Direction {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right',
}

export const MOVEMENT_LOOKUP = {
    [Direction.Left]: { x: -1, y: 0 },
    [Direction.Right]: { x: 1, y: 0 },
    [Direction.Up]: { x: 0, y: -1 },
    [Direction.Down]: { x: 0, y: 1 },
};

export const COUNTER_DIRECTIONS_LOOKUP = {
    [Direction.Left]: [Direction.Down, Direction.Up],
    [Direction.Right]: [Direction.Down, Direction.Up],
    [Direction.Up]: [Direction.Right, Direction.Left],
    [Direction.Down]: [Direction.Right, Direction.Left],
};
