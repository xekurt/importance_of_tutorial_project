# Technical Documentation: Tutorial Impression Game
**Date: January 18, 2026**
**Project: Charge Jump Tutorial System**

---

## 1. Technical Challenge: Asset Loading & Cross-Device Compatibility

### Problem: Local File Access (CORS) & Path Resolution
Initially, when developing the 3D environment with Three.js, we encountered a significant blocker: browsers block local file access (CORS) when trying to load scripts and 3D assets directly from the file system (`file://` protocol). This prevents the game from running locally without a server and makes deployment to static hosting platforms like GitHub Pages tricky due to path resolution issues in sub-directories.

### Solution: Vite-Based Architecture & CI/CD Deployment
To solve this, we:
- **Migrated to Vite**: Decoupled the source code from the final build. Vite provides a development server that handles CORS correctly and a build pipeline that optimizes 3D assets.
- **Relative Path Resolution**: Configured `vite.config.js` with a base path (`./`) and adjusted `index.html` to use relative script sourcing.
- **GitHub Actions (CI/CD)**: Automated the build and deployment process. Our workflow (.github/workflows/deploy.yml) now automatically bundles the project into a `dist/` folder and deploys it to GitHub Pages whenever we push to `main`.
- **Cross-Device Compatibility**: Moving to a web-based deployment ensures the tutorial can be tested on any device with a browser, eliminating the need for local environment setup.

---

## 2. Design Choice: Context-Aware Tutorial System

### Implementation: The "Fail Hint" System
We implemented a dynamic hint system that triggers when a player fails a jump (falls below the platform level).

### Reasoning: Minimizing Cognitive Load
This choice was driven by two core concepts from the **Tutorial Design Lecture**:
1. **Minimizing Cognitive Load**: Instead of overwhelming the player with all controls at once, we only provide the "Charge Jump" instructions initially.
2. **Contextual Hints**: When a player fails, the system analyzes *why* they failed. 
    - If they didn't charge long enough: *"Hold Space longer to jump further!"*
    - If they jumped too late: *"Try jumping from the edge of the platform."*
    
By providing "Just-in-Time" information, we ensure the player isn't distracted by irrelevant data and can focus on mastering the specific mechanic they are struggling with at that moment.

---

## 3. Visual Execution & Game Mechanics

### Charge Jump "VFE" (Visual Feedback Effects)
To make the mechanics intuitive without text, we added:
- **Squash & Stretch**: The player ball compresses vertically while charging.
- **Color Interpolation**: The ball transitions from a **Vibrant Red (#ff3344)** to a **Deep Crimson (#8b0000)** as it gains power.
- **UI Progress Bar**: A sleek, bottom-aligned bar that fills and changes color in sync with the ball's charge level.

---

