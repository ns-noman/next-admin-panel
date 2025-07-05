"use client";

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import styles from './pagination.module.css';
const Pagination = ({count}) => {

  const searchParams = useSearchParams();
  const {replace} = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const page = searchParams.get("page") || 1;
  const ITEM_PER_PAGE = 2;
  const hasPrev = ITEM_PER_PAGE * (parseInt(page)-1) > 0;
  const hasNext = ITEM_PER_PAGE * (parseInt(page)-1) + ITEM_PER_PAGE < count;

  const handleChangePage = (type) => {
      type === "Prev" ? params.set("page", parseInt(page)-1) : params.set("page", parseInt(page)+1);
      replace(`${pathname}?${params}`);
  }
  return (
    <div className={styles.container}>
        <button className={styles.button} disabled={!hasPrev} onClick={()=>handleChangePage("Prev")}>Previous</button>
        <button className={styles.button} disabled={!hasNext} onClick={()=>handleChangePage("Next")}>Next</button>
    </div>
  );
};

export default Pagination;