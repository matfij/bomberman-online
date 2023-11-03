import { Camera } from '../../engine/Camera';
import { drawTile } from '../../engine/context';
import { Point, TimeFrame } from '../../engine/definitions/types';
import { BOMB_ANIMATION, BOMB_BASE_FRAME, BOMB_FRAME_DELAY, BOMB_TTL_MS } from '../constants/bomb';
import { TILE_SIZE } from '../constants/game';

export class Bomb {
    position: Point;
    image: HTMLImageElement;
    animationFrame = 0;
    animationTimer;
    ttl;
    onEnd: (bomb: Bomb) => void;

    constructor(position: Point, time: TimeFrame, onEnd: (bomb: Bomb) => void) {
        this.position = position;
        this.image = document.querySelector<HTMLImageElement>('img#stage')!;
        this.animationTimer = time.previous + BOMB_FRAME_DELAY;
        this.ttl = time.previous + BOMB_TTL_MS;
        this.onEnd = onEnd;
    }

    private updateAnimation(time: TimeFrame) {
        if (time.previous < this.animationTimer) {
            return;
        }
        this.animationFrame += 1;
        if (this.animationFrame >= BOMB_ANIMATION.length) {
            this.animationFrame = 0;
        }
        this.animationTimer = time.previous + BOMB_FRAME_DELAY;
    }

    private updateFuse(time: TimeFrame) {
        if (time.previous < this.ttl) {
            return;
        }
        this.onEnd(this);
    }

    update(time: TimeFrame) {
        this.updateAnimation(time);
        this.updateFuse(time);
    }

    draw(context: CanvasRenderingContext2D, camera: Camera) {
        drawTile(
            context,
            this.image,
            BOMB_BASE_FRAME + BOMB_ANIMATION[this.animationFrame],
            this.position.x * TILE_SIZE - camera.position.x,
            this.position.y * TILE_SIZE - camera.position.y,
            TILE_SIZE,
        );
    }
}
