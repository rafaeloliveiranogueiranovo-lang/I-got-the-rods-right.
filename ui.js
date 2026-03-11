/**
 * ui.js - Gerenciamento de Interface do Usuário
 * Responsável por desenhar UI, tela inicial, placar, etc.
 */

const UI = {
    overlay: null,

    // Inicializa UI
    init() {
        this.overlay = document.getElementById('ui-overlay');
    },

    // Tela inicial
    showMenu(onPlayClick) {
        this.overlay.innerHTML = `
            <div class="menu-screen">
                <button class="play-button" id="playButton">PLAY</button>
                <div class="subtitle">divirta-se</div>
            </div>
        `;

        const playButton = document.getElementById('playButton');
        playButton.addEventListener('click', () => {
            this.hideMenu();
            onPlayClick();
        });
    },

    // Esconde menu
    hideMenu() {
        const menu = this.overlay.querySelector('.menu-screen');

        if (menu) {
            menu.style.animation = "fadeOut 0.3s ease-out";

            setTimeout(() => {
                this.overlay.innerHTML = "";
            }, 300);
        }
    },

    // Mostra placar
    showScore(score, highScore) {

        const scoreDiv = document.createElement("div");
        scoreDiv.className = "score-display";
        scoreDiv.textContent = `Score: ${score}`;

        const highScoreDiv = document.createElement("div");
        highScoreDiv.className = "highscore-display";
        highScoreDiv.textContent = `High: ${highScore}`;

        this.overlay.appendChild(scoreDiv);
        this.overlay.appendChild(highScoreDiv);
    },

    // Atualiza números do placar
    updateScore(score, highScore) {

        const scoreDiv = this.overlay.querySelector(".score-display");
        const highScoreDiv = this.overlay.querySelector(".highscore-display");

        if (scoreDiv) scoreDiv.textContent = `Score: ${score}`;
        if (highScoreDiv) highScoreDiv.textContent = `High: ${highScore}`;
    },

    // Remove placar
    hideScore() {

        const scoreDiv = this.overlay.querySelector(".score-display");
        const highScoreDiv = this.overlay.querySelector(".highscore-display");

        if (scoreDiv) scoreDiv.remove();
        if (highScoreDiv) highScoreDiv.remove();
    },

    // Linha de mira
    drawAimLine(ctx, startX, startY, endX, endY) {

        const distance = Physics.distance(startX, startY, endX, endY);
        const maxDistance = 150;
        const clamped = Math.min(distance, maxDistance);

        const angle = Math.atan2(endY - startY, endX - startX);

        const lineEndX = startX + Math.cos(angle) * clamped;
        const lineEndY = startY + Math.sin(angle) * clamped;

        ctx.save();

        ctx.strokeStyle = "rgba(255,255,255,0.6)";
        ctx.lineWidth = 3;
        ctx.setLineDash([10,10]);

        ctx.beginPath();
        ctx.moveTo(startX,startY);
        ctx.lineTo(lineEndX,lineEndY);
        ctx.stroke();

        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(lineEndX,lineEndY,6,0,Math.PI*2);
        ctx.fillStyle="rgba(255,255,255,0.4)";
        ctx.fill();

        ctx.restore();
    },

    // Rastro da bola
    drawTrail(ctx, trail) {

        ctx.save();

        trail.forEach(point => {

            const alpha = point.life / 30;
            const size = 8 * alpha;

            ctx.fillStyle = `rgba(102,126,234,${alpha * 0.6})`;

            ctx.beginPath();
            ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.restore();
    }
};
