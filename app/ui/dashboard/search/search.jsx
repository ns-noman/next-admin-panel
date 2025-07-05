"use client";

import { MdSearch } from 'react-icons/md';
import styles from './search.module.css';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const Search = ({placeholder}) => {
  const searchParams = useSearchParams();
  const {replace} = useRouter();
  const pathname = usePathname();
  const handleSearch = useDebouncedCallback(
    (e) => {
    const params = new URLSearchParams(searchParams);
    if(e.target.value){
      if(e.target.value.length > 2){
        params.set("q", e.target.value);
        params.set("page", 1);
      }
    }else{
      params.delete("q");
    }
    replace(`${pathname}?${params}`);
  }
  , 300);
  return (
    <div className={styles.container}>
      <MdSearch/>
      <input type="text" placeholder={placeholder} className={styles.input} onChange={handleSearch}/>
    </div>
  );
};

export default Search;