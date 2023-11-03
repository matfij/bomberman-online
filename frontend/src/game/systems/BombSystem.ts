import { Camera } from '../../engine/Camera';
import { Point, TimeFrame } from '../../engine/definitions/types';
import { TileType } from '../constants/levelData';
import { Bomb } from '../entities/Bomb';

export class BombSystem {
    bombs: Bomb[] = [];
    collisionMap: TileType[][];

    constructor(collisionMap: TileType[][]) {
        this.collisionMap = collisionMap;
    }

    add = (position: Point, time: TimeFrame) => {
        this.bombs.push(new Bomb(position, time, this.remove));
    };

    remove = (bomb: Bomb) => {};

    update(time: TimeFrame) {
        this.bombs.forEach((bomb) => bomb.update(time));
    }

    draw(context: CanvasRenderingContext2D, camera: Camera) {
        this.bombs.forEach((bomb) => bomb.draw(context, camera));
    }
}
