import { Point } from '../definitions/types';

export const distance = (pointA: Point, pointB: Point): number => {
    const distanceX = pointA.x - pointB.x;
    const distanceY = pointA.y - pointB.y;

    return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
};

export const radians = (pointA: Point, pointB: Point): number => {
    const dy = pointB.y - pointA.y;
    const dx = pointB.x - pointA.x;

    return Math.atan2(-dy, -dx);
};

export const toDegrees = (radians: number): number => {
    return (radians * 180) / Math.PI;
};

export const toRadians = (degrees: number): number => {
    return (degrees * Math.PI) / 180;
};

export const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(min, value), max);
};

export const lerp = (min: number, max: number, value: number): number => {
    return min + value * (max - min);
};
