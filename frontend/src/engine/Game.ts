import { pollGamepads, registerGamepadEvents, registerKeyEvents } from './inputHandler';
import { getContext } from './context';
import { Camera } from './Camera';
import { Scene } from './definitions/interfaces';
import { TimeFrame } from './definitions/types';

export class Game {
    context: CanvasRenderingContext2D;
    scene?: Scene;
    camera = new Camera(0, 0);
    frameTime: TimeFrame;

    constructor(selector: string, width: number, height: number) {
        this.context = getContext(selector, width, height);
        this.camera.setDimensions({ width: width, height: height });
        this.frameTime = {
            previous: 0,
            secondsPassed: 0,
        };
    }

    frame = (time: number) => {
        window.requestAnimationFrame(this.frame);

        this.frameTime.secondsPassed = (time - this.frameTime.previous) / 1000;
        this.frameTime.previous = time;

        pollGamepads();
        this.scene!.update(this.frameTime, this.context, this.camera);
        this.scene!.draw(this.context, this.camera);
    };

    start() {
        registerKeyEvents();
        registerGamepadEvents();
        window.requestAnimationFrame(this.frame);
    }
}
