import Pagination from "../components/pagination.jsx";
import Layout from "../components/Layout.jsx";
import {useSearchParams} from "react-router";
import {useEffect, useMemo, useState} from "react";
import {useCart} from "../context/cart-context.jsx";
import FilteredBooksLists from "../components/FilteredBooksLists.jsx";

const BestSellerBooks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
  });
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [authorsFilter, setAuthorsFilter] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const fetchBooks = async (page = 1, limit = 12) => {
    setIsLoading(true);
    try {
      const url = new URL(`${import.meta.env.VITE_API_URL}/api/books/best-sellers`);
      url.searchParams.set("page", page.toString());
      url.searchParams.set("limit", limit.toString());
      const categories = searchParams.getAll("category");
      const authors = searchParams.getAll("author");
      categories.forEach((cat) => {
        if (cat !== "همه") {
          url.searchParams.append("category", cat);
        }
      });
      authors.forEach((author) => url.searchParams.append("author", author));

      const res = await fetch(url);
      if (!res.ok) throw new Error("خطا در دریافت لیست کتاب‌ها");
      const data = await res.json();
      setBooks(data.books);
      setCategoriesFilter(data.filters.categories);
      setAuthorsFilter(data.filters.authors);
      setPagination({
        ...pagination,
        page: data.pagination.page,
        total: data.pagination.total,
        totalPages: data.pagination.totalPages,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    (async () => {
      await fetchBooks(page);
    })();
  }, [searchParams]);

  const handleAuthorChange = (author) => {
    const authors = searchParams.getAll("author");
    const newAuthors = authors.includes(author)
      ? authors.filter((c) => c !== author)
      : [...authors, author];
    setPagination({ ...pagination, page: 1 });
    // Update URL
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("author");
    newAuthors.forEach((a) => newSearchParams.append("author", a));
    // newSearchParams.delete("category");
    // selectedCategories.forEach((c) => newSearchParams.append("category", c));
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
  };

  const handleCategoryChange = (category) => {
    const categories = searchParams.getAll("category");
    const newCategories = categories.includes(category)
      ? categories.filter((c) => c !== category)
      : [...categories, category];

    setPagination({ ...pagination, page: 1 });
    // Update URL
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("category");
    newCategories.forEach((c) => newSearchParams.append("category", c));
    // newSearchParams.delete("author");
    // selectedAuthors.forEach((a) => newSearchParams.append("author", a));
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
  };

  const handlePageChange = async (newPage) => {
    setPagination({ ...pagination, page: newPage });
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", newPage);
    setSearchParams(newSearchParams);
    await fetchBooks(newPage);
  };

  const memoizedCategoriesFilter = useMemo(() => categoriesFilter, [categoriesFilter]);
  const memoizedAuthorsFilter = useMemo(() => authorsFilter, [authorsFilter]);

  return (
    <Layout>
      <div className="full-list">
        <div className="books-top-title">پرفروش‌ترین‌های بوک‌لند</div>
        <div className="lists">
          {isLoading ? (
            <div>در حال بارگذاری...</div>
          ) : (
            <div className="pagination-wrapper">
              <>
                <FilteredBooksLists
                  books={books}
                  isFilterActive={isFilterActive}
                  setIsFilterActive={setIsFilterActive}
                  searchParams={searchParams}
                  categoriesFilter={memoizedCategoriesFilter}
                  authorsFilter={memoizedAuthorsFilter}
                  handleCategoryChange={handleCategoryChange}
                  handleAuthorChange={handleAuthorChange}
                />
                <Pagination
                  page={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BestSellerBooks;