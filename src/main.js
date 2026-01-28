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
import { CHARGE_TIME, LEVELS } from './config/constants.js';

class Game {
  constructor() {
    this.currentLevelIndex = 0;
    this.isGameOver = false;
    this.initializeSystems();
    this.loadLevel(this.currentLevelIndex);
    this.wireUpEvents();
    this.startGameLoop();
  }

  initializeSystems() {
    this.sceneManager = new Scene();
    this.levelBuilder = new LevelBuilder(this.sceneManager.getScene());
    this.stageManager = new StageManager();
    this.physicsSystem = PhysicsSystem;
    this.inputSystem = new InputSystem();
    this.collisionSystem = new CollisionSystem();
    this.uiManager = new UIManager();
    this.tutorialSystem = new TutorialSystem(this.uiManager);
    this.trailParticles = new TrailParticleSystem(this.sceneManager.getScene());
    this.goalParticles = new GoalParticleSystem(this.sceneManager.getScene());
    this.cameraController = new CameraController(this.sceneManager.getCamera());
    this.lastTime = performance.now();
  }

  loadLevel(index) {
    this.currentLevelIndex = index;
    const levelData = LEVELS[index];

    // Reset game state
    this.isGameOver = false;

    // Build level
    this.levelBuilder.buildLevel(levelData);

    // Update systems with level data
    this.collisionSystem.setLevel(levelData);
    this.stageManager.setLevel(levelData);

    // Spawn player
    const spawnPoint = levelData.stages[0].spawnPoint;
    if (!this.player) {
      this.player = new Player(this.sceneManager.getScene(), spawnPoint);
    } else {
      this.player.respawn(spawnPoint);
    }

    // UI Updates
    this.uiManager.updateStageIndicator(`${levelData.name} - Stage 1`);
    this.tutorialSystem.showStageText(levelData.stages[0], 0);
    this.uiManager.showArrowIndicator(index === 0);
    this.uiManager.hideRetryMenu();
    this.uiManager.hideCompleteMenu();
  }

  handleGameOver(message) {
    if (this.isGameOver) return;
    this.isGameOver = true;

    this.uiManager.showRetryMenu(message, () => {
      this.loadLevel(this.currentLevelIndex);
    });
  }

  wireUpEvents() {
    this.inputSystem.onChargeStart(() => {
      if (this.player.isGrounded && !this.isGameOver) {
        this.player.isCharging = true;
        this.player.chargeStartTime = performance.now();
      }
    });

    this.inputSystem.onChargeEnd(() => {
      if (this.player.isCharging && !this.isGameOver) {
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
      const levelData = LEVELS[this.currentLevelIndex];

      if (stageIndex >= levelData.stages.length) {
        // Level Complete!
        this.handleLevelComplete();
      } else {
        this.uiManager.updateStageIndicator(`${levelData.name} - ${stage.name}`);
        this.tutorialSystem.showStageText(stage, stageIndex);
        this.uiManager.showArrowIndicator(this.currentLevelIndex === 0 && stageIndex === 0);
      }
    });
  }

  handleLevelComplete() {
    this.isGameOver = true; // Pause gameplay
    this.goalParticles.spawn(this.player.getPosition().clone());

    if (this.currentLevelIndex < LEVELS.length - 1) {
      this.uiManager.showCompleteMenu(
        () => this.loadLevel(this.currentLevelIndex + 1), // Next
        () => this.loadLevel(this.currentLevelIndex)     // Retry
      );
    } else {
      this.uiManager.updateTutorialText('YOU MASTERED THE GAME!', 'complete');
    }
  }

  update(deltaTime) {
    if (this.isGameOver) return;

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

    // Collision checks
    if (this.collisionSystem.checkObstacleCollision(this.player)) {
      this.handleGameOver('HIT AN OBSTACLE!');
    } else if (this.collisionSystem.hasFallen(this.player)) {
      this.handleGameOver('FELL INTO THE ABYSS!');
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
