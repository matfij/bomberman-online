import { Camera } from '../../engine/Camera';
import { GameEntity } from '../../engine/Entity';
import { drawFrameOrigin } from '../../engine/context';
import { Point, TimeFrame, Velocity } from '../../engine/definitions/types';
import { isDown, isLeft, isRight, isUp } from '../../engine/inputHandler';
import { BOMBERMAN_ANIMATIONS, BOMBERMAN_FRAMES, BombermanState, WALK_SPEED } from '../constants/bomberman';
import { DIRECTION } from '../constants/entities';
import { FRAME_TIME, TILE_SIZE } from '../constants/game';
import { State } from '../definitions/interfaces';
import { isZero } from '../utils/movement';

export class Bomberman extends GameEntity {
    readonly CONTROL_ID = 0;
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
                init: this.handleMovingInit,
                update: this.handleMovingUpdate,
            },
        };
        this.changeState(BombermanState.IDLE, time);
    }

    private handleIdleInit = () => {
        this.velocity = { x: 0, y: 0 };
    };

    private handleIdleUpdate = (time: TimeFrame) => {
        const vel = this.handleState();
        if (isZero(vel)) {
            return;
        }
        this.changeState(BombermanState.MOVING, time);
    };

    private handleMovingInit = () => {
        this.animationFrame = 1;
    };

    private handleMovingUpdate = (time: TimeFrame) => {
        const vel = this.handleState();
        if (!isZero(vel)) {
            return;
        }
        this.changeState(BombermanState.IDLE, time);
    };

    private handleState = (): Velocity => {
        const [dir, vel] = this.getMovement();
        this.animation = BOMBERMAN_ANIMATIONS.moveAnimations[dir];
        this.direction = dir;
        this.velocity = vel;
        return vel;
    };

    private getMovement(): [string, Velocity] {
        if (isLeft(this.CONTROL_ID)) {
            return [DIRECTION.LEFT, { x: -WALK_SPEED, y: 0 }];
        } else if (isRight(this.CONTROL_ID)) {
            return [DIRECTION.RIGHT, { x: WALK_SPEED, y: 0 }];
        } else if (isUp(this.CONTROL_ID)) {
            return [DIRECTION.UP, { x: 0, y: -WALK_SPEED }];
        } else if (isDown(this.CONTROL_ID)) {
            return [DIRECTION.DOWN, { x: 0, y: WALK_SPEED }];
        }
        return [this.direction, { x: 0, y: 0 }];
    }

    private changeState(newState: BombermanState, time: TimeFrame) {
        this.currentState = this.states[newState];
        this.animationFrame = 0;
        this.animationTimer = time.previous + +this.animation[this.animationFrame] * FRAME_TIME;
        this.currentState.init(time);
    }

    update(time: TimeFrame) {
        this.updatePosition(time);
        this.currentState?.update(time);
        this.updateAnimation(time);
    }

    private updatePosition(time: TimeFrame) {
        this.position.x += (this.velocity.x * this.baseSpeedTime * this.speedultiplier) * time.secondsPassed;
        this.position.y += (this.velocity.y * this.baseSpeedTime * this.speedultiplier) * time.secondsPassed;
    }

    private updateAnimation(time: TimeFrame) {
        if (time.previous < this.animationTimer || isZero(this.velocity)) {
            return;
        }
        this.animationFrame += 1;
        if (this.animationFrame >= this.animation.length) {
            this.animationFrame = 0;
        }
        this.animationTimer = time.previous + +this.animation[this.animationFrame][1] * FRAME_TIME;
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
