import { Lesson } from "@/utils/sidebarContent";
import React from "react";
import ReactPlayer from "react-player";

type VideoPlayerTypeProps = {
  lesson: Lesson;
};

export const VideoPlayer = ({ lesson }: VideoPlayerTypeProps) => {
  return (
    <div className="relative mb-6 aspect-video overflow-hidden rounded-lg bg-black">
      <ReactPlayer
        src={lesson.videoUrl}
        width="100%"
        height="100%"
        controls
        autoPlay={false}
        //   playing={playing}
        //   onPlay={() => setPlaying(true)}
        //   onPause={() => setPlaying(false)}
        //   onEnded={handleEnded}
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
