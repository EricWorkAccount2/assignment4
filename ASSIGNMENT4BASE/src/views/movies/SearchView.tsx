import { ImageGrid, Pagination, SearchBar } from '@/components';
import { IMAGE_BASE_URL, RATE_LIMIT_DELAY, SEARCH_ENDPOINT, type ImageCell, type MovieRespsonse } from '@/core';
import { useDebounce, useTmdb, } from '@/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchView = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState<number>(1);
  const debouncedQuery = useDebounce(query, RATE_LIMIT_DELAY);
  const { data } = useTmdb<MovieRespsonse>(SEARCH_ENDPOINT, { query: debouncedQuery, page }, [debouncedQuery, page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: `${IMAGE_BASE_URL}${result.poster_path}`,
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">taking my time...</p>;
  }

  return (
    <section className="w-full max-w-7xl mx-auto space-y-5 p-5">
      <h1 className="text-3xl font-bold mb-4">Search</h1>
      <SearchBar value={query} onChange={setQuery} />
      <ImageGrid images={gridData} onClick={(id) => navigate(`/movie/${id}/credits`)}>
      </ImageGrid>{' '}
      {data.results.length ? (
        <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
      ) : (
        <p className="text-center text-gray-400">No search results found.</p>
      )}
    </section>
  );
};
