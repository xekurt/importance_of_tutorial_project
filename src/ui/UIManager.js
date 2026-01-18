export class UIManager {
    constructor() {
        this.tutorialText = document.getElementById('tutorial-text');
        this.chargeBarFill = document.getElementById('charge-bar-fill');
        this.stageIndicator = document.getElementById('stage-indicator');
        this.arrowIndicator = document.getElementById('arrow-indicator');
    }

    updateChargeBar(level) {
        this.chargeBarFill.style.width = (level * 100) + '%';
        const r = Math.floor(255 - level * (255 - 139));
        const g = Math.floor(51 - level * 51);
        const b = Math.floor(68 - level * 68);
        this.chargeBarFill.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

    updateStageIndicator(stageName) {
        this.stageIndicator.textContent = stageName;
    }

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

    showArrowIndicator(show) {
        this.arrowIndicator.style.display = show ? 'block' : 'none';
    }
}
