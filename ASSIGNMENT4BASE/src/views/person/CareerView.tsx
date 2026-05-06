import { useParams } from 'react-router-dom';
import { ImageGrid } from '@/components';
import { PERSON_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';

export const CareerView = () => {
  const { id } = useParams();

  const { data: personData } = useTmdb<any>(`${PERSON_ENDPOINT}/${id}`, {}, [id]);
  const { data: creditsData } = useTmdb<any>(`${PERSON_ENDPOINT}/${id}/movie_credits`, {}, [id]);
  const { data: tvCreditsData } = useTmdb<any>(`${PERSON_ENDPOINT}/${id}/tv_credits`, {}, [id]);

  if (!personData) return <div className="text-white">Loading...</div>;

  const allCredits = [
    ...(creditsData?.cast || []).map((item: any) => ({ ...item, media_type: 'movie' })),
    ...(tvCreditsData?.cast || []).map((item: any) => ({ ...item, media_type: 'tv' })),
  ].sort((a: any, b: any) => new Date(b.release_date || b.first_air_date || 0).getTime() - new Date(a.release_date || a.first_air_date || 0).getTime());

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">{personData.name} - Career</h1>
      
      {allCredits.length > 0 ? (
        <ImageGrid images={allCredits}/>
      ) : (
        <p className="text-gray-400">No credits found.</p>
      )}
    </div>
  );
};