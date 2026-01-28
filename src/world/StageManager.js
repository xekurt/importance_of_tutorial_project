export class StageManager {
    constructor() {
        this.stages = [];
        this.currentStageIndex = 0;
        this.stageChangeCallback = null;
    }

    setLevel(levelData) {
        this.stages = levelData.stages || [];
        this.currentStageIndex = 0;
    }

    updateStage(playerPosition) {
        const z = playerPosition.z;
        let newStageIndex = this.currentStageIndex;

        // Dynamic stage detection based on platform ends
        for (let i = 0; i < this.stages.length; i++) {
            const stage = this.stages[i];
            const nextStage = this.stages[i + 1];

            const stageStart = stage.platformStart;
            const stageEnd = stage.platformEnd;

            if (z >= stageStart && (nextStage ? z < nextStage.platformStart : true)) {
                newStageIndex = i;
                break;
            }
        }

        // Check for level completion (reached the goal platform beyond the last stage)
        const lastStage = this.stages[this.stages.length - 1];
        if (lastStage && z >= (lastStage.nextPlatformEnd || lastStage.platformEnd + 5)) {
            newStageIndex = this.stages.length;
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
