import { STAGES } from '../config/constants.js';

/**
 * Stage manager - tracks and updates current stage based on player position
 * Responsibility: Stage progression logic
 */
export class StageManager {
    constructor() {
        this.stages = STAGES;
        this.currentStageIndex = 0;
        this.stageChangeCallback = null;
    }

    /**
     * Update stage based on player position
     */
    updateStage(playerPosition) {
        const z = playerPosition.z;
        let newStageIndex = this.currentStageIndex;

        if (z < 10) {
            newStageIndex = 0;
        } else if (z >= 10 && z < 25) {
            newStageIndex = 1;
        } else if (z >= 25 && z < 45) {
            newStageIndex = 2;
        } else if (z >= 45) {
            newStageIndex = 3; // Goal
        }

        if (newStageIndex !== this.currentStageIndex) {
            this.currentStageIndex = newStageIndex;
            if (this.stageChangeCallback) {
                this.stageChangeCallback(newStageIndex);
            }
        }
    }

    /**
     * Get current stage object
     */
    getCurrentStage() {
        if (this.currentStageIndex >= this.stages.length) {
            return { name: 'Goal!', text: '🎉 Tutorial Complete! You mastered the Charge Jump!' };
        }
        return this.stages[this.currentStageIndex];
    }

    /**
     * Get current stage index
     */
    getCurrentStageIndex() {
        return this.currentStageIndex;
    }

    /**
     * Register callback for stage changes
     */
    onStageChange(callback) {
        this.stageChangeCallback = callback;
    }
}
