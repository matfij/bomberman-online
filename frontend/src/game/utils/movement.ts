import { Point } from '../../engine/definitions/types';
import { TileType } from '../constants/levelData';

export const isZero = (point: Point): boolean => point.x === 0 && point.y === 0;

export const isCollisionTile = (tile: TileType) => tile !== TileType.Empty;
