export type Point = {
    x: number;
    y: number;
};

export type Velocity = Point;

export type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export type Circle = {
    x: number;
    y: number;
    radius: number;
};

export type Dimensions = {
    width: number;
    height: number;
};

export type FrameDimensions = {
    sourceX: number;
    sourceY: number;
    sourceWidth: number;
    sourceHeight: number;
};

export type FrameOrigin = {
    dimensions: FrameDimensions;
    originX: number;
    originY: number;
};

export type TimeFrame = {
    previous: number;
    secondsPassed: number;
};

export type SoundSettings = {
    volume: number;
    loop: boolean;
};
