import { Point } from './definitions/types';

export class GameEntity {
    position = { x: 0, y: 0 };
    velocity = { x: 0, y: 0 };

    animationFrame = 0;
    animationTimer = 0;

    image = new Image();

    constructor(position: Point) {
        this.position = position;
    }
}
