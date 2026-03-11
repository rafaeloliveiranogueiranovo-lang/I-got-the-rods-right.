/**
 * physics.js - Motor de física do jogo
 * Responsável por gravidade, colisões e movimento
 */

const Physics = {
    // Constantes de física
    GRAVITY: 0.4,
    MAX_VELOCITY: 20,
    BOUNCE_DAMPING: 0.6,
    FRICTION: 0.98,

    // Aplica gravidade
    applyGravity(obj) {
        obj.vy += this.GRAVITY;

        if (obj.vy > this.MAX_VELOCITY) {
            obj.vy = this.MAX_VELOCITY;
        }
    },

    // Atualiza posição
    updatePosition(obj) {
        obj.x += obj.vx;
        obj.y += obj.vy;

        obj.vx *= this.FRICTION;
        obj.vy *= this.FRICTION;
    },

    // Colisão círculo com retângulo
    checkCircleRectCollision(circle, rect) {

        const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
        const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

        const dx = circle.x - closestX;
        const dy = circle.y - closestY;

        const distanceSquared = dx * dx + dy * dy;

        return distanceSquared < (circle.radius * circle.radius);
    },

    // Aplica quique
    applyBounce(obj, direction) {

        if (direction === "vertical") {
            obj.vy = -obj.vy * this.BOUNCE_DAMPING;
        }

        if (direction === "horizontal") {
            obj.vx = -obj.vx * this.BOUNCE_DAMPING;
        }

    },

    // Verifica se objeto está parado
    isObjectStopped(obj) {

        const speed = Math.sqrt(obj.vx * obj.vx + obj.vy * obj.vy);

        return speed < 0.5;

    },

    // Distância entre dois pontos
    distance(x1, y1, x2, y2) {

        const dx = x2 - x1;
        const dy = y2 - y1;

        return Math.sqrt(dx * dx + dy * dy);

    },

    // Normaliza vetor
    normalize(x, y) {

        const length = Math.sqrt(x * x + y * y);

        if (length === 0) {
            return { x: 0, y: 0 };
        }

        return {
            x: x / length,
            y: y / length
        };

    }
};
