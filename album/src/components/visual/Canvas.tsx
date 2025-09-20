import React, { useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state } = useAppContext();
  const animationRef = useRef<number | undefined>(undefined);
  
  // Initialize canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Clear any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Initialize effect variables
    let particles: any[] = [];
    let time = 0;
    
    // Create particles based on active effects
    const initializeParticles = () => {
      particles = [];
      
      // Burning effect (embers rising)
      if (state.visualEffects.burning.visible) {
        const intensity = state.visualEffects.burning.intensity;
        const particleCount = Math.floor(100 * intensity);
        
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            type: 'burning',
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 20,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2,
            color: `hsl(${Math.random() * 30 + 10}, 100%, ${Math.random() * 20 + 50}%)`,
          });
        }
      }
      
      // Light rays effect
      if (state.visualEffects.lightRays.visible) {
        const intensity = state.visualEffects.lightRays.intensity;
        const particleCount = Math.floor(20 * intensity);
        const color = state.visualEffects.lightRays.color || 'white';
        
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            type: 'rays',
            angle: Math.random() * Math.PI * 2,
            length: Math.random() * canvas.width * 0.8 + canvas.width * 0.2,
            width: Math.random() * 30 + 10,
            speed: Math.random() * 0.001 + 0.0005,
            opacity: Math.random() * 0.2 + 0.1,
            color,
          });
        }
      }
      
      // Light burst effect
      if (state.visualEffects.lightBurst.visible) {
        const intensity = state.visualEffects.lightBurst.intensity;
        
        particles.push({
          type: 'burst',
          x: canvas.width / 2,
          y: canvas.height / 2,
          radius: Math.min(canvas.width, canvas.height) * 0.4,
          maxRadius: Math.min(canvas.width, canvas.height) * 0.8,
          opacity: 0.7 * intensity,
          growth: 0.5 * intensity,
        });
      }
      
      // Stars effect (always present but with varying intensity)
      const starCount = state.visualEffects.insignia.visible ? 200 : 100;
      for (let i = 0; i < starCount; i++) {
        particles.push({
          type: 'stars',
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
      
      // Road effect
      if (state.visualEffects.road.visible) {
        particles.push({
          type: 'road',
          startX: canvas.width / 2,
          startY: canvas.height,
          endX: canvas.width / 2,
          endY: canvas.height * 0.3,
          width: canvas.width * 0.3,
        });
      }
      
      // Door effect
      if (state.visualEffects.door.visible) {
        particles.push({
          type: 'door',
          x: canvas.width / 2,
          y: canvas.height / 2,
          width: canvas.width * 0.2,
          height: canvas.height * 0.4,
          glowIntensity: 0.5,
        });
      }
    };
    
    // Initialize particles
    initializeParticles();
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;
      
      // Draw all particles based on their type
      particles.forEach((particle, index) => {
        switch (particle.type) {
          case 'burning':
            // Draw ember particles moving upward
            particle.y -= particle.speed;
            particle.x += Math.sin(time + index) * 0.5;
            
            // Reset particle if it goes off screen
            if (particle.y < -10) {
              particle.y = canvas.height + Math.random() * 20;
              particle.x = Math.random() * canvas.width;
            }
            
            // Draw particle
            ctx.globalAlpha = particle.opacity * state.visualEffects.burning.intensity;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            break;
            
          case 'rays':
            // Draw light rays emanating from center
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            
            particle.angle += particle.speed;
            
            const startX = centerX;
            const startY = centerY;
            const endX = centerX + Math.cos(particle.angle) * particle.length;
            const endY = centerY + Math.sin(particle.angle) * particle.length;
            
            // Create gradient for ray
            const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity * state.visualEffects.lightRays.intensity})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = particle.width;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            break;
            
          case 'burst':
            // Draw expanding light burst
            const burstGradient = ctx.createRadialGradient(
              particle.x, particle.y, 0,
              particle.x, particle.y, particle.radius
            );
            
            burstGradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity})`);
            burstGradient.addColorStop(0.7, `rgba(255, 255, 255, ${particle.opacity * 0.5})`);
            burstGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.fillStyle = burstGradient;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Expand the burst
            particle.radius += particle.growth;
            
            // Reset if it gets too big
            if (particle.radius > particle.maxRadius) {
              particle.radius = 0;
            }
            break;
            
          case 'stars':
            // Draw twinkling stars
            const twinkle = Math.sin(time * particle.twinkleSpeed + particle.twinkleOffset) * 0.5 + 0.5;
            ctx.globalAlpha = twinkle * 0.7;
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            break;
            
          case 'road':
            // Draw a perspective road
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = '#333';
            
            // Draw road
            ctx.beginPath();
            ctx.moveTo(particle.startX - particle.width / 2, particle.startY);
            ctx.lineTo(particle.startX + particle.width / 2, particle.startY);
            ctx.lineTo(particle.endX + particle.width / 6, particle.endY);
            ctx.lineTo(particle.endX - particle.width / 6, particle.endY);
            ctx.closePath();
            ctx.fill();
            
            // Draw center line
            ctx.strokeStyle = '#FFF';
            ctx.lineWidth = 5;
            ctx.setLineDash([20, 20]);
            ctx.beginPath();
            ctx.moveTo(particle.startX, particle.startY);
            ctx.lineTo(particle.endX, particle.endY);
            ctx.stroke();
            ctx.setLineDash([]);
            break;
            
          case 'door':
            // Draw a glowing door
            ctx.globalAlpha = 0.9;
            
            // Door frame
            ctx.fillStyle = '#333';
            ctx.fillRect(
              particle.x - particle.width / 2,
              particle.y - particle.height / 2,
              particle.width,
              particle.height
            );
            
            // Door glow
            const doorGlow = ctx.createLinearGradient(
              particle.x, particle.y - particle.height / 2,
              particle.x, particle.y + particle.height / 2
            );
            
            doorGlow.addColorStop(0, 'rgba(255, 255, 255, 0)');
            doorGlow.addColorStop(0.5, `rgba(255, 255, 255, ${particle.glowIntensity})`);
            doorGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.fillStyle = doorGlow;
            ctx.fillRect(
              particle.x - particle.width / 2 + 5,
              particle.y - particle.height / 2 + 5,
              particle.width - 10,
              particle.height - 10
            );
            break;
        }
      });
      
      // Reset global alpha
      ctx.globalAlpha = 1;
      
      // Continue animation loop
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [state.visualEffects]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-canvas"
      aria-hidden="true"
    />
  );
};

export default Canvas;