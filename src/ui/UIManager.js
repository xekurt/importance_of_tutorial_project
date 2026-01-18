/**
 * UI manager - handles all UI element updates
 * Responsibility: DOM manipulation for game UI
 */
export class UIManager {
    constructor() {
        this.tutorialText = document.getElementById('tutorial-text');
        this.chargeBarFill = document.getElementById('charge-bar-fill');
        this.stageIndicator = document.getElementById('stage-indicator');
        this.arrowIndicator = document.getElementById('arrow-indicator');
    }

    /**
     * Update charge bar fill and color
     */
    updateChargeBar(level) {
        this.chargeBarFill.style.width = (level * 100) + '%';

        // Color interpolation for charge bar (red to dark red)
        const r = Math.floor(255 - level * (255 - 139));
        const g = Math.floor(51 - level * 51);
        const b = Math.floor(68 - level * 68);
        this.chargeBarFill.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

    /**
     * Update stage indicator text
     */
    updateStageIndicator(stageName) {
        this.stageIndicator.textContent = stageName;
    }

    /**
     * Update tutorial text with optional type styling
     */
    updateTutorialText(text, type = 'normal') {
        this.tutorialText.textContent = text;
        this.tutorialText.className = '';
        if (type === 'success') {
            this.tutorialText.classList.add('success');
        } else if (type === 'warning') {
            this.tutorialText.classList.add('warning');
        } else if (type === 'complete') {
            this.tutorialText.classList.add('complete');
        }
    }

    /**
     * Show or hide arrow indicator
     */
    showArrowIndicator(show) {
        this.arrowIndicator.style.display = show ? 'block' : 'none';
    }
}
