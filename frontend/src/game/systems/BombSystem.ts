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

    add = (position: Point, time: TimeFrame, onBombExploded: () => void) => {
        this.bombs.push(
            new Bomb(position, time, (bomb) => {
                this.remove(bomb);
                onBombExploded();
            }),
        );
        this.collisionMap[position.y][position.x] = TileType.Wall;
    };

    remove = (bomb: Bomb) => {
        const ind = this.bombs.indexOf(bomb);
        if (ind < 0) {
            return;
        }
        this.bombs.splice(ind, 1);
        this.collisionMap[bomb.position.y][bomb.position.x] = TileType.Empty;
    };

    update(time: TimeFrame) {
        this.bombs.forEach((bomb) => bomb.update(time));
    }

    draw(context: CanvasRenderingContext2D, camera: Camera) {
        this.bombs.forEach((bomb) => bomb.draw(context, camera));
    }
}
