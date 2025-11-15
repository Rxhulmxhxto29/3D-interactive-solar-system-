$(window).load(function(){

    var body = $("body"),
        universe = $("#universe"),
        solarsys = $("#solar-system");

    // Starfield Animation
    var starsCanvas = document.getElementById('stars');
    var starsCtx = starsCanvas.getContext('2d');
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;

    var stars = [];
    for (var i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * starsCanvas.width,
            y: Math.random() * starsCanvas.height,
            radius: Math.random() * 1.5,
            opacity: Math.random(),
            twinkleSpeed: Math.random() * 0.02 + 0.01
        });
    }

    function drawStars() {
        starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
        stars.forEach(function(star) {
            starsCtx.beginPath();
            starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            starsCtx.fillStyle = 'rgba(255, 255, 255, ' + star.opacity + ')';
            starsCtx.fill();
            
            // Twinkling effect
            star.opacity += star.twinkleSpeed;
            if (star.opacity > 1 || star.opacity < 0.3) {
                star.twinkleSpeed *= -1;
            }
        });
        requestAnimationFrame(drawStars);
    }
    drawStars();

    // Shooting Stars
    var particlesCanvas = document.getElementById('particles');
    var particlesCtx = particlesCanvas.getContext('2d');
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;

    var shootingStars = [];

    function createShootingStar() {
        shootingStars.push({
            x: Math.random() * particlesCanvas.width,
            y: Math.random() * particlesCanvas.height / 2,
            length: Math.random() * 80 + 40,
            speed: Math.random() * 10 + 5,
            opacity: 1,
            angle: Math.PI / 4
        });
    }



    // Create shooting star every 3-5 seconds
    setInterval(function() {
        if (Math.random() > 0.5) {
            createShootingStar();
        }
    }, 3000);

    // TIE Interceptor Style Spaceship
    var spaceship = {
        x: 0,
        y: particlesCanvas.height / 2,
        speed: 1.2,
        size: 100,
        trail: [],
        active: true
    };

    function drawSpaceship() {
        if (!spaceship.active) {
            spaceship.active = true;
            spaceship.x = 0;
            spaceship.y = particlesCanvas.height / 2 + (Math.random() - 0.5) * 200;
            spaceship.trail = [];
        }

        if (spaceship.active) {
            particlesCtx.save();
            particlesCtx.translate(spaceship.x, spaceship.y);

            // Main cockpit sphere
            var cockpitGradient = particlesCtx.createRadialGradient(0, 0, 0, 0, 0, spaceship.size * 0.4);
            cockpitGradient.addColorStop(0, '#aaaaaa');
            cockpitGradient.addColorStop(0.7, '#6a6a6a');
            cockpitGradient.addColorStop(1, '#4a4a4a');
            particlesCtx.fillStyle = cockpitGradient;
            particlesCtx.beginPath();
            particlesCtx.arc(0, 0, spaceship.size * 0.4, 0, Math.PI * 2);
            particlesCtx.fill();

            // Cockpit window (red/pink tint)
            var windowGradient = particlesCtx.createRadialGradient(spaceship.size * 0.15, 0, 0, spaceship.size * 0.15, 0, spaceship.size * 0.25);
            windowGradient.addColorStop(0, 'rgba(255, 150, 200, 1)');
            windowGradient.addColorStop(0.6, 'rgba(255, 100, 150, 0.9)');
            windowGradient.addColorStop(1, 'rgba(200, 50, 100, 0.6)');
            particlesCtx.fillStyle = windowGradient;
            particlesCtx.beginPath();
            particlesCtx.arc(spaceship.size * 0.15, 0, spaceship.size * 0.25, 0, Math.PI * 2);
            particlesCtx.fill();

            // Top solar panel wing (angled)
            particlesCtx.fillStyle = '#7a7a7a';
            particlesCtx.beginPath();
            particlesCtx.moveTo(-spaceship.size * 0.3, -spaceship.size * 0.4);
            particlesCtx.lineTo(spaceship.size * 0.8, -spaceship.size * 1.2);
            particlesCtx.lineTo(spaceship.size * 1.1, -spaceship.size * 1.15);
            particlesCtx.lineTo(spaceship.size * 0.1, -spaceship.size * 0.35);
            particlesCtx.closePath();
            particlesCtx.fill();

            // Top wing highlight
            particlesCtx.strokeStyle = '#aaaaaa';
            particlesCtx.lineWidth = 3;
            particlesCtx.beginPath();
            particlesCtx.moveTo(-spaceship.size * 0.2, -spaceship.size * 0.38);
            particlesCtx.lineTo(spaceship.size * 0.85, -spaceship.size * 1.18);
            particlesCtx.stroke();

            // Bottom solar panel wing (angled)
            particlesCtx.fillStyle = '#7a7a7a';
            particlesCtx.beginPath();
            particlesCtx.moveTo(-spaceship.size * 0.3, spaceship.size * 0.4);
            particlesCtx.lineTo(spaceship.size * 0.8, spaceship.size * 1.2);
            particlesCtx.lineTo(spaceship.size * 1.1, spaceship.size * 1.15);
            particlesCtx.lineTo(spaceship.size * 0.1, spaceship.size * 0.35);
            particlesCtx.closePath();
            particlesCtx.fill();

            // Bottom wing highlight
            particlesCtx.strokeStyle = '#aaaaaa';
            particlesCtx.lineWidth = 3;
            particlesCtx.beginPath();
            particlesCtx.moveTo(-spaceship.size * 0.2, spaceship.size * 0.38);
            particlesCtx.lineTo(spaceship.size * 0.85, spaceship.size * 1.18);
            particlesCtx.stroke();

            // Central connecting struts
            particlesCtx.strokeStyle = '#5a5a5a';
            particlesCtx.lineWidth = 4;
            particlesCtx.beginPath();
            particlesCtx.moveTo(0, -spaceship.size * 0.4);
            particlesCtx.lineTo(spaceship.size * 0.4, -spaceship.size * 0.8);
            particlesCtx.stroke();
            
            particlesCtx.beginPath();
            particlesCtx.moveTo(0, spaceship.size * 0.4);
            particlesCtx.lineTo(spaceship.size * 0.4, spaceship.size * 0.8);
            particlesCtx.stroke();

            // Engine glow at rear
            var engineGlow = particlesCtx.createRadialGradient(-spaceship.size * 0.4, 0, 0, -spaceship.size * 0.4, 0, spaceship.size * 0.6);
            engineGlow.addColorStop(0, 'rgba(150, 220, 255, 1)');
            engineGlow.addColorStop(0.5, 'rgba(100, 180, 255, 0.8)');
            engineGlow.addColorStop(1, 'rgba(50, 120, 255, 0)');
            particlesCtx.fillStyle = engineGlow;
            particlesCtx.beginPath();
            particlesCtx.arc(-spaceship.size * 0.4, 0, spaceship.size * 0.4, 0, Math.PI * 2);
            particlesCtx.fill();

            particlesCtx.restore();

            // Engine trail
            spaceship.trail.push({ 
                x: spaceship.x - spaceship.size * 0.4, 
                y: spaceship.y,
                opacity: 1 
            });
            if (spaceship.trail.length > 30) spaceship.trail.shift();

            spaceship.trail.forEach(function(point) {
                var trailGradient = particlesCtx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 20);
                trailGradient.addColorStop(0, 'rgba(150, 220, 255, ' + (point.opacity * 0.9) + ')');
                trailGradient.addColorStop(1, 'rgba(100, 180, 255, 0)');
                particlesCtx.fillStyle = trailGradient;
                particlesCtx.beginPath();
                particlesCtx.arc(point.x, point.y, 18, 0, Math.PI * 2);
                particlesCtx.fill();
                point.opacity -= 0.033;
            });

            spaceship.x += spaceship.speed;

            if (spaceship.x > particlesCanvas.width + 150) {
                spaceship.x = -150;
                spaceship.y = particlesCanvas.height / 2 + (Math.random() - 0.5) * 300;
                spaceship.trail = [];
            }
        }
    }

    // Update drawShootingStars to include spaceship
    function drawShootingStars() {
        particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
        
        shootingStars = shootingStars.filter(function(star) {
            particlesCtx.save();
            particlesCtx.translate(star.x, star.y);
            particlesCtx.rotate(star.angle);
            
            var gradient = particlesCtx.createLinearGradient(0, 0, star.length, 0);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
            gradient.addColorStop(0.5, 'rgba(200, 220, 255, ' + star.opacity + ')');
            gradient.addColorStop(1, 'rgba(255, 255, 255, ' + star.opacity + ')');
            
            particlesCtx.strokeStyle = gradient;
            particlesCtx.lineWidth = 2;
            particlesCtx.beginPath();
            particlesCtx.moveTo(0, 0);
            particlesCtx.lineTo(star.length, 0);
            particlesCtx.stroke();
            particlesCtx.restore();
            
            star.x += Math.cos(star.angle) * star.speed;
            star.y += Math.sin(star.angle) * star.speed;
            star.opacity -= 0.01;
            
            return star.opacity > 0 && star.x < particlesCanvas.width && star.y < particlesCanvas.height;
        });

        drawSpaceship();
        
        requestAnimationFrame(drawShootingStars);
    }
    drawShootingStars();

    // Nebula Background
    var nebulaCanvas = document.getElementById('nebula');
    var nebulaCtx = nebulaCanvas.getContext('2d');
    nebulaCanvas.width = window.innerWidth;
    nebulaCanvas.height = window.innerHeight;

    var nebulaClouds = [];
    for (var i = 0; i < 15; i++) {
        nebulaClouds.push({
            x: Math.random() * nebulaCanvas.width,
            y: Math.random() * nebulaCanvas.height,
            radius: Math.random() * 200 + 100,
            color: ['rgba(138, 43, 226, 0.1)', 'rgba(0, 212, 255, 0.1)', 'rgba(255, 20, 147, 0.1)'][Math.floor(Math.random() * 3)],
            speedX: (Math.random() - 0.5) * 0.2,
            speedY: (Math.random() - 0.5) * 0.2
        });
    }

    function drawNebula() {
        nebulaCtx.clearRect(0, 0, nebulaCanvas.width, nebulaCanvas.height);
        nebulaClouds.forEach(function(cloud) {
            var gradient = nebulaCtx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.radius);
            gradient.addColorStop(0, cloud.color);
            gradient.addColorStop(1, 'transparent');
            nebulaCtx.fillStyle = gradient;
            nebulaCtx.fillRect(0, 0, nebulaCanvas.width, nebulaCanvas.height);
            
            cloud.x += cloud.speedX;
            cloud.y += cloud.speedY;
            
            if (cloud.x < -cloud.radius) cloud.x = nebulaCanvas.width + cloud.radius;
            if (cloud.x > nebulaCanvas.width + cloud.radius) cloud.x = -cloud.radius;
            if (cloud.y < -cloud.radius) cloud.y = nebulaCanvas.height + cloud.radius;
            if (cloud.y > nebulaCanvas.height + cloud.radius) cloud.y = -cloud.radius;
        });
        requestAnimationFrame(drawNebula);
    }
    drawNebula();

    // Asteroid Belt
    var asteroidsCanvas = document.getElementById('asteroids');
    var asteroidsCtx = asteroidsCanvas.getContext('2d');
    asteroidsCanvas.width = window.innerWidth;
    asteroidsCanvas.height = window.innerHeight;

    var asteroids = [];
    for (var i = 0; i < 150; i++) {
        var angle = Math.random() * Math.PI * 2;
        var distance = 250 + Math.random() * 80;
        asteroids.push({
            angle: angle,
            distance: distance,
            size: Math.random() * 2 + 0.5,
            speed: 0.0001 + Math.random() * 0.0002,
            opacity: Math.random() * 0.5 + 0.3
        });
    }

    function drawAsteroids() {
        asteroidsCtx.clearRect(0, 0, asteroidsCanvas.width, asteroidsCanvas.height);
        var centerX = asteroidsCanvas.width / 2;
        var centerY = asteroidsCanvas.height / 2;
        
        asteroids.forEach(function(asteroid) {
            var x = centerX + Math.cos(asteroid.angle) * asteroid.distance;
            var y = centerY + Math.sin(asteroid.angle) * asteroid.distance;
            
            asteroidsCtx.beginPath();
            asteroidsCtx.arc(x, y, asteroid.size, 0, Math.PI * 2);
            asteroidsCtx.fillStyle = 'rgba(200, 200, 200, ' + asteroid.opacity + ')';
            asteroidsCtx.fill();
            
            asteroid.angle += asteroid.speed;
        });
        requestAnimationFrame(drawAsteroids);
    }
    drawAsteroids();

    // Meteor Shower
    var meteorShowerActive = false;
    var meteors = [];

    function createMeteor() {
        meteors.push({
            x: Math.random() * particlesCanvas.width,
            y: -50,
            length: Math.random() * 60 + 30,
            speed: Math.random() * 15 + 10,
            opacity: 1,
            angle: Math.PI / 3
        });
    }

    function drawMeteors() {
        meteors = meteors.filter(function(meteor) {
            particlesCtx.save();
            particlesCtx.translate(meteor.x, meteor.y);
            particlesCtx.rotate(meteor.angle);
            
            var gradient = particlesCtx.createLinearGradient(0, 0, meteor.length, 0);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
            gradient.addColorStop(0.5, 'rgba(255, 200, 100, ' + meteor.opacity + ')');
            gradient.addColorStop(1, 'rgba(255, 255, 255, ' + meteor.opacity + ')');
            
            particlesCtx.strokeStyle = gradient;
            particlesCtx.lineWidth = 2;
            particlesCtx.beginPath();
            particlesCtx.moveTo(0, 0);
            particlesCtx.lineTo(meteor.length, 0);
            particlesCtx.stroke();
            particlesCtx.restore();
            
            meteor.x += Math.cos(meteor.angle) * meteor.speed;
            meteor.y += Math.sin(meteor.angle) * meteor.speed;
            meteor.opacity -= 0.015;
            
            return meteor.opacity > 0 && meteor.y < particlesCanvas.height;
        });
    }

    $('#meteorShower').click(function() {
        meteorShowerActive = true;
        $(this).text('Meteor Shower Active!').css('background', 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)');
        
        var meteorCount = 0;
        var meteorInterval = setInterval(function() {
            createMeteor();
            meteorCount++;
            if (meteorCount >= 50) {
                clearInterval(meteorInterval);
                meteorShowerActive = false;
                $('#meteorShower').text('Meteor Shower').css('background', '');
            }
        }, 100);
    });

    // Parallax Effect with smooth animation
    var mouseX = 0;
    var mouseY = 0;
    var currentX = 0;
    var currentY = 0;
    
    $(document).mousemove(function(e) {
        mouseX = (e.pageX - window.innerWidth / 2) / 50;
        mouseY = (e.pageY - window.innerHeight / 2) / 50;
    });
    
    function updateParallax() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        $('#galaxy').css('transform', 'translate(' + currentX + 'px, ' + currentY + 'px)');
        requestAnimationFrame(updateParallax);
    }
    updateParallax();

    // Planet Click - Open Info Panel
    var planetData = {
        mercury: {
            title: 'Mercury',
            description: 'The smallest and fastest planet in our solar system',
            stats: {
                'Diameter': '4,879 km',
                'Mass': '3.285 × 10²³ kg',
                'Distance from Sun': '57.9 million km',
                'Orbital Period': '88 Earth days',
                'Surface Temp': '-173°C to 427°C',
                'Moons': '0',
                'Composition': 'Rocky, iron core',
                'Day Length': '59 Earth days'
            }
        },
        venus: {
            title: 'Venus',
            description: 'The hottest planet with a thick toxic atmosphere',
            stats: {
                'Diameter': '12,104 km',
                'Mass': '4.867 × 10²⁴ kg',
                'Distance from Sun': '108.2 million km',
                'Orbital Period': '225 Earth days',
                'Surface Temp': '462°C (864°F)',
                'Moons': '0',
                'Composition': 'Rocky, volcanic',
                'Day Length': '243 Earth days'
            }
        },
        earth: {
            title: 'Earth',
            description: 'Our home planet, the only known world with life',
            stats: {
                'Diameter': '12,742 km',
                'Mass': '5.972 × 10²⁴ kg',
                'Distance from Sun': '149.6 million km',
                'Orbital Period': '365.25 days',
                'Surface Temp': '-88°C to 58°C',
                'Moons': '1 (Luna)',
                'Composition': '71% water, 29% land',
                'Day Length': '24 hours'
            }
        },
        mars: {
            title: 'Mars',
            description: 'The Red Planet, target for future human exploration',
            stats: {
                'Diameter': '6,779 km',
                'Mass': '6.39 × 10²³ kg',
                'Distance from Sun': '227.9 million km',
                'Orbital Period': '687 Earth days',
                'Surface Temp': '-125°C to 20°C',
                'Moons': '2 (Phobos, Deimos)',
                'Composition': 'Rocky, iron oxide',
                'Day Length': '24.6 hours'
            }
        },
        jupiter: {
            title: 'Jupiter',
            description: 'The largest planet, a massive gas giant',
            stats: {
                'Diameter': '139,820 km',
                'Mass': '1.898 × 10²⁷ kg',
                'Distance from Sun': '778.5 million km',
                'Orbital Period': '11.9 Earth years',
                'Surface Temp': '-108°C',
                'Moons': '79+ (Ganymede largest)',
                'Composition': 'Hydrogen, helium',
                'Day Length': '9.9 hours'
            }
        },
        saturn: {
            title: 'Saturn',
            description: 'Famous for its spectacular ring system',
            stats: {
                'Diameter': '116,460 km',
                'Mass': '5.683 × 10²⁶ kg',
                'Distance from Sun': '1.43 billion km',
                'Orbital Period': '29.5 Earth years',
                'Surface Temp': '-138°C',
                'Moons': '82+ (Titan largest)',
                'Composition': 'Hydrogen, helium',
                'Day Length': '10.7 hours'
            }
        },
        uranus: {
            title: 'Uranus',
            description: 'The ice giant that rotates on its side',
            stats: {
                'Diameter': '50,724 km',
                'Mass': '8.681 × 10²⁵ kg',
                'Distance from Sun': '2.87 billion km',
                'Orbital Period': '84 Earth years',
                'Surface Temp': '-224°C',
                'Moons': '27 (Titania largest)',
                'Composition': 'Ice, hydrogen, helium',
                'Day Length': '17.2 hours'
            }
        },
        neptune: {
            title: 'Neptune',
            description: 'The windiest planet in our solar system',
            stats: {
                'Diameter': '49,244 km',
                'Mass': '1.024 × 10²⁶ kg',
                'Distance from Sun': '4.50 billion km',
                'Orbital Period': '165 Earth years',
                'Surface Temp': '-214°C',
                'Moons': '14 (Triton largest)',
                'Composition': 'Ice, hydrogen, helium',
                'Day Length': '16.1 hours'
            }
        }
    };

    // Sun data
    planetData.sun = {
        title: 'The Sun',
        description: 'The star at the center of our solar system',
        stats: {
            'Type': 'G-type main-sequence star',
            'Diameter': '1,392,700 km',
            'Mass': '1.989 × 10³⁰ kg',
            'Surface Temp': '5,500°C',
            'Core Temp': '15,000,000°C',
            'Age': '4.6 billion years',
            'Composition': '73% hydrogen, 25% helium',
            'Light Travel': '8.3 minutes to Earth'
        }
    };

    $('.planet').click(function(e) {
        e.stopPropagation();
        $(this).addClass('planet-pulse');
        setTimeout(() => {
            $(this).removeClass('planet-pulse');
        }, 600);
        
        var planetName = $(this).attr('data-planet');
        if (planetName && planetData[planetName]) {
            showPlanetInfo(planetName);
        }
    });

    // Sun click handler
    $('#sun').click(function(e) {
        e.stopPropagation();
        showPlanetInfo('sun');
    });

    // Help overlay
    $('#helpButton').click(function() {
        $('#help-overlay').toggleClass('help-hidden help-visible');
    });

    $('#close-help').click(function() {
        $('#help-overlay').removeClass('help-visible').addClass('help-hidden');
    });

    // Keyboard shortcuts removed - only ESC key for closing panels
    $(document).keydown(function(e) {
        if (e.key.toLowerCase() === 'escape') {
            $('#info-panel').removeClass('info-panel-open').addClass('info-panel-closed');
            $('#help-overlay').removeClass('help-visible').addClass('help-hidden');
        }
    });

    // Close panels when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('#info-panel, .planet, #sun').length) {
            $('#info-panel').removeClass('info-panel-open').addClass('info-panel-closed');
        }
    });

    // FPS Counter with optimized updates
    var fps = 0;
    var lastTime = performance.now();
    var frames = 0;
    var fpsElement = document.getElementById('fps');
    var activeElement = document.getElementById('active-objects');
    var renderTimeElement = document.getElementById('render-time');
    var memoryElement = document.getElementById('memory-usage');
    var asteroidCountElement = document.getElementById('asteroid-count');
    var starCountElement = document.getElementById('star-count');
    var rotationSpeedElement = document.getElementById('rotation-speed');
    var frameStartTime = 0;
    
    function updateFPS() {
        frames++;
        var currentTime = performance.now();
        
        // Calculate render time
        if (frameStartTime > 0) {
            var renderTime = currentTime - frameStartTime;
            renderTimeElement.textContent = renderTime.toFixed(1) + 'ms';
        }
        frameStartTime = currentTime;
        
        if (currentTime >= lastTime + 1000) {
            fps = Math.round((frames * 1000) / (currentTime - lastTime));
            fpsElement.textContent = fps;
            
            // Update active objects count
            var activeCount = shootingStars.length + meteors.length;
            activeElement.textContent = activeCount;
            
            // Update asteroid and star counts
            if (typeof asteroids !== 'undefined') {
                asteroidCountElement.textContent = asteroids.length;
            }
            if (typeof stars !== 'undefined') {
                starCountElement.textContent = stars.length;
            }
            
            // Update memory usage if available
            if (performance.memory) {
                var usedMemory = (performance.memory.usedJSHeapSize / 1048576).toFixed(1);
                var totalMemory = (performance.memory.totalJSHeapSize / 1048576).toFixed(1);
                memoryElement.textContent = usedMemory + '/' + totalMemory + ' MB';
            } else {
                memoryElement.textContent = 'N/A';
            }
            
            // Update rotation speed based on current scale
            var speedScale = $('body').hasClass('speed-scale') ? '1x' : 
                           $('body').hasClass('size-scale') ? '0.5x' : 
                           $('body').hasClass('distance-scale') ? '2x' : '1x';
            rotationSpeedElement.textContent = speedScale;
            
            frames = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(updateFPS);
    }
    updateFPS();

    function showPlanetInfo(planetName) {
        var data = planetData[planetName];
        var statsHtml = '';
        
        for (var key in data.stats) {
            statsHtml += '<div class="stat"><span class="stat-label">' + key + ':</span><span class="stat-value">' + data.stats[key] + '</span></div>';
        }
        
        $('#info-title').text(data.title);
        $('#info-details').html(
            '<p style="font-size: 16px; color: #aaa; margin-bottom: 20px;">' + data.description + '</p>' +
            '<h3>Planetary Statistics</h3>' +
            statsHtml
        );
        
        $('#info-panel').removeClass('info-panel-closed').addClass('info-panel-open');
    }

    $('#close-info').click(function() {
        $('#info-panel').removeClass('info-panel-open').addClass('info-panel-closed');
    });

    // Toggle Trails
    var trailsVisible = false;
    $('#toggleTrails').click(function() {
        trailsVisible = !trailsVisible;
        var btn = $(this);
        if (trailsVisible) {
            $('body').addClass('show-trails');
            btn.text('Hide Trails').addClass('active');
        } else {
            $('body').removeClass('show-trails');
            btn.text('Show Trails').removeClass('active');
        }
    });

    // Eclipse Effect
    $('#toggleEclipse').click(function() {
        var btn = $(this);
        if (btn.prop('disabled')) return;
        
        $('body').addClass('eclipse-active');
        btn.text('Eclipse Active!').prop('disabled', true).css('opacity', '0.6');
        
        setTimeout(function() {
            $('body').removeClass('eclipse-active');
            btn.text('Trigger Eclipse').prop('disabled', false).css('opacity', '1');
        }, 5000);
    });

    // Resize canvases on window resize with debouncing
    var resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            starsCanvas.width = window.innerWidth;
            starsCanvas.height = window.innerHeight;
            particlesCanvas.width = window.innerWidth;
            particlesCanvas.height = window.innerHeight;
            nebulaCanvas.width = window.innerWidth;
            nebulaCanvas.height = window.innerHeight;
            asteroidsCanvas.width = window.innerWidth;
            asteroidsCanvas.height = window.innerHeight;
        }, 250);
    });

    // Combined animation loop for meteors
    function animateParticles() {
        particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
        
        // Draw shooting stars
        shootingStars = shootingStars.filter(function(star) {
            particlesCtx.save();
            particlesCtx.translate(star.x, star.y);
            particlesCtx.rotate(star.angle);
            
            var gradient = particlesCtx.createLinearGradient(0, 0, star.length, 0);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
            gradient.addColorStop(0.5, 'rgba(200, 220, 255, ' + star.opacity + ')');
            gradient.addColorStop(1, 'rgba(255, 255, 255, ' + star.opacity + ')');
            
            particlesCtx.strokeStyle = gradient;
            particlesCtx.lineWidth = 2;
            particlesCtx.beginPath();
            particlesCtx.moveTo(0, 0);
            particlesCtx.lineTo(star.length, 0);
            particlesCtx.stroke();
            particlesCtx.restore();
            
            star.x += Math.cos(star.angle) * star.speed;
            star.y += Math.sin(star.angle) * star.speed;
            star.opacity -= 0.01;
            
            return star.opacity > 0 && star.x < particlesCanvas.width && star.y < particlesCanvas.height;
        });
        
        // Draw meteors
        drawMeteors();
        
        requestAnimationFrame(animateParticles);
    }
    
    // Replace the old drawShootingStars call
    animateParticles();

    // Welcome screen
    $('#start-exploration').click(function() {
        $('#welcome-screen').addClass('hidden');
        setTimeout(function() {
            $('#welcome-screen').remove();
        }, 1000);
    });

    var init = function() {
        body.removeClass('view-2D opening').addClass("view-3D").delay(2000).queue(function() {
            $(this).removeClass('hide-UI').addClass("set-speed");
            $(this).dequeue();
        });
    };

    var setView = function(view) { universe.removeClass().addClass(view); };

    $("#toggle-data").click(function(e) {
        body.toggleClass("data-open data-close");
        e.preventDefault();
    });

    // Toggle controls panel
    $("#controls-toggle-btn, #close-controls").click(function(e) {
        body.toggleClass("controls-open controls-close");
        e.preventDefault();
    });

    $("#data a").click(function(e) {
        var ref = $(this).attr("class");
        solarsys.removeClass().addClass(ref);
        $(this).parent().find('a').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    // View toggle button
    $("#toggleView").click(function() { 
        body.toggleClass("view-3D view-2D");
        if (body.hasClass("view-3D")) {
            $(this).text("2D View");
        } else {
            $(this).text("3D View");
        }
    });
    
    // Zoom toggle button
    $("#toggleZoom").click(function() { 
        body.toggleClass("zoom-large zoom-close");
        if (body.hasClass("zoom-large")) {
            $(this).text("Zoom Out");
        } else {
            $(this).text("Zoom In");
        }
    });
    
    // Scale buttons
    $("#setSpeed").click(function() { 
        universe.attr('class', 'scale-stretched');
        $(".scale-btn").removeClass("active");
        $(this).addClass("active");
        console.log('Speed Scale activated');
    });
    
    $("#setSize").click(function() { 
        universe.attr('class', 'scale-s');
        $(".scale-btn").removeClass("active");
        $(this).addClass("active");
        console.log('Size Scale activated');
    });
    
    $("#setDistance").click(function() { 
        universe.attr('class', 'scale-d');
        $(".scale-btn").removeClass("active");
        $(this).addClass("active");
        console.log('Distance Scale activated');
    });

    init();
    
    // Music control
    var solarSound = document.getElementById('solarSound');
    var isPlaying = false;

    $("#startStopButton").click(function () {
        if (isPlaying) {
            solarSound.pause();
            $(this).text('Start Music');
            isPlaying = false;
        } else {
            solarSound.play().catch(function(error) {
                console.log('Audio play failed:', error);
            });
            $(this).text('Stop Music');
            isPlaying = true;
        }
    });

    // ========== NEW FEATURES ==========
    
    // Day/Night Cycle Toggle
    $("#toggleDayNight").click(function() {
        $("#earth .planet").toggleClass("day-night-active");
        if ($("#earth .planet").hasClass("day-night-active")) {
            $(this).text("🌍 Day/Night (On)");
            $(this).addClass("active");
        } else {
            $(this).text("🌍 Day/Night Cycle");
            $(this).removeClass("active");
        }
    });
    
    // Constellation Lines
    var constellationsCanvas = document.getElementById('constellations');
    var constellationsCtx = constellationsCanvas.getContext('2d');
    constellationsCanvas.width = window.innerWidth;
    constellationsCanvas.height = window.innerHeight;
    var constellationsVisible = false;
    
    // Define constellations (simplified patterns)
    var constellations = [
        // Orion
        {name: "Orion", stars: [
            {x: 0.3, y: 0.4}, {x: 0.32, y: 0.35}, {x: 0.35, y: 0.38},
            {x: 0.28, y: 0.45}, {x: 0.32, y: 0.48}, {x: 0.35, y: 0.45}
        ]},
        // Big Dipper
        {name: "Big Dipper", stars: [
            {x: 0.65, y: 0.25}, {x: 0.68, y: 0.23}, {x: 0.72, y: 0.24},
            {x: 0.75, y: 0.26}, {x: 0.78, y: 0.25}, {x: 0.8, y: 0.28}, {x: 0.82, y: 0.32}
        ]},
        // Cassiopeia
        {name: "Cassiopeia", stars: [
            {x: 0.5, y: 0.15}, {x: 0.53, y: 0.18}, {x: 0.56, y: 0.16},
            {x: 0.59, y: 0.19}, {x: 0.62, y: 0.17}
        ]}
    ];
    
    function drawConstellations() {
        constellationsCtx.clearRect(0, 0, constellationsCanvas.width, constellationsCanvas.height);
        
        constellations.forEach(function(constellation) {
            constellationsCtx.strokeStyle = 'rgba(0, 212, 255, 0.6)';
            constellationsCtx.lineWidth = 1.5;
            constellationsCtx.beginPath();
            
            constellation.stars.forEach(function(star, index) {
                var x = star.x * constellationsCanvas.width;
                var y = star.y * constellationsCanvas.height;
                
                if (index === 0) {
                    constellationsCtx.moveTo(x, y);
                } else {
                    constellationsCtx.lineTo(x, y);
                }
                
                // Draw star point
                constellationsCtx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                constellationsCtx.beginPath();
                constellationsCtx.arc(x, y, 3, 0, Math.PI * 2);
                constellationsCtx.fill();
            });
            
            constellationsCtx.stroke();
            
            // Draw constellation name
            var firstStar = constellation.stars[0];
            constellationsCtx.fillStyle = 'rgba(0, 212, 255, 0.8)';
            constellationsCtx.font = '14px Times New Roman';
            constellationsCtx.fillText(constellation.name, 
                firstStar.x * constellationsCanvas.width - 20, 
                firstStar.y * constellationsCanvas.height - 10);
        });
    }
    
    $("#toggleConstellations").click(function() {
        constellationsVisible = !constellationsVisible;
        $("#constellations").toggleClass("active");
        
        if (constellationsVisible) {
            drawConstellations();
            $(this).text("⭐ Constellations (On)");
            $(this).addClass("active");
        } else {
            $(this).text("⭐ Constellations");
            $(this).removeClass("active");
        }
    });
    
    // Mini-map
    var minimapCanvas = document.getElementById('minimap-canvas');
    var minimapCtx = minimapCanvas.getContext('2d');
    minimapCanvas.width = 230;
    minimapCanvas.height = 200;
    var minimapVisible = false;
    
    function drawMinimap() {
        if (!minimapVisible) return;
        
        minimapCtx.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);
        
        var centerX = minimapCanvas.width / 2;
        var centerY = minimapCanvas.height / 2;
        
        // Draw sun
        minimapCtx.beginPath();
        minimapCtx.arc(centerX, centerY, 8, 0, Math.PI * 2);
        minimapCtx.fillStyle = '#FDB813';
        minimapCtx.fill();
        
        // Draw planet orbits and positions
        var planets = [
            {name: 'Mercury', distance: 20, color: '#8C7853', size: 2},
            {name: 'Venus', distance: 30, color: '#FFC649', size: 3},
            {name: 'Earth', distance: 40, color: '#4169E1', size: 3},
            {name: 'Mars', distance: 50, color: '#E27B58', size: 2.5},
            {name: 'Jupiter', distance: 70, color: '#C9935B', size: 6},
            {name: 'Saturn', distance: 85, color: '#F4D292', size: 5},
            {name: 'Uranus', distance: 95, color: '#4FD0E7', size: 4},
            {name: 'Neptune', distance: 105, color: '#4b70dd', size: 4}
        ];
        
        var time = Date.now() * 0.0001;
        
        planets.forEach(function(planet, index) {
            // Draw orbit
            minimapCtx.beginPath();
            minimapCtx.arc(centerX, centerY, planet.distance, 0, Math.PI * 2);
            minimapCtx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            minimapCtx.lineWidth = 1;
            minimapCtx.stroke();
            
            // Draw planet
            var angle = time * (1 / (index + 1));
            var x = centerX + Math.cos(angle) * planet.distance;
            var y = centerY + Math.sin(angle) * planet.distance;
            
            minimapCtx.beginPath();
            minimapCtx.arc(x, y, planet.size, 0, Math.PI * 2);
            minimapCtx.fillStyle = planet.color;
            minimapCtx.fill();
        });
        
        requestAnimationFrame(drawMinimap);
    }
    
    $("#toggleMinimap").click(function() {
        minimapVisible = !minimapVisible;
        $("#minimap").toggleClass("minimap-hidden");
        
        if (minimapVisible) {
            drawMinimap();
            $(this).text("🗺️ Mini-map (On)");
            $(this).addClass("active");
        } else {
            $(this).text("🗺️ Mini-map");
            $(this).removeClass("active");
        }
    });
    
    // Planet Comparison Mode
    $("#toggleComparison").click(function() {
        $("#comparison-panel").toggleClass("comparison-hidden");
        
        if (!$("#comparison-panel").hasClass("comparison-hidden")) {
            $(this).text("📏 Compare (Open)");
            $(this).addClass("active");
        } else {
            $(this).text("📏 Compare Planets");
            $(this).removeClass("active");
        }
    });
    
    $("#close-comparison").click(function() {
        $("#comparison-panel").addClass("comparison-hidden");
        $("#toggleComparison").text("📏 Compare Planets");
        $("#toggleComparison").removeClass("active");
    });
    
    // Distant Galaxies Background
    var galaxiesCanvas = document.getElementById('galaxies');
    var galaxiesCtx = galaxiesCanvas.getContext('2d');
    galaxiesCanvas.width = window.innerWidth;
    galaxiesCanvas.height = window.innerHeight;
    
    // Define multiple distant galaxies
    var distantGalaxies = [
        // Andromeda-like spiral galaxy (top right)
        {
            x: 0.75, y: 0.2, size: 80, type: 'spiral', 
            color1: 'rgba(150, 150, 255, 0.4)', 
            color2: 'rgba(200, 200, 255, 0.2)',
            rotation: 0, rotationSpeed: 0.0002
        },
        // Small elliptical galaxy (top left)
        {
            x: 0.15, y: 0.15, size: 40, type: 'elliptical',
            color1: 'rgba(255, 200, 150, 0.4)',
            color2: 'rgba(255, 220, 180, 0.2)',
            rotation: 0, rotationSpeed: 0.0003
        },
        // Spiral galaxy (bottom left)
        {
            x: 0.2, y: 0.75, size: 60, type: 'spiral',
            color1: 'rgba(255, 150, 200, 0.4)',
            color2: 'rgba(255, 180, 220, 0.2)',
            rotation: Math.PI / 4, rotationSpeed: -0.0002
        },
        // Small galaxy (bottom right)
        {
            x: 0.85, y: 0.8, size: 35, type: 'elliptical',
            color1: 'rgba(200, 255, 200, 0.3)',
            color2: 'rgba(220, 255, 220, 0.2)',
            rotation: 0, rotationSpeed: 0.00025
        },
        // Medium spiral (center right)
        {
            x: 0.8, y: 0.5, size: 50, type: 'spiral',
            color1: 'rgba(180, 220, 255, 0.35)',
            color2: 'rgba(200, 230, 255, 0.2)',
            rotation: Math.PI / 3, rotationSpeed: 0.0001
        }
    ];
    
    function drawDistantGalaxies() {
        galaxiesCtx.clearRect(0, 0, galaxiesCanvas.width, galaxiesCanvas.height);
        
        distantGalaxies.forEach(function(galaxy) {
            var x = galaxy.x * galaxiesCanvas.width;
            var y = galaxy.y * galaxiesCanvas.height;
            
            galaxiesCtx.save();
            galaxiesCtx.translate(x, y);
            galaxiesCtx.rotate(galaxy.rotation);
            
            if (galaxy.type === 'spiral') {
                // Draw spiral arms
                for (var arm = 0; arm < 2; arm++) {
                    galaxiesCtx.beginPath();
                    for (var i = 0; i < 100; i++) {
                        var angle = (i * 0.15) + (arm * Math.PI);
                        var radius = (i / 100) * galaxy.size;
                        var px = Math.cos(angle) * radius;
                        var py = Math.sin(angle) * radius * 0.5;
                        
                        if (i === 0) {
                            galaxiesCtx.moveTo(px, py);
                        } else {
                            galaxiesCtx.lineTo(px, py);
                        }
                    }
                    galaxiesCtx.strokeStyle = galaxy.color1;
                    galaxiesCtx.lineWidth = 2;
                    galaxiesCtx.stroke();
                }
                
                // Draw core
                var gradient = galaxiesCtx.createRadialGradient(0, 0, 0, 0, 0, galaxy.size * 0.3);
                gradient.addColorStop(0, galaxy.color1);
                gradient.addColorStop(0.5, galaxy.color2);
                gradient.addColorStop(1, 'transparent');
                galaxiesCtx.fillStyle = gradient;
                galaxiesCtx.beginPath();
                galaxiesCtx.arc(0, 0, galaxy.size * 0.3, 0, Math.PI * 2);
                galaxiesCtx.fill();
                
            } else if (galaxy.type === 'elliptical') {
                // Draw elliptical galaxy
                galaxiesCtx.beginPath();
                galaxiesCtx.ellipse(0, 0, galaxy.size, galaxy.size * 0.6, 0, 0, Math.PI * 2);
                var gradient = galaxiesCtx.createRadialGradient(0, 0, 0, 0, 0, galaxy.size);
                gradient.addColorStop(0, galaxy.color1);
                gradient.addColorStop(0.6, galaxy.color2);
                gradient.addColorStop(1, 'transparent');
                galaxiesCtx.fillStyle = gradient;
                galaxiesCtx.fill();
            }
            
            galaxiesCtx.restore();
            
            // Update rotation
            galaxy.rotation += galaxy.rotationSpeed;
        });
        
        requestAnimationFrame(drawDistantGalaxies);
    }
    drawDistantGalaxies();
    
    // Milky Way Background
    var milkywayCanvas = document.getElementById('milkyway');
    var milkywayCtx = milkywayCanvas.getContext('2d');
    milkywayCanvas.width = window.innerWidth;
    milkywayCanvas.height = window.innerHeight;
    
    var milkywayAngle = 0;
    
    function drawMilkyWay() {
        milkywayCtx.clearRect(0, 0, milkywayCanvas.width, milkywayCanvas.height);
        
        milkywayCtx.save();
        milkywayCtx.translate(milkywayCanvas.width / 2, milkywayCanvas.height / 2);
        milkywayCtx.rotate(milkywayAngle);
        
        // Draw spiral galaxy
        for (var i = 0; i < 300; i++) {
            var angle = i * 0.3;
            var radius = i * 2;
            var x = Math.cos(angle) * radius;
            var y = Math.sin(angle) * radius * 0.3;
            
            var opacity = Math.max(0, 1 - (i / 300));
            milkywayCtx.fillStyle = 'rgba(180, 180, 255, ' + (opacity * 0.15) + ')';
            milkywayCtx.beginPath();
            milkywayCtx.arc(x, y, 3, 0, Math.PI * 2);
            milkywayCtx.fill();
        }
        
        milkywayCtx.restore();
        
        milkywayAngle += 0.0001;
        requestAnimationFrame(drawMilkyWay);
    }
    drawMilkyWay();
    
    // ========== EDUCATIONAL FEATURES ==========
    
    // Achievement System
    var achievements = {
        explorer: {name: "Explorer", icon: "🌍", description: "View all 8 planets", unlocked: false},
        quizMaster: {name: "Quiz Master", icon: "🧠", description: "Score 80%+ on quiz", unlocked: false},
        scientist: {name: "Scientist", icon: "🔬", description: "Use all learning tools", unlocked: false},
        gravity: {name: "Weight Watcher", icon: "⚖️", description: "Calculate your weight", unlocked: false},
        timeTravel: {name: "Time Traveler", icon: "⏱️", description: "Use time travel mode", unlocked: false},
        notesTaker: {name: "Note Taker", icon: "📝", description: "Save notes on 3 planets", unlocked: false},
        missionComplete: {name: "Mission Ace", icon: "🎯", description: "Complete all missions", unlocked: false},
        comparison: {name: "Comparator", icon: "📊", description: "View comparison table", unlocked: false},
        worksheet: {name: "Studious", icon: "📄", description: "Generate a worksheet", unlocked: false},
        dedicated: {name: "Dedicated Learner", icon: "⭐", description: "Spend 10 minutes exploring", unlocked: false}
    };
    
    var visitedPlanets = [];
    var toolsUsed = [];
    var startTime = Date.now();
    
    function unlockAchievement(key) {
        if (!achievements[key].unlocked) {
            achievements[key].unlocked = true;
            localStorage.setItem('achievements', JSON.stringify(achievements));
            showAchievementNotification(achievements[key]);
            updateAchievementDisplay();
        }
    }
    
    function showAchievementNotification(achievement) {
        var notification = $('<div class="achievement-notification">' +
            '<div class="notif-icon">' + achievement.icon + '</div>' +
            '<div class="notif-text">' +
            '<div class="notif-title">Achievement Unlocked!</div>' +
            '<div class="notif-name">' + achievement.name + '</div>' +
            '</div></div>');
        $('body').append(notification);
        setTimeout(function() {
            notification.addClass('show');
        }, 100);
        setTimeout(function() {
            notification.removeClass('show');
            setTimeout(function() { notification.remove(); }, 300);
        }, 3000);
    }
    
    function updateAchievementDisplay() {
        var unlockedCount = Object.values(achievements).filter(function(a) { return a.unlocked; }).length;
        var totalCount = Object.keys(achievements).length;
        $('#achievements-earned').text(unlockedCount);
        $('#total-achievements').text(totalCount);
        $('#achievement-progress-bar').css('width', ((unlockedCount / totalCount) * 100) + '%');
        
        var grid = '';
        Object.keys(achievements).forEach(function(key) {
            var ach = achievements[key];
            grid += '<div class="achievement-badge ' + (ach.unlocked ? 'unlocked' : 'locked') + '">';
            grid += '<div class="achievement-icon">' + ach.icon + '</div>';
            grid += '<div class="achievement-name">' + ach.name + '</div>';
            grid += '<div class="achievement-description">' + ach.description + '</div>';
            grid += '</div>';
        });
        $('#achievements-grid').html(grid);
    }
    
    // Load achievements from localStorage
    if (localStorage.getItem('achievements')) {
        achievements = JSON.parse(localStorage.getItem('achievements'));
    }
    
    // Track time for dedicated learner achievement
    setInterval(function() {
        var elapsed = (Date.now() - startTime) / 1000 / 60; // minutes
        if (elapsed >= 10) {
            unlockAchievement('dedicated');
        }
    }, 30000);
    
    // Quiz Mode
    var quizQuestions = [
        {
            question: "Which is the largest planet in our solar system?",
            options: ["Earth", "Jupiter", "Saturn", "Neptune"],
            correct: 1
        },
        {
            question: "How many planets are in our solar system?",
            options: ["7", "8", "9", "10"],
            correct: 1
        },
        {
            question: "Which planet is known as the 'Red Planet'?",
            options: ["Venus", "Mars", "Jupiter", "Mercury"],
            correct: 1
        },
        {
            question: "Which planet has the most moons?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            correct: 2
        },
        {
            question: "Which planet is closest to the Sun?",
            options: ["Venus", "Earth", "Mercury", "Mars"],
            correct: 2
        },
        {
            question: "What is the hottest planet in our solar system?",
            options: ["Mercury", "Venus", "Mars", "Earth"],
            correct: 1
        },
        {
            question: "Which planet is famous for its rings?",
            options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
            correct: 1
        },
        {
            question: "How long does it take Earth to orbit the Sun?",
            options: ["365 days", "365.25 days", "360 days", "400 days"],
            correct: 1
        },
        {
            question: "Which planet rotates on its side?",
            options: ["Saturn", "Neptune", "Uranus", "Jupiter"],
            correct: 2
        },
        {
            question: "What is the smallest planet?",
            options: ["Mercury", "Mars", "Venus", "Earth"],
            correct: 0
        }
    ];
    
    var currentQuestionIndex = 0;
    var quizScore = 0;
    var totalAsked = 0;
    
    function loadQuestion() {
        if (currentQuestionIndex >= quizQuestions.length) {
            currentQuestionIndex = 0;
        }
        
        var q = quizQuestions[currentQuestionIndex];
        $("#quiz-question").text(q.question);
        
        var optionsHtml = "";
        q.options.forEach(function(option, index) {
            optionsHtml += '<div class="quiz-option" data-index="' + index + '">' + option + '</div>';
        });
        $("#quiz-options").html(optionsHtml);
        $("#quiz-feedback").text("").removeClass("correct incorrect");
        
        $(".quiz-option").click(function() {
            if ($(this).hasClass("disabled")) return;
            
            var selectedIndex = parseInt($(this).data("index"));
            var correctIndex = q.correct;
            
            $(".quiz-option").addClass("disabled");
            
            if (selectedIndex === correctIndex) {
                $(this).addClass("correct");
                $("#quiz-feedback").text("✓ Correct! Great job!").addClass("correct");
                quizScore++;
            } else {
                $(this).addClass("incorrect");
                $(".quiz-option").eq(correctIndex).addClass("correct");
                $("#quiz-feedback").text("✗ Incorrect. The correct answer is highlighted.").addClass("incorrect");
            }
            
            totalAsked++;
            $("#score-value").text(quizScore);
            $("#total-questions").text(totalAsked);
        });
    }
    
    $("#toggleQuiz").click(function() {
        $("#quiz-panel").toggleClass("quiz-hidden");
        if (!$("#quiz-panel").hasClass("quiz-hidden")) {
            $(this).text("🧠 Quiz (Open)");
            $(this).addClass("active");
            loadQuestion();
        } else {
            $(this).text("🧠 Start Quiz");
            $(this).removeClass("active");
        }
    });
    
    $("#close-quiz").click(function() {
        $("#quiz-panel").addClass("quiz-hidden");
        $("#toggleQuiz").text("🧠 Start Quiz");
        $("#toggleQuiz").removeClass("active");
    });
    
    $("#quiz-next").click(function() {
        currentQuestionIndex++;
        loadQuestion();
    });
    
    // Distance Calculator
    var planetDistances = {
        mercury: {name: "Mercury", avgDist: 91.7, lightMins: 5.1},
        venus: {name: "Venus", avgDist: 41.4, lightMins: 2.3},
        mars: {name: "Mars", avgDist: 78.3, lightMins: 4.35},
        jupiter: {name: "Jupiter", avgDist: 628.7, lightMins: 34.95},
        saturn: {name: "Saturn", avgDist: 1275, lightMins: 70.8},
        uranus: {name: "Uranus", avgDist: 2723, lightMins: 151.3},
        neptune: {name: "Neptune", avgDist: 4351, lightMins: 241.7}
    };
    
    function displayDistances() {
        var html = "";
        Object.keys(planetDistances).forEach(function(key) {
            var planet = planetDistances[key];
            html += '<div class="distance-item">';
            html += '<div><div class="distance-planet-name">' + planet.name + '</div></div>';
            html += '<div class="distance-value">';
            html += planet.avgDist + ' million km<br>';
            html += planet.lightMins + ' light-minutes';
            html += '</div>';
            html += '</div>';
        });
        $("#distance-list").html(html);
    }
    
    $("#toggleDistanceCalc").click(function() {
        $("#distance-panel").toggleClass("distance-hidden");
        if (!$("#distance-panel").hasClass("distance-hidden")) {
            $(this).text("📏 Distance (Open)");
            $(this).addClass("active");
            displayDistances();
        } else {
            $(this).text("📏 Distance Calculator");
            $(this).removeClass("active");
        }
    });
    
    $("#close-distance").click(function() {
        $("#distance-panel").addClass("distance-hidden");
        $("#toggleDistanceCalc").text("📏 Distance Calculator");
        $("#toggleDistanceCalc").removeClass("active");
    });
    
    // Learning Missions
    var missions = [
        {
            id: 1,
            title: "Discover the Rocky Planets",
            description: "Click on Mercury, Venus, Earth, and Mars to learn about all rocky planets.",
            planets: ['mercury', 'venus', 'earth', 'mars'],
            visited: [],
            completed: false
        },
        {
            id: 2,
            title: "Explore the Gas Giants",
            description: "Visit Jupiter, Saturn, Uranus, and Neptune to understand gas giants.",
            planets: ['jupiter', 'saturn', 'uranus', 'neptune'],
            visited: [],
            completed: false
        },
        {
            id: 3,
            title: "Quiz Champion",
            description: "Answer 5 quiz questions correctly in a row.",
            requirement: 'quiz',
            completed: false
        },
        {
            id: 4,
            title: "Compare and Contrast",
            description: "Use the comparison table to study planet characteristics.",
            requirement: 'comparison',
            completed: false
        },
        {
            id: 5,
            title: "Calculate Your Weight",
            description: "Use the gravity calculator to see your weight on different planets.",
            requirement: 'gravity',
            completed: false
        }
    ];
    
    function displayMissions() {
        var html = '';
        var completedCount = missions.filter(function(m) { return m.completed; }).length;
        
        missions.forEach(function(mission) {
            var status = mission.completed ? '✓ Completed' : 'In Progress';
            var btnText = mission.completed ? '✓ Done' : 'Start';
            var btnClass = mission.completed ? 'completed-btn' : '';
            
            html += '<div class="mission-item ' + (mission.completed ? 'completed' : '') + '">';
            html += '<div class="mission-title">' + mission.title + '<span>' + status + '</span></div>';
            html += '<div class="mission-description">' + mission.description + '</div>';
            
            if (mission.planets) {
                var progress = mission.visited.length + ' / ' + mission.planets.length + ' visited';
                html += '<div style="color: #a0a0a0; font-size: 14px; margin-bottom: 10px;">' + progress + '</div>';
            }
            
            html += '<button class="mission-btn ' + btnClass + '">' + btnText + '</button>';
            html += '</div>';
        });
        
        $('#missions-list').html(html);
        $('#missions-completed').text(completedCount);
    }
    
    $("#toggleMissions").click(function() {
        $("#missions-panel").toggleClass("missions-hidden");
        if (!$("#missions-panel").hasClass("missions-hidden")) {
            $(this).text("🎯 Missions (Open)");
            $(this).addClass("active");
            displayMissions();
        } else {
            $(this).text("🎯 Learning Missions");
            $(this).removeClass("active");
        }
    });
    
    $("#close-missions").click(function() {
        $("#missions-panel").addClass("missions-hidden");
        $("#toggleMissions").text("🎯 Learning Missions");
        $("#toggleMissions").removeClass("active");
    });
    
    // Planet Comparison Table
    function displayComparisonTable() {
        var data = [
            {planet: "Mercury", diameter: "4,879 km", mass: "0.055 Earths", temp: "-173 to 427°C", gravity: "0.38g", day: "59 days", year: "88 days"},
            {planet: "Venus", diameter: "12,104 km", mass: "0.815 Earths", temp: "462°C", gravity: "0.91g", day: "243 days", year: "225 days"},
            {planet: "Earth", diameter: "12,742 km", mass: "1.0 Earth", temp: "-88 to 58°C", gravity: "1.0g", day: "24 hours", year: "365 days"},
            {planet: "Mars", diameter: "6,779 km", mass: "0.107 Earths", temp: "-125 to 20°C", gravity: "0.38g", day: "24.6 hours", year: "687 days"},
            {planet: "Jupiter", diameter: "139,820 km", mass: "318 Earths", temp: "-108°C", gravity: "2.53g", day: "9.9 hours", year: "12 years"},
            {planet: "Saturn", diameter: "116,460 km", mass: "95 Earths", temp: "-139°C", gravity: "1.07g", day: "10.7 hours", year: "29 years"},
            {planet: "Uranus", diameter: "50,724 km", mass: "14.5 Earths", temp: "-197°C", gravity: "0.89g", day: "17.2 hours", year: "84 years"},
            {planet: "Neptune", diameter: "49,244 km", mass: "17 Earths", temp: "-201°C", gravity: "1.14g", day: "16 hours", year: "165 years"}
        ];
        
        var table = '<tr><th>Planet</th><th>Diameter</th><th>Mass</th><th>Temperature</th><th>Gravity</th><th>Day Length</th><th>Year Length</th></tr>';
        data.forEach(function(row) {
            table += '<tr>';
            table += '<td>' + row.planet + '</td>';
            table += '<td>' + row.diameter + '</td>';
            table += '<td>' + row.mass + '</td>';
            table += '<td>' + row.temp + '</td>';
            table += '<td>' + row.gravity + '</td>';
            table += '<td>' + row.day + '</td>';
            table += '<td>' + row.year + '</td>';
            table += '</tr>';
        });
        
        $('#planet-comparison-table').html(table);
    }
    
    $("#toggleComparison").click(function() {
        $("#comparison-table-panel").toggleClass("comparison-table-hidden");
        if (!$("#comparison-table-panel").hasClass("comparison-table-hidden")) {
            $(this).text("📏 Compare (Open)");
            $(this).addClass("active");
            displayComparisonTable();
            unlockAchievement('comparison');
            missions[3].completed = true;
            displayMissions();
        } else {
            $(this).text("📏 Compare Planets");
            $(this).removeClass("active");
        }
    });
    
    $("#close-comparison-table").click(function() {
        $("#comparison-table-panel").addClass("comparison-table-hidden");
        $("#toggleComparison").text("📏 Compare Planets");
        $("#toggleComparison").removeClass("active");
    });
    
    // Gravity Calculator
    var planetGravity = {
        mercury: 0.38, venus: 0.91, earth: 1.0, mars: 0.38,
        jupiter: 2.53, saturn: 1.07, uranus: 0.89, neptune: 1.14
    };
    
    $("#calculate-weight").click(function() {
        var weight = parseFloat($("#weight-input").val());
        var unit = $("#weight-unit").val();
        
        if (!weight || weight <= 0) {
            alert("Please enter a valid weight!");
            return;
        }
        
        var html = '';
        Object.keys(planetGravity).forEach(function(planet) {
            var planetWeight = (weight * planetGravity[planet]).toFixed(2);
            var planetName = planet.charAt(0).toUpperCase() + planet.slice(1);
            
            html += '<div class="gravity-result-item">';
            html += '<div class="gravity-planet-name">' + planetName + '</div>';
            html += '<div class="gravity-weight">' + planetWeight + ' ' + unit + '</div>';
            html += '</div>';
        });
        
        $('#gravity-results').html(html);
        unlockAchievement('gravity');
        missions[4].completed = true;
        displayMissions();
    });
    
    $("#toggleGravity").click(function() {
        $("#gravity-panel").toggleClass("gravity-hidden");
        if (!$("#gravity-panel").hasClass("gravity-hidden")) {
            $(this).text("⚖️ Gravity (Open)");
            $(this).addClass("active");
        } else {
            $(this).text("⚖️ Gravity Calculator");
            $(this).removeClass("active");
        }
    });
    
    $("#close-gravity").click(function() {
        $("#gravity-panel").addClass("gravity-hidden");
        $("#toggleGravity").text("⚖️ Gravity Calculator");
        $("#toggleGravity").removeClass("active");
    });
    
    // Temperature Comparison
    function displayTemperatures() {
        var temps = [
            {planet: "Mercury", min: -173, max: 427, avg: 167},
            {planet: "Venus", min: 462, max: 462, avg: 462},
            {planet: "Earth", min: -88, max: 58, avg: 15},
            {planet: "Mars", min: -125, max: 20, avg: -63},
            {planet: "Jupiter", min: -108, max: -108, avg: -108},
            {planet: "Saturn", min: -139, max: -139, avg: -139},
            {planet: "Uranus", min: -197, max: -197, avg: -197},
            {planet: "Neptune", min: -201, max: -201, avg: -201}
        ];
        
        var html = '';
        temps.forEach(function(t) {
            html += '<div class="temp-item">';
            html += '<div class="temp-planet-name">' + t.planet + '</div>';
            html += '<div class="temp-range">Range: ' + t.min + '°C to ' + t.max + '°C | Average: ' + t.avg + '°C</div>';
            html += '<div class="temp-bar-container">';
            var position = ((t.avg + 300) / 700) * 100; // Normalize -300 to 400
            html += '<div class="temp-marker" style="left: ' + position + '%;"></div>';
            html += '</div>';
            html += '</div>';
        });
        
        $('#temperature-chart').html(html);
    }
    
    $("#toggleTemperature").click(function() {
        $("#temperature-panel").toggleClass("temperature-hidden");
        if (!$("#temperature-panel").hasClass("temperature-hidden")) {
            $(this).text("🌡️ Temperature (Open)");
            $(this).addClass("active");
            displayTemperatures();
        } else {
            $(this).text("🌡️ Temperature Chart");
            $(this).removeClass("active");
        }
    });
    
    $("#close-temperature").click(function() {
        $("#temperature-panel").addClass("temperature-hidden");
        $("#toggleTemperature").text("🌡️ Temperature Chart");
        $("#toggleTemperature").removeClass("active");
    });
    
    // Time Travel Mode
    $("#apply-time-travel, .preset-btn").click(function() {
        var date = $(this).hasClass('preset-btn') ? $(this).data('date') : $('#time-travel-date').val();
        if (!date) {
            alert("Please select a date!");
            return;
        }
        
        var info = '<div style="color: white; margin-top: 20px; padding: 15px; background: rgba(102, 126, 234, 0.2); border-radius: 8px;">';
        info += '<strong style="color: #00d4ff;">Date Selected: ' + date + '</strong><br><br>';
        info += 'The planets would be in different positions on this date. ';
        info += 'This feature simulates how planetary positions change over time!';
        info += '</div>';
        $('#time-travel-info').html(info);
        unlockAchievement('timeTravel');
    });
    
    $("#toggleTimeTravel").click(function() {
        $("#time-travel-panel").toggleClass("time-travel-hidden");
        if (!$("#time-travel-panel").hasClass("time-travel-hidden")) {
            $(this).text("⏱️ Time Travel (Open)");
            $(this).addClass("active");
            $('#time-travel-date').val(new Date().toISOString().split('T')[0]);
        } else {
            $(this).text("⏱️ Time Travel");
            $(this).removeClass("active");
        }
    });
    
    $("#close-time-travel").click(function() {
        $("#time-travel-panel").addClass("time-travel-hidden");
        $("#toggleTimeTravel").text("⏱️ Time Travel");
        $("#toggleTimeTravel").removeClass("active");
    });
    
    // Scale Model Calculator
    var earthDiameter = 12742; // km
    var planetSizes = {
        mercury: 4879, venus: 12104, earth: 12742, mars: 6779,
        jupiter: 139820, saturn: 116460, uranus: 50724, neptune: 49244
    };
    
    function calculateScale() {
        var scaleType = $('#earth-scale').val();
        var earthSize = {tennis: 6.7, basketball: 24, beach: 50, soccer: 22}[scaleType];
        var scaleFactor = earthSize / earthDiameter;
        
        var html = '';
        Object.keys(planetSizes).forEach(function(planet) {
            var size = (planetSizes[planet] * scaleFactor).toFixed(2);
            var planetName = planet.charAt(0).toUpperCase() + planet.slice(1);
            var comparison = '';
            
            if (size < 1) comparison = ' (marble-sized)';
            else if (size < 5) comparison = ' (ping-pong ball)';
            else if (size < 20) comparison = ' (orange-sized)';
            else if (size < 50) comparison = ' (basketball-sized)';
            else comparison = ' (huge!)';
            
            html += '<div class="scale-result-item">';
            html += '<div class="scale-planet-name">' + planetName + '</div>';
            html += '<div class="scale-size">' + size + ' cm' + comparison + '</div>';
            html += '</div>';
        });
        
        $('#scale-results').html(html);
    }
    
    $('#earth-scale').change(calculateScale);
    
    $("#toggleScale").click(function() {
        $("#scale-panel").toggleClass("scale-hidden");
        if (!$("#scale-panel").hasClass("scale-hidden")) {
            $(this).text("📊 Scale (Open)");
            $(this).addClass("active");
            calculateScale();
        } else {
            $(this).text("📊 Scale Model");
            $(this).removeClass("active");
        }
    });
    
    $("#close-scale").click(function() {
        $("#scale-panel").addClass("scale-hidden");
        $("#toggleScale").text("📊 Scale Model");
        $("#toggleScale").removeClass("active");
    });
    
    // Notes Feature
    var planetNotes = {};
    if (localStorage.getItem('planetNotes')) {
        planetNotes = JSON.parse(localStorage.getItem('planetNotes'));
    }
    
    $('#notes-planet-select').change(function() {
        var planet = $(this).val();
        $('#notes-text').val(planetNotes[planet] || '');
    });
    
    $('#save-notes').click(function() {
        var planet = $('#notes-planet-select').val();
        var notes = $('#notes-text').val();
        planetNotes[planet] = notes;
        localStorage.setItem('planetNotes', JSON.stringify(planetNotes));
        $('#notes-status').text('✓ Notes saved successfully!').fadeIn().delay(2000).fadeOut();
        
        var notesCount = Object.keys(planetNotes).filter(function(k) { return planetNotes[k].length > 0; }).length;
        if (notesCount >= 3) {
            unlockAchievement('notesTaker');
        }
    });
    
    $("#toggleNotes").click(function() {
        $("#notes-panel").toggleClass("notes-hidden");
        if (!$("#notes-panel").hasClass("notes-hidden")) {
            $(this).text("📝 Notes (Open)");
            $(this).addClass("active");
            var planet = $('#notes-planet-select').val();
            $('#notes-text').val(planetNotes[planet] || '');
        } else {
            $(this).text("📝 My Notes");
            $(this).removeClass("active");
        }
    });
    
    $("#close-notes").click(function() {
        $("#notes-panel").addClass("notes-hidden");
        $("#toggleNotes").text("📝 My Notes");
        $("#toggleNotes").removeClass("active");
    });
    
    // Worksheet Generator
    $('#generate-worksheet').click(function() {
        var selectedOptions = [];
        $('.worksheet-option:checked').each(function() {
            selectedOptions.push($(this).val());
        });
        
        if (selectedOptions.length === 0) {
            alert("Please select at least one option!");
            return;
        }
        
        var worksheet = '<h1>🌌 Solar System Study Worksheet</h1>';
        worksheet += '<p style="text-align:center; margin-bottom: 30px;">Name: _________________ Date: _________________</p>';
        
        if (selectedOptions.includes('facts')) {
            worksheet += '<h2>Planet Facts</h2>';
            worksheet += '<ol>';
            worksheet += '<li>The largest planet is __________</li>';
            worksheet += '<li>The hottest planet is __________</li>';
            worksheet += '<li>The planet with rings is __________</li>';
            worksheet += '<li>The Red Planet is __________</li>';
            worksheet += '<li>How many planets orbit the Sun? __________</li>';
            worksheet += '</ol>';
        }
        
        if (selectedOptions.includes('quiz')) {
            worksheet += '<h2>Quiz Section</h2>';
            worksheet += '<ol>';
            worksheet += '<li>Which planet is closest to the Sun? (Circle one: Mercury / Venus / Earth)</li>';
            worksheet += '<li>True or False: Jupiter is larger than Saturn. __________</li>';
            worksheet += '<li>Name two rocky planets: __________ and __________</li>';
            worksheet += '</ol>';
        }
        
        if (selectedOptions.includes('comparison')) {
            worksheet += '<h2>Planet Comparison</h2>';
            worksheet += '<p>Compare any two planets using the comparison table:</p>';
            worksheet += '<p>Planet 1: __________ | Planet 2: __________</p>';
            worksheet += '<p>Similarities: _________________________________</p>';
            worksheet += '<p>Differences: _________________________________</p>';
        }
        
        $('#worksheet-preview').html(worksheet).show();
        $('#print-worksheet').show();
        unlockAchievement('worksheet');
    });
    
    $('#print-worksheet').click(function() {
        window.print();
    });
    
    $("#toggleWorksheet").click(function() {
        $("#worksheet-panel").toggleClass("worksheet-hidden");
        if (!$("#worksheet-panel").hasClass("worksheet-hidden")) {
            $(this).text("📄 Worksheet (Open)");
            $(this).addClass("active");
        } else {
            $(this).text("📄 Worksheet");
            $(this).removeClass("active");
        }
    });
    
    $("#close-worksheet").click(function() {
        $("#worksheet-panel").addClass("worksheet-hidden");
        $("#toggleWorksheet").text("📄 Worksheet");
        $("#toggleWorksheet").removeClass("active");
    });
    
    // Achievements Panel
    $("#toggleAchievements").click(function() {
        $("#achievements-panel").toggleClass("achievements-hidden");
        if (!$("#achievements-panel").hasClass("achievements-hidden")) {
            $(this).text("🏆 Achievements (Open)");
            $(this).addClass("active");
            updateAchievementDisplay();
        } else {
            $(this).text("🏆 Achievements");
            $(this).removeClass("active");
        }
    });
    
    $("#close-achievements").click(function() {
        $("#achievements-panel").addClass("achievements-hidden");
        $("#toggleAchievements").text("🏆 Achievements");
        $("#toggleAchievements").removeClass("active");
    });
    
    // Track planet visits for missions and achievements
    $(".planet").click(function() {
        var planet = $(this).data('planet');
        if (planet && !visitedPlanets.includes(planet)) {
            visitedPlanets.push(planet);
            
            // Check missions
            missions.forEach(function(mission) {
                if (mission.planets && mission.planets.includes(planet)) {
                    if (!mission.visited.includes(planet)) {
                        mission.visited.push(planet);
                    }
                    if (mission.visited.length === mission.planets.length) {
                        mission.completed = true;
                        displayMissions();
                    }
                }
            });
            
            // Check explorer achievement
            if (visitedPlanets.length >= 8) {
                unlockAchievement('explorer');
            }
            
            // Check if all missions completed
            if (missions.every(function(m) { return m.completed; })) {
                unlockAchievement('missionComplete');
            }
        }
    });
    
    // Orbit Speed Display
    var orbitSpeeds = [
        {name: "Mercury", speed: 47.87, color: "#8C7853"},
        {name: "Venus", speed: 35.02, color: "#FFC649"},
        {name: "Earth", speed: 29.78, color: "#4169E1"},
        {name: "Mars", speed: 24.07, color: "#E27B58"},
        {name: "Jupiter", speed: 13.07, color: "#C9935B"},
        {name: "Saturn", speed: 9.69, color: "#F4D292"},
        {name: "Uranus", speed: 6.81, color: "#4FD0E7"},
        {name: "Neptune", speed: 5.43, color: "#4b70dd"}
    ];
    
    function displayOrbitSpeeds() {
        var maxSpeed = 47.87; // Mercury's speed
        var html = "";
        
        orbitSpeeds.forEach(function(planet) {
            var percentage = (planet.speed / maxSpeed) * 100;
            html += '<div class="speed-item">';
            html += '<div class="speed-planet-name">' + planet.name + '</div>';
            html += '<div class="speed-value">' + planet.speed + ' km/s</div>';
            html += '<div class="speed-value" style="color: #a0a0a0; font-size: 14px;">';
            html += (planet.speed * 3600).toFixed(0) + ' km/h';
            html += '</div>';
            html += '<div class="speed-bar-container">';
            html += '<div class="speed-bar" style="width: ' + percentage + '%; background: ' + planet.color + ';"></div>';
            html += '</div>';
            html += '</div>';
        });
        
        $("#orbit-speed-list").html(html);
    }
    
    $("#toggleOrbitSpeed").click(function() {
        $("#orbit-speed-panel").toggleClass("orbit-speed-hidden");
        if (!$("#orbit-speed-panel").hasClass("orbit-speed-hidden")) {
            $(this).text("🚀 Orbit Speeds (Open)");
            $(this).addClass("active");
            displayOrbitSpeeds();
        } else {
            $(this).text("🚀 Orbit Speeds");
            $(this).removeClass("active");
        }
    });
    
    $("#close-orbit-speed").click(function() {
        $("#orbit-speed-panel").addClass("orbit-speed-hidden");
        $("#toggleOrbitSpeed").text("🚀 Orbit Speeds");
        $("#toggleOrbitSpeed").removeClass("active");
    });
    
    // Resize handler for new canvases
    var resizeTimeout;
    $(window).on('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            galaxiesCanvas.width = window.innerWidth;
            galaxiesCanvas.height = window.innerHeight;
            constellationsCanvas.width = window.innerWidth;
            constellationsCanvas.height = window.innerHeight;
            milkywayCanvas.width = window.innerWidth;
            milkywayCanvas.height = window.innerHeight;
            
            if (constellationsVisible) {
                drawConstellations();
            }
        }, 250);
    });
    
    // ========== QUIZ GAMES FEATURE ==========
    
    var guessQuestions = [
        {clue: "I am the largest planet in our solar system", answer: "jupiter", options: ["jupiter", "saturn", "uranus", "neptune"]},
        {clue: "I am known as the Red Planet", answer: "mars", options: ["mars", "venus", "mercury", "earth"]},
        {clue: "I have beautiful rings made of ice and rock", answer: "saturn", options: ["saturn", "jupiter", "uranus", "neptune"]},
        {clue: "I am the hottest planet in the solar system", answer: "venus", options: ["venus", "mercury", "mars", "earth"]},
        {clue: "I am the closest planet to the Sun", answer: "mercury", options: ["mercury", "venus", "earth", "mars"]},
        {clue: "I am the only planet with known life", answer: "earth", options: ["earth", "mars", "venus", "jupiter"]},
        {clue: "I rotate on my side, unlike other planets", answer: "uranus", options: ["uranus", "neptune", "saturn", "jupiter"]},
        {clue: "I am the farthest planet from the Sun", answer: "neptune", options: ["neptune", "uranus", "pluto", "saturn"]}
    ];
    
    var currentGuessQuestion = 0;
    var guessScore = 0;
    
    function loadGuessGame() {
        if (currentGuessQuestion >= guessQuestions.length) {
            $('#guess-result').html('🎉 Game Complete! Final Score: ' + guessScore + '/' + guessQuestions.length).removeClass('incorrect').addClass('correct');
            return;
        }
        
        var q = guessQuestions[currentGuessQuestion];
        $('#guess-clue').text(q.clue);
        $('#guess-result').html('').removeClass('correct incorrect');
        
        var shuffled = q.options.sort(() => Math.random() - 0.5);
        var html = '';
        shuffled.forEach(function(option) {
            html += '<button class="guess-option-btn" data-answer="' + option + '">' + option.charAt(0).toUpperCase() + option.slice(1) + '</button>';
        });
        $('#guess-options').html(html);
        
        $('#guess-score-value').text(guessScore);
        $('#guess-total').text(guessQuestions.length);
        
        $('.guess-option-btn').click(function() {
            var selected = $(this).data('answer');
            if (selected === q.answer) {
                guessScore++;
                $('#guess-result').html('✓ Correct! ' + q.answer.charAt(0).toUpperCase() + q.answer.slice(1) + ' is right!').removeClass('incorrect').addClass('correct');
                playSound('correct');
            } else {
                $('#guess-result').html('✗ Wrong! The answer is ' + q.answer.charAt(0).toUpperCase() + q.answer.slice(1)).removeClass('correct').addClass('incorrect');
                playSound('wrong');
            }
            
            currentGuessQuestion++;
            setTimeout(loadGuessGame, 2000);
        });
    }
    
    // Memory Game
    var memoryCards = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
    var memoryDeck = [];
    var flippedCards = [];
    var matchedPairs = 0;
    var memoryMoves = 0;
    
    function startMemoryGame() {
        memoryDeck = [...memoryCards, ...memoryCards].sort(() => Math.random() - 0.5);
        flippedCards = [];
        matchedPairs = 0;
        memoryMoves = 0;
        $('#memory-moves').text('0');
        $('#memory-pairs').text('0');
        
        var html = '';
        memoryDeck.forEach(function(card, index) {
            html += '<div class="memory-card" data-index="' + index + '" data-planet="' + card + '">?</div>';
        });
        $('#memory-grid').html(html);
        
        $('.memory-card').click(function() {
            if ($(this).hasClass('flipped') || $(this).hasClass('matched')) return;
            if (flippedCards.length >= 2) return;
            
            $(this).addClass('flipped').text($(this).data('planet').charAt(0).toUpperCase() + $(this).data('planet').slice(1));
            flippedCards.push($(this));
            
            if (flippedCards.length === 2) {
                memoryMoves++;
                $('#memory-moves').text(memoryMoves);
                
                setTimeout(function() {
                    if (flippedCards[0].data('planet') === flippedCards[1].data('planet')) {
                        flippedCards[0].addClass('matched');
                        flippedCards[1].addClass('matched');
                        matchedPairs++;
                        $('#memory-pairs').text(matchedPairs);
                        playSound('correct');
                        
                        if (matchedPairs === 8) {
                            setTimeout(function() {
                                alert('🎉 You matched all pairs in ' + memoryMoves + ' moves!');
                                unlockAchievement('quizMaster');
                            }, 500);
                        }
                    } else {
                        flippedCards[0].removeClass('flipped').text('?');
                        flippedCards[1].removeClass('flipped').text('?');
                        playSound('wrong');
                    }
                    flippedCards = [];
                }, 800);
            }
        });
    }
    
    $('#start-memory-game').click(startMemoryGame);
    
    // Quiz Games Panel Toggle
    $("#toggleQuizGames").click(function() {
        $("#quiz-games-panel").toggleClass("quiz-games-hidden");
        if (!$("#quiz-games-panel").hasClass("quiz-games-hidden")) {
            $(this).text("🎲 Quiz Games (Open)").addClass("active");
        } else {
            $(this).text("🎲 Quiz Games").removeClass("active");
        }
    });
    
    // Helper function to close other panels
    function closeOtherPanels(exceptPanel) {
        var panels = {
            'quiz-games': '#quiz-games-panel',
            'planet-layers': '#planet-layers-panel',
            'sounds': '#sounds-panel',
            'challenges': '#challenges-panel',
            'social': '#social-panel'
        };
        
        Object.keys(panels).forEach(function(key) {
            if (key !== exceptPanel) {
                $(panels[key]).addClass(panels[key].substring(1) + '-hidden');
                var toggleBtn = $("#toggle" + key.split('-').map(function(word) {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                }).join(''));
                if (toggleBtn.length === 0) {
                    toggleBtn = $("#toggle" + key.charAt(0).toUpperCase() + key.slice(1).replace('-', ''));
                }
            }
        });
    }
    
    $("#close-quiz-games").click(function() {
        $("#quiz-games-panel").addClass("quiz-games-hidden");
        $("#toggleQuizGames").text("🎲 Quiz Games").removeClass("active");
    });
    
    // Game Mode Selection
    $('#guess-planet-game').click(function() {
        $('.game-mode-btn').removeClass('active');
        $(this).addClass('active');
        $('.game-content').hide();
        $('#guess-game').show();
        currentGuessQuestion = 0;
        guessScore = 0;
        loadGuessGame();
    });
    
    $('#memory-game').click(function() {
        $('.game-mode-btn').removeClass('active');
        $(this).addClass('active');
        $('.game-content').hide();
        $('#memory-game-content').show();
    });
    
    // ========== PLANET LAYERS FEATURE ==========
    
    var layerCanvas = null;
    var layerCtx = null;
    var planetLayerData = {
        earth: {
            name: "Earth",
            layers: [
                {name: "Core", color: "#ff6b35", radius: 50, info: "Iron-nickel core, 5,200°C"},
                {name: "Mantle", color: "#f7931e", radius: 120, info: "Silicate rock layer, 1,000-3,700°C"},
                {name: "Crust", color: "#8b4513", radius: 150, info: "Rocky outer layer, 0-100°C"},
                {name: "Atmosphere", color: "rgba(135, 206, 250, 0.5)", radius: 170, info: "Nitrogen and oxygen gases"}
            ]
        },
        mars: {
            name: "Mars",
            layers: [
                {name: "Core", color: "#ff4500", radius: 40, info: "Iron core, partially liquid"},
                {name: "Mantle", color: "#d2691e", radius: 110, info: "Silicate mantle"},
                {name: "Crust", color: "#cd5c5c", radius: 145, info: "Iron-rich crust (red surface)"},
                {name: "Atmosphere", color: "rgba(255, 140, 0, 0.3)", radius: 165, info: "Thin CO2 atmosphere"}
            ]
        },
        jupiter: {
            name: "Jupiter",
            layers: [
                {name: "Core", color: "#8b4513", radius: 60, info: "Rocky/metallic core"},
                {name: "Mantle", color: "#4169e1", radius: 130, info: "Liquid metallic hydrogen"},
                {name: "Crust", color: "#daa520", radius: 160, info: "Molecular hydrogen layer"},
                {name: "Atmosphere", color: "rgba(218, 165, 32, 0.6)", radius: 180, info: "Hydrogen and helium clouds"}
            ]
        },
        saturn: {
            name: "Saturn",
            layers: [
                {name: "Core", color: "#696969", radius: 55, info: "Rocky core"},
                {name: "Mantle", color: "#4682b4", radius: 125, info: "Liquid metallic hydrogen"},
                {name: "Crust", color: "#f0e68c", radius: 155, info: "Molecular hydrogen"},
                {name: "Atmosphere", color: "rgba(240, 230, 140, 0.5)", radius: 175, info: "H2 and He with ammonia"}
            ]
        }
    };
    
    var currentPlanetLayer = 'earth';
    var layerRotation = 0;
    var isDraggingLayer = false;
    var lastMouseX = 0;
    
    function initLayerCanvas() {
        if (!layerCanvas) {
            layerCanvas = document.getElementById('layer-canvas');
            if (layerCanvas) {
                layerCtx = layerCanvas.getContext('2d');
            }
        }
    }
    
    function drawPlanetLayers() {
        initLayerCanvas();
        if (!layerCtx || !layerCanvas) return;
        
        layerCtx.clearRect(0, 0, layerCanvas.width, layerCanvas.height);
        layerCtx.save();
        layerCtx.translate(200, 200);
        layerCtx.scale(layerScale, layerScale);
        layerCtx.rotate(layerRotation);
        
        var data = planetLayerData[currentPlanetLayer];
        var reversedLayers = data.layers.slice().reverse();
        
        reversedLayers.forEach(function(layer) {
            if ($('.layer-toggle[data-layer="' + layer.name.toLowerCase() + '"]').is(':checked')) {
                layerCtx.beginPath();
                layerCtx.arc(0, 0, layer.radius, 0, Math.PI * 2);
                layerCtx.fillStyle = layer.color;
                layerCtx.fill();
                layerCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                layerCtx.lineWidth = 2;
                layerCtx.stroke();
            }
        });
        
        layerCtx.restore();
    }
    
    $(document).on('change', '#layer-planet-select', function() {
        currentPlanetLayer = $(this).val();
        drawPlanetLayers();
        updateLayerInfo();
    });
    
    $(document).on('change', '.layer-toggle', function() {
        drawPlanetLayers();
    });
    
    function updateLayerInfo() {
        var data = planetLayerData[currentPlanetLayer];
        var html = '<h4>' + data.name + ' Structure</h4>';
        data.layers.forEach(function(layer) {
            html += '<p><strong>' + layer.name + ':</strong> ' + layer.info + '</p>';
        });
        $('#layer-info-content').html(html);
    }
    
    var layerAnimationFrame;
    var layerScale = 1;
    
    function setupLayerCanvasEvents() {
        initLayerCanvas();
        if (!layerCanvas) return;
        
        layerCanvas.addEventListener('mousedown', function(e) {
            isDraggingLayer = true;
            lastMouseX = e.clientX;
        });
        
        layerCanvas.addEventListener('mousemove', function(e) {
            if (isDraggingLayer) {
                var deltaX = e.clientX - lastMouseX;
                layerRotation += deltaX * 0.01;
                lastMouseX = e.clientX;
                
                if (layerAnimationFrame) {
                    cancelAnimationFrame(layerAnimationFrame);
                }
                layerAnimationFrame = requestAnimationFrame(drawPlanetLayers);
            }
        });
        
        layerCanvas.addEventListener('mouseup', function() {
            isDraggingLayer = false;
        });
        
        layerCanvas.addEventListener('mouseleave', function() {
            isDraggingLayer = false;
        });
        
        layerCanvas.addEventListener('wheel', function(e) {
            e.preventDefault();
            // Zoom in/out
            if (e.deltaY < 0) {
                layerScale = Math.min(layerScale + 0.1, 2);
            } else {
                layerScale = Math.max(layerScale - 0.1, 0.5);
            }
            drawPlanetLayers();
        }, {passive: false});
    }
    
    $("#togglePlanetLayers").click(function() {
        var panel = $("#planet-layers-panel");
        panel.toggleClass("planet-layers-hidden");
        if (!panel.hasClass("planet-layers-hidden")) {
            $(this).text("🔬 Planet Layers (Open)").addClass("active");
            closeOtherPanels('planet-layers');
            setTimeout(function() {
                setupLayerCanvasEvents();
                drawPlanetLayers();
                updateLayerInfo();
            }, 100);
        } else {
            $(this).text("🔬 Planet Layers").removeClass("active");
        }
    });
    
    $("#close-planet-layers").click(function() {
        $("#planet-layers-panel").addClass("planet-layers-hidden");
        $("#togglePlanetLayers").text("🔬 Planet Layers").removeClass("active");
    });
    
    // ========== SOUND EFFECTS FEATURE ==========
    
    var soundSettings = {
        masterVolume: 70,
        planetSounds: true,
        meteorSounds: true,
        ambientSounds: true,
        achievementSounds: true
    };
    
    // Load from localStorage
    if (localStorage.getItem('soundSettings')) {
        soundSettings = JSON.parse(localStorage.getItem('soundSettings'));
    }
    
    var audioContext = null;
    var lastSoundTime = {};
    var soundThrottle = 150;
    
    function playSound(type) {
        if (soundSettings.masterVolume === 0) return;
        
        var now = Date.now();
        if (lastSoundTime[type] && now - lastSoundTime[type] < soundThrottle) return;
        lastSoundTime[type] = now;
        
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        var volume = soundSettings.masterVolume / 100;
        var currentTime = audioContext.currentTime;
        
        switch(type) {
            case 'mercury':
                createPlanetSound(880, 'square', 0.15, volume * 0.25, currentTime, [1100, 880]);
                break;
            case 'venus':
                createPlanetSound(440, 'triangle', 0.3, volume * 0.3, currentTime, [440, 380]);
                break;
            case 'earth':
                createPlanetSound(523, 'sine', 0.25, volume * 0.3, currentTime, [523, 659, 784]);
                break;
            case 'mars':
                createPlanetSound(349, 'square', 0.2, volume * 0.25, currentTime, [349, 294]);
                break;
            case 'jupiter':
                createPlanetSound(110, 'sawtooth', 0.4, volume * 0.35, currentTime, [110, 165, 220]);
                break;
            case 'saturn':
                createPlanetSound(196, 'sine', 0.35, volume * 0.28, currentTime, [196, 246, 294, 392]);
                break;
            case 'uranus':
                createPlanetSound(277, 'triangle', 0.25, volume * 0.26, currentTime, [277, 330]);
                break;
            case 'neptune':
                createPlanetSound(147, 'sine', 0.3, volume * 0.3, currentTime, [147, 196, 294]);
                break;
            case 'correct':
                createChord([523, 659, 784], 'sine', 0.3, volume * 0.25, currentTime);
                break;
            case 'wrong':
                createDescendingSound(400, 200, 'square', 0.25, volume * 0.3, currentTime);
                break;
            case 'achievement':
                createAchievementSound(volume, currentTime);
                break;
            case 'click':
                createPlanetSound(800, 'sine', 0.1, volume * 0.2, currentTime, [800]);
                break;
            default:
                createPlanetSound(500, 'sine', 0.2, volume * 0.25, currentTime, [500]);
        }
    }
    
    function createPlanetSound(baseFreq, waveType, duration, volume, startTime, harmonics) {
        harmonics = harmonics || [baseFreq];
        
        harmonics.forEach(function(freq, index) {
            var oscillator = audioContext.createOscillator();
            var gainNode = audioContext.createGain();
            var filter = audioContext.createBiquadFilter();
            
            oscillator.type = waveType;
            oscillator.frequency.value = freq;
            
            filter.type = 'lowpass';
            filter.frequency.value = freq * 2;
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            var harmVolume = volume / (index + 1);
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(harmVolume, startTime + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        });
    }
    
    function createChord(frequencies, waveType, duration, volume, startTime) {
        frequencies.forEach(function(freq) {
            var oscillator = audioContext.createOscillator();
            var gainNode = audioContext.createGain();
            
            oscillator.type = waveType;
            oscillator.frequency.value = freq;
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(volume / frequencies.length, startTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        });
    }
    
    function createDescendingSound(startFreq, endFreq, waveType, duration, volume, startTime) {
        var oscillator = audioContext.createOscillator();
        var gainNode = audioContext.createGain();
        
        oscillator.type = waveType;
        oscillator.frequency.setValueAtTime(startFreq, startTime);
        oscillator.frequency.exponentialRampToValueAtTime(endFreq, startTime + duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        gainNode.gain.setValueAtTime(volume, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    }
    
    function createAchievementSound(volume, startTime) {
        var notes = [523, 659, 784, 1047];
        notes.forEach(function(freq, index) {
            var oscillator = audioContext.createOscillator();
            var gainNode = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.value = freq;
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            var noteStart = startTime + (index * 0.1);
            gainNode.gain.setValueAtTime(0, noteStart);
            gainNode.gain.linearRampToValueAtTime(volume * 0.3, noteStart + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.01, noteStart + 0.2);
            
            oscillator.start(noteStart);
            oscillator.stop(noteStart + 0.2);
        });
    }
    
    $('#master-volume').on('input', function() {
        soundSettings.masterVolume = $(this).val();
        $('#master-volume-value').text($(this).val() + '%');
        localStorage.setItem('soundSettings', JSON.stringify(soundSettings));
    });
    
    $('#planet-sounds, #meteor-sounds, #ambient-sounds, #achievement-sounds').change(function() {
        var id = $(this).attr('id');
        soundSettings[id.replace('-', '')] = $(this).is(':checked');
        localStorage.setItem('soundSettings', JSON.stringify(soundSettings));
    });
    
    $(document).on('click', '.sound-test-btn', function() {
        var planet = $(this).data('planet');
        if (soundSettings.planetSounds) {
            playSound(planet);
        }
    });
    
    // Apply sound settings on load
    setTimeout(function() {
        $('#master-volume').val(soundSettings.masterVolume);
        $('#master-volume-value').text(soundSettings.masterVolume + '%');
        $('#planet-sounds').prop('checked', soundSettings.planetSounds);
        $('#meteor-sounds').prop('checked', soundSettings.meteorSounds);
        $('#ambient-sounds').prop('checked', soundSettings.ambientSounds);
        $('#achievement-sounds').prop('checked', soundSettings.achievementSounds);
    }, 100);
    
    // Add sound to planet clicks
    $(document).on('click', '.planet', function() {
        var planet = $(this).attr('data-planet') || $(this).parent().attr('data-planet');
        if (planet && soundSettings.planetSounds) {
            playSound(planet);
        }
    });
    
    $("#toggleSounds").click(function() {
        $("#sounds-panel").toggleClass("sounds-hidden");
        if (!$("#sounds-panel").hasClass("sounds-hidden")) {
            $(this).text("🔊 Sound Effects (Open)").addClass("active");
        } else {
            $(this).text("🔊 Sound Effects").removeClass("active");
        }
    });
    
    $("#close-sounds").click(function() {
        $("#sounds-panel").addClass("sounds-hidden");
        $("#toggleSounds").text("🔊 Sound Effects").removeClass("active");
    });
    
    // ========== STUDENT CHALLENGES FEATURE ==========
    
    var challenges = {
        'asteroid-belt': {found: 0, total: 5, completed: false},
        'dwarf-planets': {found: 0, total: 3, completed: false},
        'spacecraft': {found: 0, total: 3, completed: false}
    };
    
    if (localStorage.getItem('challenges')) {
        challenges = JSON.parse(localStorage.getItem('challenges'));
    }
    
    function updateChallengeDisplay() {
        Object.keys(challenges).forEach(function(key) {
            var challenge = challenges[key];
            var item = $('.challenge-item[data-challenge="' + key + '"]');
            var progress = (challenge.found / challenge.total) * 100;
            
            item.find('.progress-fill').css('width', progress + '%');
            item.find('.progress-text').text(challenge.found + '/' + challenge.total + ' ' + (key === 'asteroid-belt' ? 'Asteroids' : key === 'dwarf-planets' ? 'Dwarf Planets' : 'Spacecraft') + ' Found');
            
            if (challenge.completed) {
                item.find('.challenge-status').text('Completed').addClass('completed');
            } else if (challenge.found > 0) {
                item.find('.challenge-status').text('In Progress').addClass('in-progress');
            }
        });
        
        localStorage.setItem('challenges', JSON.stringify(challenges));
        
        // Check if all completed
        if (Object.values(challenges).every(c => c.completed)) {
            $('#rewards-earned').html('🎉 All Challenges Complete! You earned the <strong>Explorer Master</strong> badge!');
        }
    }
    
    // Simulate asteroid clicks (you can integrate with actual asteroid elements)
    var asteroidClickCount = 0;
    $('#asteroids').click(function() {
        if (!challenges['asteroid-belt'].completed) {
            asteroidClickCount++;
            challenges['asteroid-belt'].found = Math.min(asteroidClickCount, 5);
            if (challenges['asteroid-belt'].found >= 5) {
                challenges['asteroid-belt'].completed = true;
            }
            updateChallengeDisplay();
        }
    });
    
    $("#toggleChallenges").click(function() {
        $("#challenges-panel").toggleClass("challenges-hidden");
        if (!$("#challenges-panel").hasClass("challenges-hidden")) {
            $(this).text("🎯 Challenges (Open)").addClass("active");
            updateChallengeDisplay();
        } else {
            $(this).text("🎯 Challenges").removeClass("active");
        }
    });
    
    $("#close-challenges").click(function() {
        $("#challenges-panel").addClass("challenges-hidden");
        $("#toggleChallenges").text("🎯 Challenges").removeClass("active");
    });
    
    // ========== SOCIAL FEATURES ==========
    
    var userProfile = {
        favoritePlanet: '',
        quizScore: 0,
        explorationTime: 0
    };
    
    if (localStorage.getItem('userProfile')) {
        userProfile = JSON.parse(localStorage.getItem('userProfile'));
    }
    
    $('#save-favorite').click(function() {
        var planet = $('#favorite-planet-select').val();
        if (!planet) {
            alert('Please select a planet!');
            return;
        }
        
        userProfile.favoritePlanet = planet;
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        
        $('#favorite-display').html('⭐ Your favorite planet is <strong style="color: #00d4ff;">' + planet.charAt(0).toUpperCase() + planet.slice(1) + '</strong>!').fadeIn();
    });
    
    if (userProfile.favoritePlanet) {
        $('#favorite-planet-select').val(userProfile.favoritePlanet);
        $('#favorite-display').html('⭐ Your favorite planet is <strong style="color: #00d4ff;">' + userProfile.favoritePlanet.charAt(0).toUpperCase() + userProfile.favoritePlanet.slice(1) + '</strong>!').show();
    }
    
    // Leaderboard tabs
    $('.leaderboard-tab').click(function() {
        $('.leaderboard-tab').removeClass('active');
        $(this).addClass('active');
        
        var tab = $(this).data('tab');
        // Simulate leaderboard data
        var leaderboardData = {
            quiz: [
                {rank: 1, name: 'You', score: quizScore + '/' + quizQuestions.length},
                {rank: 2, name: 'Student A', score: Math.floor(Math.random() * 10) + '/10'},
                {rank: 3, name: 'Student B', score: Math.floor(Math.random() * 10) + '/10'}
            ],
            achievements: [
                {rank: 1, name: 'You', score: Object.keys(achievements).filter(k => achievements[k].unlocked).length + '/10'},
                {rank: 2, name: 'Student C', score: Math.floor(Math.random() * 10) + '/10'},
                {rank: 3, name: 'Student D', score: Math.floor(Math.random() * 10) + '/10'}
            ],
            exploration: [
                {rank: 1, name: 'You', score: Math.floor((Date.now() - startTime) / 60000) + ' min'},
                {rank: 2, name: 'Student E', score: Math.floor(Math.random() * 30) + ' min'},
                {rank: 3, name: 'Student F', score: Math.floor(Math.random() * 30) + ' min'}
            ]
        };
        
        var html = '';
        leaderboardData[tab].forEach(function(entry) {
            html += '<tr><td>' + entry.rank + '</td><td>' + entry.name + '</td><td>' + entry.score + '</td></tr>';
        });
        $('#leaderboard-body').html(html);
    });
    
    // Share progress
    $('#generate-share-code').click(function() {
        var achievementCount = Object.keys(achievements).filter(k => achievements[k].unlocked).length;
        var quizPercent = Math.round((quizScore / quizQuestions.length) * 100);
        
        $('#share-planets').text(visitedPlanets.length);
        $('#share-achievements').text(achievementCount);
        $('#share-quiz').text(quizPercent);
        
        var shareCode = btoa(visitedPlanets.length + '-' + achievementCount + '-' + quizPercent);
        $('#share-code-display').html('Your Share Code: <br><strong>' + shareCode + '</strong>').fadeIn();
    });
    
    $("#toggleSocial").click(function() {
        $("#social-panel").toggleClass("social-hidden");
        if (!$("#social-panel").hasClass("social-hidden")) {
            $(this).text("👥 Leaderboard (Open)").addClass("active");
        } else {
            $(this).text("👥 Leaderboard").removeClass("active");
        }
    });
    
    $("#close-social").click(function() {
        $("#social-panel").addClass("social-hidden");
        $("#toggleSocial").text("👥 Leaderboard").removeClass("active");
    });
});

