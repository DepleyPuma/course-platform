import { createClient } from "@/lib/supabase/client";
import { LESSONS_MATERIALS_BUCKET, sanitizeFileName } from "@/utils/storage";
import { ActionResult } from "@/utils/types";

type UploadedPdf = {
  publicUrl: string;
  path: string;
};

export async function uploadLessonPdf(
  file: File,
  moduleId: string,
): Promise<ActionResult<UploadedPdf>> {
  const supabase = createClient();
  const path = `${moduleId}/${crypto.randomUUID()}-${sanitizeFileName(file.name)}`;

  const { error } = await supabase.storage
    .from(LESSONS_MATERIALS_BUCKET)
    .upload(path, file, { upsert: false, contentType: "application/pdf" });

  if (error) {
    return {
      success: false,
      error: `Nie udało się przesłać pliku PDF: ${error.message}`,
    };
  }

  const { data } = supabase.storage
    .from(LESSONS_MATERIALS_BUCKET)
    .getPublicUrl(path);

  return { success: true, data: { publicUrl: data.publicUrl, path } };
}
