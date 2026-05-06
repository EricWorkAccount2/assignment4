import { DetailItem, LinkGroup, Modal } from '@/components';
import { type MovieRespsonse, IMAGE_BASE_URL, MOVIE_ENDPOINT, ORIGINAL_IMAGE_BASE_URL } from '@/core';
import { useTmdb } from '@/hooks';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const MovieView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<MovieRespsonse>(`${MOVIE_ENDPOINT}/${id}`, { append_to_response: 'videos' }, [id]);

  const trailerVideo =
    data?.videos?.results.find(
      (video) => video.site === 'YouTube' && video.type === 'Trailer' && video.name?.toLowerCase().includes('official')
    ) || data?.videos?.results.find((video) => video.site === 'YouTube' && video.type === 'Trailer');

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="flex flex-col h-full">
        <img className="h-[240px] object-cover rounded-2xl" src={`${ORIGINAL_IMAGE_BASE_URL}${data.backdrop_path}`} />
        <div className="flex min-h-0 gap-5 p-5">
          <img className="h-[280px] object-cover rounded-xl" src={`${IMAGE_BASE_URL}${data.poster_path}`} alt={data.title} />
          <div className="overflow-y-auto space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">{data.title}</h1>
            </div>
            <p className="text-gray-300 leading-relaxed">{data.overview}</p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <DetailItem label="Release" value={data.release_date} />
              <DetailItem label="Rating" value={data.vote_average} />
            </div>
            {trailerVideo && (
              <div className="aspect-video w-[50%]">
                <iframe
                  className="w-full h-full rounded-xl"
                  src={`https://www.youtube.com/embed/${trailerVideo.key}`}
                  title={trailerVideo.name}
                  allowFullScreen
                />
              </div>
            )}
            <LinkGroup
              options={[
                { label: 'Credits', to: 'credits' },
                { label: 'Reviews', to: 'reviews' },
              ]}
            />
            <Outlet />
          </div>
        </div>
      </div>
    </Modal>
  );
};
