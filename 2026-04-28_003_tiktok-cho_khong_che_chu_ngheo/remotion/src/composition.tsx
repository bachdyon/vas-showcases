import {loadFont as loadBeVietnamPro} from "@remotion/google-fonts/BeVietnamPro";
import {AbsoluteFill, continueRender, delayRender, OffthreadVideo, staticFile} from "remotion";
import {flushSync} from "react-dom";
import {useEffect, useState} from "react";

const beViet = loadBeVietnamPro("normal", {
  weights: ["400", "700", "900"],
  subsets: ["vietnamese", "latin"],
});

const MESSAGE_LINES = [
  "Đúng là chỉ chó không chê chủ nghèo",
  "nhìn các e ngoan quá, lẽo đẽo đi sau bà♥️",
] as const;

const SAFE_BOX_WIDTH = 880;
const FONT_SIZE = 34.0;
const LINE_RADIUS = 18;
const LINE_GAP = 0;
const CHAR_WIDTH_RATIO_BY_WEIGHT: Record<string, number> = {
  "900": 0.62,
  "800": 0.58,
  "700": 0.56,
  "600": 0.54,
  "400": 0.5,
};

const fitFontSize = (
  baseFontSize: number,
  fontWeight: number | string | undefined,
  textLength: number,
) => {
  const ratio = CHAR_WIDTH_RATIO_BY_WEIGHT[String(fontWeight ?? 700)] ?? 0.55;
  const twoLineCap = Math.floor(SAFE_BOX_WIDTH / (baseFontSize * ratio)) * 2;
  if (textLength <= twoLineCap) return baseFontSize;
  return Math.max(34, Math.round(baseFontSize * Math.sqrt(twoLineCap / textLength)));
};

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
  const fontSize = fitFontSize(FONT_SIZE, 700, Math.max(...lineLengths));

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
          fontSize,
          fontWeight: 700,
          fontFamily,
          width: SAFE_BOX_WIDTH,
          maxWidth: SAFE_BOX_WIDTH,
          wordBreak: "break-word",
          overflowWrap: "anywhere",
          whiteSpace: "pre-wrap",
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
              padding: "8px 18px",
              marginBottom: index < MESSAGE_LINES.length - 1 ? LINE_GAP : 0,
              maxWidth: SAFE_BOX_WIDTH,
              wordBreak: "break-word",
              overflowWrap: "anywhere",
              whiteSpace: "pre-wrap",
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
