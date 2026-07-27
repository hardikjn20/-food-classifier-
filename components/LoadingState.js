'use client';

import { Zap } from 'lucide-react';

export function LoadingState({ progress = 50 }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-slide-in">
      <div className="relative mb-8">
        {/* Outer rotating ring */}
        <div className="w-24 h-24 rounded-full border-4 border-slate-600 border-t-blue-400 animate-spin"></div>

        {/* Inner pulsing circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 animate-pulse"></div>
        </div>

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap className="text-yellow-300 animate-pulse" size={32} />
        </div>
      </div>

      {/* Loading Text */}
      <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Image</h2>
      <p className="text-slate-400 mb-6">AI is examining your food image...</p>

      {/* Progress Bar */}
      <div className="w-64 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Progress Text */}
      <p className="text-slate-500 text-sm mt-4">{Math.round(progress)}% complete</p>

      {/* Tips */}
      <div className="mt-8 text-center text-slate-400 text-sm max-w-md">
        <p>
          💡 <strong>Tip:</strong> For best results, ensure the food image is well-lit and clearly
          visible.
        </p>
      </div>
    </div>
  );
}
