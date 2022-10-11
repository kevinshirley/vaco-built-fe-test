import * as R from 'ramda';
import { createSelector } from 'reselect';
import { slugify } from '../../../utils/string';

interface PostType {
  id: number;
  title: string;
  text: string;
  timestamp: string;
  slug: string;
}

export const selectMarketNews: any = R.pathOr([], [
  'marketNews',
]);

export const selectSlugifiedBlogPosts = createSelector(
  selectMarketNews,
  blogPosts => {
    const slugifiedBlogPosts = blogPosts.map((post: PostType) => ({
      ...post,
      slug: slugify(post.title),
    }));
    return slugifiedBlogPosts;
  },
);
