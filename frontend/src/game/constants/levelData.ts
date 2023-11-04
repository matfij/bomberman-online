import { TILE_SIZE } from './game';

export const MAP_MAX_SIZE = 64 * TILE_SIZE;

export enum TileType {
    Empty = 'Empty', // 59
    Wall = 'Wall', // 30
    Bomb = 'Bomb',
    Block = 'Block',
}

export const TILE_MAP = [
    [29, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 29],
    [29, 30, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 30, 29],
    [29, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 29],
    [29, 30, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 30, 29],
    [29, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 29],
    [29, 30, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 30, 29],
    [29, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 29],
    [29, 30, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 30, 29],
    [29, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 29],
    [29, 30, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 30, 29],
    [29, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 59, 30, 29],
    [29, 30, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 30, 29],
    [29, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 29],
    [29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29],
];

export const COLLISION_MAP: TileType[][] = TILE_MAP.map((row) =>
    row.map((value) => {
        if (value === 30) {
            return TileType.Wall;
        }
        return TileType.Empty;
    }),
);
