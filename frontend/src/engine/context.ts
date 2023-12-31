import { FrameDimensions, FrameOrigin } from './definitions/types';

export const getContext = (parentSelector = 'body', width = 256, height = 256) => {
    const parentElement = document.querySelector(parentSelector);

    if (!parentElement) {
        throw new Error('Unable to find parent element');
    }

    const canvas = document.createElement('canvas');
    parentElement.appendChild(canvas);

    const context = canvas.getContext('2d');

    if (!context) {
        throw new Error('Unable to find canvas context');
    }

    context.canvas.width = width;
    context.canvas.height = height;
    context.imageSmoothingEnabled = false;

    return context;
};

export function drawFrame(
    context: CanvasRenderingContext2D,
    image: CanvasImageSource,
    dimensions: FrameDimensions,
    destX: number,
    destY: number,
    scale = [1, 1],
) {
    context.scale(scale[0], scale[1]);
    context.drawImage(
        image,
        dimensions.sourceX,
        dimensions.sourceY,
        dimensions.sourceWidth,
        dimensions.sourceHeight,
        destX * scale[0],
        destY * scale[1],
        dimensions.sourceWidth,
        dimensions.sourceHeight,
    );
    context.setTransform(1, 0, 0, 1, 0, 0);
}

export function drawFrameOrigin(
    context: CanvasRenderingContext2D,
    image: CanvasImageSource,
    frame: FrameOrigin,
    destX: number,
    destY: number,
    scale = [1, 1],
) {
    drawFrame(
        context,
        image,
        frame.dimensions,
        destX - frame.originX * scale[0],
        destY - frame.originY * scale[1],
        scale,
    );
}

export const drawTile = (
    context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    image: HTMLImageElement,
    tile: number,
    destX: number,
    destY: number,
    tileSize = 16,
): void => {
    const noTilesWidth = Math.floor(image.width / tileSize);
    context.drawImage(
        image,
        (tile % noTilesWidth) * tileSize,
        Math.floor(tile / noTilesWidth) * tileSize,
        tileSize,
        tileSize,
        destX,
        destY,
        tileSize,
        tileSize,
    );
}
