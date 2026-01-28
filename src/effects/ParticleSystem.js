import * as THREE from 'three';
import { PARTICLE_SETTINGS, COLORS } from '../config/constants.js';

class TrailParticle {
    constructor(scene, position, color) {
        const geometry = new THREE.SphereGeometry(0.1, 8, 8);
        const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 1
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.copy(position);
        this.life = 1.0;
        this.maxLife = PARTICLE_SETTINGS.TRAIL_LIFETIME;
        scene.add(this.mesh);
    }

    update(deltaTime) {
        this.life -= deltaTime;
        this.mesh.material.opacity = this.life / this.maxLife;
        return this.life > 0;
    }

    destroy(scene) {
        scene.remove(this.mesh);
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();
    }
}

export class TrailParticleSystem {
    constructor(scene) {
        this.scene = scene;
        this.particles = [];
        this.maxParticles = PARTICLE_SETTINGS.TRAIL_MAX;
    }

    spawn(position, color) {
        this.particles.push(new TrailParticle(this.scene, position, color));

        if (this.particles.length > this.maxParticles) {
            const removed = this.particles.shift();
            removed.destroy(this.scene);
        }
    }

    update(deltaTime) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            if (!this.particles[i].update(deltaTime)) {
                this.particles[i].destroy(this.scene);
                this.particles.splice(i, 1);
            }
        }
    }
}

export class GoalParticleSystem {
    constructor(scene) {
        this.scene = scene;
        this.createParticles();
    }

    createParticles() {
        const particleCount = PARTICLE_SETTINGS.GOAL_COUNT;
        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        this.particleVelocities = [];

        for (let i = 0; i < particleCount; i++) {
            particlePositions[i * 3] = (Math.random() - 0.5) * 8;
            particlePositions[i * 3 + 1] = Math.random() * 3 - 5; // Start below view
            particlePositions[i * 3 + 2] = 47.5 + (Math.random() - 0.5) * 4;

            this.particleVelocities.push({
                y: Math.random() * 2 + 1,
                resetY: particlePositions[i * 3 + 1]
            });
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

        const particleMaterial = new THREE.PointsMaterial({
            color: COLORS.GOAL,
            size: 0.2,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        this.goalParticles = new THREE.Points(particleGeometry, particleMaterial);
        this.goalParticles.visible = false;
        this.scene.add(this.goalParticles);
    }

    spawn(position) {
        const positions = this.goalParticles.geometry.attributes.position.array;
        const particleCount = PARTICLE_SETTINGS.GOAL_COUNT;

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = position.x + (Math.random() - 0.5) * 4;
            positions[i * 3 + 1] = position.y + (Math.random() - 0.5) * 4;
            positions[i * 3 + 2] = position.z + (Math.random() - 0.5) * 4;
        }

        this.goalParticles.geometry.attributes.position.needsUpdate = true;
        this.goalParticles.visible = true;
    }

    update(deltaTime) {
        const positions = this.goalParticles.geometry.attributes.position.array;
        const particleCount = PARTICLE_SETTINGS.GOAL_COUNT;

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3 + 1] += this.particleVelocities[i].y * deltaTime;

            if (positions[i * 3 + 1] > 5) {
                positions[i * 3 + 1] = 0;
            }
        }

        this.goalParticles.geometry.attributes.position.needsUpdate = true;
    }
}
