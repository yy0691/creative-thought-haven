interface CenteredImageProps {
  src: string;
  alt?: string;
  width?: string;
  caption?: string;
}

const CenteredImage = ({ 
  src, 
  alt = "", 
  width = "75%",
  caption = alt
}: CenteredImageProps) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      width: '100%',
      margin: '20px auto'
    }}>
      <div style={{ width: width, position: 'relative' }}>
        <img 
          src={src} 
          alt={alt} 
          style={{
            borderRadius: '0px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
          loading="lazy"
          onError={(e) => {
            console.error(`图片加载失败: ${src}`);
          }}
        />
      </div>
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