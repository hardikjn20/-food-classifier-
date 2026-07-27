'use client';

import { Check, AlertCircle, RefreshCw, HelpCircle } from 'lucide-react';

const CONFIDENCE_PERCENT = {
  High: 90,
  Medium: 60,
  Low: 30,
};

export function ResultDisplay({ status, foodItem, confidence, reason, description, healthNotes, onReset }) {
  const isGood = status === 'Good';
  const isInvalid = status === 'Invalid';
  const confidencePercent = CONFIDENCE_PERCENT[confidence] ?? 50;

  return (
    <div className="animate-slide-in space-y-6">
      {/* Main Result Card */}
      <div
        className={`
          rounded-xl p-8 border-2 glass-effect
          ${
            isInvalid
              ? 'border-slate-500/50 bg-slate-500/5'
              : isGood
              ? 'border-good-500/50 bg-good-500/5'
              : 'border-bad-500/50 bg-bad-500/5'
          }
        `}
      >
        {/* Result Header */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`
              w-16 h-16 rounded-full flex items-center justify-center
              ${isInvalid ? 'bg-slate-500/20' : isGood ? 'bg-good-500/20' : 'bg-bad-500/20'}
            `}
          >
            {isInvalid ? (
              <HelpCircle className="text-slate-400" size={32} />
            ) : isGood ? (
              <Check className="text-good-500" size={32} />
            ) : (
              <AlertCircle className="text-bad-500" size={32} />
            )}
          </div>
          <div>
            <h2
              className={`
                text-3xl font-bold
                ${isInvalid ? 'text-slate-300' : isGood ? 'text-good-500' : 'text-bad-500'}
              `}
            >
              {isInvalid ? 'Not Food' : isGood ? 'Good Quality' : 'Poor Quality'}
            </h2>
            <p className="text-slate-400">
              {foodItem || (isInvalid ? 'No food detected in image' : 'Analysis complete')}
            </p>
          </div>
        </div>

        {!isInvalid && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-300 font-medium">Confidence</span>
              <span className={`text-lg font-bold ${isGood ? 'text-good-500' : 'text-bad-500'}`}>
                {confidence} ({confidencePercent}%)
              </span>
            </div>
            <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  isGood
                    ? 'bg-gradient-to-r from-good-500 to-good-600'
                    : 'bg-gradient-to-r from-bad-500 to-bad-600'
                }`}
                style={{ width: `${confidencePercent}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Reason */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
          <h3 className="text-slate-300 font-semibold mb-2">Analysis Summary</h3>
          <p className="text-slate-400">{reason}</p>
        </div>

        {/* Description */}
        {description && (
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 mt-4">
            <h3 className="text-slate-300 font-semibold mb-2">Detailed Description</h3>
            <p className="text-slate-400">{description}</p>
          </div>
        )}

        {/* Health Notes */}
        {healthNotes && !isInvalid && (
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 mt-4">
            <h3 className="text-slate-300 font-semibold mb-2">🩺 Health Insight</h3>
            <p className="text-slate-400">{healthNotes}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={onReset}
          className="
            flex items-center gap-2 px-6 py-3 rounded-lg
            bg-blue-500 hover:bg-blue-600 text-white font-semibold
            transition-colors duration-200
          "
        >
          <RefreshCw size={20} />
          Analyze Another Image
        </button>
      </div>

      {/* Disclaimer */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 text-center">
        <p className="text-xs text-slate-500">
          ⚠️ <strong>Disclaimer:</strong> This AI analysis is for reference only and should not be
          used as the sole basis for food safety decisions. Always rely on visual inspection and
          food handling standards.
        </p>
      </div>
    </div>
  );
}
