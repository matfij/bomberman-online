export const distance = (pointA, pointB) => {
    const distanceX = pointA.x - pointB.x;
    const distanceY = pointA.y - pointB.y;
    return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
};
export const radians = (pointA, pointB) => {
    const dy = pointB.y - pointA.y;
    const dx = pointB.x - pointA.x;
    return Math.atan2(-dy, -dx);
};
export const toDegrees = (radians) => {
    return (radians * 180) / Math.PI;
};
export const toRadians = (degrees) => {
    return (degrees * Math.PI) / 180;
};
export const clamp = (value, min, max) => {
    return Math.min(Math.max(min, value), max);
};
export const lerp = (min, max, value) => {
    return min + value * (max - min);
};
