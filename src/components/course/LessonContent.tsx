import { Lesson } from "@/utils/types";
import { VideoPlayer } from "@/components/course/VideoPlayer";
import { PdfViewer } from "@/components/course/PdfViewer";
import { TextLesson } from "@/components/course/TextLesson";
import Page404 from "@/app/not-found";

type LessonContentProps = {
  lesson: Lesson;
};

export const LessonContent = ({ lesson }: LessonContentProps) => {
  let content: React.ReactNode;

  switch (lesson.type) {
    case "video":
      content = <VideoPlayer lesson={lesson} />;
      break;
    case "pdf":
      content = <PdfViewer lesson={lesson} />;
      break;
    case "text":
      content = <TextLesson lesson={lesson} />;
      break;
    default:
      content = <Page404 />;
      break;
  }

  return <div className="relative flex w-full justify-center">{content}</div>;
};
