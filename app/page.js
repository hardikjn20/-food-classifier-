'use client';

import { useState } from 'react';
import { ImageUploader } from '@/components/ImageUploader';
import { LoadingState } from '@/components/LoadingState';
import { ResultDisplay } from '@/components/ResultDisplay';
import { Utensils } from 'lucide-react';

export default function Home() {
  const [state, setState] = useState('upload');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Handles image selection and starts analysis
   */
  const handleImageSelect = async (file) => {
    setState('analyzing');
    setProgress(0);
    setError(null);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 30;
      });
    }, 500);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('image', file);

      // Send to API
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze image');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Analysis failed');
      }

      // Delay to show 100% progress
      await new Promise((resolve) => setTimeout(resolve, 500));

      setResult(data.data);
      setState('result');
    } catch (err) {
      clearInterval(progressInterval);
      const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMsg);
      setState('error');
    }
  };

  /**
   * Resets to upload state
   */
  const handleReset = () => {
    setState('upload');
    setProgress(0);
    setResult(null);
    setError(null);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl">
              <Utensils className="text-white" size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              Food Quality Classifier
            </h1>
          </div>
          <p className="text-slate-400 text-lg">
            AI-powered analysis of food freshness and quality in seconds
          </p>
        </div>

        {/* Main Content */}
        <div className="glass-effect rounded-2xl p-8 md:p-12 border border-slate-700/50">
          {state === 'upload' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-white mb-2">Upload a Food Image</h2>
                <p className="text-slate-400">
                  Select or drag and drop an image of your food item
                </p>
              </div>
              <ImageUploader onImageSelect={handleImageSelect} isLoading={false} disabled={false} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-700/50">
                <FeatureItem icon="🖼️" title="Multiple Formats" desc="JPEG, PNG, WebP" />
                <FeatureItem icon="⚡" title="Fast Analysis" desc="Results in seconds" />
                <FeatureItem icon="🔒" title="Secure" desc="No data stored" />
              </div>
            </div>
          )}

          {state === 'analyzing' && <LoadingState progress={progress} />}

          {state === 'result' && result && (
            <ResultDisplay
              status={result.status}
              foodItem={result.food_item}
              confidence={result.confidence}
              reason={result.reason}
              description={result.description}
              healthNotes={result.health_notes}
              onReset={handleReset}
            />
          )}

          {state === 'error' && error && (
            <div className="space-y-6 animate-slide-in">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <h2 className="text-red-400 font-bold text-xl mb-2">Analysis Failed</h2>
                <p className="text-red-300 mb-4">{error}</p>
                <p className="text-red-200/70 text-sm">
                  Please ensure the file is a valid image and try again.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
              >
                Try Another Image
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>
            Powered by <span className="text-slate-400 font-semibold">OpenRouter AI</span>
          </p>
          <p className="mt-2">© 2026 Food Quality Classifier. All rights reserved.</p>
        </div>
      </div>
    </main>
  );
}

/**
 * FeatureItem Component
 */
function FeatureItem({ icon, title, desc }) {
  return (
    <div className="text-center">
      <p className="text-3xl mb-2">{icon}</p>
      <h3 className="text-white font-semibold mb-1">{title}</h3>
      <p className="text-slate-400 text-sm">{desc}</p>
    </div>
  );
}
