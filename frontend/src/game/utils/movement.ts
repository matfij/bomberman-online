import { Point } from '../../engine/definitions/types';

export const isZero = (point: Point): boolean => point.x === 0 && point.y === 0;
