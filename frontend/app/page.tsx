import PredictionForm from '@/components/PredictionForm';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            AI-Powered GHG Platform
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Predict greenhouse gas emissions using machine learning based on your computing resources
          </p>
        </div>

        {/* Prediction Form */}
        <PredictionForm />

        {/* Analytics Dashboard */}
        <AnalyticsDashboard />

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gray-800 rounded-lg px-6 py-4">
            <p className="text-gray-400 text-sm">
              Powered by FastAPI backend with Linear Regression ML model
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
