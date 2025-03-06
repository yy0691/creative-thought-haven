"use client";
import React, { useEffect, useRef } from "react";

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

interface SplashCursorProps {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLOR_UPDATE_SPEED?: number;
  BACK_COLOR?: ColorRGB;
  TRANSPARENT?: boolean;
}

interface Pointer {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: ColorRGB;
}

function pointerPrototype(): Pointer {
  return {
    id: -1,
    texcoordX: 0,
    texcoordY: 0,
    prevTexcoordX: 0,
    prevTexcoordY: 0,
    deltaX: 0,
    deltaY: 0,
    down: false,
    moved: false,
    color: { r: 0, g: 0, b: 0 },
  };
}

export default function SplashCursor({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1024, // 降低默认分辨率以减少内存占用
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.98, g: 0.98, b: 0.98 },
  TRANSPARENT = true
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 添加WebGL资源引用，用于清理
  const webGLResourcesRef = useRef<{
    textures: WebGLTexture[];
    framebuffers: WebGLFramebuffer[];
    programs: WebGLProgram[];
    lastCleanup: number;
  }>({
    textures: [],
    framebuffers: [],
    programs: [],
    lastCleanup: Date.now()
  });

  // 添加性能监控
  const performanceRef = useRef({
    frameCount: 0,
    lastFrameTime: 0,
    fps: 60,
    lowPerformanceCount: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Guard canvas early
  
    // Pointer and config setup
    let pointers: Pointer[] = [pointerPrototype()];
  
    // All these are guaranteed numbers due to destructuring defaults
    // So we cast them to remove TS warnings:
    let config = {
      SIM_RESOLUTION: SIM_RESOLUTION!,
      DYE_RESOLUTION: DYE_RESOLUTION!,
      CAPTURE_RESOLUTION: CAPTURE_RESOLUTION!,
      DENSITY_DISSIPATION: DENSITY_DISSIPATION!,
      VELOCITY_DISSIPATION: VELOCITY_DISSIPATION!,
      PRESSURE: PRESSURE!,
      PRESSURE_ITERATIONS: PRESSURE_ITERATIONS!,
      CURL: CURL!,
      SPLAT_RADIUS: SPLAT_RADIUS!,
      SPLAT_FORCE: SPLAT_FORCE!,
      SHADING,
      COLOR_UPDATE_SPEED: COLOR_UPDATE_SPEED!,
      PAUSED: false,
      BACK_COLOR,
      TRANSPARENT,
    };
    // 获取WebGL上下文(WebGL1或WebGL2)
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return;

    // 获取扩展
    const ext = {
      supportLinearFiltering: gl.getExtension('OES_texture_float_linear')
    };
    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 256;
      config.SHADING = false;
    }
  
    // 添加资源跟踪函数
    function trackTexture(texture: WebGLTexture) {
      webGLResourcesRef.current.textures.push(texture);
      return texture;
    }
  
    function trackFramebuffer(framebuffer: WebGLFramebuffer) {
      webGLResourcesRef.current.framebuffers.push(framebuffer);
      return framebuffer;
    }
  
    function trackProgram(program: WebGLProgram) {
      webGLResourcesRef.current.programs.push(program);
      return program;
    }
    // 启动性能监控
    const monitorPerformance = () => {
      // 计算FPS
      const now = performance.now();
      const deltaTime = now - performanceRef.current.lastFrameTime;
      performanceRef.current.lastFrameTime = now;
      performanceRef.current.fps = 1000 / deltaTime;
      requestAnimationFrame(monitorPerformance);
    };
    requestAnimationFrame(monitorPerformance);
  
    // 添加定期清理机制
    const cleanupInterval = setInterval(() => {
      // 每60秒检查一次性能
      if (performanceRef.current.fps < 30) {
        const now = Date.now();
        // 确保清理操作不会太频繁（至少间隔30秒）
        if (now - webGLResourcesRef.current.lastCleanup > 30000) {
          console.log('检测到性能下降，执行资源清理');
          // 清理WebGL资源
          if (webGLResourcesRef.current) {
            // 清理纹理
            webGLResourcesRef.current.textures.forEach(texture => {
              gl.deleteTexture(texture);
            });
            // 清理帧缓冲区
            webGLResourcesRef.current.framebuffers.forEach(framebuffer => {
              gl.deleteFramebuffer(framebuffer);
            });
            // 清理着色器程序
            webGLResourcesRef.current.programs.forEach(program => {
              gl.deleteProgram(program);
            });
            webGLResourcesRef.current.lastCleanup = now;
          }
        }
      }
    }, 60000);

    // 清理函数
    return () => {
      clearInterval(cleanupInterval);
      // 清理WebGL资源
      if (webGLResourcesRef.current) {
        // 清理纹理
        webGLResourcesRef.current.textures.forEach(texture => {
          gl.deleteTexture(texture);
        });
        // 清理帧缓冲区
        webGLResourcesRef.current.framebuffers.forEach(framebuffer => {
          gl.deleteFramebuffer(framebuffer);
        });
        // 清理着色器程序
        webGLResourcesRef.current.programs.forEach(program => {
          gl.deleteProgram(program);
        });
        webGLResourcesRef.current.lastCleanup = Date.now();
      }
      
      // 释放WebGL上下文
      const loseContext = gl.getExtension('WEBGL_lose_context');
      if (loseContext) loseContext.loseContext();
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="mouse-ripple"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
  );
}
