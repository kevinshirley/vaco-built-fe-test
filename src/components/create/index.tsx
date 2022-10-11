import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty, isNil } from 'ramda';
import moment from 'moment';
import { useRouter } from 'next/router';

import { selectSlugifiedBlogPosts } from '../../store/selectors/news';
import InputField from '../common/input';
import Button from '../common/button';

interface PostType {
  id: number;
  title: string;
  text: string;
  timestamp: string;
  slug: string;
}

const BEM_BLOCK = 'c-blog-post';

function MarketNewsContainer() {
  const router = useRouter();

  const blogPosts: PostType[] = useSelector(selectSlugifiedBlogPosts);

  const [title, setTitle]: any = useState('');
  const [text, setText]: any = useState('');

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSave = () => {
    console.log({ title, text });
  };

  return (
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
  );
};

export default MarketNewsContainer;
