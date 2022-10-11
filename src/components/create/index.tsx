import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty, isNil } from 'ramda';
import moment from 'moment';
import { useRouter } from 'next/router';

import { selectSlugifiedBlogPosts } from '../../store/selectors/news';
import InputField from '../common/input';
import Button from '../common/button';
import { useAction } from '../../store/hooks';
import * as actions from '../../store/actions';
import Link from '../common/link';

interface PostType {
  id: number;
  title: string;
  text: string;
  timestamp: string;
  slug: string;
}

const BEM_BLOCK = 'c-create-post';

function MarketNewsContainer() {
  const createBlogPost = useAction(actions.stocks.createBlogPost);

  const [title, setTitle]: any = useState('');
  const [text, setText]: any = useState('');
  const [message, setMessage]: any = useState('');

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSave = () => {
    console.log({ title, text });
    createBlogPost({ title, text });
    setMessage('Blog post created!');
  };

  return (
    <div className={BEM_BLOCK}>
      <div>
        <Link href={`/`}>Back to blog posts</Link>
        <br/>
        <br/>
      </div>
      {!isEmpty(message) && !isNil(message) ? (
        <>
          {message}
        </>
      ) : (
        <div>
          <h1>Create blog post</h1>
          <InputField
            className={`${BEM_BLOCK}__field`}
            onChange={onTitleChanged}
            value={title}
            placeholder='Blog post title'
          />
          <br/>
          <br/>
          <InputField
            className={`${BEM_BLOCK}__field`}
            onChange={onTextChanged}
            value={text}
            placeholder='Blog post text'
          />
          <br/>
          <br/>
          <Button onClick={onSave}>Save</Button>
        </div>
      )}
    </div>
  );
};

export default MarketNewsContainer;
