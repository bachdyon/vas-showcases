import {Composition} from "remotion";
import {MainComposition, type MainCompositionProps} from "./composition_simple";

const fps = 30;
const durationInFrames = 490;

const defaultProps: MainCompositionProps = {
  textTopPercent: 25,
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
