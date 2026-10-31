"use client";

import { useEffect, useRef, useState } from "react";
import { ErrorCode, FileError, useDropzone } from "react-dropzone";
import { FileText, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { MAX_PDF_SIZE_BYTES } from "@/utils/storage";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PdfViewer } from "@/components/course/PdfViewer";

type PdfDropzoneProps = {
  file: File | null;
  existingUrl: string;
  onSelect: (file: File) => void;
  onRemove: () => void;
  disabled?: boolean;
};

const MAX_PDF_SIZE_MB = Math.round(MAX_PDF_SIZE_BYTES / 1024 / 1024);
const PROGRESS_HIDE_DELAY_MS = 600;

function translateError(error: FileError): string {
  switch (error.code) {
    case ErrorCode.FileInvalidType:
      return "Dozwolone są wyłącznie pliki PDF";
    case ErrorCode.FileTooLarge:
      return `Plik jest za duży. Maksymalny rozmiar to ${MAX_PDF_SIZE_MB} MB`;
    case ErrorCode.TooManyFiles:
      return "Możesz dodać tylko jeden plik PDF";
    default:
      return error.message;
  }
}

function formatFileSize(bytes: number): string {
  const megabytes = bytes / 1024 / 1024;

  return megabytes < 1
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${megabytes.toFixed(1)} MB`;
}

export function PdfDropzone({
  file,
  existingUrl,
  onSelect,
  onRemove,
  disabled,
}: PdfDropzoneProps) {
  const [progress, setProgress] = useState<number | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(() =>
    file ? URL.createObjectURL(file) : null,
  );
  const objectUrlRef = useRef<string | null>(objectUrl);
  const readerRef = useRef<FileReader | null>(null);
  const hideProgressTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      readerRef.current?.abort();
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
      if (hideProgressTimeoutRef.current !== null) {
        window.clearTimeout(hideProgressTimeoutRef.current);
      }
    };
  }, []);

  function setPreviewFile(nextFile: File | null) {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const url = nextFile ? URL.createObjectURL(nextFile) : null;
    objectUrlRef.current = url;
    setObjectUrl(url);
  }

  function readWithProgress(selectedFile: File) {
    readerRef.current?.abort();

    const reader = new FileReader();
    readerRef.current = reader;
    setProgress(0);

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        setProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    reader.onload = () => {
      setProgress(100);
      setPreviewFile(selectedFile);
      onSelect(selectedFile);
      hideProgressTimeoutRef.current = window.setTimeout(
        () => setProgress(null),
        PROGRESS_HIDE_DELAY_MS,
      );
    };

    reader.onerror = () => {
      setProgress(null);
      toast.error("Nie udało się odczytać pliku PDF");
    };

    reader.readAsArrayBuffer(selectedFile);
  }

  const isReading = progress !== null;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    maxFiles: 1,
    maxSize: MAX_PDF_SIZE_BYTES,
    disabled: disabled || isReading,
    getErrorMessage: translateError,
    onDropAccepted: ([acceptedFile]) => readWithProgress(acceptedFile),
    onDropRejected: ([rejection]) => toast.error(rejection.errors[0].message),
  });

  const previewUrl = objectUrl ?? existingUrl;
  const hasPdf = Boolean(previewUrl);

  function handleRemove() {
    readerRef.current?.abort();
    setProgress(null);
    setPreviewFile(null);
    onRemove();
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        {...getRootProps({
          className: `flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed text-center transition-colors ${
            hasPdf ? "p-4" : "p-10"
          } ${
            isDragActive
              ? "border-brand bg-brand-subtle"
              : "border-gray-300 hover:border-gray-400"
          } ${disabled || isReading ? "pointer-events-none opacity-60" : ""}`,
        })}
      >
        <input {...getInputProps()} />
        <UploadCloud className="h-6 w-6 text-gray-500" />
        <p className="text-sm font-medium text-gray-700">
          {isDragActive
            ? "Upuść plik tutaj"
            : hasPdf
              ? "Przeciągnij nowy plik PDF lub kliknij, aby zmienić"
              : "Przeciągnij plik PDF lub kliknij, aby wybrać"}
        </p>
        <p className="text-xs text-gray-500">
          Tylko pliki .pdf, maksymalnie {MAX_PDF_SIZE_MB} MB
        </p>
      </div>

      {isReading && (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Wczytywanie pliku...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
      )}

      {hasPdf && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 p-3">
          <div className="flex min-w-0 items-center gap-2">
            <FileText className="h-4 w-4 shrink-0 text-red-600" />
            <span className="truncate text-sm text-gray-700">
              {file ? file.name : "Obecny plik PDF"}
            </span>
            {file && (
              <span className="shrink-0 text-xs text-gray-500">
                {formatFileSize(file.size)}
              </span>
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="shrink-0 cursor-pointer"
            onClick={handleRemove}
            disabled={disabled}
          >
            <Trash2 className="h-4 w-4" />
            Usuń
          </Button>
        </div>
      )}

      {hasPdf && (
        <PdfViewer
          lesson={{ pdf_url: previewUrl, title: file?.name ?? "Podgląd" }}
        />
      )}
    </div>
  );
}
