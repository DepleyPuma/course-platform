import { Lesson } from "@/utils/types";
import React from "react";
import ReactPlayer from "react-player";

type VideoPlayerTypeProps = {
  lesson: Pick<Lesson, "video_url" | "title">;
};

export const VideoPlayer = ({ lesson }: VideoPlayerTypeProps) => {
  return (
    <div className="relative mb-6 aspect-video w-full max-w-350 overflow-hidden rounded-lg bg-black">
      <ReactPlayer
        src={lesson.video_url}
        width="100%"
        height="100%"
        controls
        autoPlay={false}
        config={{
          youtube: {
            rel: 0,
            iv_load_policy: 3,
          },
        }}
      />
    </div>
  );
};
