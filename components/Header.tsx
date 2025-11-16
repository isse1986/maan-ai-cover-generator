
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-brand-secondary p-4 shadow-lg text-center">
      <h1 className="text-3xl font-bold font-display text-brand-highlight tracking-wider">Maan AI Book Cover Generator</h1>
      <p className="text-brand-light mt-1">Design your next bestseller cover in seconds.</p>
    </header>
  );
};

export default Header;
