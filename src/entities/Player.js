import * as THREE from 'three';
import { COLORS } from '../config/constants.js';

/**
 * Player entity - manages player mesh, state, and visual updates
 * Responsibility: Player representation and state management
 */
export class Player {
    constructor(scene, spawnPoint) {
        this.scene = scene;

        // Create player mesh (sphere)
        const geometry = new THREE.SphereGeometry(0.5, 32, 32);
        this.material = new THREE.MeshStandardMaterial({
            color: COLORS.PLAYER_BASE,
            roughness: 0.4,
            metalness: 0.6
        });
        this.mesh = new THREE.Mesh(geometry, this.material);
        this.mesh.castShadow = true;

        // Initialize state
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.isGrounded = false;
        this.isCharging = false;
        this.chargeLevel = 0;
        this.chargeStartTime = 0;
        this.currentStage = 1;
        this.lastChargeLevel = 0;

        // Colors for charge effect
        this.baseColor = new THREE.Color(COLORS.PLAYER_BASE);
        this.chargedColor = new THREE.Color(COLORS.PLAYER_CHARGED);

        // Set initial position
        this.setPosition(spawnPoint);

        // Add to scene
        scene.add(this.mesh);
    }

    /**
     * Update visual feedback based on charge level
     */
    updateVisuals(chargeLevel) {
        // Squash effect
        this.mesh.scale.y = 1 - (chargeLevel * 0.5);

        // Color interpolation
        this.material.color.lerpColors(this.baseColor, this.chargedColor, chargeLevel);
    }

    /**
     * Reset visuals to default state
     */
    resetVisuals() {
        this.mesh.scale.y = 1;
        this.material.color.copy(this.baseColor);
    }

    /**
     * Respawn player at given position
     */
    respawn(position) {
        this.setPosition(position);
        this.velocity.set(0, 0, 0);
        this.isGrounded = true;
        this.isCharging = false;
        this.chargeLevel = 0;
        this.lastChargeLevel = 0;
        this.resetVisuals();
    }

    /**
     * Get player position
     */
    getPosition() {
        return this.mesh.position;
    }

    /**
     * Set player position
     */
    setPosition(position) {
        this.mesh.position.set(position.x, position.y, position.z);
    }

    /**
     * Get current color for trail particles
     */
    getCurrentColor() {
        return this.material.color.clone();
    }
}
