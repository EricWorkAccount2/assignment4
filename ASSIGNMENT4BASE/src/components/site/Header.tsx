import { LinkGroup } from '@/components';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-900 text-white border-b border-gray-700">
      <div className="max-w-7xl mx-auto p-5 space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold">TMDB Explorer</h1>
            <LinkGroup
              options={[
                { label: "What's in the fridge", to: '/now-playing' },
                { label: 'Am I Famous Yet?', to: '/trending?interval=day' },
                { label: 'Genres', to: '/genre' },
                { label: 'No Cable?', to: '/tv' },
                { label: "I forgot the name", to: '/search' },
              ]}
            />
          </div>
          <div className="flex items-center">
            <button onClick={() => navigate('/favorites')} className="relative p-2 rounded-full hover:bg-gray-700 transition">
            </button>
            <button onClick={() => navigate('/settings')} className="relative p-2 rounded-full hover:bg-gray-700 transition">
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
