import Image from "next/image";

import styles from "./Search.module.css";

type Props = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export const Search = ({ searchQuery, setSearchQuery }: Props) => {
  const updateSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={styles.search}>
      <div className={styles.searchInput}>
        <input
          placeholder="Search by id, customer name, origin, destination or status..."
          value={searchQuery}
          onChange={updateSearchQuery}
        />
        <Image
          className={styles.searchIcon}
          src="/search-icon.svg"
          alt="Search"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};
