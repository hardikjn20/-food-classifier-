import { z } from 'zod';

// Constants for image validation - PRODUCTION STRICT LIMITS
export const IMAGE_VALIDATION = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB STRICT LIMIT
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
  MIN_DIMENSIONS: { width: 100, height: 100 },
  MAX_DIMENSIONS: { width: 4000, height: 4000 },
};

// Zod schema for file validation
export const FileValidationSchema = z.object({
  size: z
    .number()
    .max(
      IMAGE_VALIDATION.MAX_FILE_SIZE,
      `File size must be less than ${IMAGE_VALIDATION.MAX_FILE_SIZE / (1024 * 1024)}MB`
    ),
  type: z.enum(IMAGE_VALIDATION.ALLOWED_TYPES, {
    errorMap: () => ({ message: 'Invalid file type. Allowed: JPEG, PNG, WebP' }),
  }),
  name: z.string().min(1, 'File name is required'),
});

/**
 * Validates image file before processing
 * @param {File} file - File to validate
 * @returns {{ success: boolean, error?: string }}
 */
export function validateImageFile(file) {
  try {
    // Check file size
    if (file.size > IMAGE_VALIDATION.MAX_FILE_SIZE) {
      return {
        success: false,
        error: `File size exceeds ${IMAGE_VALIDATION.MAX_FILE_SIZE / (1024 * 1024)}MB limit`,
      };
    }

    // Check file type
    if (!IMAGE_VALIDATION.ALLOWED_TYPES.includes(file.type)) {
      return {
        success: false,
        error: `Invalid file type. Allowed types: ${IMAGE_VALIDATION.ALLOWED_EXTENSIONS.join(', ')}`,
      };
    }

    // Check file extension
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!IMAGE_VALIDATION.ALLOWED_EXTENSIONS.includes(extension)) {
      return {
        success: false,
        error: `Invalid file extension. Allowed: ${IMAGE_VALIDATION.ALLOWED_EXTENSIONS.join(', ')}`,
      };
    }

    // Validate with Zod
    FileValidationSchema.parse({
      size: file.size,
      type: file.type,
      name: file.name,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: 'Unknown validation error' };
  }
}

/**
 * Checks if file is a valid image by reading first few bytes (magic numbers)
 * @param {File} file - File to check
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function validateImageMagicNumbers(file) {
  try {
    const buffer = await file.slice(0, 12).arrayBuffer();
    const bytes = new Uint8Array(buffer);

    // Check PNG magic number
    if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
      return { success: true };
    }

    // Check JPEG magic number
    if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
      return { success: true };
    }

    // Check WebP magic number
    if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) {
      return { success: true };
    }

    return { success: false, error: 'File is not a valid image' };
  } catch (error) {
    return { success: false, error: 'Error validating image file' };
  }
}
