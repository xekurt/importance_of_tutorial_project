import * as THREE from 'three';
import { COLORS } from '../config/constants.js';

export class LevelBuilder {
    constructor(scene) {
        this.scene = scene;
        this.platformGroup = new THREE.Group();
        this.obstacleGroup = new THREE.Group();
        this.scene.add(this.platformGroup);
        this.scene.add(this.obstacleGroup);
    }

    clearLevel() {
        while (this.platformGroup.children.length > 0) {
            this.platformGroup.remove(this.platformGroup.children[0]);
        }
        while (this.obstacleGroup.children.length > 0) {
            this.obstacleGroup.remove(this.obstacleGroup.children[0]);
        }
    }

    buildLevel(levelData) {
        this.clearLevel();

        const platformMaterial = new THREE.MeshStandardMaterial({
            color: COLORS.PLATFORM,
            roughness: 0.7,
            metalness: 0.3
        });

        const obstacleMaterial = new THREE.MeshStandardMaterial({
            color: COLORS.OBSTACLE,
            roughness: 0.4,
            metalness: 0.6,
            emissive: COLORS.OBSTACLE,
            emissiveIntensity: 0.2
        });

        // Build platforms
        levelData.platforms.forEach((platformData) => {
            const geometry = new THREE.BoxGeometry(
                platformData.size.x,
                platformData.size.y,
                platformData.size.z
            );

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

        // Build obstacles
        if (levelData.obstacles) {
            levelData.obstacles.forEach((obstacleData) => {
                const geometry = new THREE.BoxGeometry(
                    obstacleData.size.x,
                    obstacleData.size.y,
                    obstacleData.size.z
                );

                const obstacle = new THREE.Mesh(geometry, obstacleMaterial);
                obstacle.position.set(
                    obstacleData.position.x,
                    obstacleData.position.y,
                    obstacleData.position.z
                );
                obstacle.receiveShadow = true;
                obstacle.castShadow = true;

                this.obstacleGroup.add(obstacle);
            });
        }
    }
}
