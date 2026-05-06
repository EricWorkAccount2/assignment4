import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { type ImageCell, IMAGE_BASE_URL, TRENDING_ENDPOINT } from '@/core';
import { useTmdb, } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const TrendingView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const interval = searchParams.get('interval') || 'day';
  const mediaType = searchParams.get('type') || 'movie';
  
  const { data } = useTmdb<any>(`${TRENDING_ENDPOINT}/${mediaType === 'tv' ? 'tv' : 'movie'}/${interval}`, { page, time_window: interval }, [page, interval, mediaType]);

  const gridData: ImageCell[] = (data?.results ?? []).map((result: any) => ({
    id: result.id,
    imageUrl: `${IMAGE_BASE_URL}${result.poster_path}`,
    primaryText: result.title || result.name,
    secondaryText: result.release_date || result.first_air_date,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">No rush</p>;
  }

  return (
    <section className="max-w-7xl mx-auto space-y-5 p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Trending</h1>
        <div className="flex gap-4">
          <ButtonGroup
            value={mediaType}
            options={[
              { label: 'Movies', value: 'movie' },
              { label: 'TV Shows', value: 'tv' },
            ]}
            onClick={(value) => setSearchParams({ interval, type: value })}
          />
          <ButtonGroup
            value={interval}
            options={[
              { label: 'Today', value: 'day' },
              { label: 'Week', value: 'week' },
            ]}
            onClick={(value) => setSearchParams({ interval: value, type: mediaType })}
          />
        </div>
      </div>
      {/* <ImageGrid images={gridData} onClick={(result) => navigate(`/${mediaType}/${result.id}/images`)}>
      </ImageGrid> */}

      {/* <ImageGrid
        images={gridData}
        onClick={(image) =>
          navigate(`/movie/${image.id}/credits`)
        }
      /> */}

      <ImageGrid
            images={gridData}
            onClick={(image) =>
              navigate(
                mediaType === 'movie'
                  ? `/movie/${image.id}/credits`
                  : `/tv/${image.id}/seasons?season=0`
              )
            }
          />


      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
