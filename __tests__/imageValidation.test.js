import {
  validateImageFile,
  IMAGE_VALIDATION,
  FileValidationSchema,
} from '@/lib/imageValidation';

describe('Image Validation Tests', () => {
  describe('validateImageFile', () => {
    it('should accept valid JPEG files', () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const result = validateImageFile(file);
      expect(result.success).toBe(true);
    });

    it('should accept valid PNG files', () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      const result = validateImageFile(file);
      expect(result.success).toBe(true);
    });

    it('should accept valid WebP files', () => {
      const file = new File(['test'], 'test.webp', { type: 'image/webp' });
      const result = validateImageFile(file);
      expect(result.success).toBe(true);
    });

    it('should reject files that are too large', () => {
      const largeContent = new Uint8Array(IMAGE_VALIDATION.MAX_FILE_SIZE + 1);
      const file = new File([largeContent], 'test.jpg', { type: 'image/jpeg' });
      const result = validateImageFile(file);
      expect(result.success).toBe(false);
      expect(result.error).toContain('exceeds');
    });

    it('should reject invalid file types', () => {
      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const result = validateImageFile(file);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid file type');
    });

    it('should reject files with wrong extensions', () => {
      const file = new File(['test'], 'test.txt', { type: 'image/jpeg' });
      const result = validateImageFile(file);
      expect(result.success).toBe(false);
    });

    it('should handle empty file names gracefully', () => {
      const file = new File(['test'], '', { type: 'image/jpeg' });
      const result = validateImageFile(file);
      expect(result.success).toBe(false);
    });
  });

  describe('FileValidationSchema', () => {
    it('should validate correct file schema', () => {
      const validData = {
        size: 5 * 1024 * 1024,
        type: 'image/jpeg',
        name: 'food.jpg',
      };
      const result = FileValidationSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject oversized files', () => {
      const invalidData = {
        size: IMAGE_VALIDATION.MAX_FILE_SIZE + 1,
        type: 'image/jpeg',
        name: 'food.jpg',
      };
      const result = FileValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject invalid MIME types', () => {
      const invalidData = {
        size: 1024,
        type: 'application/pdf',
        name: 'food.pdf',
      };
      const result = FileValidationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
