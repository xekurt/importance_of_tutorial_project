# Tutorial Impression Game 🎾

A physics-based 3D platformer built with **Three.js** designed to demonstrate the importance of first impressions and smart tutorial systems in game engineering.

## 🎮 Game Overview

Control a vibrant red ball and master the **Charge Jump** mechanic to navigate through progressive challenges. The game features a context-aware tutorial system that adapts to player skill and provides helpful hints when challenges are failed.

## 🚀 Features

- **Charge Jump Mechanic**: Hold Space to charge power, release to jump. Visual feedback includes ball squashing and color transitions from bright red to deep crimson.
- **Smart Tutorial System**: Real-time feedback and context-aware hints based on player performance and current stage.
- **Physics Engine**: Manual physics implementation including gravity, acceleration, friction, and collision detection.
- **Visual Effects**: 
  - Dynamic trail particles following the player.
  - Glowing goal area with particle emitters.
  - Smooth camera interpolation (lerp).
- **Aesthetic Design**: Modern UI with glassmorphism, vibrant red player character, and high-contrast environments.

## 🛠 Tech Stack

- **Three.js**: 3D Rendering engine.
- **Vite**: Modern frontend build tool.
- **Vanilla JavaScript**: Core logic following SOLID principles.
- **CSS3**: Stylized UI and animations.

## 📁 Project Structure (SOLID Architecture)

The project follows a modular architecture based on **SOLID principles** for maintainability and scalability:

```
src/
├── config/
│   └── constants.js        # Game constants and configuration
├── core/
│   └── Scene.js           # Three.js scene, camera, and lighting setup
├── entities/
│   └── Player.js          # Player ball state and visual updates
├── systems/
│   ├── PhysicsSystem.js   # Pure physics calculations
│   ├── InputSystem.js     # Keyboard input and charge logic
│   └── CollisionSystem.js # Platform collision detection
├── world/
│   ├── LevelBuilder.js    # Ground and goal construction
│   └── StageManager.js    # Progressive stage logic
├── ui/
│   ├── UIManager.js       # DOM updates and UI styling
│   └── TutorialSystem.js  # Messaging and fail hints
├── effects/
│   ├── ParticleSystem.js  # Trail and goal effects
│   └── CameraController.js # Smooth follow logic
└── main.js                 # Entry point & Orchestrator
```

## 🕹 Controls

- **Arrow Keys**: Move the ball (Left/Right/Up/Down).
- **Space Bar**: 
  - **Hold**: Charge Jump (increases power).
  - **Release**: Perform Jump.

## 🛠 Development

### Prerequisites
- Node.js installed on your system.

### Installation
```bash
npm install
```

### Run Locally
```bash
npm run dev
```

## 🏁 Goal

Navigate through the stages to reach the glowing golden platform at the end. Master the jump timing and power to cross the wider gaps!