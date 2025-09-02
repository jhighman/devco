
import { AppState } from './main.js';
import { debug, debounce } from './utils.js';
import { drawAudioVisualization } from './audio.js'; // Assuming audio.js exports this

// Canvas functions
export function resizeCanvas() {
    if (!AppState.sceneCanvas || !AppState.ctx) {
        debug('Cannot resize canvas: sceneCanvas or ctx missing');
        return;
    }
    
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    
    // Only resize if dimensions actually changed
    if (AppState.sceneCanvas.width !== newWidth || AppState.sceneCanvas.height !== newHeight) {
        AppState.sceneCanvas.width = newWidth;
        AppState.sceneCanvas.height = newHeight;
        debug('Canvas resized to ' + newWidth + 'x' + newHeight);
        
        // Re-render the scene
        if (typeof drawScene === 'function') {
            drawScene();
        }
    }
}

// Helper functions for drawing
export function fillLinearGradient(x0, y0, x1, y1, stops) {
    if (!AppState.ctx) {
        debug('Cannot draw gradient: ctx missing');
        return;
    }
    const g = AppState.ctx.createLinearGradient(x0, y0, x1, y1);
    for (const [o, c] of stops) g.addColorStop(o, c);
    AppState.ctx.fillStyle = g;
    AppState.ctx.fillRect(0, 0, AppState.sceneCanvas.width, AppState.sceneCanvas.height);
}

export function drawNoise(alpha = 0.18) {
    if (!AppState.ctx || !AppState.sceneCanvas) {
        debug('Cannot draw noise: ctx or sceneCanvas missing');
        return;
    }
    const t = document.createElement('canvas');
    const s = 256;
    t.width = t.height = s;
    const c = t.getContext('2d');
    const img = c.createImageData(s, s);
    for (let i = 0; i < img.data.length; i += 4) {
        const v = 32 + Math.random() * 32;
        img.data[i] = img.data[i+1] = img.data[i+2] = v;
        img.data[i+3] = 255;
    }
    c.putImageData(img, 0, 0);
    const p = AppState.ctx.createPattern(t, 'repeat');
    AppState.ctx.save();
    AppState.ctx.globalAlpha = alpha;
    AppState.ctx.globalCompositeOperation = 'overlay';
    AppState.ctx.fillStyle = p;
    AppState.ctx.fillRect(0, 0, AppState.sceneCanvas.width, AppState.sceneCanvas.height);
    AppState.ctx.restore();
}

// Scene-specific drawing functions (with null checks added)
export function drawAlley() {
    if (!AppState.ctx || !AppState.sceneCanvas) {
        debug('Cannot draw alley: ctx or sceneCanvas missing');
        return;
    }
    fillLinearGradient(0, 0, 0, AppState.sceneCanvas.height, [
        [0, "#0b0b12"], [0.55, "#0a0910"], [1, "#05050a"]
    ]);
    drawNoise(0.18);
    
    // Neon spill
    const r = Math.max(AppState.sceneCanvas.width, AppState.sceneCanvas.height) * 0.8;
    const left = AppState.ctx.createRadialGradient(0, AppState.sceneCanvas.height/2, 0, 0, AppState.sceneCanvas.height/2, r);
    left.addColorStop(0, "rgba(255,0,180,0.35)");
    left.addColorStop(1, "rgba(255,0,180,0)");
    AppState.ctx.fillStyle = left;
    AppState.ctx.fillRect(0, 0, AppState.sceneCanvas.width, AppState.sceneCanvas.height);
    
    const right = AppState.ctx.createRadialGradient(AppState.sceneCanvas.width, AppState.sceneCanvas.height/2, 0, AppState.sceneCanvas.width, AppState.sceneCanvas.height/2, r);
    right.addColorStop(0, "rgba(255,190,70,0.32)");
    right.addColorStop(1, "rgba(255,190,70,0)");
    AppState.ctx.fillStyle = right;
    AppState.ctx.fillRect(0, 0, AppState.sceneCanvas.width, AppState.sceneCanvas.height);
}

export function drawCurtain() {
    if (!AppState.ctx || !AppState.sceneCanvas) {
        debug('Cannot draw curtain: ctx or sceneCanvas missing');
        return;
    }
    const x = AppState.sceneCanvas.width * 0.37;
    const y = AppState.sceneCanvas.height * 0.11;
    const w = AppState.sceneCanvas.width * 0.25;
    const h = AppState.sceneCanvas.height * 0.7;
    
    // Rail shadow
    AppState.ctx.fillStyle = "rgba(0,0,0,0.5)";
    AppState.ctx.fillRect(x - 20, y - 10, w + 40, 24);
    
    // Main drape
    const grd = AppState.ctx.createLinearGradient(0, y, 0, y + h);
    grd.addColorStop(0, "#6d001c");
    grd.addColorStop(0.6, "#4a0014");
    grd.addColorStop(1, "#2a000b");
    AppState.ctx.fillStyle = grd;
    AppState.ctx.fillRect(x, y, w, h);
    
    // Folds
    const fold = AppState.ctx.createLinearGradient(0, y, 0, y + h);
    fold.addColorStop(0, "rgba(255,120,160,0.45)");
    fold.addColorStop(0.5, "rgba(255,120,160,0.08)");
    fold.addColorStop(1, "rgba(0,0,0,0)");
    AppState.ctx.save();
    AppState.ctx.globalAlpha = 0.65;
    
    const foldCount = 12;
    for (let i = 0; i < foldCount; i++) {
        const fx = x + (i / foldCount) * w;
        const fw = w / foldCount * 0.5;
        AppState.ctx.fillStyle = fold;
        AppState.ctx.fillRect(fx, y, fw, h);
    }
    AppState.ctx.restore();
    
    // Bottom sweep shadow
    AppState.ctx.fillStyle = "rgba(0,0,0,0.55)";
    AppState.ctx.beginPath();
    const cx = x + w/2;
    const cy = y + h + 10;
    const rx = w * 0.52;
    const ry = h * 0.034;
    AppState.ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    AppState.ctx.fill();
    
    // Simple animation when playing
    if (AppState.isPlaying) {
        const time = Date.now() / 1000;
        const moveX = Math.sin(time * 2) * 3;
        AppState.ctx.save();
        AppState.ctx.fillStyle = "rgba(255,255,255,0.1)";
        AppState.ctx.fillRect(x + moveX, y, w * 0.1, h);
        AppState.ctx.restore();
    }
}

export function drawBurningHouses() {
    if (!AppState.ctx || !AppState.sceneCanvas) {
        debug('Cannot draw burning houses: ctx or sceneCanvas missing');
        return;
    }
    const y = AppState.sceneCanvas.height * 0.65;
    const height = AppState.sceneCanvas.height * 0.35;
    
    AppState.ctx.fillStyle = "#1a0500";
    AppState.ctx.fillRect(0, y, AppState.sceneCanvas.width, height);
    
    const glow = AppState.ctx.createRadialGradient(
        AppState.sceneCanvas.width * 0.5, y, 0,
        AppState.sceneCanvas.width * 0.5, y, AppState.sceneCanvas.width * 0.7
    );
    glow.addColorStop(0, "rgba(255, 87, 34, 0.2)");
    glow.addColorStop(1, "rgba(255, 87, 34, 0)");
    AppState.ctx.fillStyle = glow;
    AppState.ctx.fillRect(0, 0, AppState.sceneCanvas.width, AppState.sceneCanvas.height);
    
    AppState.ctx.fillStyle = "#000000";
    for (let i = 0; i < 7; i++) {
        const x = AppState.sceneCanvas.width * (0.1 + i * 0.12);
        const w = AppState.sceneCanvas.width * 0.08;
        const h = height * (0.3 + Math.random() * 0.3);
        AppState.ctx.fillRect(x, y - h, w, h);
        
        AppState.ctx.fillStyle = "rgba(255, 152, 0, 0.4)";
        const windowSize = w * 0.2;
        AppState.ctx.fillRect(x + w * 0.25, y - h * 0.8, windowSize, windowSize);
        AppState.ctx.fillRect(x + w * 0.6, y - h * 0.8, windowSize, windowSize);
        AppState.ctx.fillRect(x + w * 0.25, y - h * 0.5, windowSize, windowSize);
        AppState.ctx.fillRect(x + w * 0.6, y - h * 0.5, windowSize, windowSize);
        AppState.ctx.fillStyle = "#000000";
    }
    
    const time = Date.now() / 1000;
    AppState.ctx.save();
    AppState.ctx.globalAlpha = 0.3;
    
    for (let i = 0; i < 7; i++) {
        const x = AppState.sceneCanvas.width * (0.1 + i * 0.12);
        const w = AppState.sceneCanvas.width * 0.08;
        const h = height * (0.3 + Math.random() * 0.3);
        
        const flameGrad = AppState.ctx.createLinearGradient(0, y - h, 0, y - h - h * 0.5);
        flameGrad.addColorStop(0, "rgba(255, 87, 34, 0.6)");
        flameGrad.addColorStop(1, "rgba(255, 152, 0, 0)");
        AppState.ctx.fillStyle = flameGrad;
        
        AppState.ctx.beginPath();
        AppState.ctx.moveTo(x, y - h);
        AppState.ctx.lineTo(x + w, y - h);
        
        const flameHeight = h * 0.4;
        const steps = 10;
        for (let j = 0; j <= steps; j++) {
            const fx = x + (w * j / steps);
            const fy = y - h - Math.sin(time * 3 + i + j) * flameHeight * 0.2 - flameHeight * (1 - j / steps);
            AppState.ctx.lineTo(fx, fy);
        }
        
        AppState.ctx.lineTo(x, y - h);
        AppState.ctx.fill();
    }
    AppState.ctx.restore();
}

export function drawDoor() {
    if (!AppState.ctx || !AppState.sceneCanvas) {
        debug('Cannot draw door: ctx or sceneCanvas missing');
        return;
    }
    const doorWidth = AppState.sceneCanvas.width * 0.2;
    const doorHeight = AppState.sceneCanvas.height * 0.5;
    const x = (AppState.sceneCanvas.width - doorWidth) / 2;
    const y = (AppState.sceneCanvas.height - doorHeight) / 2;
    
    AppState.ctx.fillStyle = "#2a1a0a";
    AppState.ctx.fillRect(x - 10, y - 10, doorWidth + 20, doorHeight + 20);
    
    const doorGradient = AppState.ctx.createLinearGradient(x, y, x + doorWidth, y);
    doorGradient.addColorStop(0, "#4a2a0a");
    doorGradient.addColorStop(0.5, "#6d4b2a");
    doorGradient.addColorStop(1, "#4a2a0a");
    AppState.ctx.fillStyle = doorGradient;
    AppState.ctx.fillRect(x, y, doorWidth, doorHeight);
    
    AppState.ctx.fillStyle = "#ffc107";
    AppState.ctx.beginPath();
    AppState.ctx.arc(x + doorWidth * 0.85, y + doorHeight * 0.5, 10, 0, Math.PI * 2);
    AppState.ctx.fill();
    
    const lightGradient = AppState.ctx.createLinearGradient(x, y + doorHeight, x + doorWidth, y + doorHeight);
    lightGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
    lightGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.7)");
    lightGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    AppState.ctx.fillStyle = lightGradient;
    AppState.ctx.fillRect(x, y + doorHeight, doorWidth, 20);
    
    const time = Date.now() / 1000;
    const pulseIntensity = (Math.sin(time * 2) + 1) * 0.5;
    
    AppState.ctx.save();
    AppState.ctx.globalCompositeOperation = 'screen';
    AppState.ctx.globalAlpha = pulseIntensity * 0.3;
    
    const glowGradient = AppState.ctx.createRadialGradient(
        x + doorWidth / 2, y + doorHeight / 2, 0,
        x + doorWidth / 2, y + doorHeight / 2, doorWidth
    );
    glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
    glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    AppState.ctx.fillStyle = glowGradient;
    AppState.ctx.fillRect(x - doorWidth / 2, y - doorHeight / 2, doorWidth * 2, doorHeight * 2);
    
    AppState.ctx.restore();
}

export function drawLightRays() {
    if (!AppState.ctx || !AppState.sceneCanvas) {
        debug('Cannot draw light rays: ctx or sceneCanvas missing');
        return;
    }
    const centerX = AppState.sceneCanvas.width / 2;
    const centerY = AppState.sceneCanvas.height / 2;
    const radius = Math.max(AppState.sceneCanvas.width, AppState.sceneCanvas.height);
    
    const glowGradient = AppState.ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius * 0.5
    );
    glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
    glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    
    AppState.ctx.save();
    AppState.ctx.globalCompositeOperation = 'screen';
    AppState.ctx.fillStyle = glowGradient;
    AppState.ctx.fillRect(0, 0, AppState.sceneCanvas.width, AppState.sceneCanvas.height);
    
    const time = Date.now() / 1000;
    const rayCount = 12;
    
    for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + time * 0.1;
        const length = radius;
        
        const startX = centerX;
        const startY = centerY;
        const endX = centerX + Math.cos(angle) * length;
        const endY = centerY + Math.sin(angle) * length;
        
        const rayGradient = AppState.ctx.createLinearGradient(startX, startY, endX, endY);
        rayGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        rayGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        
        AppState.ctx.beginPath();
        AppState.ctx.moveTo(startX, startY);
        AppState.ctx.lineTo(endX, endY);
        AppState.ctx.lineWidth = 20 + Math.sin(time * 2 + i) * 10;
        AppState.ctx.strokeStyle = rayGradient;
        AppState.ctx.stroke();
    }
    
    AppState.ctx.restore();
}

export function drawDesertRoad() {
    if (!AppState.ctx || !AppState.sceneCanvas) {
        debug('Cannot draw desert road: ctx or sceneCanvas missing');
        return;
    }
    const horizonY = AppState.sceneCanvas.height * 0.6;
    
    const skyGradient = AppState.ctx.createLinearGradient(0, 0, 0, horizonY);
    skyGradient.addColorStop(0, "#1a2a44");
    skyGradient.addColorStop(1, "#ff9800");
    AppState.ctx.fillStyle = skyGradient;
    AppState.ctx.fillRect(0, 0, AppState.sceneCanvas.width, horizonY);
    
    const desertGradient = AppState.ctx.createLinearGradient(0, horizonY, 0, AppState.sceneCanvas.height);
    desertGradient.addColorStop(0, "#ff9800");
    desertGradient.addColorStop(1, "#8d6e63");
    AppState.ctx.fillStyle = desertGradient;
    AppState.ctx.fillRect(0, horizonY, AppState.sceneCanvas.width, AppState.sceneCanvas.height - horizonY);
    
    AppState.ctx.beginPath();
    AppState.ctx.moveTo(AppState.sceneCanvas.width * 0.3, AppState.sceneCanvas.height);
    AppState.ctx.lineTo(AppState.sceneCanvas.width * 0.45, horizonY);
    AppState.ctx.lineTo(AppState.sceneCanvas.width * 0.55, horizonY);
    AppState.ctx.lineTo(AppState.sceneCanvas.width * 0.7, AppState.sceneCanvas.height);
    AppState.ctx.fillStyle = "#4a4a4a";
    AppState.ctx.fill();
    
    AppState.ctx.beginPath();
    AppState.ctx.moveTo(AppState.sceneCanvas.width * 0.5, AppState.sceneCanvas.height);
    AppState.ctx.lineTo(AppState.sceneCanvas.width * 0.5, horizonY);
    AppState.ctx.strokeStyle = "#ffffff";
    AppState.ctx.lineWidth = 5;
    AppState.ctx.setLineDash([20, 20]);
    AppState.ctx.stroke();
    AppState.ctx.setLineDash([]);
    
    AppState.ctx.beginPath();
    AppState.ctx.arc(AppState.sceneCanvas.width * 0.5, horizonY * 0.5, 50, 0, Math.PI * 2);
    const sunGradient = AppState.ctx.createRadialGradient(
        AppState.sceneCanvas.width * 0.5, horizonY * 0.5, 0,
        AppState.sceneCanvas.width * 0.5, horizonY * 0.5, 50
    );
    sunGradient.addColorStop(0, "#ffffff");
    sunGradient.addColorStop(1, "#ffc107");
    AppState.ctx.fillStyle = sunGradient;
    AppState.ctx.fill();
    
    AppState.ctx.save();
    AppState.ctx.globalCompositeOperation = 'screen';
    AppState.ctx.beginPath();
    AppState.ctx.arc(AppState.sceneCanvas.width * 0.5, horizonY * 0.5, 100, 0, Math.PI * 2);
    const sunGlowGradient = AppState.ctx.createRadialGradient(
        AppState.sceneCanvas.width * 0.5, horizonY * 0.5, 50,
        AppState.sceneCanvas.width * 0.5, horizonY * 0.5, 100
    );
    sunGlowGradient.addColorStop(0, "rgba(255, 193, 7, 0.5)");
    sunGlowGradient.addColorStop(1, "rgba(255, 193, 7, 0)");
    AppState.ctx.fillStyle = sunGlowGradient;
    AppState.ctx.fill();
    AppState.ctx.restore();
}

export function drawClubInterior() {
    if (!AppState.ctx || !AppState.sceneCanvas) {
        debug('Cannot draw club interior: ctx or sceneCanvas missing');
        return;
    }
    const width = AppState.sceneCanvas.width;
    const height = AppState.sceneCanvas.height;
    
    AppState.ctx.fillStyle = "#1a0e25";
    AppState.ctx.fillRect(0, 0, width, height);
    
    const floorGradient = AppState.ctx.createLinearGradient(0, height * 0.7, 0, height);
    floorGradient.addColorStop(0, "#2d0a31");
    floorGradient.addColorStop(1, "#1a0e25");
    AppState.ctx.fillStyle = floorGradient;
    AppState.ctx.fillRect(0, height * 0.7, width, height * 0.3);
    
    AppState.ctx.save();
    AppState.ctx.globalAlpha = 0.3;
    const gridSize = 30;
    const gridRows = Math.ceil(height * 0.3 / gridSize);
    const gridCols = Math.ceil(width / gridSize);
    
    for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
            if ((row + col) % 2 === 0) {
                AppState.ctx.fillStyle = "#4a0000";
            } else {
                AppState.ctx.fillStyle = "#2d0a31";
            }
            AppState.ctx.fillRect(col * gridSize, height * 0.7 + row * gridSize, gridSize, gridSize);
        }
    }
    AppState.ctx.restore();
    
    const time = Date.now() / 1000;
    AppState.ctx.save();
    AppState.ctx.globalCompositeOperation = 'screen';
    
    for (let i = 0; i < 5; i++) {
        const x = width * (0.1 + i * 0.2);
        const y = height * 0.2;
        const radius = 30 + Math.sin(time + i) * 10;
        
        const lightGradient = AppState.ctx.createRadialGradient(x, y, 0, x, y, radius);
        if (i % 3 === 0) {
            lightGradient.addColorStop(0, "rgba(255, 0, 128, 0.8)");
            lightGradient.addColorStop(1, "rgba(255, 0, 128, 0)");
        } else if (i % 3 === 1) {
            lightGradient.addColorStop(0, "rgba(0, 128, 255, 0.8)");
            lightGradient.addColorStop(1, "rgba(0, 128, 255, 0)");
        } else {
            lightGradient.addColorStop(0, "rgba(255, 255, 0, 0.8)");
            lightGradient.addColorStop(1, "rgba(255, 255, 0, 0)");
        }
        
        AppState.ctx.fillStyle = lightGradient;
        AppState.ctx.beginPath();
        AppState.ctx.arc(x, y, radius, 0, Math.PI * 2);
        AppState.ctx.fill();
        
        AppState.ctx.beginPath();
        AppState.ctx.moveTo(x, y);
        AppState.ctx.lineTo(x - radius, height);
        AppState.ctx.lineTo(x + radius, height);
        AppState.ctx.closePath();
        
        const beamGradient = AppState.ctx.createLinearGradient(x, y, x, height);
        if (i % 3 === 0) {
            beamGradient.addColorStop(0, "rgba(255, 0, 128, 0.3)");
            beamGradient.addColorStop(1, "rgba(255, 0, 128, 0)");
        } else if (i % 3 === 1) {
            beamGradient.addColorStop(0, "rgba(0, 128, 255, 0.3)");
            beamGradient.addColorStop(1, "rgba(0, 128, 255, 0)");
        } else {
            beamGradient.addColorStop(0, "rgba(255, 255, 0, 0.3)");
            beamGradient.addColorStop(1, "rgba(255, 255, 0, 0)");
        }
        
        AppState.ctx.fillStyle = beamGradient;
        AppState.ctx.fill();
    }
    
    AppState.ctx.restore();
}

export function drawVelvetDancers() {
    if (!AppState.ctx || !AppState.sceneCanvas) {
        debug('Cannot draw velvet dancers: ctx or sceneCanvas missing');
        return;
    }
    const width = AppState.sceneCanvas.width;
    const height = AppState.sceneCanvas.height;
    const time = Date.now() / 1000;
    
    AppState.ctx.save();
    AppState.ctx.fillStyle = "#000000";
    
    const dancerCount = 5;
    for (let i = 0; i < dancerCount; i++) {
        const x = width * (0.1 + i * 0.2);
        const y = height * 0.7;
        const dancerWidth = width * 0.08;
        const dancerHeight = height * 0.3;
        
        AppState.ctx.beginPath();
        AppState.ctx.ellipse(x, y, dancerWidth / 2, dancerHeight / 2, 0, 0, Math.PI * 2);
        AppState.ctx.fill();
        
        AppState.ctx.beginPath();
        AppState.ctx.arc(x, y - dancerHeight / 2 - 20, 15, 0, Math.PI * 2);
        AppState.ctx.fill();
        
        const armLength = dancerWidth * 1.2;
        const armAngle = Math.sin(time * 2 + i) * 0.5;
        
        AppState.ctx.lineWidth = 10;
        AppState.ctx.lineCap = 'round';
        AppState.ctx.strokeStyle = "#000000";
        
        AppState.ctx.beginPath();
        AppState.ctx.moveTo(x - 10, y - dancerHeight / 4);
        AppState.ctx.lineTo(x - 10 - Math.cos(armAngle) * armLength, y - dancerHeight / 4 - Math.sin(armAngle) * armLength);
        AppState.ctx.stroke();
        
        AppState.ctx.beginPath();
        AppState.ctx.moveTo(x + 10, y - dancerHeight / 4);
        AppState.ctx.lineTo(x + 10 + Math.cos(armAngle) * armLength, y - dancerHeight / 4 - Math.sin(armAngle) * armLength);
        AppState.ctx.stroke();
        
        AppState.ctx.save();
        AppState.ctx.fillStyle = "#ffc107";
        AppState.ctx.beginPath();
        AppState.ctx.arc(x, y - dancerHeight / 4, 10, 0, Math.PI * 2);
        AppState.ctx.fill();
        AppState.ctx.restore();
    }
    
    AppState.ctx.globalCompositeOperation = 'screen';
    AppState.ctx.fillStyle = "rgba(128, 0, 32, 0.2)";
    AppState.ctx.fillRect(0, 0, width, height);
    
    AppState.ctx.restore();
}

export function drawChalkCircle() {
    if (!AppState.ctx || !AppState.sceneCanvas) {
        debug('Cannot draw chalk circle: ctx or sceneCanvas missing');
        return;
    }
    const centerX = AppState.sceneCanvas.width / 2;
    const centerY = AppState.sceneCanvas.height / 2;
    const radius = Math.min(AppState.sceneCanvas.width, AppState.sceneCanvas.height) * 0.3;
    
    AppState.ctx.save();
    AppState.ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
    AppState.ctx.lineWidth = 3;
    AppState.ctx.beginPath();
    AppState.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    AppState.ctx.stroke();
    
    const rayCount = 12;
    const rayLength = radius * 0.3;
    
    for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2;
        const startX = centerX + Math.cos(angle) * radius;
        const startY = centerY + Math.sin(angle) * radius;
        const endX = centerX + Math.cos(angle) * (radius + rayLength);
        const endY = centerY + Math.sin(angle) * (radius + rayLength);
        
        AppState.ctx.beginPath();
        AppState.ctx.moveTo(startX, startY);
        AppState.ctx.lineTo(endX, endY);
        AppState.ctx.stroke();
    }
    
    AppState.ctx.restore();
}

export function vignette() {
    if (!AppState.ctx || !AppState.sceneCanvas) {
        debug('Cannot draw vignette: ctx or sceneCanvas missing');
        return;
    }
    const r = Math.max(AppState.sceneCanvas.width, AppState.sceneCanvas.height) * 0.95;
    const g = AppState.ctx.createRadialGradient(
        AppState.sceneCanvas.width/2, AppState.sceneCanvas.height/2, r * 0.55,
        AppState.sceneCanvas.width/2, AppState.sceneCanvas.height/2, r
    );
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(1, "rgba(0,0,0,0.75)");
    AppState.ctx.fillStyle = g;
    AppState.ctx.fillRect(0, 0, AppState.sceneCanvas.width, AppState.sceneCanvas.height);
}

export let drawScene = function() {
    if (!AppState.ctx || !AppState.sceneCanvas) {
        debug('Cannot draw scene: ctx or sceneCanvas missing');
        return;
    }
    AppState.ctx.clearRect(0, 0, AppState.sceneCanvas.width, AppState.sceneCanvas.height);
    
    const gradient = AppState.ctx.createLinearGradient(0, 0, 0, AppState.sceneCanvas.height);
    gradient.addColorStop(0, "#0b0b12");
    gradient.addColorStop(0.5, "#0a0910");
    gradient.addColorStop(1, "#05050a");
    AppState.ctx.fillStyle = gradient;
    AppState.ctx.fillRect(0, 0, AppState.sceneCanvas.width, AppState.sceneCanvas.height);
    
    if (AppState.isPlaying && drawAudioVisualization) {
        try {
            AppState.ctx.save();
            AppState.ctx.globalAlpha = 0.4;
            drawAudioVisualization(AppState.ctx, AppState.sceneCanvas);
            AppState.ctx.restore();
        } catch (error) {
            debug('Error drawing audio visualization: ' + error.message);
        }
    }
    
    vignette();
};

export function initCanvasScene() {
    if (!AppState.sceneCanvas || !AppState.ctx) {
        debug('Cannot initialize canvas scene: sceneCanvas or ctx missing');
        return;
    }
    debug('Initializing canvas scene...');
    
    AppState.sceneCanvas.width = window.innerWidth;
    AppState.sceneCanvas.height = window.innerHeight;
    
    drawScene();
    
    let lastFrameTime = 0;
    function animate(timestamp) {
        if (!AppState.isPlaying && (!AppState.currentPanelAssets || AppState.currentPanelAssets.length === 0)) {
            return; // Exit if idle
        }
        const deltaTime = timestamp - lastFrameTime;
        if (deltaTime > 16) { // Cap at ~60fps
            drawScene();
            if (AppState.currentPanelAssets && AppState.currentPanelAssets.length > 0) {
                AppState.currentPanelAssets = []; // Clear after draw
                debug('Cleared currentPanelAssets after rendering');
            }
            lastFrameTime = timestamp;
        }
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    
    debug('Canvas scene initialized');
}

export const updateCanvasScene = debounce(function() {
    if (!AppState.ctx || !AppState.sceneCanvas || !AppState.chapters) {
        debug('Cannot update canvas scene: ctx, sceneCanvas, or chapters missing');
        return;
    }
    try {
        const drawFunctions = {
            drawGradientBackground: function() {
                const gradient = AppState.ctx.createLinearGradient(0, 0, 0, AppState.sceneCanvas.height);
                gradient.addColorStop(0, "#0b0b12");
                gradient.addColorStop(0.5, "#0a0910");
                gradient.addColorStop(1, "#05050a");
                AppState.ctx.fillStyle = gradient;
                AppState.ctx.fillRect(0, 0, AppState.sceneCanvas.width, AppState.sceneCanvas.height);
            },
            drawVignette: vignette,
            drawBurningHouses: drawBurningHouses,
            drawDoor: drawDoor,
            drawLightRays: drawLightRays,
            drawDesertRoad: drawDesertRoad,
            drawClubInterior: drawClubInterior,
            drawVelvetDancers: drawVelvetDancers,
            drawCurtain: drawCurtain,
            drawChalkCircle: drawChalkCircle
        };
        
        drawScene = function() {
            if (!AppState.ctx || !AppState.sceneCanvas) {
                debug('Cannot draw scene: ctx or sceneCanvas missing');
                return;
            }
            AppState.ctx.clearRect(0, 0, AppState.sceneCanvas.width, AppState.sceneCanvas.height);
            
            const panel = AppState.chapters[AppState.currentChapter]?.panels[AppState.currentPanel];
            if (!panel) {
                debug('No panel found for current chapter/panel');
                drawFunctions.drawGradientBackground();
                drawFunctions.drawVignette();
                return;
            }
            
            drawFunctions.drawGradientBackground();
            
            if (AppState.isPlaying && drawAudioVisualization) {
                try {
                    AppState.ctx.save();
                    AppState.ctx.globalAlpha = 0.4;
                    drawAudioVisualization(AppState.ctx, AppState.sceneCanvas);
                    AppState.ctx.restore();
                } catch (error) {
                    debug('Error drawing audio visualization: ' + error.message);
                }
            }
            
            // Check if narrative panel is visible
            const narrativePanel = document.querySelector('.narrative-panel');
            const isNarrativePanelVisible = narrativePanel && window.getComputedStyle(narrativePanel).display !== 'none';
            const zIndex = narrativePanel ? window.getComputedStyle(narrativePanel).zIndex : 'N/A';
            const classes = narrativePanel ? narrativePanel.className : 'None';
            const position = narrativePanel ? window.getComputedStyle(narrativePanel).position : 'N/A';
            const top = narrativePanel ? window.getComputedStyle(narrativePanel).top : 'N/A';
            debug('Rendering panel: ' + panel.title +
                  ', Narrative panel z-index: ' + zIndex +
                  ', Classes: ' + classes +
                  ', Position: ' + position +
                  ', Top: ' + top +
                  ', Height: ' + (narrativePanel ? narrativePanel.offsetHeight : 'N/A'));
            
            // Reserve space for narrative panel - clip the canvas to avoid drawing in the panel area
            if (isNarrativePanelVisible) {
                AppState.ctx.save();
                
                // Calculate the safe drawing area based on actual panel height with minimum value
                const panelHeight = Math.max(
                    Math.min(narrativePanel.offsetHeight || 0, AppState.sceneCanvas.height * 0.3),
                    AppState.sceneCanvas.height * 0.1
                ); // Min 10% to avoid zero
                
                // Get panel position information for better clipping decisions
                const panelTop = parseInt(window.getComputedStyle(narrativePanel).top) || 0;
                const hasSpecialEffect = narrativePanel.classList.contains('burning-effect') ||
                                        narrativePanel.classList.contains('light-rays') ||
                                        narrativePanel.classList.contains('door-effect') ||
                                        narrativePanel.classList.contains('epilogue-panel');
                
                // Skip clipping for special effect panels that need to render over the entire canvas
                const skipClipping =
                    // Skip for burning panels unless burning-effect is properly applied
                    (panel.title?.toUpperCase().includes('BURNING') && !narrativePanel.classList.contains('burning-effect')) ||
                    // Skip for SHE ARRIVES/COMES panels unless light-rays is properly applied
                    ((panel.title?.toUpperCase().includes('SHE ARRIVES') || panel.title?.toUpperCase().includes('SHE COMES')) &&
                     !narrativePanel.classList.contains('light-rays')) ||
                    // Skip for any panel with light effects unless properly applied
                    ((panel.has_light_rays || panel.has_light_burst) && !narrativePanel.classList.contains('light-rays'));
                
                if (panelHeight > 0 && !skipClipping) {
                    // For special effects, use a more generous clipping area
                    if (hasSpecialEffect) {
                        // Use bottom position for clipping instead of top
                        const bottomPosition = AppState.sceneCanvas.height - panelHeight - 120; // 120px from bottom
                        AppState.ctx.beginPath();
                        AppState.ctx.rect(0, 0, AppState.sceneCanvas.width, bottomPosition);
                        AppState.ctx.clip();
                        debug('Applied special effect clipping with bottom position: ' + bottomPosition);
                    } else {
                        // Standard clipping for normal panels
                        AppState.ctx.beginPath();
                        AppState.ctx.rect(0, panelHeight, AppState.sceneCanvas.width, AppState.sceneCanvas.height - panelHeight);
                        AppState.ctx.clip();
                        debug('Applied standard clipping with panel height: ' + panelHeight);
                    }
                } else {
                    debug('Skipped clipping for special effect panel: ' + panel.title);
                }
            }
            
            // Use panel attributes for scene selection
            if (panel.attributes?.includes('curtain') || panel.title?.toUpperCase().includes('CURTAIN')) {
                try {
                    drawFunctions.drawCurtain();
                } catch (error) {
                    debug(`Error in drawCurtain: ${error.message}`);
                }
            } else if (panel.attributes?.includes('club') || panel.title?.toUpperCase().includes('CLUB')) {
                try {
                    drawFunctions.drawClubInterior();
                } catch (error) {
                    debug(`Error in drawClubInterior: ${error.message}`);
                }
            } else if (panel.attributes?.includes('dancers') || panel.title?.toUpperCase().includes('DANCERS')) {
                try {
                    drawFunctions.drawVelvetDancers();
                } catch (error) {
                    debug(`Error in drawVelvetDancers: ${error.message}`);
                }
            } else if (panel.attributes?.includes('burning') || panel.title?.toUpperCase().includes('BURNING') || panel.title?.toUpperCase().includes('HOUSES')) {
                try {
                    // Use source-over (default composite) for proper layering
                    AppState.ctx.globalCompositeOperation = 'source-over';
                    debug('Rendering panel: ' + panel.title + ', Narrative panel z-index: ' + (narrativePanel ? window.getComputedStyle(narrativePanel).zIndex : 'N/A'));
                    drawFunctions.drawBurningHouses();
                } catch (error) {
                    debug(`Error in drawBurningHouses: ${error.message}`);
                }
            } else if (panel.attributes?.includes('door') || panel.title?.toUpperCase().includes('DOOR')) {
                try {
                    drawFunctions.drawDoor();
                } catch (error) {
                    debug(`Error in drawDoor: ${error.message}`);
                }
            } else if (panel.attributes?.includes('light_rays') || panel.title?.toUpperCase().includes('LIGHT') || panel.title?.toUpperCase().includes('RAYS')) {
                try {
                    drawFunctions.drawLightRays();
                } catch (error) {
                    debug(`Error in drawLightRays: ${error.message}`);
                }
            } else if (panel.attributes?.includes('road') || panel.title?.toUpperCase().includes('ROAD') || panel.title?.toUpperCase().includes('DESERT')) {
                try {
                    drawFunctions.drawDesertRoad();
                } catch (error) {
                    debug(`Error in drawDesertRoad: ${error.message}`);
                }
            } else if (panel.attributes?.includes('chalk_circle') || panel.title?.toUpperCase().includes('CHALK') || panel.title?.toUpperCase().includes('CIRCLE')) {
                try {
                    drawFunctions.drawChalkCircle();
                } catch (error) {
                    debug(`Error in drawChalkCircle: ${error.message}`);
                }
            } else {
                createDefaultVisualization();
            }
            
            // Restore the canvas state if we clipped it
            if (isNarrativePanelVisible) {
                AppState.ctx.restore();
            }
            
            drawFunctions.drawVignette();
            drawNoise(0.05);
        };
        
        drawScene();
    } catch (error) {
        debug(`Error updating canvas scene: ${error.message}`);
        drawScene = function() {
            if (!AppState.ctx || !AppState.sceneCanvas) {
                debug('Cannot draw fallback scene: ctx or sceneCanvas missing');
                return;
            }
            AppState.ctx.clearRect(0, 0, AppState.sceneCanvas.width, AppState.sceneCanvas.height);
            const gradient = AppState.ctx.createLinearGradient(0, 0, 0, AppState.sceneCanvas.height);
            gradient.addColorStop(0, "#0b0b12");
            gradient.addColorStop(0.5, "#0a0910");
            gradient.addColorStop(1, "#05050a");
            AppState.ctx.fillStyle = gradient;
            AppState.ctx.fillRect(0, 0, AppState.sceneCanvas.width, AppState.sceneCanvas.height);
            vignette();
        };
        drawScene();
    }
}, 100); // 100ms debounce

export function createDefaultVisualization() {
    if (!AppState.ctx || !AppState.sceneCanvas) {
        debug('Cannot create default visualization: ctx or sceneCanvas missing');
        return;
    }
    const time = Date.now() / 1000;
    const hue1 = (time * 10) % 360;
    const hue2 = (hue1 + 180) % 360;
    
    const gradient = AppState.ctx.createLinearGradient(0, 0, AppState.sceneCanvas.width, AppState.sceneCanvas.height);
    gradient.addColorStop(0, `hsla(${hue1}, 70%, 20%, 1)`);
    gradient.addColorStop(1, `hsla(${hue2}, 70%, 10%, 1)`);
    AppState.ctx.fillStyle = gradient;
    AppState.ctx.fillRect(0, 0, AppState.sceneCanvas.width, AppState.sceneCanvas.height);
    
    AppState.ctx.save();
    AppState.ctx.globalAlpha = 0.6;
    AppState.ctx.globalCompositeOperation = 'screen';
    
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const size = 5 + Math.sin(time + i) * 3;
        const x = AppState.sceneCanvas.width * (0.1 + 0.8 * ((i / particleCount) + 0.1 * Math.sin(time + i)));
        const y = AppState.sceneCanvas.height * (0.1 + 0.8 * ((i / particleCount) + 0.1 * Math.cos(time + i * 0.7)));
        
        AppState.ctx.fillStyle = `hsla(${(hue1 + i * 10) % 360}, 100%, 70%, 0.7)`;
        AppState.ctx.beginPath();
        AppState.ctx.arc(x, y, size, 0, Math.PI * 2);
        AppState.ctx.fill();
    }
    AppState.ctx.restore();
}