import React from 'react';


const AnnouncementBar = () => (
  <div className="bg-zinc-900 text-stone-300 text-xs py-2 text-center uppercase tracking-widest">
    Free global shipping on orders over $200
  </div>
);


const MarketplaceHeader = () => (
  <header className="flex justify-between items-center px-8 py-6 border-b border-zinc-100 bg-white">
    <div className="font-black text-2xl tracking-tighter uppercase">Marketplace</div>
    <nav className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-wide">
      <a href="#" className="hover:text-zinc-500">Shop</a>
      <a href="#" className="hover:text-zinc-500">Collections</a>
      <a href="#" className="hover:text-zinc-500">About</a>
    </nav>
    <div className="flex gap-4">
      <span className="w-5 h-5 flex items-center justify-center">🔍</span>
      <span className="w-5 h-5 flex items-center justify-center">🛒</span>
    </div>
  </header>
);


const MarketplaceFooter = () => (
  <footer className="bg-zinc-900 text-stone-400 py-16 px-8 mt-12">
    <div className="max-w-7xl mx-auto text-center">
      <p className="text-sm">© 2026 Marketplace. All rights reserved.</p>
    </div>
  </footer>
);


export const MarketplaceShell = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <MarketplaceHeader />
      
      {/* Global Search Drawer Placeholder */}
      {/* Cart Drawer Placeholder */}
      {/* Wishlist Drawer Placeholder */}
      
      <main className="flex-grow">
        {children}
      </main>


      < MarketplaceFooter />
    </div>
  );
};
