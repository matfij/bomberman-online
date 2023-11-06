import { FrameOrigin } from '../../engine/definitions/types';
import { Direction } from './entities';

export const WALK_SPEED = 40;

export enum BombermanState {
    IDLE = 'idle',
    MOVING = 'moving',
    DEAD = 'dead',
}

export const BOMBERMAN_FRAMES = new Map<string, FrameOrigin>([
    [
        'idle-down',
        {
            dimensions: {
                sourceX: 4,
                sourceY: 5,
                sourceWidth: 17,
                sourceHeight: 22,
            },
            originX: 8,
            originY: 15,
        },
    ],
    [
        'move-down-1',
        {
            dimensions: {
                sourceX: 30,
                sourceY: 5,
                sourceWidth: 17,
                sourceHeight: 22,
            },
            originX: 7,
            originY: 15,
        },
    ],
    [
        'move-down-2',
        {
            dimensions: {
                sourceX: 61,
                sourceY: 5,
                sourceWidth: 17,
                sourceHeight: 22,
            },
            originX: 9,
            originY: 15,
        },
    ],
    [
        'idle-side',
        {
            dimensions: {
                sourceX: 79,
                sourceY: 5,
                sourceWidth: 18,
                sourceHeight: 22,
            },
            originX: 7,
            originY: 15,
        },
    ],
    [
        'move-side-1',
        {
            dimensions: {
                sourceX: 104,
                sourceY: 5,
                sourceWidth: 17,
                sourceHeight: 21,
            },
            originX: 8,
            originY: 15,
        },
    ],
    [
        'move-side-2',
        {
            dimensions: {
                sourceX: 129,
                sourceY: 5,
                sourceWidth: 18,
                sourceHeight: 22,
            },
            originX: 8,
            originY: 15,
        },
    ],
    [
        'idle-up',
        {
            dimensions: {
                sourceX: 154,
                sourceY: 4,
                sourceWidth: 17,
                sourceHeight: 22,
            },
            originX: 8,
            originY: 15,
        },
    ],
    [
        'move-up-1',
        {
            dimensions: {
                sourceX: 180,
                sourceY: 4,
                sourceWidth: 17,
                sourceHeight: 22,
            },
            originX: 7,
            originY: 15,
        },
    ],
    [
        'move-up-2',
        {
            dimensions: {
                sourceX: 211,
                sourceY: 4,
                sourceWidth: 17,
                sourceHeight: 22,
            },
            originX: 9,
            originY: 15,
        },
    ],
    [
        'idle-down-left',
        {
            dimensions: {
                sourceX: 5,
                sourceY: 55,
                sourceWidth: 17,
                sourceHeight: 20,
            },
            originX: 6,
            originY: 15,
        },
    ],
    [
        'idle-up-left',
        {
            dimensions: {
                sourceX: 30,
                sourceY: 55,
                sourceWidth: 17,
                sourceHeight: 20,
            },
            originX: 6,
            originY: 15,
        },
    ],
    [
        'death-1',
        {
            dimensions: { sourceX: 10, sourceY: 30, sourceWidth: 21, sourceHeight: 20 },
            originX: 10,
            originY: 15,
        },
    ],
    [
        'death-2',
        {
            dimensions: { sourceX: 44, sourceY: 30, sourceWidth: 19, sourceHeight: 19 },
            originX: 9,
            originY: 15,
        },
    ],
    [
        'death-3',
        {
            dimensions: { sourceX: 75, sourceY: 30, sourceWidth: 22, sourceHeight: 20 },
            originX: 11,
            originY: 15,
        },
    ],
    [
        'death-4',
        {
            dimensions: { sourceX: 108, sourceY: 30, sourceWidth: 22, sourceHeight: 21 },
            originX: 11,
            originY: 15,
        },
    ],
    [
        'death-5',
        {
            dimensions: { sourceX: 142, sourceY: 31, sourceWidth: 20, sourceHeight: 20 },
            originX: 10,
            originY: 15,
        },
    ],
    [
        'death-6',
        {
            dimensions: { sourceX: 175, sourceY: 32, sourceWidth: 20, sourceHeight: 19 },
            originX: 10,
            originY: 15,
        },
    ],
    [
        'death-7',
        {
            dimensions: { sourceX: 207, sourceY: 33, sourceWidth: 21, sourceHeight: 19 },
            originX: 11,
            originY: 15,
        },
    ],
    [
        'death-8',
        {
            dimensions: { sourceX: 240, sourceY: 32, sourceWidth: 22, sourceHeight: 21 },
            originX: 11,
            originY: 15,
        },
    ],
    [
        'death-9',
        {
            dimensions: { sourceX: 273, sourceY: 32, sourceWidth: 22, sourceHeight: 21 },
            originX: 11,
            originY: 15,
        },
    ],
]);

export const BOMBERMAN_ANIMATIONS = {
    moveAnimations: {
        [Direction.Left]: [
            ['idle-side', 8],
            ['move-side-1', 8],
            ['idle-side', 8],
            ['move-side-2', 8],
        ],
        [Direction.Right]: [
            ['idle-side', 8],
            ['move-side-1', 8],
            ['idle-side', 8],
            ['move-side-2', 8],
        ],
        [Direction.Up]: [
            ['idle-up', 8],
            ['move-up-1', 8],
            ['idle-up', 8],
            ['move-up-2', 8],
        ],
        [Direction.Down]: [
            ['idle-down', 8],
            ['move-down-1', 8],
            ['idle-down', 8],
            ['move-down-2', 8],
        ],
    },
    deathAnimations: [
        ['death-1', 8],
        ['death-2', 8],
        ['death-1', 8],
        ['death-2', 8],
        ['death-1', 8],
        ['death-2', 8],
        ['death-1', 8],
        ['death-4', 8],
        ['death-5', 8],
        ['death-6', 8],
        ['death-7', 8],
        ['death-8', 8],
        ['death-9', 8],
        ['death-9', -1],
    ],
};
