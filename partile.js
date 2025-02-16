class Particle {
    constructor(x, y, radius, color="red", canvas, prop = {}) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.prop = prop;
    }

    draw() {
        this.ctx.beginPath();

        // this.ctx.fillStyle = this.color;
        // this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // this.ctx.fill();

        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.radius;
        this.ctx.lineCap = "round";
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x, this.y);
        this.ctx.stroke();
    }
    
}