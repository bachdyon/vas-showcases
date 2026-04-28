import {Composition} from "remotion";
import {MainComposition, type MainCompositionProps} from "./composition";

const fps = 30;
const durationInFrames = 629;

const defaultProps: MainCompositionProps = {
  textTopPercent: 67.0,
  textTiltDeg: 0,
  textRightOffsetPercent: 0,
  sourceVideo: "assets/source.mp4",
};

export const RemotionRoot: React.FC = () => {
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
