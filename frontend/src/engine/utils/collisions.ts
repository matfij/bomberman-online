import { Circle, Point, Rect } from '../definitions/types';
import { distance } from './maths';

export const pointRectangleOverlap = (point: Point, rect: Rect): boolean => {
    return (
        point.x >= rect.x &&
        point.x <= rect.x + rect.width &&
        point.y >= rect.y &&
        point.y <= rect.y + rect.height
    );
};

export const pointCircleOverlap = (point: Point, circle: Circle): boolean => {
    return distance(point, circle) <= circle.radius;
};

export const rectanglesOverlap = (rectA: Rect, rectB: Rect): boolean => {
    return (
        rectA.x + rectA.width >= rectB.x &&
        rectA.x <= rectB.x + rectB.width &&
        rectA.y + rectA.height >= rectB.y &&
        rectA.y <= rectB.y + rectB.height
    );
};

export const circlesOverlap = (circleA: Circle, circleB: Circle) => {
    const radii = circleA.radius + circleB.radius;
    return distance(circleA, circleB) <= radii;
};
