import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';

 export function  LikeButton() {
  const [hearts, setHearts] = useState([]);

  const addHeart = () => {
    const newHeart = {
      id: Date.now(),
      x: Math.random() * 50 - 25, 
    };
    setHearts([...hearts, newHeart]);

    
    setTimeout(() => {
      setHearts((prevHearts) => prevHearts.filter((heart) => heart.id !== newHeart.id));
    }, 2000);
  };

  return (
    <div className="like-container" style={{ position: 'relative', display: 'inline-block' }}>
       < FavoriteIcon  
       className="like-button"
       onClick={addHeart}
       style={{
        fontSize: '24px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
      }}
       />
    
      <div className="hearts-container" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="heart"
            initial={{ opacity: 0, y: 0, scale: 1 }}
            animate={{ opacity: 1, y: -150, scale: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            style={{
              position: 'absolute',
              left: `${heart.x}px`,
              fontSize: '16px',
              color: 'white',
            }}
          >
           < FavoriteIcon/>
          </motion.div>
        ))}
      </div>
    </div>
  );
};


