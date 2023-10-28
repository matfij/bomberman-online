import { Scene } from '../../engine/Scene';
import { LevelMap } from '../entities/LevelMap';
export class BattleScene extends Scene {
    constructor(camera) {
        super();
        camera.startPosition = { x: 1, y: 1 };
        this.stage = new LevelMap();
    }
    update(time, context, camera) {
        // Add your main update calls here
    }
    draw(context, camera) {
        this.stage.draw(context, camera);
    }
    cleanUp() {
        // Can be used to clean
    }
}
