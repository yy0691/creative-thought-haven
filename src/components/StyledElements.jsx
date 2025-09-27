import React from 'react';

export const ColoredSpan = ({ color, children, ...props }) => (
  <span style={{ color }} {...props}>
    {children}
  </span>
);

export const HighlightedMark = ({ bgColor, style, children, ...props }) => (
  <mark style={{ backgroundColor: bgColor, ...style }} {...props}>
    {children}
  </mark>
);

// 预定义的常用颜色组件
export const WarningText = ({ children }) => (
  <ColoredSpan color="#FBBFBC">{children}</ColoredSpan>
);

export const NoteText = ({ children }) => (
  <ColoredSpan color="#F9D8B1">{children}</ColoredSpan>
);

export const InfoText = ({ children }) => (
  <ColoredSpan color="#E0E1E4">{children}</ColoredSpan>
); 