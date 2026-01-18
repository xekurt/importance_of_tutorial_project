import { COLLISION_BOUNDS } from '../config/constants.js';

export class CollisionSystem {
    constructor() {
        this.platforms = COLLISION_BOUNDS;
    }

    checkGroundCollision(player) {
        const position = player.getPosition();
        const playerBottom = position.y - 0.5;
        const playerX = position.x;
        const playerZ = position.z;

        for (const platform of this.platforms) {
            if (
                playerX >= platform.minX &&
                playerX <= platform.maxX &&
                playerZ >= platform.minZ &&
                playerZ <= platform.maxZ &&
                playerBottom <= 0.25 &&
                playerBottom >= -0.5
            ) {
                return true;
            }
        }

        return false;
    }

    hasFallen(player) {
        return player.getPosition().y < -5;
    }
}
