// 等待页面完全加载后执行
document.addEventListener('DOMContentLoaded', () => {
    
    // ================= 1. 平滑滚动功能 =================
    const exploreBtn = document.getElementById('explore-btn');
    const librarySection = document.getElementById('library-section');

    exploreBtn.addEventListener('click', () => {
        librarySection.scrollIntoView({ behavior: 'smooth' });
    });

    // ================= 2. 动态星空特效 =================
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');

    let width, height;
    let stars = [];

    // 设置画布尺寸铺满全屏
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    // 星星类
    class Star {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2; // 星星大小
            this.opacity = Math.random();  // 初始透明度
            this.speed = Math.random() * 0.05 + 0.01; // 闪烁速度
            this.direction = Math.random() > 0.5 ? 1 : -1; // 变亮或变暗
        }
        update() {
            // 星星闪烁逻辑
            this.opacity += this.speed * this.direction;
            if (this.opacity >= 1) { this.direction = -1; }
            if (this.opacity <= 0) { this.direction = 1; }
            
            // 星星缓慢下落（模拟宇宙漂移）
            this.y += 0.2;
            if (this.y > height) { this.y = 0; this.x = Math.random() * width; }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    // 初始化 150 颗星星
    for (let i = 0; i < 150; i++) {
        stars.push(new Star());
    }

    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, width, height); // 清空画布
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animate); // 递归调用，实现连续动画
    }
    animate();
});