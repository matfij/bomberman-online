import { GameEntity } from '../../engine/Entity';
import { drawTile } from '../../engine/context';
import { TILE_SIZE } from '../constants/game';
import { TILE_MAP } from '../constants/levelData';
export class LevelMap extends GameEntity {
    constructor() {
        super({ x: 0, y: 0 });
        this.tileMap = [...TILE_MAP];
        this.stageImage = new OffscreenCanvas(1024, 1024);
        this.image = document.querySelector('img#stage');
        this.buildImage();
    }
    buildImage() {
        for (let row = 0; row < this.tileMap.length; row++) {
            for (let col = 0; col < this.tileMap[0].length; col++) {
                const tile = this.tileMap[row][col];
                this.updateStageImageAt(col, row, tile);
            }
        }
    }
    updateStageImageAt(col, row, tile) {
        const context = this.stageImage.getContext('2d');
        drawTile(context, this.image, tile, row * TILE_SIZE, col * TILE_SIZE, TILE_SIZE);
    }
    update(time, context, camera) {
        // Add your main update calls here
    }
    draw(context, camera) {
        // Add your main draw calls here
    }
}
