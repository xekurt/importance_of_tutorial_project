/**
 * Tutorial system - manages tutorial text and context-aware fail hints
 * Responsibility: Tutorial messaging logic
 */
export class TutorialSystem {
    constructor(uiManager) {
        this.uiManager = uiManager;
        this.hintTimeout = null;
    }

    /**
     * Show stage-specific tutorial text
     */
    showStageText(stage, stageIndex) {
        let type = 'normal';
        if (stageIndex === 1) type = 'success';
        if (stageIndex === 2) type = 'warning';
        if (stageIndex === 3) type = 'complete';

        this.uiManager.updateTutorialText(stage.text, type);
    }

    /**
     * Show context-aware fail hint based on stage and charge level
     */
    showFailHint(stageIndex, chargeLevel) {
        let hint = '';

        if (stageIndex === 1) {
            if (chargeLevel < 0.3) {
                hint = 'Hold Space longer to jump further!';
            } else {
                hint = 'Try jumping from the edge of the platform.';
            }
        } else if (stageIndex === 2) {
            if (chargeLevel < 0.8) {
                hint = 'You need MAXIMUM power! Hold Space until fully charged!';
            } else {
                hint = 'Almost there! Make sure you have 100% charge!';
            }
        } else {
            hint = 'Try again!';
        }

        this.uiManager.updateTutorialText(hint, 'warning');

        // Clear hint after 3 seconds
        if (this.hintTimeout) {
            clearTimeout(this.hintTimeout);
        }
        this.hintTimeout = setTimeout(() => {
            // This will be handled by stage manager callback
        }, 3000);
    }

    /**
     * Clear any pending hint timeout
     */
    clearHintTimeout() {
        if (this.hintTimeout) {
            clearTimeout(this.hintTimeout);
            this.hintTimeout = null;
        }
    }
}
