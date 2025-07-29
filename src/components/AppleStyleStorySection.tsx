import { useState, useEffect, useRef, useCallback } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const AppleStyleStorySection = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const sections = [
    {
      id: 0,
      title: "The Crisis",
      subtitle: "Financial illiteracy affects 2 out of 3 Americans",
      description: "In a world where financial decisions shape our future, most people lack the basic knowledge to make informed choices about money.",
      stats: "66% of Americans can't pass a basic financial literacy test",
      visual: "crisis"
    },
    {
      id: 1,
      title: "The Youth Gap",
      subtitle: "Only 21 states require financial education",
      description: "Young people graduate without understanding budgeting, investing, or credit - leaving them vulnerable to debt and poor financial decisions.",
      stats: "57% of adults are financially illiterate",
      visual: "youth"
    },
    {
      id: 2,
      title: "Middle School Matters",
      subtitle: "Ages 11-14 are critical for financial habits",
      description: "Research shows that financial habits are formed by age 7, but middle school is when we can still make a lasting impact on money mindset.",
      stats: "Financial habits are 80% formed by age 14",
      visual: "middle"
    },
    {
      id: 3,
      title: "Our Solution",
      subtitle: "Peer-to-peer financial education that works",
      description: "Students teaching students creates authentic connections and real understanding. Our approach makes financial literacy engaging and accessible.",
      stats: "85% improvement in financial confidence",
      visual: "solution"
    }
  ];

  // WebGL visualization
  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform float u_progress;
      
      void main() {
        vec2 pos = a_position;
        
        // Add wave effect based on progress
        pos.y += sin(pos.x * 3.14159 + u_time * 2.0) * 0.1 * u_progress;
        
        gl_Position = vec4(pos, 0.0, 1.0);
        v_texCoord = a_texCoord;
      }
    `;

    // Fragment shader
    const fragmentShaderSource = `
      precision mediump float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform float u_progress;
      uniform float u_section;
      
      vec3 getColor(float section) {
        if (section < 1.0) {
          // Crisis - Red gradient
          return mix(vec3(0.8, 0.2, 0.2), vec3(1.0, 0.4, 0.2), section);
        } else if (section < 2.0) {
          // Youth - Orange to Yellow
          return mix(vec3(1.0, 0.4, 0.2), vec3(1.0, 0.8, 0.2), section - 1.0);
        } else if (section < 3.0) {
          // Middle School - Blue gradient
          return mix(vec3(1.0, 0.8, 0.2), vec3(0.2, 0.6, 1.0), section - 2.0);
        } else {
          // Solution - Green gradient
          return mix(vec3(0.2, 0.6, 1.0), vec3(0.2, 0.8, 0.4), section - 3.0);
        }
      }
      
      void main() {
        vec2 uv = v_texCoord;
        
        // Create flowing particles effect
        float noise = sin(uv.x * 10.0 + u_time) * cos(uv.y * 8.0 + u_time * 0.5) * 0.5 + 0.5;
        
        // Add circular patterns
        float dist = length(uv - 0.5);
        float circle = sin(dist * 20.0 - u_time * 3.0) * 0.5 + 0.5;
        
        // Combine effects
        float intensity = (noise * 0.7 + circle * 0.3) * u_progress;
        
        vec3 color = getColor(u_section) * intensity;
        
        // Add glow effect
        color += vec3(0.1, 0.1, 0.2) * (1.0 - dist) * u_progress;
        
        gl_FragColor = vec4(color, 0.8);
      }
    `;

    // Create shader
    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    // Get attribute and uniform locations
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const progressLocation = gl.getUniformLocation(program, 'u_progress');
    const sectionLocation = gl.getUniformLocation(program, 'u_section');

    // Create buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1,  -1, 1,
      -1, 1,   1, -1,   1, 1
    ]), gl.STATIC_DRAW);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0, 0,  1, 0,  0, 1,
      0, 1,  1, 0,  1, 1
    ]), gl.STATIC_DRAW);

    // Animation loop
    const animate = (time: number) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      gl.useProgram(program);
      
      // Set uniforms
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform1f(progressLocation, scrollProgress);
      gl.uniform1f(sectionLocation, currentSection);
      
      // Set up attributes
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.enableVertexAttribArray(texCoordLocation);
      gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
      
      // Enable blending
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      
      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollProgress, currentSection]);

  useEffect(() => {
    const cleanup = initWebGL();
    return cleanup;
  }, [initWebGL]);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      if (rect.top <= 0 && rect.bottom >= viewportHeight) {
        const progress = Math.abs(rect.top) / (rect.height - viewportHeight);
        const clampedProgress = Math.max(0, Math.min(1, progress));
        
        setScrollProgress(clampedProgress);
        
        // Update current section
        const sectionProgress = clampedProgress * (sections.length - 1);
        const newSection = Math.floor(sectionProgress);
        setCurrentSection(Math.max(0, Math.min(sections.length - 1, newSection)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections.length]);

  const currentSectionData = sections[currentSection];

  return (
    <section 
      ref={containerRef}
      className="relative h-[400vh] bg-black text-white overflow-hidden"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        {/* WebGL Canvas Background */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ mixBlendMode: 'screen' }}
        />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          {/* Section indicator */}
          <div className="mb-8">
            <div className="flex justify-center space-x-2 mb-4">
              {sections.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index === currentSection ? 'w-12 bg-white' : 'w-3 bg-white/30'
                  }`}
                />
              ))}
            </div>
            <p className="text-white/60 text-sm font-medium tracking-wider uppercase">
              {String(currentSection + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
            </p>
          </div>

          {/* Main content */}
          <div 
            className="transition-all duration-1000 ease-out"
            style={{
              transform: `translateY(${Math.sin(scrollProgress * Math.PI * 2) * 10}px)`,
              opacity: 1
            }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              {currentSectionData.title}
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-light mb-8 text-white/80">
              {currentSectionData.subtitle}
            </h2>
            
            <p className="text-xl md:text-2xl leading-relaxed mb-12 max-w-3xl mx-auto text-white/70">
              {currentSectionData.description}
            </p>

            {/* Stats */}
            <div className="inline-flex items-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="w-3 h-3 bg-white rounded-full mr-4 animate-pulse" />
              <span className="text-lg font-semibold">
                {currentSectionData.stats}
              </span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div 
                className="w-1 bg-white/60 rounded-full mt-2 transition-all duration-300"
                style={{ 
                  height: `${12 + scrollProgress * 8}px`,
                  opacity: 0.6 + scrollProgress * 0.4 
                }}
              />
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${10 + (i % 5) * 20}%`,
                top: `${20 + Math.floor(i / 5) * 20}%`,
                transform: `translate(${Math.sin(scrollProgress * Math.PI * 2 + i) * 50}px, ${Math.cos(scrollProgress * Math.PI * 2 + i) * 30}px) scale(${0.5 + Math.sin(scrollProgress * Math.PI * 4 + i) * 0.5})`,
                opacity: 0.3 + Math.sin(scrollProgress * Math.PI * 3 + i) * 0.3,
                transition: 'transform 0.1s ease-out'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppleStyleStorySection;