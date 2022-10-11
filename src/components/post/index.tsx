import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty, isNil } from 'ramda';
import moment from 'moment';
import { useRouter } from 'next/router';

import { selectSlugifiedBlogPosts } from '../../store/selectors/news';
import Link from '../common/link';

interface PostType {
  id: number;
  title: string;
  text: string;
  timestamp: string;
  slug: string;
}

const BEM_BLOCK = 'c-market-news';

function MarketNewsContainer() {
  const router = useRouter();

  const blogPosts: PostType[] = useSelector(selectSlugifiedBlogPosts);

  const [post, setPost]: any = useState({});

  useEffect(() => {
    if (!isEmpty(blogPosts) && !isNil(blogPosts)) {
      const { query } = router;
      const { slug } = query;
      const helpCenterPost = blogPosts.find((post: PostType) => post.slug === slug) || {};
      setPost(helpCenterPost);
    }
  }, [blogPosts]);

  return (
    <>
      {!isNil(post) && !isEmpty(post) ? (
        <div className={`${BEM_BLOCK}__news`}>
          <Link href='/'>Back to blog posts</Link>
          <h2>{post.title}</h2>
          {/* <h5>Published: {published}</h5> */}
          <p dangerouslySetInnerHTML={{ __html: post.text }}></p>
        </div>
      ) : (
        <>This blog post is not currently available</>
      )}
    </>
  );
};

export default MarketNewsContainer;
