class Origin {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.x = this.canvas.width/2;
        this.y = this.canvas.height/2;
        this.lastX = this.canvas.width/2;
        this.lastY = this.canvas.height/2;
        this.isMouseInside = false;
        this.originParticle = new Particle(this.x, this.y, 5, "red", this.canvas);
    }

    setPosition(particle, x, y) {
        particle.x = this.lastX + x;
        particle.y = this.lastY + y;
    }

    draw() {
        this.originParticle.draw();
    }

    update() {
        if (!this.isMouseInside) {
            this.x = this.canvas.width/2;
            this.y = this.canvas.height/2;
        }
        
        this.lastX = this.lastX + (this.x - this.lastX) * 0.01;
        this.lastY = this.lastY + (this.y - this.lastY) * 0.01;
        delete this.originParticle;
        this.originParticle = new Particle(this.lastX, this.lastY, 5, "red", this.canvas);
        // this.draw();
    }
}