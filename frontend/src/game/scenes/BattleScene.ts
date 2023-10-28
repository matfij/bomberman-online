import { Camera } from '../../engine/Camera';
import { Scene } from '../../engine/Scene';
import { LevelMap } from '../entities/LevelMap';

export class BattleScene extends Scene {
    private stage: LevelMap;

    constructor(camera: Camera) {
        super();
        camera.startPosition = { x: 1, y: 1 };
        this.stage = new LevelMap();
    }

    update(time: number, context: CanvasRenderingContext2D, camera: Camera) {
        // Add your main update calls here
    }

    draw(context: CanvasRenderingContext2D, camera: Camera) {
        this.stage.draw(context, camera);
    }

    cleanUp() {
        // Can be used to clean
    }
}
