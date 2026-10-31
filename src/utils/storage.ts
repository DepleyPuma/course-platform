export const LESSONS_MATERIALS_BUCKET = "lessons_materials";
export const MAX_PDF_SIZE_BYTES = 50 * 1024 * 1024;

export function sanitizeFileName(fileName: string): string {
  return (
    fileName
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-zA-Z0-9._-]/g, "-")
  );
}

export function getStoragePathFromPublicUrl(url: string): string | null {
  const marker = `/${LESSONS_MATERIALS_BUCKET}/`;
  const markerIndex = url.indexOf(marker);

  if (markerIndex === -1) return null;

  const path = url.slice(markerIndex + marker.length).split("?")[0];

  return path ? decodeURIComponent(path) : null;
}
