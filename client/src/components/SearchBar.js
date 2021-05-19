import { InputGroup, InputRightElement } from '@chakra-ui/input';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByUserId } from '../redux/actions/userActions';
import { Search2Icon } from '@chakra-ui/icons';

function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const searchedUserError = useSelector((state) => state.searchedUser?.error);

  const handleClick = (e) => {
    if (search === '') return;
    dispatch(getUserByUserId(search));
    setSearch('');
  };
  return (
    <div className="search-bar">
      <InputGroup size="md">
        <input
          type="text"
          value={search}
          className="search-barInput"
          placeholder={
            searchedUserError ? 'NO USER FOUND' : 'Search by username'
          }
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Search2Icon
            boxSize={4}
            mb="0.6rem"
            mr="-2rem"
            onClick={handleClick}
          />
        </InputRightElement>
      </InputGroup>
    </div>
  );
}

export default SearchBar;
