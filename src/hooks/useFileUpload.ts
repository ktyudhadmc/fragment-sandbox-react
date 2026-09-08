import { useCallback, useEffect, useState } from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";

export interface FileState {
  preview: string;
  file: File;
  name: string;
}

/**
 * Wraps `react-dropzone` (optional peer dependency) for the common
 * single-file-with-preview case used by <Dropzone>. Pass any DropzoneOptions
 * through to customize accepted types, multiple files, etc.
 */
export function useFileUpload(options?: DropzoneOptions) {
  const [file, setFile] = useState<FileState | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (file?.preview) URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  const onRemove = useCallback(() => {
    if (file?.preview) URL.revokeObjectURL(file.preview);
    setFile(null);
  }, [file]);

  const { getInputProps, getRootProps, isDragActive, open, ...dropzoneVars } = useDropzone({
    maxFiles: 1,
    noClick: true,
    onDrop: (acceptedFiles: File[]) => {
      const next = acceptedFiles[0];
      if (!next) return;
      setFile({ preview: URL.createObjectURL(next), file: next, name: next.name });
    },
    onError: (err) => setError(err.message),
    ...options,
  });

  const openPreview = () => {
    if (file?.preview) window.open(file.preview, "_blank");
  };

  return {
    getInputProps,
    getRootProps,
    isDragActive,
    open,
    file,
    error,
    onRemove,
    openPreview,
    dropzoneVars,
  };
}
