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
    this.obstacleFailCount = 0;
    this.health = 100;
    this.lastDamageTime = 0;
    this.damageCooldown = 500; // ms
    this.wallContactTime = 0;
    this.wallJumpWindow = 400; // ms window to jump after touching wall
    this.isWallTouching = false;
    this.wallSlideSpeed = -2; // Slow slide down speed
    this.wallNormal = { x: 0, y: 0, z: 0 };
    this.initializeSystems();
    this.wireUpEvents();

    // Start with Main Menu
    this.isGameOver = true;
    this.uiManager.showMainMenu();
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
    if (this.currentLevelIndex !== index) {
      this.obstacleFailCount = 0;
    }
    this.currentLevelIndex = index;
    const levelData = LEVELS[index];

    // Reset game state
    this.isGameOver = false;
    this.obstacleFailCount = 0;
    this.health = 100;
    this.uiManager.updateHealthBar(this.health);

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

    let displayMessage = message;

    if (message === 'HIT AN OBSTACLE!') {
      const now = performance.now();
      if (now - this.lastDamageTime < this.damageCooldown) {
        this.isGameOver = false;
        return;
      }
      this.lastDamageTime = now;

      const damage = Math.floor(Math.random() * (15 - 7 + 1));
      this.health -= damage;
      this.uiManager.updateHealthBar(this.health);

      if (this.health > 0) {
        this.isGameOver = false;
        return;
      }

      message = 'HEALTH DEPLETED!';
      displayMessage = message;
    }

    // Specific hint for Level 2 after 3 obstacle hits
    if (this.currentLevelIndex === 1 && message === 'HIT AN OBSTACLE!') {
      this.obstacleFailCount++;
      if (this.obstacleFailCount >= 3) {
        displayMessage = `${message}\nHINT: Press 'C' to toggle camera angle!`;
      }
    }

    this.uiManager.showRetryMenu(displayMessage, () => {
      this.loadLevel(this.currentLevelIndex);
    });
  }

  wireUpEvents() {
    this.inputSystem.onChargeStart(() => {
      const canJump = this.player.isGrounded || (this.isWallTouching && (performance.now() - this.wallContactTime < this.wallJumpWindow));
      if (canJump && !this.isGameOver) {
        this.player.isCharging = true;
        this.player.chargeStartTime = performance.now();
      }
    });

    this.inputSystem.onChargeEnd(() => {
      if (this.player.isCharging && !this.isGameOver) {
        const jumpVelocity = InputSystem.calculateJumpVelocity(this.player.chargeLevel);
        this.player.velocity.y = jumpVelocity;

        // If it was a wall jump, give a dash away from the wall
        if (!this.player.isGrounded && this.isWallTouching) {
          const dashPower = 15;
          this.player.velocity.x = this.wallNormal.x * dashPower;
          this.player.velocity.z = this.wallNormal.z * dashPower;
        }

        this.player.isGrounded = false;
        this.isWallTouching = false; // Reset wall touch after jumping
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

    this.inputSystem.onCameraToggle(() => {
      this.cameraController.toggleAngle();
    });

    // Main Menu Events
    this.uiManager.onStartTutorial(() => {
      this.currentLevelIndex = 0;
      this.loadLevel(0);
      this.isGameOver = false;
    });

    this.uiManager.onStartGame(() => {
      // Future game logic
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
    const collisionInfo = this.collisionSystem.resolveObstacleCollisions(this.player);

    if (collisionInfo.collided) {
      if (!this.isWallTouching) {
        this.wallContactTime = performance.now();
        this.wallNormal = collisionInfo.normal;
      }
      this.isWallTouching = true;

      // Wall Grab/Slide Mechanic: Slow down falling while touching wall
      if (this.player.velocity.y < this.wallSlideSpeed) {
        this.player.velocity.y = this.wallSlideSpeed;
      }

      this.handleGameOver('HIT AN OBSTACLE!');
    } else {
      // Small delay before losing wall contact state to allow for jumping
      if (performance.now() - this.wallContactTime > this.wallJumpWindow) {
        this.isWallTouching = false;
      }
    }

    if (this.collisionSystem.hasFallen(this.player)) {
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
