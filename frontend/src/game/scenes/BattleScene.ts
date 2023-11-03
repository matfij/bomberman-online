import { Camera } from '../../engine/Camera';
import { Scene } from '../../engine/Scene';
import { TimeFrame } from '../../engine/definitions/types';
import { BattleHud } from '../entities/BattleHud';
import { Bomberman } from '../entities/Bomberman';
import { LevelMap } from '../entities/LevelMap';
import { BombSystem } from '../systems/BombSystem';

export class BattleScene extends Scene {
    private hud: BattleHud;
    private stage: LevelMap;
    private player: Bomberman;
    private bombSystem: BombSystem;

    constructor(time: TimeFrame, camera: Camera) {
        super();
        camera.position = { x: 8, y: -24 };
        this.hud = new BattleHud({ x: 0, y: 0 });
        this.stage = new LevelMap();
        this.bombSystem = new BombSystem(this.stage.collisionMap);
        this.player = new Bomberman({ x: 2, y: 1 }, time, this.stage.collisionMap, this.bombSystem.add);
    }

    update(time: TimeFrame, context: CanvasRenderingContext2D, camera: Camera) {
        this.bombSystem.update(time);
        this.player.update(time);
    }

    draw(context: CanvasRenderingContext2D, camera: Camera) {
        this.hud.draw(context);
        this.stage.draw(context, camera);
        this.bombSystem.draw(context, camera);
        this.player.draw(context, camera);
    }
}
