import { Game } from '../engine/Game';
import { Scene } from '../engine/definitions/interfaces';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './constants/game';
import { BattleScene } from './scenes/BattleScene';

export class BombermanGame extends Game {
    scene: Scene;

    constructor() {
        super('body', SCREEN_WIDTH, SCREEN_HEIGHT);
        this.scene = new BattleScene(this.frameTime, this.camera) as unknown as Scene;
    }
}
