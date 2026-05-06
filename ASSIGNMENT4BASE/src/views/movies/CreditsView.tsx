import { ImageGrid } from '@/components';
import { IMAGE_BASE_URL, MOVIE_ENDPOINT, type CreditsResponse, type ImageCell } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const CreditsView = () => {
  const { id } = useParams();
  const { data } = useTmdb<CreditsResponse>(`${MOVIE_ENDPOINT}/${id}/credits`, {}, []);

  const gridData: ImageCell[] = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imageUrl: `${IMAGE_BASE_URL}${result.profile_path}`,
    primaryText: result.name,
    secondaryText: result.character,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="text-2xl font-bold mb-6">Credits</h2>
      {data.cast.length ? <ImageGrid images={gridData} /> : <p className="text-gray-400 text-center">No credits available.</p>}
    </section>
  );
};
