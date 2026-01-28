export class CollisionSystem {
    constructor() {
        this.platforms = [];
        this.obstacles = [];
    }

    setLevel(levelData) {
        this.platforms = levelData.collisionBounds || [];
        this.obstacles = levelData.obstacles || [];
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

    resolveObstacleCollisions(player) {
        const position = player.getPosition();
        const radius = 0.5;
        let collided = false;

        for (const obstacle of this.obstacles) {
            const halfX = obstacle.size.x / 2;
            const halfY = obstacle.size.y / 2;
            const halfZ = obstacle.size.z / 2;

            const dx = position.x - obstacle.position.x;
            const dy = position.y - obstacle.position.y;
            const dz = position.z - obstacle.position.z;

            const absDx = Math.abs(dx);
            const absDy = Math.abs(dy);
            const absDz = Math.abs(dz);

            if (absDx < (halfX + radius) && absDy < (halfY + radius) && absDz < (halfZ + radius)) {
                collided = true;

                // Find overlap on each axis
                const overlapX = (halfX + radius) - absDx;
                const overlapY = (halfY + radius) - absDy;
                const overlapZ = (halfZ + radius) - absDz;

                // Push out on the axis with the smallest overlap
                if (overlapX < overlapY && overlapX < overlapZ) {
                    position.x += dx > 0 ? overlapX : -overlapX;
                    player.velocity.x = 0;
                } else if (overlapY < overlapX && overlapY < overlapZ) {
                    position.y += dy > 0 ? overlapY : -overlapY;
                    player.velocity.y = 0;
                } else {
                    position.z += dz > 0 ? overlapZ : -overlapZ;
                    player.velocity.z = 0;
                }
            }
        }
        return collided;
    }

    hasFallen(player) {
        return player.getPosition().y < -5;
    }
}
