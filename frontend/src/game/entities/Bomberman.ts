import { Camera } from '../../engine/Camera';
import { GameEntity } from '../../engine/Entity';
import { drawFrameOrigin } from '../../engine/context';
import { Point, TimeFrame } from '../../engine/definitions/types';
import { BOMBERMAN_ANIMATIONS, BOMBERMAN_FRAMES, BombermanState } from '../constants/bomberman';
import { DIRECTION } from '../constants/entities';
import { FRAME_TIME, TILE_SIZE } from '../constants/game';
import { State } from '../definitions/interfaces';

export class Bomberman extends GameEntity {
    image: HTMLImageElement;
    direction = DIRECTION.DOWN;
    baseSpeedTime = 1.2;
    speedultiplier = 1;
    animation = BOMBERMAN_ANIMATIONS.moveAnimations[this.direction];
    currentState?: State<BombermanState>;
    states: Record<BombermanState, State<BombermanState>>;

    constructor(position: Point, time: TimeFrame) {
        super({ x: position.x * TILE_SIZE + TILE_SIZE / 2, y: position.y * TILE_SIZE + TILE_SIZE / 2 });
        this.image = document.querySelector<HTMLImageElement>('img#bomberman')!;
        this.states = {
            [BombermanState.IDLE]: {
                type: BombermanState.IDLE,
                init: this.handleIdleInit,
                update: this.handleIdleUpdate,
            },
            [BombermanState.MOVING]: {
                type: BombermanState.MOVING,
                init: this.handleIdleInit,
                update: this.handleIdleUpdate,
            },
        };
        this.changeState(BombermanState.IDLE, time);
    }

    private handleIdleInit = () => {
        this.velocity = { x: 0, y: 0 };
    };

    private handleIdleUpdate = () => {};

    private changeState(newState: BombermanState, time: TimeFrame) {
        this.currentState = this.states[newState];
        this.animationFrame = 0;
        console.log(time, this.animation)
        this.animationTimer = time.previous + +this.animation[this.animationFrame] * FRAME_TIME;
        this.currentState.init(time);
    }

    update(time: TimeFrame) {
        this.currentState?.update(time);
    }

    draw(context: CanvasRenderingContext2D, camera: Camera) {
        const [frameKey] = this.animation[this.animationFrame];
        const frame = BOMBERMAN_FRAMES.get(frameKey.toString())!;
        drawFrameOrigin(
            context,
            this.image,
            frame,
            Math.floor(this.position.x - camera.position.x),
            Math.floor(this.position.y - camera.position.y),
            [this.direction === DIRECTION.RIGHT ? -1 : 1, 1],
        );
    }
}
