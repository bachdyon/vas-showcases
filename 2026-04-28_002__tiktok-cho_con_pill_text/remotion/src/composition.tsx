import {loadFont as loadBeVietnamPro} from "@remotion/google-fonts/BeVietnamPro";
import {AbsoluteFill, continueRender, delayRender, OffthreadVideo, staticFile} from "remotion";
import {flushSync} from "react-dom";
import {useEffect, useState} from "react";

const beViet = loadBeVietnamPro("normal", {
  weights: ["400", "700", "900"],
  subsets: ["vietnamese", "latin"],
});

const MESSAGE_LINES = [
  "Chân em run run, ánh mắt buồn",
  "như đang cầu cứu.",
  "Thương em quá, tình cảm như con người 🐾",
] as const;

const FONT_SIZE = 31.0;
const LINE_RADIUS = 16;
const LINE_GAP = 0;

const getLineRadius = (lengths: number[], index: number): string => {
  const current = lengths[index];
  const prev = index > 0 ? lengths[index - 1] : Number.NEGATIVE_INFINITY;
  const next = index < lengths.length - 1 ? lengths[index + 1] : Number.NEGATIVE_INFINITY;
  const isFirst = index === 0;
  const isLast = index === lengths.length - 1;

  if (current > prev && current > next) {
    return `${LINE_RADIUS}px`;
  }

  if (!isFirst && !isLast && current < prev && current < next) {
    return "0px";
  }

  if (isFirst) {
    return `${LINE_RADIUS}px ${LINE_RADIUS}px 0px 0px`;
  }

  if (isLast) {
    return `0px 0px ${LINE_RADIUS}px ${LINE_RADIUS}px`;
  }

  return "0px";
};

export type MainCompositionProps = {
  textTopPercent: number;
  textTiltDeg: number;
  textRightOffsetPercent: number;
  sourceVideo: string;
};

const TextLayer: React.FC<{
  textTopPercent: number;
  textTiltDeg: number;
  textRightOffsetPercent: number;
  fontFamily: string;
}> = ({textTopPercent, textTiltDeg, textRightOffsetPercent, fontFamily}) => {
  const lineLengths = MESSAGE_LINES.map((line) => line.trim().length);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: `${textTopPercent}%`,
          transform: `translateX(calc(-50% + ${textRightOffsetPercent}%)) rotate(${textTiltDeg}deg)`,
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          lineHeight: 1.12,
          fontSize: FONT_SIZE,
          fontWeight: 700,
          fontFamily,
          whiteSpace: "pre",
        }}
      >
        {MESSAGE_LINES.map((line, index) => (
          <div
            key={`${line}-${index}`}
            style={{
              display: "inline-block",
              color: "#FFFFFF",
              backgroundColor: "#000000",
              borderRadius: getLineRadius(lineLengths, index),
              padding: "4px 10px",
              marginBottom: index < MESSAGE_LINES.length - 1 ? LINE_GAP : 0,
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const MainComposition: React.FC<MainCompositionProps> = ({
  textTopPercent,
  textTiltDeg,
  textRightOffsetPercent,
  sourceVideo,
}) => {
  const [handle] = useState(() => delayRender("fonts"));
  const [fontFamily, setFontFamily] = useState(beViet.fontFamily);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        await beViet.waitUntilDone();
        if (!cancelled) {
          flushSync(() => {
            setFontFamily(beViet.fontFamily);
          });
          continueRender(handle);
        }
      } catch {
        if (!cancelled) continueRender(handle);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [handle]);

  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile(sourceVideo)}
        style={{width: "100%", height: "100%", objectFit: "cover"}}
      />
      <TextLayer
        textTopPercent={textTopPercent}
        textTiltDeg={textTiltDeg}
        textRightOffsetPercent={textRightOffsetPercent}
        fontFamily={fontFamily}
      />
    </AbsoluteFill>
  );
};
