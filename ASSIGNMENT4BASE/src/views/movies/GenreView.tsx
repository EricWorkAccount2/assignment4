import { useSearchParams } from 'react-router-dom';
import { ImageGrid, Pagination } from '@/components';
import { type ImageCell, IMAGE_BASE_URL, MOVIE_ENDPOINT, TV_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useNavigate } from 'react-router-dom';

export const GenreView = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const mediaType = searchParams.get('type') || 'movie';
  const genreId = searchParams.get('genre') || '28';
  const page = parseInt(searchParams.get('page') || '1');

  const genreIdNum = parseInt(genreId);

  const endpoint = mediaType === 'movie' ? MOVIE_ENDPOINT : TV_ENDPOINT;

  // ✅ FIX: DO NOT add /discover again (already in endpoint)
  const { data } = useTmdb<any>(
    endpoint,
    {
      with_genres: genreIdNum,
      page,
    },
    [mediaType, genreId, page]
  );

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      type: mediaType,
      genre: genreId,
      page: newPage.toString(),
    });
  };

  const handleMediaTypeChange = (type: string) => {
    setSearchParams({ type, genre: genreId, page: '1' });
  };

  const handleGenreChange = (genre: string) => {
    setSearchParams({ type: mediaType, genre, page: '1' });
  };

  const movieGenres = [
    { id: '28', name: 'Action' },
    { id: '12', name: 'Adventure' },
    { id: '16', name: 'Animation' },
    { id: '80', name: 'Crime' },
    { id: '10751', name: 'Family' },
    { id: '14', name: 'Fantasy' },
    { id: '36', name: 'History' },
    { id: '27', name: 'Horror' },
    { id: '9648', name: 'Mystery' },
    { id: '878', name: 'Sci-Fi' },
  ];

  const tvGenres = [
    { id: '10759', name: 'Action' },
    { id: '16', name: 'Animation' },
    { id: '35', name: 'Comedy' },
    { id: '80', name: 'Crime' },
    { id: '99', name: 'Documentary' },
    { id: '18', name: 'Drama' },
    { id: '10751', name: 'Family' },
    { id: '10762', name: 'Kids' },
    { id: '9648', name: 'Mystery' },
    { id: '10765', name: 'Sci-Fi' },
  ];

  const genres = mediaType === 'movie' ? movieGenres : tvGenres;

  const gridData: ImageCell[] = (data?.results ?? []).map((result: any) => ({
    id: result.id,
    imageUrl: result.poster_path || result.backdrop_path
      ? `${IMAGE_BASE_URL}${result.poster_path || result.backdrop_path}`
      : '',
    primaryText: result.title || result.name,
    secondaryText: result.release_date || result.first_air_date,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Browse by Genre</h1>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex gap-2">
          <button
            onClick={() => handleMediaTypeChange('movie')}
            className={`px-4 py-2 rounded ${
              mediaType === 'movie' ? 'bg-blue-500' : 'bg-gray-700'
            } text-white`}
          >
            Movies
          </button>

          <button
            onClick={() => handleMediaTypeChange('tv')}
            className={`px-4 py-2 rounded ${
              mediaType === 'tv' ? 'bg-blue-500' : 'bg-gray-700'
            } text-white`}
          >
            TV Shows
          </button>
        </div>

        <select
          value={genreId}
          onChange={(e) => handleGenreChange(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white"
        >
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      {data?.results && (
        <>
          <ImageGrid
            images={gridData}
            onClick={(id) =>
              navigate(
                mediaType === 'movie'
                  ? `/movie/${id}/credits`
                  : `/tv/${id}/seasons`
              )
            }
          />

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