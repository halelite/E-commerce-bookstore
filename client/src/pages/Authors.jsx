import {useCallback, useEffect, useRef, useState} from "react";
import Layout from "../components/Layout";
import Pagination from "../components/pagination";
import searchIcon from "../assets/icons/search_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import {debounce} from "../assets/debounce";
import {useNavigate} from "react-router";
import closeIcon from "../assets/icons/close_24dp_FILL0_wght400_GRAD0_opsz24.svg";

function Authors() {
  const navigate = useNavigate();
  const [SearchResult, setSearchResult] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    limit: 10,
  });
  const [searchPagination, setSearchPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const inputEl = useRef(null);

  const fetchSearchResult = async (inputVal, page = 1, limit = 10) => {
    if (!inputVal) {
      setSearchResult([]);
      setSearchPagination({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
      });
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/authors/search?query=${inputVal}&page=${page}&limit=${limit}`
      );
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setSearchResult(data.authors);
      setSearchPagination({
        page: data.pagination.page,
        limit: data.pagination.limit,
        total: data.pagination.total,
        totalPages: data.pagination.totalPages,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const debounceSearch = useCallback(
    debounce((searchTerm) => fetchSearchResult(searchTerm, 1), 1000), []
  );

  const fetchAuthors = async (page = 1, limit = 10) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/authors?page=${page}&limit=${limit}`
      );
      if (!res.ok) throw new Error("دریافت لیست نویسندگان با خطا مواجه شد");
      const result = await res.json();
      setAuthors(result.authors);
      setPagination(result.pagination);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({...prev, page: newPage}));
    }
  };

  const handleSearchPageChange = async (newPage) => {
    if (newPage >= 1 && newPage <= searchPagination.totalPages) {
      setSearchPagination((prev) => ({...prev, page: newPage}));
      await fetchSearchResult(inputEl.current?.value , newPage, searchPagination.limit);
    }
  };

  const handleClear = () => {
    if(inputEl.current) {
      inputEl.current.value = "";
      setSearchResult([]);
      debounceSearch("")
    }
  }

  useEffect(() => {
    fetchAuthors(pagination.page);
  }, [pagination.page]);

  const authorContent =
    inputEl.current?.value && SearchResult.length > 0 ? (
      <div className="pagination-wrapper">
        <ul className="authors-list">
          {SearchResult.map((author) => (
            <li
              key={author._id}
              onClick={() => navigate(`/authors/${author.slug}`)}
            >
              {author.fullName}
            </li>
          ))}
        </ul>
        <Pagination
          page={searchPagination.page}
          totalPages={searchPagination.totalPages}
          onPageChange={handleSearchPageChange}
        />
      </div>
    ) : inputEl.current?.value && SearchResult.length === 0 ? (
      <p>نویسنده‌ای یافت نشد</p>
    ) : authors.length > 0 ? (
      <div className="pagination-wrapper">
        <ul className="authors-list">
          {authors?.map((author) => (
            <li
              key={author._id}
              onClick={() => navigate(`/authors/${author.slug}`)}
            >
              {author.fullName}
            </li>
          ))}
        </ul>
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    ) : (
      <p className="no-results">نویسنده‌ای یافت نشد</p>
    );

  return (
    <Layout>
      <div className="full-list">
        <div className="top-info">
          <div className="top-title">نویسنده‌های بوک‌لند</div>
          <div className="author-search">
            <input
              ref={inputEl}
              type="text"
              placeholder="جستجوی نویسنده..."
              onChange={() => debounceSearch(inputEl.current?.value)}
            />
            <div className="search-icon">
              {(!isLoading && inputEl.current?.value) ?
                <img onClick={handleClear} src={closeIcon} alt="delete" className='clear-input'/> :
                <img src={searchIcon} alt="search"/>}
            </div>
          </div>
        </div>

        <div className="lists">
          {isLoading ? <p>در حال بارگذاری...</p> : authorContent}
        </div>
      </div>
    </Layout>
  );
}

export default Authors;
