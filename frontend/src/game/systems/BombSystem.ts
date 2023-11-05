import { Camera } from '../../engine/Camera';
import { Point, TimeFrame } from '../../engine/definitions/types';
import { FLAME_DIRECTION_LOOKUP } from '../constants/bomb';
import { TileType } from '../constants/levelData';
import { FlameCell } from '../definitions/interfaces';
import { Bomb } from '../entities/Bomb';
import { BombExplosion } from '../entities/BombExplosion';

export class BombSystem {
    bombs: Array<Bomb | BombExplosion> = [];
    collisionMap: TileType[][];

    constructor(collisionMap: TileType[][]) {
        this.collisionMap = collisionMap;
    }

    add = (position: Point, power: number, time: TimeFrame, onBombExploded: () => void) => {
        this.bombs.push(
            new Bomb(position, time, (bomb) => {
                this.handleBombExploded(bomb, power, time);
                onBombExploded();
            }),
        );
        this.collisionMap[position.y][position.x] = TileType.Bomb;
    };

    private handleBombExploded = (bomb: Bomb, power: number, time: TimeFrame) => {
        const ind = this.bombs.indexOf(bomb);
        if (ind < 0) {
            return;
        }
        const flameCells = this.getFlameCells(bomb.position, power, time);
        this.bombs[ind] = new BombExplosion(bomb.position, flameCells, time, this.remove);
        this.collisionMap[bomb.position.y][bomb.position.x] = TileType.Flame;
        flameCells.forEach(
            (flameCell) => (this.collisionMap[flameCell.position.y][flameCell.position.x] = TileType.Flame),
        );
    };

    private getFlameCells(position: Point, power: number, time: TimeFrame) {
        const flameCells: FlameCell[] = [];
        FLAME_DIRECTION_LOOKUP.forEach(([rowOffset, colOffset]) => {
            const cells = this.getFlameCellsFor(position, power, rowOffset, colOffset);
            if (cells.length > 0) {
                flameCells.push(...cells);
            }
        });
        return flameCells;
    }

    private getFlameCellsFor(position: Point, power: number, rowOffset: number, colOffset: number) {
        const flameCells: FlameCell[] = [];
        let cell = { ...position };
        for (let offset = 1; offset <= power; offset++) {
            cell.y += rowOffset;
            cell.x += colOffset;
            if (
                this.collisionMap[cell.y][cell.x] !== TileType.Empty
            ) {
                break;
            }
            flameCells.push({
                position: { ...cell },
                isVertical: rowOffset !== 0,
                isLast: offset === power,
            });
        }
        return flameCells;
    }

    remove = (bombExplosion: BombExplosion) => {
        const ind = this.bombs.indexOf(bombExplosion);
        if (ind < 0) {
            return;
        }
        this.bombs.splice(ind, 1);
        this.collisionMap[bombExplosion.position.y][bombExplosion.position.x] = TileType.Empty;
        bombExplosion.cells.forEach(
            (flameCell) => (this.collisionMap[flameCell.position.y][flameCell.position.x] = TileType.Empty),
        );
    };

    update(time: TimeFrame) {
        this.bombs.forEach((bomb) => bomb.update(time));
    }

    draw(context: CanvasRenderingContext2D, camera: Camera) {
        this.bombs.forEach((bomb) => bomb.draw(context, camera));
    }
}
