import * as THREE from 'three';
import { CAMERA_SETTINGS, LIGHTING, COLORS } from '../config/constants.js';

/**
 * Scene manager - handles Three.js scene, camera, renderer, and lighting setup
 * Responsibility: Scene initialization and rendering
 */
export class Scene {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(COLORS.SKY);
        this.scene.fog = new THREE.Fog(COLORS.SKY, 20, 80);

        this.setupCamera();
        this.setupRenderer();
        this.setupLighting();
        this.setupResizeHandler();
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            CAMERA_SETTINGS.FOV,
            window.innerWidth / window.innerHeight,
            CAMERA_SETTINGS.NEAR,
            CAMERA_SETTINGS.FAR
        );
        this.camera.position.set(
            CAMERA_SETTINGS.INITIAL_POSITION.x,
            CAMERA_SETTINGS.INITIAL_POSITION.y,
            CAMERA_SETTINGS.INITIAL_POSITION.z
        );
        this.camera.lookAt(0, 0, 0);
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);
    }

    setupLighting() {
        const ambientLight = new THREE.AmbientLight(0xffffff, LIGHTING.AMBIENT_INTENSITY);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, LIGHTING.DIRECTIONAL_INTENSITY);
        directionalLight.position.set(
            LIGHTING.DIRECTIONAL_POSITION.x,
            LIGHTING.DIRECTIONAL_POSITION.y,
            LIGHTING.DIRECTIONAL_POSITION.z
        );
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.left = -30;
        directionalLight.shadow.camera.right = 30;
        directionalLight.shadow.camera.top = 30;
        directionalLight.shadow.camera.bottom = -30;
        directionalLight.shadow.camera.far = 100;
        this.scene.add(directionalLight);
    }

    setupResizeHandler() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    add(object) {
        this.scene.add(object);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    getCamera() {
        return this.camera;
    }

    getScene() {
        return this.scene;
    }
}
