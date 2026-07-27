'use client';

import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { validateImageFile, validateImageMagicNumbers, IMAGE_VALIDATION } from '@/lib/imageValidation';

export function ImageUploader({ onImageSelect, isLoading = false, disabled = false }) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleFile = async (file) => {
    setError(null);

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.success) {
      setError(validation.error || 'Invalid file');
      return;
    }

    // Validate magic numbers
    const magicValidation = await validateImageMagicNumbers(file);
    if (!magicValidation.success) {
      setError(magicValidation.error || 'File is not a valid image');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result);
      onImageSelect(file);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const clearPreview = () => {
    setPreview(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      {preview ? (
        <div className="space-y-4 animate-slide-in">
          {/* Image Preview */}
          <div className="relative rounded-xl overflow-hidden border border-slate-700 glass-effect p-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-auto max-h-96 object-contain rounded-lg"
            />
            <button
              onClick={clearPreview}
              disabled={isLoading || disabled}
              className="absolute top-6 right-6 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>

          {/* File Info */}
          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
            <p className="text-sm text-slate-300">
              <strong>File Format:</strong> {preview.split(';')[0].split('/')[1]?.toUpperCase() || 'Image'}
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Max size: {IMAGE_VALIDATION.MAX_FILE_SIZE / (1024 * 1024)}MB
            </p>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
          className={`
            relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
            transition-all duration-200 glass-effect
            ${dragActive ? 'border-blue-400 bg-blue-400/10 scale-105' : 'border-slate-600 hover:border-slate-500'}
            ${isLoading || disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            disabled={isLoading || disabled}
            aria-label="Upload food image"
          />

          <Upload className="mx-auto mb-4 text-blue-400" size={48} />
          <h3 className="text-xl font-semibold text-white mb-2">
            {dragActive ? 'Drop your image here' : 'Drag & Drop or Click to Upload'}
          </h3>
          <p className="text-slate-400 mb-4">Supported formats: JPEG, PNG, WebP</p>
          <p className="text-xs text-slate-500">
            Maximum file size: {IMAGE_VALIDATION.MAX_FILE_SIZE / (1024 * 1024)}MB
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg animate-slide-in">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
