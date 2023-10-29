import { FrameOrigin } from '../../engine/definitions/types';
import { DIRECTION } from './entities';

export const WALK_SPEED = 40;

export enum BombermanState {
    IDLE = 'idle',
    MOVING = 'moving',
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
]);

export const BOMBERMAN_ANIMATIONS = {
    moveAnimations: {
        [DIRECTION.LEFT]: [
            ['idle-side', 8],
            ['move-side-1', 8],
            ['idle-side', 8],
            ['move-side-2', 8],
        ],
        [DIRECTION.RIGHT]: [
            ['idle-side', 8],
            ['move-side-1', 8],
            ['idle-side', 8],
            ['move-side-2', 8],
        ],
        [DIRECTION.UP]: [
            ['idle-up', 8],
            ['move-up-1', 8],
            ['idle-up', 8],
            ['move-up-2', 8],
        ],
        [DIRECTION.DOWN]: [
            ['idle-down', 8],
            ['move-down-1', 8],
            ['idle-down', 8],
            ['move-down-2', 8],
        ],
    },
};
