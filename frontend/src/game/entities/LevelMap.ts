import { Camera } from '../../engine/Camera';
import { GameEntity } from '../../engine/Entity';
import { drawTile } from '../../engine/context';
import { TimeFrame } from '../../engine/definitions/types';
import { TILE_SIZE } from '../constants/game';
import { TILE_MAP } from '../constants/levelData';

export class LevelMap extends GameEntity {
    private readonly tileMap = [...TILE_MAP];
    private stageImage = new OffscreenCanvas(1024, 1024);
    image: HTMLImageElement;

    constructor() {
        super({ x: 0, y: 0 });
        this.image = document.querySelector<HTMLImageElement>('img#stage')!;
        this.buildImage();
    }

    buildImage() {
        for (let row = 0; row < this.tileMap.length; row++) {
            for (let col = 0; col < this.tileMap[0].length; col++) {
                const tile = this.tileMap[row][col];
                this.updateStageImageAt(row, col, tile);
            }
        }
    }

    updateStageImageAt(col: number, row: number, tile: number) {
        const context = this.stageImage.getContext('2d')!;
        drawTile(context, this.image, tile, row * TILE_SIZE, col * TILE_SIZE, TILE_SIZE);
    }

    update = (time: TimeFrame, context: CanvasRenderingContext2D, camera: Camera) => undefined;

    draw(context: CanvasRenderingContext2D, camera: Camera) {
        context.drawImage(this.stageImage, -camera.position.x, -camera.position.y);
    }
}
