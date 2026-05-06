import { Button } from '@/components';
import { useNavigate } from 'react-router-dom';

export const ErrorView = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">What do you mean it's not working?</h1>
      <p className="text-gray-500">mind you at some point I lost all my data but thats not an</p>
      <Button onClick={() => navigate(-1)}>Back</Button>
    </main>
  );
};
