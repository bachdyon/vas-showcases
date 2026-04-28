import {Composition} from "remotion";
import {MainComposition, type MainCompositionProps} from "./composition";

const fps = 30;
/** Intro khớp voice sau pydub 1.12×; source 512f ≈ 17.067s như render_plan */
const introDurationFrames = 359;
const sourceDurationFrames = 512;

const defaultProps: MainCompositionProps = {
  introDurationFrames,
  sourceDurationFrames,
  sourceVideo: "assets/source.mp4",
  introVoice: "assets/voice.wav",
  mainHeadline:
    "Cô gái quay lại hành trình shopping, nhưng chủ quán này lạ lắm. Đã không cho vào, lại còn bóc phốt chuyện lần trước.",
  // Khớp source/render_plan.toml → [intro_chrome] video_credit
  videoCredit: "VIDEO: THANH TUNG TANG",
};

export const RemotionRoot: React.FC = () => {
  const durationInFrames =
    defaultProps.introDurationFrames + defaultProps.sourceDurationFrames;

  return (
    <Composition
      id="MainVideo"
      component={MainComposition}
      durationInFrames={durationInFrames}
      fps={fps}
      width={1080}
      height={1920}
      defaultProps={defaultProps}
    />
  );
};
