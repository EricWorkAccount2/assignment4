import { useParams, useSearchParams } from 'react-router-dom';
import { TV_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';

export const EpisodeView = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const seasonNumber = searchParams.get('season') || '1';
  const episodeNumber = searchParams.get('episode') || '1';

  const { data: episodeData } = useTmdb<any>(
    `${TV_ENDPOINT}/${id}/season/${seasonNumber}/episode/${episodeNumber}`,
    {},
    [id, seasonNumber, episodeNumber]
  );

  if (!episodeData) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">
        {episodeData.name}
      </h1>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex gap-6">
          {episodeData.still_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${episodeData.still_path}`}
              alt={episodeData.name}
              className="w-full max-w-md rounded"
            />
          )}
          <div className="space-y-4">
            <div>
              <p className="text-gray-400">Season {episodeData.season_number}, Episode {episodeData.episode_number}</p>
              <p className="text-gray-300 mt-2">{episodeData.overview}</p>
            </div>
            
            <div>
              <p className="text-gray-400">Air Date: {episodeData.air_date}</p>
              <p className="text-gray-400">Rating: {episodeData.vote_average?.toFixed(1)}/10</p>
            </div>

            {episodeData.crew && episodeData.crew.length > 0 && (
              <div>
                <h3 className="text-white font-bold mb-2">Crew</h3>
                <div className="flex gap-4 flex-wrap">
                  {episodeData.crew.slice(0, 5).map((crew: any) => (
                    <div key={crew.id} className="text-center">
                      {crew.profile_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${crew.profile_path}`}
                          alt={crew.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      )}
                      <p className="text-gray-300 text-sm mt-1">{crew.name}</p>
                      <p className="text-gray-500 text-xs">{crew.job}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {episodeData.guest_stars && episodeData.guest_stars.length > 0 && (
              <div>
                <h3 className="text-white font-bold mb-2">Guest Stars</h3>
                <div className="flex gap-4 flex-wrap">
                  {episodeData.guest_stars.slice(0, 5).map((star: any) => (
                    <div key={star.id} className="text-center">
                      {star.profile_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${star.profile_path}`}
                          alt={star.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      )}
                      <p className="text-gray-300 text-sm mt-1">{star.name}</p>
                      <p className="text-gray-500 text-xs">{star.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};