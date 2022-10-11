import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty, isNil } from 'ramda';
import moment from 'moment';

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
  const blogPosts = useSelector(selectSlugifiedBlogPosts);

  return (
    <>
      {!isEmpty(blogPosts) && !isNil(blogPosts) ? (
        <div className={BEM_BLOCK}>
          <div className={`${BEM_BLOCK}__create-blog-post`}>
            <Link href={`/create`}>Create blog post</Link>
            <br/>
            <br/>
          </div>
          <div className={`${BEM_BLOCK}__list`}>
            {blogPosts.map((post: PostType) => {
              const dateObject = new Date(post.timestamp)
              const published = moment(dateObject).format('LLL');

              return (
                <Link
                  className={`${BEM_BLOCK}__news-anchor`}
                  href={`/${post.slug}`}
                  key={post.id}
                >
                  <div className={`${BEM_BLOCK}__news`}>
                    <h2>{post.title}</h2>
                    <h5>Published: {published}</h5>
                    <p dangerouslySetInnerHTML={{ __html: post.text }}></p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <>No blog posts currently available.</>
      )}
    </>
  );
};

export default MarketNewsContainer;
