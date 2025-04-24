// src/components/ui/button.jsx
import React from 'react';

const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
};

export { Button };
