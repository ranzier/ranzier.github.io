(function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.id = 'bubbleCanvas';
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = 2;
    canvas.style.pointerEvents = 'none';
    document.querySelector('.banner').appendChild(canvas);
  
    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);
  
    const bubbles = [];
    const bubbleCount = window.innerWidth < 600 ? 15 : 40; // 移动端少一些气泡
  
    class Bubble {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.radius = Math.random() * 10 + 5;
        this.speed = Math.random() * 0.8 + 0.3;
        this.alpha = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.y -= this.speed;
        if (this.y + this.radius < 0) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fill();
      }
    }
  
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(new Bubble());
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubbles.forEach(b => {
        b.update();
        b.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();
  })();
  

