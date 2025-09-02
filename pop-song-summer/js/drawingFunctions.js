// Additional scene drawing functions
window.drawClubInterior = function() {
    // Draw club interior with purple and gold lights
    fillLinearGradient(0, 0, 0, sceneCanvas.height, [
        [0, "#2D0A31"], [0.5, "#1A0E25"], [1, "#2D0A31"]
    ]);
    drawNoise(0.2);
    
    // Add light beams
    const beamCount = 5;
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.globalCompositeOperation = 'screen';
    
    for (let i = 0; i < beamCount; i++) {
        const x = sceneCanvas.width * (0.1 + 0.8 * (i / (beamCount - 1)));
        const width = sceneCanvas.width * 0.05;
        const height = sceneCanvas.height * 1.2;
        
        const gradient = ctx.createLinearGradient(0, 0, 0, sceneCanvas.height);
        
        if (i % 2 === 0) {
            // Purple beam
            gradient.addColorStop(0, "rgba(180, 70, 220, 0)");
            gradient.addColorStop(0.5, "rgba(180, 70, 220, 0.15)");
            gradient.addColorStop(1, "rgba(180, 70, 220, 0)");
        } else {
            // Gold beam
            gradient.addColorStop(0, "rgba(255, 215, 0, 0)");
            gradient.addColorStop(0.5, "rgba(255, 215, 0, 0.15)");
            gradient.addColorStop(1, "rgba(255, 215, 0, 0)");
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x - width/2, -height/2, width, height);
    }
    ctx.restore();
    
    // Add floor reflection
    ctx.fillStyle = "rgba(100, 50, 150, 0.2)";
    ctx.fillRect(0, sceneCanvas.height * 0.7, sceneCanvas.width, sceneCanvas.height * 0.3);
};

window.drawVelvetDancers = function() {
    // Draw club background
    fillLinearGradient(0, 0, 0, sceneCanvas.height, [
        [0, "#2D0A31"], [0.5, "#1A0E25"], [1, "#2D0A31"]
    ]);
    drawNoise(0.2);
    
    // Add light beams
    const beamCount = 5;
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.globalCompositeOperation = 'screen';
    
    for (let i = 0; i < beamCount; i++) {
        const x = sceneCanvas.width * (0.1 + 0.8 * (i / (beamCount - 1)));
        const width = sceneCanvas.width * 0.05;
        const height = sceneCanvas.height * 1.2;
        
        const gradient = ctx.createLinearGradient(0, 0, 0, sceneCanvas.height);
        
        if (i % 2 === 0) {
            // Purple beam
            gradient.addColorStop(0, "rgba(180, 70, 220, 0)");
            gradient.addColorStop(0.5, "rgba(180, 70, 220, 0.15)");
            gradient.addColorStop(1, "rgba(180, 70, 220, 0)");
        } else {
            // Gold beam
            gradient.addColorStop(0, "rgba(255, 215, 0, 0)");
            gradient.addColorStop(0.5, "rgba(255, 215, 0, 0.15)");
            gradient.addColorStop(1, "rgba(255, 215, 0, 0)");
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x - width/2, -height/2, width, height);
    }
    ctx.restore();
    
    // Add floor reflection
    ctx.fillStyle = "rgba(100, 50, 150, 0.2)";
    ctx.fillRect(0, sceneCanvas.height * 0.7, sceneCanvas.width, sceneCanvas.height * 0.3);
    
    // Draw dancers
    const dancerCount = isPlaying ? 7 : 5;
    const time = Date.now() / 1000;
    
    for (let i = 0; i < dancerCount; i++) {
        // Position dancers in a semi-circle
        const angle = Math.PI * (0.2 + 0.6 * (i / (dancerCount - 1)));
        const radius = sceneCanvas.width * 0.3;
        const x = sceneCanvas.width / 2 + Math.cos(angle) * radius;
        const y = sceneCanvas.height * 0.7;
        
        // Dancer body
        const dancerHeight = sceneCanvas.height * 0.25;
        const dancerWidth = dancerHeight * 0.3;
        
        // Animation based on time and audio
        const animationOffset = time * (1 + i * 0.1);
        const moveY = Math.sin(animationOffset * 2) * 10;
        const moveX = Math.cos(animationOffset * 1.5) * 5;
        
        // Draw dancer silhouette
        ctx.save();
        ctx.fillStyle = "#000000";
        
        // Body
        ctx.beginPath();
        ctx.ellipse(
            x + moveX, 
            y + moveY, 
            dancerWidth / 2, 
            dancerHeight / 2, 
            Math.sin(animationOffset) * 0.2, 
            0, Math.PI * 2
        );
        ctx.fill();
        
        // Add velvet texture/color overlay
        ctx.globalCompositeOperation = 'source-atop';
        const velvetGradient = ctx.createLinearGradient(
            x - dancerWidth, y - dancerHeight, 
            x + dancerWidth, y + dancerHeight
        );
        velvetGradient.addColorStop(0, "#800020");
        velvetGradient.addColorStop(0.5, "#600020");
        velvetGradient.addColorStop(1, "#400020");
        
        ctx.fillStyle = velvetGradient;
        ctx.fillRect(
            x - dancerWidth, 
            y - dancerHeight, 
            dancerWidth * 2, 
            dancerHeight * 2
        );
        
        // Add insignia on shoulder
        ctx.globalCompositeOperation = 'source-over';
        const insigniaX = x + dancerWidth * 0.3;
        const insigniaY = y - dancerHeight * 0.3;
        const insigniaSize = dancerWidth * 0.4;
        
        // Insignia circle
        ctx.fillStyle = "#FFC107";
        ctx.beginPath();
        ctx.arc(insigniaX, insigniaY, insigniaSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Insignia rays
        ctx.strokeStyle = "#FFC107";
        ctx.lineWidth = 2;
        const rayCount = 8;
        
        for (let j = 0; j < rayCount; j++) {
            const rayAngle = (j / rayCount) * Math.PI * 2;
            const innerRadius = insigniaSize * 1.1;
            const outerRadius = insigniaSize * 1.5;
            
            ctx.beginPath();
            ctx.moveTo(
                insigniaX + Math.cos(rayAngle) * innerRadius,
                insigniaY + Math.sin(rayAngle) * innerRadius
            );
            ctx.lineTo(
                insigniaX + Math.cos(rayAngle) * outerRadius,
                insigniaY + Math.sin(rayAngle) * outerRadius
            );
            ctx.stroke();
        }
        
        ctx.restore();
    }
    
    // Add subtle fog effect
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.globalCompositeOperation = 'screen';
    
    const fogGradient = ctx.createRadialGradient(
        sceneCanvas.width / 2, sceneCanvas.height * 0.7, 0,
        sceneCanvas.width / 2, sceneCanvas.height * 0.7, sceneCanvas.width * 0.7
    );
    fogGradient.addColorStop(0, "rgba(180, 100, 200, 0.3)");
    fogGradient.addColorStop(1, "rgba(180, 100, 200, 0)");
    
    ctx.fillStyle = fogGradient;
    ctx.fillRect(0, 0, sceneCanvas.width, sceneCanvas.height);
    ctx.restore();
};

window.drawBurningHouses = function() {
    // Draw horizon with burning houses
    fillLinearGradient(0, 0, 0, sceneCanvas.height, [
        [0, "#800020"], [0.5, "#FF3300"], [1, "#800020"]
    ]);
    drawNoise(0.15);
    
    // Draw horizon line
    const horizonY = sceneCanvas.height * 0.6;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, horizonY, sceneCanvas.width, sceneCanvas.height - horizonY);
    
    // Draw burning houses silhouettes
    ctx.fillStyle = "#000000";
    const houseCount = 8;
    
    for (let i = 0; i < houseCount; i++) {
        const x = sceneCanvas.width * (0.1 + 0.8 * (i / (houseCount - 1)));
        const width = sceneCanvas.width * 0.06;
        const height = sceneCanvas.height * 0.08;
        
        // House silhouette
        ctx.beginPath();
        ctx.moveTo(x - width/2, horizonY);
        ctx.lineTo(x - width/2, horizonY - height * 0.7);
        ctx.lineTo(x, horizonY - height);
        ctx.lineTo(x + width/2, horizonY - height * 0.7);
        ctx.lineTo(x + width/2, horizonY);
        ctx.closePath();
        ctx.fill();
        
        // Flames
        if (isPlaying) {
            const time = Date.now() / 1000;
            const flameHeight = height * (0.3 + 0.2 * Math.sin(time * 3 + i));
            
            const flameGradient = ctx.createLinearGradient(0, horizonY - height, 0, horizonY - height - flameHeight);
            flameGradient.addColorStop(0, "rgba(255, 165, 0, 0.8)");
            flameGradient.addColorStop(1, "rgba(255, 69, 0, 0)");
            
            ctx.fillStyle = flameGradient;
            ctx.beginPath();
            ctx.moveTo(x - width/4, horizonY - height);
            ctx.quadraticCurveTo(x, horizonY - height - flameHeight, x + width/4, horizonY - height);
            ctx.closePath();
            ctx.fill();
        }
    }
};

window.drawLargeInsignia = function() {
    // Draw background
    fillLinearGradient(0, 0, 0, sceneCanvas.height, [
        [0, "#1A2A44"], [0.5, "#FFC107"], [1, "#1A2A44"]
    ]);
    drawNoise(0.1);
    
    // Draw large insignia
    const centerX = sceneCanvas.width / 2;
    const centerY = sceneCanvas.height / 2;
    const radius = Math.min(sceneCanvas.width, sceneCanvas.height) * 0.3;
    
    // Draw sun circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    const circleGradient = ctx.createRadialGradient(
        centerX, centerY, radius * 0.7,
        centerX, centerY, radius
    );
    circleGradient.addColorStop(0, "#FFC107");
    circleGradient.addColorStop(1, "#FF8F00");
    ctx.fillStyle = circleGradient;
    ctx.fill();
    
    // Draw rays
    const rayCount = 12;
    const rayLength = radius * 0.5;
    const innerRadius = radius * 1.05;
    
    ctx.strokeStyle = "#FFC107";
    ctx.lineWidth = 5;
    
    for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2;
        const startX = centerX + Math.cos(angle) * innerRadius;
        const startY = centerY + Math.sin(angle) * innerRadius;
        const endX = centerX + Math.cos(angle) * (innerRadius + rayLength);
        const endY = centerY + Math.sin(angle) * (innerRadius + rayLength);
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
    
    // Add glow effect
    ctx.shadowColor = "#FFC107";
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
};

window.drawDoor = function() {
    // Draw background
    fillLinearGradient(0, 0, 0, sceneCanvas.height, [
        [0, "#1A2A44"], [0.5, "#000000"], [1, "#1A2A44"]
    ]);
    drawNoise(0.2);
    
    // Draw door frame
    const doorWidth = sceneCanvas.width * 0.2;
    const doorHeight = sceneCanvas.height * 0.6;
    const doorX = (sceneCanvas.width - doorWidth) / 2;
    const doorY = (sceneCanvas.height - doorHeight) / 2;
    
    // Door frame
    ctx.strokeStyle = "#FFC107";
    ctx.lineWidth = 3;
    ctx.strokeRect(doorX, doorY, doorWidth, doorHeight);
    
    // Door light
    const lightGradient = ctx.createLinearGradient(
        doorX, doorY,
        doorX + doorWidth, doorY + doorHeight
    );
    lightGradient.addColorStop(0, "rgba(255, 193, 7, 0.1)");
    lightGradient.addColorStop(0.5, "rgba(255, 193, 7, 0.3)");
    lightGradient.addColorStop(1, "rgba(255, 193, 7, 0.1)");
    
    ctx.fillStyle = lightGradient;
    ctx.fillRect(doorX, doorY, doorWidth, doorHeight);
    
    // Key hole
    const keyHoleX = doorX + doorWidth * 0.8;
    const keyHoleY = doorY + doorHeight * 0.5;
    
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(keyHoleX, keyHoleY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(keyHoleX - 1, keyHoleY, 2, 10);
};

window.drawLightBurst = function() {
    // Draw light burst background
    fillLinearGradient(0, 0, 0, sceneCanvas.height, [
        [0, "#FFC107"], [0.5, "#FFFFFF"], [1, "#FFC107"]
    ]);
    
    // Add radial light burst
    const centerX = sceneCanvas.width / 2;
    const centerY = sceneCanvas.height / 2;
    const radius = Math.max(sceneCanvas.width, sceneCanvas.height);
    
    const burstGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
    );
    burstGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    burstGradient.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
    burstGradient.addColorStop(0.6, "rgba(255, 193, 7, 0.5)");
    burstGradient.addColorStop(1, "rgba(255, 87, 34, 0.2)");
    
    ctx.fillStyle = burstGradient;
    ctx.fillRect(0, 0, sceneCanvas.width, sceneCanvas.height);
    
    // Add rays of light
    if (isPlaying) {
        const time = Date.now() / 1000;
        const rayCount = 24;
        
        ctx.save();
        ctx.globalAlpha = 0.4 + 0.2 * Math.sin(time);
        ctx.globalCompositeOperation = 'overlay';
        
        for (let i = 0; i < rayCount; i++) {
            const angle = (i / rayCount) * Math.PI * 2;
            const length = radius * (0.7 + 0.3 * Math.sin(time * 2 + i));
            
            ctx.strokeStyle = "#FFFFFF";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
                centerX + Math.cos(angle) * length,
                centerY + Math.sin(angle) * length
            );
            ctx.stroke();
        }
        ctx.restore();
    }
};

window.drawDesertRoad = function() {
    // Draw desert background
    fillLinearGradient(0, 0, 0, sceneCanvas.height, [
        [0, "#FFC107"], [0.5, "#FF9800"], [1, "#FFC107"]
    ]);
    drawNoise(0.1);
    
    // Draw horizon line
    const horizonY = sceneCanvas.height * 0.4;
    
    // Draw sky
    const skyGradient = ctx.createLinearGradient(0, 0, 0, horizonY);
    skyGradient.addColorStop(0, "#1A2A44");
    skyGradient.addColorStop(1, "#FF9800");
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, sceneCanvas.width, horizonY);
    
    // Draw sun
    const sunX = sceneCanvas.width * 0.7;
    const sunY = horizonY * 0.5;
    const sunRadius = sceneCanvas.width * 0.08;
    
    const sunGradient = ctx.createRadialGradient(
        sunX, sunY, 0,
        sunX, sunY, sunRadius
    );
    sunGradient.addColorStop(0, "#FFFFFF");
    sunGradient.addColorStop(0.2, "#FFC107");
    sunGradient.addColorStop(1, "#FF5722");
    
    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw road
    const roadWidth = sceneCanvas.width * 0.3;
    const roadTop = horizonY;
    const roadBottom = sceneCanvas.height;
    
    ctx.beginPath();
    ctx.moveTo(sceneCanvas.width / 2 - roadWidth / 8, roadBottom);
    ctx.lineTo(sceneCanvas.width / 2 - roadWidth / 2, roadTop);
    ctx.lineTo(sceneCanvas.width / 2 + roadWidth / 2, roadTop);
    ctx.lineTo(sceneCanvas.width / 2 + roadWidth / 8, roadBottom);
    ctx.closePath();
    
    const roadGradient = ctx.createLinearGradient(0, roadTop, 0, roadBottom);
    roadGradient.addColorStop(0, "#333333");
    roadGradient.addColorStop(1, "#111111");
    ctx.fillStyle = roadGradient;
    ctx.fill();
    
    // Draw road markings
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.setLineDash([20, 20]);
    ctx.beginPath();
    ctx.moveTo(sceneCanvas.width / 2, roadBottom);
    ctx.lineTo(sceneCanvas.width / 2, roadTop);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw figure on road if playing
    if (isPlaying) {
        const time = Date.now() / 1000;
        const figureX = sceneCanvas.width / 2;
        const figureY = roadBottom - (roadBottom - roadTop) * (0.2 + 0.05 * Math.sin(time));
        const figureHeight = sceneCanvas.height * 0.1;
        
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.ellipse(figureX, figureY, 5, figureHeight / 2, 0, 0, Math.PI * 2);
        ctx.fill();
    }
};

// New function for KEY TURNS panel
window.drawKeyTurns = function() {
    // Draw background
    fillLinearGradient(0, 0, 0, sceneCanvas.height, [
        [0, "#FFC107"], [0.5, "#1A2A44"], [1, "#FFC107"]
    ]);
    drawNoise(0.15);
    
    // Draw door
    const doorWidth = sceneCanvas.width * 0.3;
    const doorHeight = sceneCanvas.height * 0.7;
    const doorX = (sceneCanvas.width - doorWidth) / 2;
    const doorY = (sceneCanvas.height - doorHeight) / 2;
    
    // Door frame with more ornate design
    ctx.strokeStyle = "#FFC107";
    ctx.lineWidth = 5;
    ctx.strokeRect(doorX, doorY, doorWidth, doorHeight);
    
    // Add door details
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(doorX + 20, doorY + 20, doorWidth - 40, doorHeight - 40);
    ctx.rect(doorX + 40, doorY + 40, doorWidth - 80, doorHeight - 80);
    ctx.stroke();
    
    // Key hole
    const keyHoleX = doorX + doorWidth * 0.5;
    const keyHoleY = doorY + doorHeight * 0.5;
    
    // Draw keyhole
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(keyHoleX, keyHoleY, 15, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "#1A2A44";
    ctx.beginPath();
    ctx.arc(keyHoleX, keyHoleY, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw key
    const time = Date.now() / 1000;
    const keyRotation = isPlaying ? Math.sin(time) * 0.2 : 0;
    
    ctx.save();
    ctx.translate(keyHoleX, keyHoleY);
    ctx.rotate(keyRotation);
    
    // Key handle
    ctx.fillStyle = "#FFC107";
    ctx.beginPath();
    ctx.arc(0, -30, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Key stem
    ctx.fillRect(-5, -30, 10, 50);
    
    // Key teeth
    const teethCount = 4;
    for (let i = 0; i < teethCount; i++) {
        const teethY = 5 + i * 8;
        ctx.fillRect(5, teethY, 10, 5);
    }
    
    ctx.restore();
    
    // Add glow effect around the key
    if (isPlaying) {
        ctx.save();
        ctx.globalAlpha = 0.5 + 0.3 * Math.sin(time * 2);
        ctx.globalCompositeOperation = 'screen';
        
        const glowGradient = ctx.createRadialGradient(
            keyHoleX, keyHoleY, 0,
            keyHoleX, keyHoleY, 100
        );
        glowGradient.addColorStop(0, "rgba(255, 193, 7, 0.8)");
        glowGradient.addColorStop(1, "rgba(255, 193, 7, 0)");
        
        ctx.fillStyle = glowGradient;
        ctx.fillRect(keyHoleX - 100, keyHoleY - 100, 200, 200);
        ctx.restore();
    }
    
    // Add musical notes emanating from the keyhole when the key turns
    if (isPlaying) {
        ctx.save();
        ctx.globalAlpha = 0.7;
        
        const noteCount = 5;
        for (let i = 0; i < noteCount; i++) {
            const angle = (i / noteCount) * Math.PI * 2 + time;
            const distance = 50 + 30 * Math.sin(time * 2 + i);
            const x = keyHoleX + Math.cos(angle) * distance;
            const y = keyHoleY + Math.sin(angle) * distance;
            const size = 10 + 5 * Math.sin(time * 3 + i);
            
            // Draw musical note
            ctx.fillStyle = "#FFC107";
            ctx.beginPath();
            ctx.arc(x, y, size / 2, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(x + size / 2, y);
            ctx.lineTo(x + size / 2, y - size * 2);
            ctx.lineTo(x + size * 1.5, y - size * 2);
            ctx.stroke();
        }
        
        ctx.restore();
    }
    
    // Add chord visualization
    if (isPlaying) {
        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.globalCompositeOperation = 'screen';
        
        const chordCount = 3;
        for (let i = 0; i < chordCount; i++) {
            const startX = 0;
            const startY = sceneCanvas.height * (0.3 + 0.2 * i);
            const endX = sceneCanvas.width;
            const endY = startY;
            
            const waveHeight = 20 + 10 * Math.sin(time + i);
            const waveFrequency = 0.01 * (1 + 0.5 * i);
            
            ctx.strokeStyle = `hsl(${40 + i * 20}, 100%, 60%)`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            
            for (let x = startX; x <= endX; x += 5) {
                const progress = x / sceneCanvas.width;
                const amplitude = waveHeight * Math.pow(Math.sin(Math.PI * progress), 0.5);
                const y = startY + amplitude * Math.sin(x * waveFrequency + time * (2 + i));
                
                if (x === startX) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.stroke();
        }
        
        ctx.restore();
    }
};