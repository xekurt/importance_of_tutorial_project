import { COLLISION_BOUNDS } from '../config/constants.js';

/**
 * Collision system - handles platform collision detection
 * Responsibility: Collision detection logic
 */
export class CollisionSystem {
    constructor() {
        this.platforms = COLLISION_BOUNDS;
    }

    /**
     * Check if player is on any platform
     */
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

    /**
     * Check if player has fallen off the level
     */
    hasFallen(player) {
        return player.getPosition().y < -5;
    }
}
