import { Lock, ArrowLeft, Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-bg-primary px-6">
      <div className="w-full max-w-2xl space-y-8 text-center">
        <div className="space-y-4">
          <Lock className="mx-auto h-24 w-24 text-primary" />

          <h1 className="text-6xl font-bold text-text-primary">403</h1>

          <h2 className="text-2xl font-semibold text-text-hard">
            Unauthorized Access
          </h2>

          <p className="mx-auto max-w-md text-lg text-text-secondary">
            You do not have permission to view this page. Please contact the
            administrator if you believe this is an error.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 rounded-lg border border-border-muted bg-white px-6 py-3 text-text-hard transition-colors duration-200 hover:bg-bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>

          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-white transition-colors duration-200 hover:bg-opacity-90"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
