import { Camera } from '../../engine/Camera';
import { GameEntity } from '../../engine/Entity';
import { drawFrameOrigin } from '../../engine/context';
import { Point, TimeFrame, Velocity } from '../../engine/definitions/types';
import { isControlPressed, isDown, isLeft, isRight, isUp } from '../../engine/inputHandler';
import { BOMBERMAN_ANIMATIONS, BOMBERMAN_FRAMES, BombermanState, WALK_SPEED } from '../constants/bomberman';
import { Control } from '../constants/controls';
import { COUNTER_DIRECTIONS_LOOKUP, Direction, MOVEMENT_LOOKUP } from '../constants/entities';
import { FRAME_TIME, TILE_SIZE } from '../constants/game';
import { COLLISION_MAP, TileType } from '../constants/levelData';
import { State, Tile } from '../definitions/interfaces';
import { isCollisionTile, isZero } from '../utils/movement';
import { Bomb } from './Bomb';

export class Bomberman extends GameEntity {
    readonly CONTROL_ID = 0;
    image: HTMLImageElement;
    direction = Direction.Down;
    baseSpeedTime = WALK_SPEED;
    speedultiplier = 1.2;
    animation = BOMBERMAN_ANIMATIONS.moveAnimations[this.direction];
    currentState?: State<BombermanState>;
    states: Record<BombermanState, State<BombermanState>>;
    collisionMap: TileType[][];
    bombPower = 2;
    bombAmount = 3;
    availableBombs = this.bombAmount;
    onBombPlaced: (
        point: Point,
        bombPower: number,
        time: TimeFrame,
        onBombExploded: (bomb: Bomb) => void,
    ) => void;
    lastBombPosition?: Point;

    constructor(position: Point, time: TimeFrame, collisionMap: TileType[][], onBombPlaced: () => {}) {
        super({ x: position.x * TILE_SIZE + TILE_SIZE / 2, y: position.y * TILE_SIZE + TILE_SIZE / 2 });
        this.image = document.querySelector<HTMLImageElement>('img#bomberman')!;
        this.collisionMap = collisionMap;
        this.onBombPlaced = onBombPlaced;
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
        const vel = this.handleState(time);
        if (isZero(vel)) {
            return;
        }
        this.changeState(BombermanState.MOVING, time);
    };

    private handleMovingInit = () => {
        this.animationFrame = 1;
    };

    private handleMovingUpdate = (time: TimeFrame) => {
        const vel = this.handleState(time);
        if (!isZero(vel)) {
            return;
        }
        this.changeState(BombermanState.IDLE, time);
    };

    private handleState = (time: TimeFrame): Velocity => {
        if (isControlPressed(this.CONTROL_ID, Control.ACTION)) {
            this.handleBombPlacement(time);
        }
        const [dir, vel] = this.getMovement();
        this.animation = BOMBERMAN_ANIMATIONS.moveAnimations[dir];
        this.direction = dir;
        this.velocity = vel;
        return vel;
    };

    private handleBombPlacement(time: TimeFrame) {
        if (this.availableBombs < 1) {
            return;
        }
        const playerPoint: Point = {
            x: Math.floor(this.position.x / TILE_SIZE),
            y: Math.floor(this.position.y / TILE_SIZE),
        };
        if (this.collisionMap[playerPoint.y][playerPoint.x] !== TileType.Empty) {
            return;
        }
        this.availableBombs -= 1;
        this.onBombPlaced(playerPoint, this.bombPower, time, this.handleBombExploded);
        this.lastBombPosition = playerPoint;
    }

    handleBombExploded = () => {
        if (this.availableBombs < this.bombAmount) {
            this.availableBombs += 1;
        }
    };

    private getMovement(): [Direction, Velocity] {
        if (isLeft(this.CONTROL_ID)) {
            return this.checkCollisions(Direction.Left);
        } else if (isRight(this.CONTROL_ID)) {
            return this.checkCollisions(Direction.Right);
        } else if (isUp(this.CONTROL_ID)) {
            return this.checkCollisions(Direction.Up);
        } else if (isDown(this.CONTROL_ID)) {
            return this.checkCollisions(Direction.Down);
        }
        return [this.direction, { x: 0, y: 0 }];
    }

    private checkCollisions(direction: Direction): [Direction, Point] {
        const collisionCoords = this.getCollisionCoords(direction);
        if (this.shouldBlockMovement(collisionCoords)) {
            return [direction, { x: 0, y: 0 }];
        }
        const counterDirections = COUNTER_DIRECTIONS_LOOKUP[direction];
        if (isCollisionTile(this.getCollisionTile(collisionCoords[0]))) {
            return [counterDirections[0], { ...MOVEMENT_LOOKUP[counterDirections[0]] }];
        }
        if (isCollisionTile(this.getCollisionTile(collisionCoords[1]))) {
            return [counterDirections[1], { ...MOVEMENT_LOOKUP[counterDirections[1]] }];
        }
        return [direction, { ...MOVEMENT_LOOKUP[direction] }];
    }

    private getCollisionCoords(direction: Direction): [Tile, Tile] {
        switch (direction) {
            case Direction.Up:
                return [
                    {
                        row: Math.floor((this.position.y - 9) / TILE_SIZE),
                        column: Math.floor((this.position.x - 8) / TILE_SIZE),
                    },
                    {
                        row: Math.floor((this.position.y - 9) / TILE_SIZE),
                        column: Math.floor((this.position.x + 7) / TILE_SIZE),
                    },
                ];
            case Direction.Left:
                return [
                    {
                        row: Math.floor((this.position.y - 8) / TILE_SIZE),
                        column: Math.floor((this.position.x - 9) / TILE_SIZE),
                    },
                    {
                        row: Math.floor((this.position.y + 7) / TILE_SIZE),
                        column: Math.floor((this.position.x - 9) / TILE_SIZE),
                    },
                ];
            case Direction.Right:
                return [
                    {
                        row: Math.floor((this.position.y - 8) / TILE_SIZE),
                        column: Math.floor((this.position.x + 8) / TILE_SIZE),
                    },
                    {
                        row: Math.floor((this.position.y + 7) / TILE_SIZE),
                        column: Math.floor((this.position.x + 8) / TILE_SIZE),
                    },
                ];
            case Direction.Down:
                return [
                    {
                        row: Math.floor((this.position.y + 8) / TILE_SIZE),
                        column: Math.floor((this.position.x - 8) / TILE_SIZE),
                    },
                    {
                        row: Math.floor((this.position.y + 8) / TILE_SIZE),
                        column: Math.floor((this.position.x + 7) / TILE_SIZE),
                    },
                ];
        }
    }

    private shouldBlockMovement(collisionCoords: [Tile, Tile]) {
        const tileCoordsMatch =
            collisionCoords[0].column === collisionCoords[1].column &&
            collisionCoords[0].row === collisionCoords[1].row;
        const collisionTiles = [
            this.getCollisionTile(collisionCoords[0]),
            this.getCollisionTile(collisionCoords[1]),
        ];
        if (
            (tileCoordsMatch && collisionTiles[0] >= TileType.Wall) ||
            (collisionTiles[0] >= TileType.Wall && collisionTiles[1] >= TileType.Wall)
        ) {
            return true;
        }
        return false;
    }

    private getCollisionTile(tile: Tile) {
        if (
            this.lastBombPosition &&
            this.lastBombPosition.x === tile.column &&
            this.lastBombPosition.y === tile.row
        ) {
            return TileType.Empty;
        }
        return COLLISION_MAP[tile.row][tile.column];
    }

    private changeState(newState: BombermanState, time: TimeFrame) {
        this.currentState = this.states[newState];
        this.animationFrame = 0;
        this.currentState.init(time);
        this.animationTimer = time.previous + +this.animation[this.animationFrame][1] * FRAME_TIME;
    }

    update(time: TimeFrame) {
        this.updatePosition(time);
        this.currentState?.update(time);
        this.updateAnimation(time);
        this.resetLastBombCell();
    }

    private updatePosition(time: TimeFrame) {
        this.position.x += this.velocity.x * this.baseSpeedTime * this.speedultiplier * time.secondsPassed;
        this.position.y += this.velocity.y * this.baseSpeedTime * this.speedultiplier * time.secondsPassed;
    }

    private updateAnimation(time: TimeFrame) {
        if (time.previous < this.animationTimer || this.currentState?.type === BombermanState.IDLE) {
            return;
        }
        this.animationFrame += 1;
        if (this.animationFrame >= this.animation.length) {
            this.animationFrame = 0;
        }
        this.animationTimer = time.previous + +this.animation[this.animationFrame][1] * FRAME_TIME;
    }

    private resetLastBombCell() {
        if (!this.lastBombPosition) {
            return;
        }
        const playerPoint = {
            row: Math.floor(this.position.y / TILE_SIZE),
            col: Math.floor(this.position.x / TILE_SIZE),
        };
        if (playerPoint.row === this.lastBombPosition.y && playerPoint.col === this.lastBombPosition.x) {
            return;
        }
        this.lastBombPosition = undefined;
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
            [this.direction === Direction.Right ? -1 : 1, 1],
        );
    }
}
