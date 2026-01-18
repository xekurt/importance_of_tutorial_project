import * as THREE from 'three';
import { PLATFORMS, COLORS } from '../config/constants.js';

/**
 * Level builder - creates all platforms and goal area
 * Responsibility: Level geometry construction
 */
export class LevelBuilder {
    constructor(scene) {
        this.scene = scene;
        this.platformGroup = new THREE.Group();
        this.buildLevel();
    }

    buildLevel() {
        const platformMaterial = new THREE.MeshStandardMaterial({
            color: COLORS.PLATFORM,
            roughness: 0.7,
            metalness: 0.3
        });

        PLATFORMS.forEach((platformData) => {
            const geometry = new THREE.BoxGeometry(
                platformData.size.x,
                platformData.size.y,
                platformData.size.z
            );

            // Use goal material for goal platform
            const material = platformData.isGoal
                ? new THREE.MeshStandardMaterial({
                    color: COLORS.GOAL,
                    emissive: COLORS.GOAL,
                    emissiveIntensity: 0.3,
                    roughness: 0.5,
                    metalness: 0.5
                })
                : platformMaterial;

            const platform = new THREE.Mesh(geometry, material);
            platform.position.set(
                platformData.position.x,
                platformData.position.y,
                platformData.position.z
            );
            platform.receiveShadow = true;
            platform.castShadow = true;

            this.platformGroup.add(platform);
        });

        this.scene.add(this.platformGroup);
    }
}
