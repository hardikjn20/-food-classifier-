// API Response Status Codes
export const API_STATUS = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,
};

// Error Messages
export const ERROR_MESSAGES = {
  NO_FILE: 'No file provided',
  INVALID_FILE: 'Invalid file format',
  FILE_TOO_LARGE: 'File size exceeds limit',
  API_KEY_MISSING: 'API key not configured',
  ANALYSIS_FAILED: 'Failed to analyze image',
  INVALID_RESPONSE: 'Invalid AI response',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  ANALYSIS_COMPLETE: 'Image analysis completed',
  FILE_VALIDATED: 'File validation successful',
};

// UI Labels and Placeholders
export const UI_LABELS = {
  UPLOAD_TITLE: 'Food Quality Classifier',
  UPLOAD_SUBTITLE: 'Upload a food image to analyze its quality',
  DROP_ZONE_TEXT: 'Drag and drop your image here, or click to select',
  ANALYZING: 'Analyzing your food image...',
  GOOD_RESULT: 'Good Quality',
  BAD_RESULT: 'Poor Quality',
  CONFIDENCE: 'Confidence',
  RESET: 'Upload Another Image',
};

// Image constraints
export const IMAGE_CONSTRAINTS = {
  MAX_SIZE_MB: 5,
  SUPPORTED_FORMATS: 'JPEG, PNG, WebP',
};
