import { Lesson } from "@/utils/types";
import React from "react";
import ReactPlayer from "react-player";

type VideoPlayerTypeProps = {
  lesson: Lesson;
};

export const VideoPlayer = ({ lesson }: VideoPlayerTypeProps) => {
  return (
    // max-w-250 when sidebar is open
    // max-w-350 when sidebar isn't open
    <div className="relative mb-6 aspect-video w-full max-w-350 overflow-hidden rounded-lg bg-black">
      <ReactPlayer
        src={lesson.video_url}
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
