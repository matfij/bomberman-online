import { Camera } from '../../engine/Camera';
import { Scene } from '../../engine/Scene';
import { TimeFrame } from '../../engine/definitions/types';
import { BattleHud } from '../entities/BattleHud';
import { Bomberman } from '../entities/Bomberman';
import { LevelMap } from '../entities/LevelMap';

export class BattleScene extends Scene {
    private hud: BattleHud;
    private stage: LevelMap;
    private player: Bomberman;

    constructor(time: TimeFrame, camera: Camera) {
        super();
        camera.position = { x: 8, y: -24 };
        this.hud = new BattleHud({ x: 0, y: 0 });
        this.stage = new LevelMap();
        this.player = new Bomberman({ x: 2, y: 1 }, time);
    }

    update(time: TimeFrame, context: CanvasRenderingContext2D, camera: Camera) {
        this.player.update(time);
    }

    draw(context: CanvasRenderingContext2D, camera: Camera) {
        this.hud.draw(context);
        this.stage.draw(context, camera);
        this.player.draw(context, camera);
    }
}
