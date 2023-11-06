import { Point, TimeFrame } from '../../engine/definitions/types';

export interface State<T> {
    type: T;
    init: (time: TimeFrame) => void;
    update: (time: TimeFrame) => void;
}

export interface Tile {
    row: number;
    col: number;
}

export interface FlameCell {
    position: Point;
    isVertical: boolean;
    isLast: boolean;
}
