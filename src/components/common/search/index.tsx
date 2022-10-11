import React from 'react';
import { SEARCH_ICON, CLOSE_ICON } from '../icons';
import InputField from '../input';

interface ISearch {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (value?: string|any) => void;
  onReset?: () => void;
  placeholder?: string;
  value?: string;
}

const BEM_BLOCK = 'c-search';

function Search({
  onChange = () => {},
  onClick = () => {},
  onReset,
  placeholder = 'Search',
  value = '',
}: ISearch) {
  return (
    <div className={BEM_BLOCK}>
      <InputField
        ariaLabel='search'
        className={`${BEM_BLOCK}__field`}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      <div className={`${BEM_BLOCK}__icon`} onClick={onClick}>
        {SEARCH_ICON}
      </div>
      {onReset && (
        <div className={`${BEM_BLOCK}__icon`} onClick={onReset}>
          {CLOSE_ICON}
        </div>
      )}
    </div>
  );
}

export default Search;
