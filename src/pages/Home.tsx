import SplashCursor from '../components/cursor';

export default function Home() {
  return (
    <>
      {/* 添加流体效果层 */}
      <SplashCursor 
        SPLAT_RADIUS={0.3}
        DYE_RESOLUTION={1024}
        SPLAT_FORCE={6000}
        DENSITY_DISSIPATION={2.5}
        VELOCITY_DISSIPATION={1.5}
        COLOR_UPDATE_SPEED={8}
        BACK_COLOR={{ r: 0, g: 0, b: 0 }}
      />
      
      {/* 原有的页面内容 */}
      <div>
        // ... 其他内容
      </div>
    </>
  );
}