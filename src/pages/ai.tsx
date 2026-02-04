import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const AiPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);

  useEffect(() => {
    const initPixi = async () => {
      const app = new PIXI.Application();
      await app.init({ width: 400, height: 400, backgroundColor: 0x000000, antialias: true });

      appRef.current = app;
      if (containerRef.current) containerRef.current.appendChild(app.canvas);

      // Hanya satu objek Graphics untuk semuanya
      const brain = new PIXI.Graphics();
      app.stage.addChild(brain);

      let elapsed = 0;
      app.ticker.add((ticker) => {
        elapsed += 0.05 * ticker.deltaTime;
        const pulse = Math.sin(elapsed) * 5; // Untuk efek kembang kempis

        brain.clear(); // Bersihkan canvas setiap frame

        // 1. Gambar Bentuk Otak (Satu kesatuan)
        // Kita gunakan posisi tengah layar
        const cx = app.screen.width / 2;
        const cy = app.screen.height / 2;

        brain.ellipse(cx - 25, cy, 50 + pulse, 70 + pulse).fill({ color: 0x00aaff, alpha: 0.6 });
        brain.ellipse(cx + 25, cy, 50 + pulse, 70 + pulse).fill({ color: 0x00aaff, alpha: 0.6 });

        // 2. Gambar Efek "Berpikir" (Kilatan di dalam objek yang sama)
        for (let i = 0; i < 3; i++) {
          const flashX = cx + Math.cos(elapsed + i * 2) * 30;
          const flashY = cy + Math.sin(elapsed * 1.5 + i) * 40;
          const flashAlpha = Math.abs(Math.sin(elapsed * 2 + i));
          
          brain.circle(flashX, flashY, 8).fill({ color: 0xffffff, alpha: flashAlpha });
        }
      });
    };

    initPixi();

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, { children: true, texture: true });
        appRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} />;
};

export default AiPage;
