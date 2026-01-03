import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-brand-secondary/80 backdrop-blur sticky top-0 z-10 border-b border-brand-accent/40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-brand-highlight text-sm font-semibold tracking-[0.2em] uppercase">Digital Planner</p>
          <h1 className="text-2xl md:text-3xl font-display text-brand-light">Plan your days with calm, clarity, and color.</h1>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-brand-light">
          <a className="hover:text-brand-highlight transition" href="#features">Features</a>
          <a className="hover:text-brand-highlight transition" href="#templates">Templates</a>
          <a className="hover:text-brand-highlight transition" href="#pricing">Pricing</a>
          <a className="hover:text-brand-highlight transition" href="#faq">FAQ</a>
          <a
            className="bg-brand-highlight text-brand-primary font-semibold px-4 py-2 rounded-lg hover:bg-opacity-80 transition"
            href="#pricing"
          >
            Get the Planner
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
