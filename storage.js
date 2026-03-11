/**
 * storage.js - Gerenciamento de LocalStorage
 * Responsável por salvar e recuperar o high score
 */

const Storage = {
    HIGH_SCORE_KEY: 'arcadeGameHighScore',

    // Salva o high score
    saveHighScore(score) {
        try {
            localStorage.setItem(this.HIGH_SCORE_KEY, score.toString());
            return true;
        } catch (error) {
            console.warn('Erro ao salvar high score:', error);
            return false;
        }
    },

    // Pega o high score salvo
    getHighScore() {
        try {
            const saved = localStorage.getItem(this.HIGH_SCORE_KEY);
            return saved ? parseInt(saved, 10) : 0;
        } catch (error) {
            console.warn('Erro ao carregar high score:', error);
            return 0;
        }
    },

    // Atualiza se bater recorde
    checkAndUpdateHighScore(currentScore) {
        const highScore = this.getHighScore();

        if (currentScore > highScore) {
            this.saveHighScore(currentScore);
            return true;
        }

        return false;
    },

    // Reset (útil para debug)
    resetHighScore() {
        try {
            localStorage.removeItem(this.HIGH_SCORE_KEY);
            return true;
        } catch (error) {
            console.warn('Erro ao resetar high score:', error);
            return false;
        }
    }
};
