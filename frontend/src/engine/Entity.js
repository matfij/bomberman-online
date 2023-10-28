export class GameEntity {
    constructor(position) {
        this.position = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.image = new Image();
        this.position = position;
    }
}
