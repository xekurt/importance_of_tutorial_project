import { GRAVITY, MOVE_ACCELERATION, FRICTION, MOVE_SPEED } from '../config/constants.js';

/**
 * Physics system - handles all physics calculations
 * Responsibility: Pure physics logic (gravity, movement, friction)
 */
export class PhysicsSystem {
    /**
     * Apply gravity to player
     */
    static applyGravity(player, deltaTime) {
        if (!player.isGrounded) {
            player.velocity.y += GRAVITY * deltaTime;
        }
    }

    /**
     * Apply movement based on input vector
     */
    static applyMovement(player, moveVector, deltaTime) {
        player.velocity.x += moveVector.x * MOVE_ACCELERATION * deltaTime;
        player.velocity.z += moveVector.z * MOVE_ACCELERATION * deltaTime;
    }

    /**
     * Apply friction to horizontal movement
     */
    static applyFriction(player) {
        player.velocity.x *= FRICTION;
        player.velocity.z *= FRICTION;
    }

    /**
     * Clamp horizontal speed to maximum
     */
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

    /**
     * Update player position based on velocity
     */
    static updatePosition(player, deltaTime) {
        const position = player.getPosition();
        position.x += player.velocity.x;
        position.y += player.velocity.y * deltaTime;
        position.z += player.velocity.z;
    }

    /**
     * Handle ground collision
     */
    static handleGroundCollision(player) {
        if (player.isGrounded && player.velocity.y < 0) {
            const position = player.getPosition();
            position.y = 0.5;
            player.velocity.y = 0;
        }
    }
}
