import React from 'react';

const BEM_BLOCK = 'c-footer';

function Footer() {
  const today = new Date(), year = today.getFullYear();

  return (
    <footer className={BEM_BLOCK}>
      <small>
        &copy; {year} <a href="http://kevinshirley.com" target='_blank' rel='noopener noreferrer'>KevinShirley.com</a>, All Rights Reserved.
      </small>
    </footer>
  );
};

export default Footer;
