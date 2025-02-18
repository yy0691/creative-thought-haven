import { useState, useEffect } from 'react';

const emojis = ['😀', '😎', '🎉', '💡', '🚀', '✨', '🌈', '🎨', '🎯', '🎮', '🌟', '🍀'];

const happyEmojis = ['😀', '😊', '😄', '😁', '😆'];
const techEmojis = ['💻', '🖥️', '⌨️', '🖱️', '🚀'];
const natureEmojis = ['🌸', '🌺', '🌼', '🌻', '🌹'];
const emojisByCategory = {
  happy: happyEmojis,
  tech: techEmojis,
  nature: natureEmojis,
};

const getRandomEmoji = (category: keyof typeof emojisByCategory) => {
  const emojis = emojisByCategory[category];
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
};
export const RandomEmoji = () => {
  const [emoji, setEmoji] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    setEmoji(emojis[randomIndex]);
  }, []);

  return <span>{emoji}</span>;
};