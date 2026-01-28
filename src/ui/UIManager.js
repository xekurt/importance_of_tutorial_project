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

        this.mainMenuOverlay = document.getElementById('main-menu-overlay');
        this.startTutorialBtn = document.getElementById('start-tutorial-btn');
        this.startGameBtn = document.getElementById('start-game-btn');

        this.finishOverlay = document.getElementById('finish-overlay');
        this.finishMenuButton = document.getElementById('finish-menu-button');
        this.finishRetryButton = document.getElementById('finish-retry-button');
    }

    onStartTutorial(callback) {
        this.startTutorialBtn.addEventListener('click', () => {
            this.hideMainMenu();
            callback();
        });
    }

    onStartGame(callback) {
        this.startGameBtn.addEventListener('click', () => {
            // Placeholder for now
            console.log('Start Game clicked');
        });
    }

    showMainMenu() {
        this.mainMenuOverlay.style.display = 'flex';
    }

    hideMainMenu() {
        this.mainMenuOverlay.style.display = 'none';
    }

    showFinishMenu(onMenu, onRetry) {
        this.finishOverlay.style.display = 'flex';

        // Remove old listeners
        const newMenuBtn = this.finishMenuButton.cloneNode(true);
        const newRetryBtn = this.finishRetryButton.cloneNode(true);
        this.finishMenuButton.parentNode.replaceChild(newMenuBtn, this.finishMenuButton);
        this.finishRetryButton.parentNode.replaceChild(newRetryBtn, this.finishRetryButton);
        this.finishMenuButton = newMenuBtn;
        this.finishRetryButton = newRetryBtn;

        this.finishMenuButton.addEventListener('click', () => {
            this.hideFinishMenu();
            onMenu();
        });
        this.finishRetryButton.addEventListener('click', () => {
            this.hideFinishMenu();
            onRetry();
        });
    }

    hideFinishMenu() {
        this.finishOverlay.style.display = 'none';
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
