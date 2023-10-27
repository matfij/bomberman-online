import { Camera } from '../Camera';
import { TimeFrame } from './types';

export interface Scene {
    update: (timeFrame: TimeFrame, context: CanvasRenderingContext2D, camera: Camera) => void;
    draw: (context: CanvasRenderingContext2D, camera: Camera) => void;
}
