import { STAGES } from '../config/constants.js';

export class StageManager {
    constructor() {
        this.stages = STAGES;
        this.currentStageIndex = 0;
        this.stageChangeCallback = null;
    }

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
            newStageIndex = 3;
        }

        if (newStageIndex !== this.currentStageIndex) {
            this.currentStageIndex = newStageIndex;
            if (this.stageChangeCallback) {
                this.stageChangeCallback(newStageIndex);
            }
        }
    }

    getCurrentStage() {
        if (this.currentStageIndex >= this.stages.length) {
            return { name: 'Goal!', text: '🎉 Tutorial Complete! You mastered the Charge Jump!' };
        }
        return this.stages[this.currentStageIndex];
    }

    getCurrentStageIndex() {
        return this.currentStageIndex;
    }

    onStageChange(callback) {
        this.stageChangeCallback = callback;
    }
}
