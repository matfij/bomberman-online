import { Camera } from '../../engine/Camera';
import { drawTile } from '../../engine/context';
import { Point, TimeFrame } from '../../engine/definitions/types';
import {
    BOMB_BASE_FRAME,
    EXPLOSION_ANIMATIONS,
    EXPLOSION_BASE_BOTTOM_END_FRAME,
    EXPLOSION_BASE_HOR_FRAME,
    EXPLOSION_BASE_LEFT_END_FRAME,
    EXPLOSION_BASE_RIGHT_END_FRAME,
    EXPLOSION_BASE_TOP_END_FRAME,
    EXPLOSION_BASE_VER_FRAME,
    EXPLOSION_FRAME_DELAY,
    FLAME_ANIMATION,
} from '../constants/bomb';
import { TILE_SIZE } from '../constants/game';
import { FlameCell } from '../definitions/interfaces';

export class BombExplosion {
    image: HTMLImageElement;
    position: Point;
    animationFrame = 0;
    animationTimer: number;
    cells: FlameCell[];
    onEnd: (bombExplosion: BombExplosion) => void;

    constructor(
        position: Point,
        cells: FlameCell[],
        time: TimeFrame,
        onEnd: (bombExplosion: BombExplosion) => void,
    ) {
        this.image = document.querySelector('img#stage')!;
        this.position = position;
        this.animationTimer = time.previous + EXPLOSION_FRAME_DELAY;
        this.cells = cells;
        this.onEnd = onEnd;
    }

    update(time: TimeFrame) {
        if (time.previous < this.animationTimer) {
            return;
        }
        this.animationFrame += 1;
        this.animationTimer = time.previous + EXPLOSION_FRAME_DELAY;
        if (this.animationFrame < EXPLOSION_ANIMATIONS.length) {
            return;
        }
        this.animationFrame = 0;
        this.onEnd(this);
    }

    draw(context: CanvasRenderingContext2D, camera: Camera) {
        drawTile(
            context,
            this.image,
            BOMB_BASE_FRAME + EXPLOSION_ANIMATIONS[this.animationFrame],
            this.position.x * TILE_SIZE - camera.position.x,
            this.position.y * TILE_SIZE - camera.position.y,
            TILE_SIZE,
        );
        this.cells.forEach((cell) => {
            const baseFrame = this.getBaseFrame(cell);
            drawTile(
                context,
                this.image,
                baseFrame! + FLAME_ANIMATION[this.animationFrame],
                cell.position.x * TILE_SIZE - camera.position.x,
                cell.position.y * TILE_SIZE - camera.position.y,
                TILE_SIZE,
            );
        });
    }

    private getBaseFrame(flameCell: FlameCell) {
        if (!flameCell.isVertical && !flameCell.isLast) {
            return EXPLOSION_BASE_HOR_FRAME;
        }
        if (flameCell.isVertical && !flameCell.isLast) {
            return EXPLOSION_BASE_VER_FRAME;
        }
        if (!flameCell.isVertical && flameCell.isLast) {
            return flameCell.position.x < this.position.x
                ? EXPLOSION_BASE_LEFT_END_FRAME
                : EXPLOSION_BASE_RIGHT_END_FRAME;
        }
        if (flameCell.isVertical && flameCell.isLast) {
            return flameCell.position.y < this.position.y
                ? EXPLOSION_BASE_TOP_END_FRAME
                : EXPLOSION_BASE_BOTTOM_END_FRAME;
        }
    }
}
