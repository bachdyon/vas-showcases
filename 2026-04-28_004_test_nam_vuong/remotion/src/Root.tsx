import {Composition} from "remotion";
import {MainComposition, type MainCompositionProps} from "./composition";
import templateProps from "../public/template-props.json";

const fps = 30;

const defaultProps = templateProps as MainCompositionProps;

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
