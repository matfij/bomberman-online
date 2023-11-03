import { Camera } from '../../engine/Camera';
import { TimeFrame } from '../../engine/definitions/types';

export interface State<T> {
    type: T;
    init: (time: TimeFrame) => void;
    update: (time: TimeFrame) => void;
}

export interface Tile {
    row: number;
    column: number;
}

export interface Bomb {
    update: (time: TimeFrame) => void;
    draw: (context: CanvasRenderingContext2D, camera: Camera) => void;
}
