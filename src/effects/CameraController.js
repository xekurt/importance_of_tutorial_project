import { CAMERA_SETTINGS } from '../config/constants.js';

export class CameraController {
    constructor(camera) {
        this.camera = camera;
        this.followDistance = CAMERA_SETTINGS.FOLLOW_DISTANCE;
        this.lerpFactor = CAMERA_SETTINGS.LERP_FACTOR;
        this.currentAngle = 0; // In radians
        this.targetAngle = 0;
        this.height = 8; // Default height
    }

    setAngle(degrees) {
        this.targetAngle = (degrees * Math.PI) / 180;
    }

    toggleAngle() {
        this.targetAngle = this.targetAngle === 0 ? Math.PI / 4 : 0; // Toggle between 0 and 45 degrees
    }

    follow(targetPosition) {
        // Smoothly interpolate the angle
        this.currentAngle += (this.targetAngle - this.currentAngle) * 0.05;

        // Calculate offset based on current angle
        const offsetX = Math.sin(this.currentAngle) * this.followDistance;
        const offsetZ = Math.cos(this.currentAngle) * this.followDistance;

        const targetCameraX = targetPosition.x + offsetX;
        const targetCameraY = targetPosition.y + this.height;
        const targetCameraZ = targetPosition.z + offsetZ;

        this.camera.position.x += (targetCameraX - this.camera.position.x) * this.lerpFactor;
        this.camera.position.y += (targetCameraY - this.camera.position.y) * this.lerpFactor;
        this.camera.position.z += (targetCameraZ - this.camera.position.z) * this.lerpFactor;

        this.camera.lookAt(targetPosition.x, targetPosition.y, targetPosition.z);
    }
}
