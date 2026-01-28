export class UIManager {
    constructor() {
        this.tutorialText = document.getElementById('tutorial-text');
        this.chargeBarFill = document.getElementById('charge-bar-fill');
        this.stageIndicator = document.getElementById('stage-indicator');
        this.arrowIndicator = document.getElementById('arrow-indicator');
        this.retryOverlay = document.getElementById('retry-overlay');
        this.retryMessage = document.getElementById('retry-message');
        this.retryButton = document.getElementById('retry-button');

        this.completeOverlay = document.getElementById('complete-overlay');
        this.nextLevelButton = document.getElementById('next-level-button');
        this.retryLevelButton = document.getElementById('retry-level-button');

        this.healthBarFill = document.getElementById('health-bar-fill');
        this.healthText = document.getElementById('health-text');
    }

    updateHealthBar(health) {
        const percentage = Math.max(0, health);
        this.healthBarFill.style.width = percentage + '%';
        this.healthText.textContent = `${Math.ceil(percentage)}% HP`;

        if (percentage < 30) {
            this.healthBarFill.style.background = '#ff0000';
        } else {
            this.healthBarFill.style.background = 'linear-gradient(90deg, #ff4444, #ff6666)';
        }
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

    showRetryMenu(message, onRetry) {
        this.retryMessage.textContent = message;
        this.retryOverlay.style.display = 'flex';
        this.retryButton.onclick = () => {
            this.hideRetryMenu();
            if (onRetry) onRetry();
        };
    }

    hideRetryMenu() {
        this.retryOverlay.style.display = 'none';
    }

    showCompleteMenu(onNext, onRetry) {
        this.completeOverlay.style.display = 'flex';
        this.nextLevelButton.onclick = () => {
            this.hideCompleteMenu();
            if (onNext) onNext();
        };
        this.retryLevelButton.onclick = () => {
            this.hideCompleteMenu();
            if (onRetry) onRetry();
        };
    }

    hideCompleteMenu() {
        this.completeOverlay.style.display = 'none';
    }
}
