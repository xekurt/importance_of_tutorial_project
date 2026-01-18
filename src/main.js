import './style.css';
import { Scene } from './core/Scene.js';
import { Player } from './entities/Player.js';
import { PhysicsSystem } from './systems/PhysicsSystem.js';
import { InputSystem } from './systems/InputSystem.js';
import { CollisionSystem } from './systems/CollisionSystem.js';
import { LevelBuilder } from './world/LevelBuilder.js';
import { StageManager } from './world/StageManager.js';
import { UIManager } from './ui/UIManager.js';
import { TutorialSystem } from './ui/TutorialSystem.js';
import { TrailParticleSystem, GoalParticleSystem } from './effects/ParticleSystem.js';
import { CameraController } from './effects/CameraController.js';
import { CHARGE_TIME, STAGES } from './config/constants.js';

class Game {
  constructor() {
    this.initializeSystems();
    this.wireUpEvents();
    this.startGameLoop();
  }

  initializeSystems() {
    this.sceneManager = new Scene();
    this.levelBuilder = new LevelBuilder(this.sceneManager.getScene());
    this.stageManager = new StageManager();
    this.player = new Player(this.sceneManager.getScene(), STAGES[0].spawnPoint);
    this.physicsSystem = PhysicsSystem;
    this.inputSystem = new InputSystem();
    this.collisionSystem = new CollisionSystem();
    this.uiManager = new UIManager();
    this.tutorialSystem = new TutorialSystem(this.uiManager);
    this.trailParticles = new TrailParticleSystem(this.sceneManager.getScene());
    this.goalParticles = new GoalParticleSystem(this.sceneManager.getScene());
    this.cameraController = new CameraController(this.sceneManager.getCamera());
    this.uiManager.updateStageIndicator(STAGES[0].name);
    this.tutorialSystem.showStageText(STAGES[0], 0);
    this.uiManager.showArrowIndicator(true);
    this.lastTime = performance.now();
  }

  wireUpEvents() {
    this.inputSystem.onChargeStart(() => {
      if (this.player.isGrounded) {
        this.player.isCharging = true;
        this.player.chargeStartTime = performance.now();
      }
    });

    this.inputSystem.onChargeEnd(() => {
      if (this.player.isCharging) {
        const jumpVelocity = InputSystem.calculateJumpVelocity(this.player.chargeLevel);
        this.player.velocity.y = jumpVelocity;
        this.player.isGrounded = false;
        this.player.lastChargeLevel = this.player.chargeLevel;
        this.player.isCharging = false;
        this.player.chargeLevel = 0;
        this.player.resetVisuals();
        this.uiManager.updateChargeBar(0);
      }
    });

    this.stageManager.onStageChange((stageIndex) => {
      const stage = this.stageManager.getCurrentStage();
      this.uiManager.updateStageIndicator(stage.name);
      this.tutorialSystem.showStageText(stage, stageIndex);
      this.uiManager.showArrowIndicator(stageIndex === 0);
    });
  }

  update(deltaTime) {
    if (this.player.isCharging && this.player.isGrounded) {
      const chargeTime = (performance.now() - this.player.chargeStartTime) / 1000;
      this.player.chargeLevel = Math.min(chargeTime / CHARGE_TIME, 1.0);
      this.player.updateVisuals(this.player.chargeLevel);
      this.uiManager.updateChargeBar(this.player.chargeLevel);
    }

    const moveVector = this.inputSystem.getMovementVector();

    this.physicsSystem.applyMovement(this.player, moveVector, deltaTime);
    this.physicsSystem.applyFriction(this.player);
    const horizontalSpeed = this.physicsSystem.clampSpeed(this.player);
    this.physicsSystem.applyGravity(this.player, deltaTime);
    this.physicsSystem.updatePosition(this.player, deltaTime);

    this.player.isGrounded = this.collisionSystem.checkGroundCollision(this.player);
    this.physicsSystem.handleGroundCollision(this.player);

    if (this.collisionSystem.hasFallen(this.player)) {
      this.handleRespawn();
    }

    this.stageManager.updateStage(this.player.getPosition());

    if (horizontalSpeed > 0.01 || Math.abs(this.player.velocity.y) > 0.1) {
      this.trailParticles.spawn(
        this.player.getPosition().clone(),
        this.player.getCurrentColor()
      );
    }

    this.trailParticles.update(deltaTime);
    this.goalParticles.update(deltaTime);
    this.cameraController.follow(this.player.getPosition());
  }

  handleRespawn() {
    const currentStage = this.stageManager.getCurrentStage();
    const stageIndex = this.stageManager.getCurrentStageIndex();
    this.tutorialSystem.showFailHint(stageIndex, this.player.lastChargeLevel);
    this.player.respawn(currentStage.spawnPoint);
    this.uiManager.updateChargeBar(0);
    setTimeout(() => {
      this.tutorialSystem.showStageText(currentStage, stageIndex);
    }, 3000);
  }

  startGameLoop() {
    const animate = () => {
      requestAnimationFrame(animate);
      const currentTime = performance.now();
      const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1);
      this.lastTime = currentTime;
      this.update(deltaTime);
      this.sceneManager.render();
    };
    animate();
  }
}

new Game();
