import { Game } from '../engine/Game';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './constants/game';
import { BattleScene } from './scenes/BattleScene';
export class BombermanGame extends Game {
    constructor() {
        super('body', SCREEN_WIDTH, SCREEN_HEIGHT);
        this.scene = new BattleScene(this.camera);
    }
}
