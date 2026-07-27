import { NextResponse } from 'next/server';
import { analyzeFoodImage, isApiKeyConfigured } from '@/lib/aiService';
import { validateImageFile, validateImageMagicNumbers } from '@/lib/imageValidation';
import { API_STATUS, ERROR_MESSAGES } from '@/lib/constants';

export const runtime = 'nodejs';

/**
 * POST /api/analyze - Analyzes an uploaded food image
 */
export async function POST(request) {
  try {
    // Check if API key is configured
    if (!isApiKeyConfigured()) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.API_KEY_MISSING },
        { status: API_STATUS.SERVER_ERROR }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NO_FILE },
        { status: API_STATUS.BAD_REQUEST }
      );
    }

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error || ERROR_MESSAGES.INVALID_FILE },
        { status: API_STATUS.BAD_REQUEST }
      );
    }

    // Validate magic numbers
    const magicNumberValidation = await validateImageMagicNumbers(file);
    if (!magicNumberValidation.success) {
      return NextResponse.json(
        { error: magicNumberValidation.error || ERROR_MESSAGES.INVALID_FILE },
        { status: API_STATUS.BAD_REQUEST }
      );
    }

    // Convert file to base64
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    // Analyze image with AI
    const result = await analyzeFoodImage(base64, file.type);

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: API_STATUS.SUCCESS }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : ERROR_MESSAGES.ANALYSIS_FAILED,
      },
      { status: API_STATUS.SERVER_ERROR }
    );
  }
}

/**
 * OPTIONS /api/analyze - CORS support
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
