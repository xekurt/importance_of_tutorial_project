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
        let collisionInfo = { collided: false, normal: { x: 0, y: 0, z: 0 } };

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
                collisionInfo.collided = true;

                // Find overlap on each axis
                const overlapX = (halfX + radius) - absDx;
                const overlapY = (halfY + radius) - absDy;
                const overlapZ = (halfZ + radius) - absDz;

                // Push out on the axis with the smallest overlap and record normal
                if (overlapX < overlapY && overlapX < overlapZ) {
                    const dir = dx > 0 ? 1 : -1;
                    position.x += dir * overlapX;
                    player.velocity.x = 0;
                    collisionInfo.normal.x = dir;
                } else if (overlapY < overlapX && overlapY < overlapZ) {
                    const dir = dy > 0 ? 1 : -1;
                    position.y += dir * overlapY;
                    player.velocity.y = 0;
                    collisionInfo.normal.y = dir;
                } else {
                    const dir = dz > 0 ? 1 : -1;
                    position.z += dir * overlapZ;
                    player.velocity.z = 0;
                    collisionInfo.normal.z = dir;
                }
            }
        }
        return collisionInfo;
    }

    hasFallen(player) {
        return player.getPosition().y < -5;
    }
}
