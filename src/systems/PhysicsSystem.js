import { GRAVITY, MOVE_ACCELERATION, FRICTION, MOVE_SPEED } from '../config/constants.js';

export class PhysicsSystem {
    static applyGravity(player, deltaTime) {
        if (!player.isGrounded) {
            player.velocity.y += GRAVITY * deltaTime;
        }
    }

    static applyMovement(player, moveVector, deltaTime) {
        player.velocity.x += moveVector.x * MOVE_ACCELERATION * deltaTime;
        player.velocity.z += moveVector.z * MOVE_ACCELERATION * deltaTime;
    }

    static applyFriction(player) {
        player.velocity.x *= FRICTION;
        player.velocity.z *= FRICTION;
    }

    static clampSpeed(player) {
        const horizontalSpeed = Math.sqrt(
            player.velocity.x * player.velocity.x +
            player.velocity.z * player.velocity.z
        );

        if (horizontalSpeed > MOVE_SPEED) {
            const scale = MOVE_SPEED / horizontalSpeed;
            player.velocity.x *= scale;
            player.velocity.z *= scale;
        }

        return horizontalSpeed;
    }

    static updatePosition(player, deltaTime) {
        const position = player.getPosition();
        position.x += player.velocity.x;
        position.y += player.velocity.y * deltaTime;
        position.z += player.velocity.z;
    }

    static handleGroundCollision(player) {
        if (player.isGrounded && player.velocity.y < 0) {
            const position = player.getPosition();
            position.y = 0.5;
            player.velocity.y = 0;
        }
    }
}
