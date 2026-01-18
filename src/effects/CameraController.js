import { CAMERA_SETTINGS } from '../config/constants.js';

export class CameraController {
    constructor(camera) {
        this.camera = camera;
        this.followDistance = CAMERA_SETTINGS.FOLLOW_DISTANCE;
        this.lerpFactor = CAMERA_SETTINGS.LERP_FACTOR;
    }

    follow(targetPosition) {
        const targetCameraX = targetPosition.x;
        const targetCameraZ = targetPosition.z + this.followDistance;

        this.camera.position.x += (targetCameraX - this.camera.position.x) * this.lerpFactor;
        this.camera.position.z += (targetCameraZ - this.camera.position.z) * this.lerpFactor;
        this.camera.lookAt(targetPosition.x, targetPosition.y, targetPosition.z);
    }
}
