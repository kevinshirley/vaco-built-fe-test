import React from 'react';
import Link from 'next/link';

function NextLink(props: any) {
  const { children, href, className, as, onClick, newTab = false } = props;
  return (
    <Link as={as} href={href}>
      {newTab ? (
        <a className={className} onClick={onClick} rel='noreferrer' target='_blank'>{children}</a>
      ) : (
        <a className={className} onClick={onClick} rel='noreferrer'>{children}</a>
      )}
    </Link>
  );
}

export default NextLink;
