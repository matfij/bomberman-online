import { GameEntity } from '../../engine/Entity';
import { Point } from '../../engine/definitions/types';
import { SCREEN_WIDTH } from '../constants/game';

export class BattleHud extends GameEntity {
    image: HTMLImageElement;

    constructor(position: Point) {
        super(position);
        this.image = document.querySelector<HTMLImageElement>('img#hud')!;
    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, 8, 40, SCREEN_WIDTH, 24, 0, 0, SCREEN_WIDTH, 24);
    }
}
