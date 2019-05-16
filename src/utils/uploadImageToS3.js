import uploadFile from 'src/utils/uploadFile';

export default async (fileFromPicker, setLoading, ownedBy) => {
  setLoading(true);
  const fileRes = await uploadFile(fileFromPicker, ownedBy);

  if (!fileRes.ok) {
    // T_TODO show error
    setLoading(false);
    return;
  }

  const file = fileRes.file;

  return file;
};
