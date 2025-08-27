  const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        
        let t = 0;
        let w, h;
        
        function resizeCanvas() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
        
        function mag(k, e) {
            return Math.sqrt(k * k + e * e);
        }
        
        function drawPoint(x, y) {
           //variables
            const k = x / 4 - 12.5;
            const e = y / 9;
            const o = mag(k, e) / 9;
            
            const q = x / 3 + 99 + (3 / k) * Math.sin(y) + k * (1 + Math.cos(y) / 3 + Math.sin(e + o * 4 - t * 2));
            const c = o / 5 + e / 4 - t / 8;
            
            const finalX = q * Math.cos(c) + w/2 - 200;
            const finalY = (q + 49) * Math.sin(c) * Math.cos(c) - q / 3 + 30 * o + h/2 - 220;
            
            // visual rendering
            const alpha = Math.max(0.1, Math.min(0.8, o / 20));
            const hue = (t * 50 + o * 10) % 360;
            
            ctx.fillStyle = `hsla(${hue}, 60%, 70%, ${alpha})`;
            ctx.fillRect(finalX, finalY, 1, 1);
        }
        
        function animate() {
            // Clear canvas with fade effect
            ctx.fillStyle = 'rgba(6, 6, 6, 0.05)';
            ctx.fillRect(0, 0, w, h);
            
            // Update time
            t += Math.PI / 90;
            
            // Draw points
            for (let i = 0; i < 20000; i++) {
                const x = i % 100;
                const y = i / 350;
                drawPoint(x, y);
            }
            
            requestAnimationFrame(animate);
        }
        
        // Initialize
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();
        
        // Some feedback on click
        document.querySelector('.login-btn').addEventListener('click', (e) => {
            e.preventDefault();
            alert('Very Cool right 😂😂 ');
        });