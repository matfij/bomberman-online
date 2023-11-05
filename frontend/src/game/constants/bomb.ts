import { FRAME_TIME } from './game';

export const BOMB_BASE_FRAME = 187;
export const BOMB_TTL_MS = 3000;
export const BOMB_FRAME_DELAY = 16 * FRAME_TIME;
export const BOMB_ANIMATION = [0, 1, 2, 1];

export const FLAME_DIRECTION_LOOKUP = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
];
export const FLAME_ANIMATION = [0, 1, 2, 3, 2, 1, 0];
export const EXPLOSION_FRAME_DELAY = 4 * FRAME_TIME;
export const EXPLOSION_ANIMATIONS = [3, 29, 30, 31, 30, 29, 28];
export const EXPLOSION_BASE_FRAME = 187;
export const EXPLOSION_BASE_HOR_FRAME = EXPLOSION_BASE_FRAME + 88;
export const EXPLOSION_BASE_VER_FRAME = EXPLOSION_BASE_FRAME + 60;
export const EXPLOSION_BASE_RIGHT_END_FRAME = EXPLOSION_BASE_FRAME + 56;
export const EXPLOSION_BASE_LEFT_END_FRAME = EXPLOSION_BASE_FRAME + 84;
export const EXPLOSION_BASE_TOP_END_FRAME = EXPLOSION_BASE_FRAME + 4;
export const EXPLOSION_BASE_BOTTOM_END_FRAME = EXPLOSION_BASE_FRAME + 32;

