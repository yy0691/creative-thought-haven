interface CenteredImageProps {
  src: string;
  alt?: string;
  width?: string;
  caption?: string;  // 添加图注属性
}

const CenteredImage = ({ 
  src, 
  alt = "", 
  width = "75%",
  caption = alt  // 默认使用 alt 作为图注
}: CenteredImageProps) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',  // 改为纵向排列，方便添加图注
      justifyContent: 'center', 
      alignItems: 'center',
      width: '100%',
      margin: '20px auto'
    }}>
      <img 
        src={src} 
        alt={alt} 
        width={width}
        style={{
          borderRadius: '0px',  // 圆角
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',  // 阴影
          //transition: 'transform 0.2s ease-in-out',  // 添加悬停动画
        }}
        //onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
        //onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      />
      {caption && (
        <p style={{
          marginTop: '8px',
          fontSize: '0.9rem',
          color: '#666',
          textAlign: 'center'
        }}>
          {caption}
        </p>
      )}
    </div>
  );
};

export default CenteredImage;