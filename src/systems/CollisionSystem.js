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

    checkObstacleCollision(player) {
        const position = player.getPosition();
        const playerX = position.x;
        const playerY = position.y;
        const playerZ = position.z;
        const radius = 0.5; // Roughly half of player cube

        for (const obstacle of this.obstacles) {
            const halfX = obstacle.size.x / 2;
            const halfY = obstacle.size.y / 2;
            const halfZ = obstacle.size.z / 2;

            const dx = Math.abs(playerX - obstacle.position.x);
            const dy = Math.abs(playerY - obstacle.position.y);
            const dz = Math.abs(playerZ - obstacle.position.z);

            if (dx < (halfX + radius) && dy < (halfY + radius) && dz < (halfZ + radius)) {
                return true;
            }
        }
        return false;
    }

    hasFallen(player) {
        return player.getPosition().y < -5;
    }
}
