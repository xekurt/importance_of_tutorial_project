import * as THREE from 'three';
import { COLORS } from '../config/constants.js';

export class Player {
    constructor(scene, spawnPoint) {
        this.scene = scene;

        const geometry = new THREE.SphereGeometry(0.5, 32, 32);
        this.material = new THREE.MeshStandardMaterial({
            color: COLORS.PLAYER_BASE,
            roughness: 0.4,
            metalness: 0.6
        });
        this.mesh = new THREE.Mesh(geometry, this.material);
        this.mesh.castShadow = true;

        this.velocity = new THREE.Vector3(0, 0, 0);
        this.isGrounded = false;
        this.isCharging = false;
        this.chargeLevel = 0;
        this.chargeStartTime = 0;
        this.currentStage = 1;
        this.lastChargeLevel = 0;

        this.baseColor = new THREE.Color(COLORS.PLAYER_BASE);
        this.chargedColor = new THREE.Color(COLORS.PLAYER_CHARGED);

        this.setPosition(spawnPoint);
        scene.add(this.mesh);
    }

    updateVisuals(chargeLevel) {
        this.mesh.scale.y = 1 - (chargeLevel * 0.5);
        this.material.color.lerpColors(this.baseColor, this.chargedColor, chargeLevel);
    }

    resetVisuals() {
        this.mesh.scale.y = 1;
        this.material.color.copy(this.baseColor);
    }

    respawn(position) {
        this.setPosition(position);
        this.velocity.set(0, 0, 0);
        this.isGrounded = true;
        this.isCharging = false;
        this.chargeLevel = 0;
        this.lastChargeLevel = 0;
        this.resetVisuals();
    }

    getPosition() {
        return this.mesh.position;
    }

    setPosition(position) {
        this.mesh.position.set(position.x, position.y, position.z);
    }

    getCurrentColor() {
        return this.material.color.clone();
    }
}
