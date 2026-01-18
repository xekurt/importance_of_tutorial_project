import { MIN_JUMP_VELOCITY, MAX_JUMP_VELOCITY } from '../config/constants.js';

export class InputSystem {
    constructor() {
        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false,
            Space: false
        };

        this.chargeStartCallback = null;
        this.chargeEndCallback = null;

        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    handleKeyDown(e) {
        if (e.key === ' ') {
            e.preventDefault();
            if (!this.keys.Space && this.chargeStartCallback) {
                this.keys.Space = true;
                this.chargeStartCallback();
            }
        } else if (this.keys.hasOwnProperty(e.key)) {
            this.keys[e.key] = true;
        }
    }

    handleKeyUp(e) {
        if (e.key === ' ') {
            e.preventDefault();
            if (this.keys.Space && this.chargeEndCallback) {
                this.chargeEndCallback();
            }
            this.keys.Space = false;
        } else if (this.keys.hasOwnProperty(e.key)) {
            this.keys[e.key] = false;
        }
    }

    onChargeStart(callback) {
        this.chargeStartCallback = callback;
    }

    onChargeEnd(callback) {
        this.chargeEndCallback = callback;
    }

    getMovementVector() {
        let moveX = 0;
        let moveZ = 0;

        if (this.keys.ArrowLeft) moveX -= 1;
        if (this.keys.ArrowRight) moveX += 1;
        if (this.keys.ArrowUp) moveZ -= 1;
        if (this.keys.ArrowDown) moveZ += 1;

        if (moveX !== 0 || moveZ !== 0) {
            const length = Math.sqrt(moveX * moveX + moveZ * moveZ);
            moveX /= length;
            moveZ /= length;
        }

        return { x: moveX, z: moveZ };
    }

    static calculateJumpVelocity(chargeLevel) {
        return MIN_JUMP_VELOCITY + (chargeLevel * (MAX_JUMP_VELOCITY - MIN_JUMP_VELOCITY));
    }
}
