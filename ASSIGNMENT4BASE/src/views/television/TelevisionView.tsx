import { useSearchParams } from 'react-router-dom';
import { ImageGrid, Pagination } from '@/components';
import { type ImageCell, IMAGE_BASE_URL, TV_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useNavigate } from 'react-router-dom';

export const TelevisionView = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'airing_today';
  const page = parseInt(searchParams.get('page') || '1');

  const categories: Record<string, string> = {
    airing_today: 'Airing Today',
    on_the_air: 'On The Air',
    top_rated: 'Top Rated',
    popular: 'Popular',
  };

  const { data } = useTmdb<any>(`${TV_ENDPOINT}/${category}`, { page }, [category, page]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ category, page: newPage.toString() });
  };

  const handleCategoryChange = (cat: string) => {
    setSearchParams({ category: cat, page: '1' });
  };

  const gridData: ImageCell[] = (data?.results ?? []).map((result: any) => ({
    id: result.id,
    imageUrl: `${IMAGE_BASE_URL}${result.poster_path}`,
    primaryText: result.name,
    secondaryText: result.first_air_date,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">TV Shows</h1>
      
      <div className="flex gap-2 flex-wrap">
        {Object.entries(categories).map(([key, label]) => (
          <button
            key={key}
            onClick={() => handleCategoryChange(key)}
            className={`px-4 py-2 rounded ${category === key ? 'bg-blue-500' : 'bg-gray-700'} text-white`}
          >
            {label}
          </button>
        ))}
      </div>

      {data?.results && (
        <>
          <ImageGrid images={gridData} onClick={(id) => navigate(`/tv/${id}/seasons`)} />
          <Pagination
            page={page}
            maxPages={data.total_pages}
            onClick={handlePageChange}
          />
        </>
      )}
    </div>
  );
};