export const createFormData = (file: File, signature: string, timestamp: string, publicId: string, folder: string) => {
  const formData = new FormData();
  formData.append('file', file);
  if (process.env.REACT_APP_CLOUDINARY_KEY) {
    formData.append('api_key', process.env.REACT_APP_CLOUDINARY_KEY);
  }
  formData.append('public_id', publicId);
  formData.append('folder', folder);
  formData.append('signature', signature);
  formData.append('timestamp', timestamp);

  return formData;
};
