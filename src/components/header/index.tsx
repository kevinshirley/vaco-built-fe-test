import React from 'react';

const BEM_BLOCK = 'c-header';

function Header() {
  return (
    <header className={BEM_BLOCK}>
      <h1>Blog Posts</h1>
    </header>
  );
};

export default Header;
