import { Lesson } from "@/utils/types";

type PdfViewerTypeProps = {
  lesson: Lesson;
};

export const PdfViewer = ({ lesson }: PdfViewerTypeProps) => {
  return (
    <div className="relative mb-6 h-[80vh] w-full max-w-350 overflow-hidden rounded-lg bg-black">
      <iframe
        // toolbar=0 hides the browser's built-in download/print/menu controls
        src={`${lesson.pdf_url}#toolbar=0`}
        title={lesson.title}
        className="h-full w-full"
      />
    </div>
  );
};
