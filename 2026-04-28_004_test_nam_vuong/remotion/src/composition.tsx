import {loadFont as loadBebasNeue} from "@remotion/google-fonts/BebasNeue";
import {loadFont as loadBeVietnamPro} from "@remotion/google-fonts/BeVietnamPro";
import {
  AbsoluteFill,
  Audio,
  continueRender,
  delayRender,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {flushSync} from "react-dom";
import {useEffect, useState} from "react";

/** Thử lần lượt sau sync-fonts (tên file trên đĩa có thể có dấu cách hoặc gạch) */
const UTM_BEBAS_STATIC_CANDIDATES = ["fonts/UTM Bebas.ttf", "fonts/UTM-Bebas.ttf"] as const;
/** Tên family đăng ký FontFace + dùng trong CSS (không nhất thiết trùng chữ HOA trong preview hệ thống) */
const UTM_BEBAS_FAMILY = "UTM Bebas";
/** Token hợp lệ cho `font-family` vì có dấu cách */
const UTM_BEBAS_CSS = `"${UTM_BEBAS_FAMILY}"`;

async function loadUtmBebasFontFamily(fallbackSans: string): Promise<string> {
  let lastErr: unknown;
  for (const rel of UTM_BEBAS_STATIC_CANDIDATES) {
    try {
      const face = new FontFace(UTM_BEBAS_FAMILY, `url(${staticFile(rel)})`, {
        weight: "400",
        style: "normal",
      });
      await face.load();
      document.fonts.add(face);
      return UTM_BEBAS_CSS;
    } catch (err) {
      lastErr = err;
    }
  }
  console.warn(
    `[Intro] Không load được UTM Bebas (${UTM_BEBAS_STATIC_CANDIDATES.join(" | ")}) — dùng Bebas Neue. Đặt file trong fonts/ rồi npm run sync-fonts.`,
    lastErr,
  );
  return fallbackSans;
}

const bebas = loadBebasNeue("normal", {
  weights: ["400"],
  subsets: ["latin", "latin-ext"],
});

const beViet = loadBeVietnamPro("normal", {
  weights: ["400", "700", "900"],
  subsets: ["vietnamese", "latin"],
});

/** Chiều cao hình chữ nhật overlay (full width, neo đáy frame) */
const OVERLAY_HEIGHT_PCT = 46;
/** Phần trên của hình chỉ dùng gradient tiếp giáp video (% chiều cao overlay) */
const OVERLAY_GRADIENT_JUNCTION_PCT = 11;
/** Nền đặc panel (kèm opacity ~0.9) */
const OVERLAY_SOLID = "rgba(4, 102, 89, 0.9)";

/** Khoảng cách tối thiểu text / logo so với viền canvas (px) */
const CANVAS_EDGE_MARGIN = 100;
const SAFE_HEADLINE_WIDTH = 880;

const fitFontSize = (
  baseFontSize: number,
  text: string,
  fontWeight: number | string | undefined,
) => {
  const ratioByWeight: Record<string, number> = {
    "900": 0.62,
    "800": 0.58,
    "700": 0.56,
    "600": 0.54,
    "400": 0.5,
  };
  const ratio = ratioByWeight[String(fontWeight ?? 400)] ?? 0.55;
  const targetLineCapacity = Math.floor(SAFE_HEADLINE_WIDTH / (baseFontSize * ratio)) * 4;
  if (text.length <= targetLineCapacity) {
    return baseFontSize;
  }
  return Math.max(40, Math.round(baseFontSize * Math.sqrt(targetLineCapacity / text.length)));
};

export type MainCompositionProps = {
  introDurationFrames: number;
  sourceDurationFrames: number;
  sourceVideo: string;
  introVoice: string;
  mainHeadline: string;
  /** Khớp render_plan [intro_chrome] video_credit — trước đây hardcode trong IntroLayer */
  videoCredit: string;
  dateStamp: string;
  brandNumber: string;
  brandLabel: string;
  logoPath: string;
  overlayColor: string;
  textColor: string;
  headlineFontScale: number;
  introObjectPosition: string;
  introTransform: string;
  sourceObjectPosition: string;
};

const IntroLayer: React.FC<{
  sourceVideo: string;
  mainHeadline: string;
  videoCredit: string;
  dateStamp: string;
  brandNumber: string;
  brandLabel: string;
  logoPath: string;
  overlayColor: string;
  textColor: string;
  headlineFontScale: number;
  introObjectPosition: string;
  introTransform: string;
  mainTitleFontFamily: string;
}> = ({
  sourceVideo,
  mainHeadline,
  videoCredit,
  dateStamp,
  brandNumber,
  brandLabel,
  logoPath,
  overlayColor,
  textColor,
  headlineFontScale,
  introObjectPosition,
  introTransform,
  mainTitleFontFamily,
}) => {
  const frame = useCurrentFrame();
  const headlineFontSize = fitFontSize(57.6 * headlineFontScale, mainHeadline, 400);
  const titleY = interpolate(frame, [0, 14], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{isolation: "isolate"}}>
      {/* z=0: video full frame */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <OffthreadVideo
          src={staticFile(sourceVideo)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: introObjectPosition,
            transform: introTransform,
            filter: "brightness(0.9) saturate(0.95)",
          }}
          muted
        />
      </div>

      {/* z=2: hình chữ nhật — chỉ mép trên gradient tiếp giáp video; phần còn lại nền đặc ~90% */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: `${OVERLAY_HEIGHT_PCT}%`,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            flex: "0 0 auto",
            height: `${OVERLAY_GRADIENT_JUNCTION_PCT}%`,
            minHeight: 0,
            background: `linear-gradient(
              to bottom,
              rgba(4, 102, 89, 0) 0%,
              rgba(4, 102, 89, 0.35) 55%,
              ${overlayColor || OVERLAY_SOLID} 100%
            )`,
          }}
        />
        <div
          style={{
            flex: 1,
            minHeight: 0,
            backgroundColor: overlayColor || OVERLAY_SOLID,
          }}
        />

        {/* Neo theo TOP hình chữ nhật; margin tối thiểu so viền canvas */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            paddingLeft: CANVAS_EDGE_MARGIN,
            paddingRight: CANVAS_EDGE_MARGIN,
            paddingTop: CANVAS_EDGE_MARGIN,
            paddingBottom: CANVAS_EDGE_MARGIN,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: 12,
            boxSizing: "border-box",
          }}
        >
          {logoPath ? (
            <div
              style={{
                width: 260,
                height: 92,
                backgroundColor: "#ffffff",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 18px",
                boxSizing: "border-box",
                boxShadow: "0 6px 20px rgba(0,0,0,0.24)",
              }}
            >
              <Img
                src={staticFile(logoPath)}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          ) : (
            <div style={{display: "flex", alignItems: "baseline", gap: 15}}>
              <span
                style={{
                  fontFamily: `${bebas.fontFamily}, sans-serif`,
                  fontSize: 132,
                  lineHeight: 0.9,
                  fontWeight: 400,
                  color: textColor,
                  textShadow: "0 4px 18px rgba(0,0,0,0.8)",
                }}
              >
                {brandNumber}
              </span>
              <span
                style={{
                  fontFamily: `${bebas.fontFamily}, sans-serif`,
                  fontSize: 66,
                  lineHeight: 1.05,
                  fontWeight: 400,
                  color: textColor,
                  textShadow: "0 4px 14px rgba(0,0,0,0.8)",
                }}
              >
                {brandLabel}
              </span>
            </div>
          )}

          <div
            style={{
              fontFamily: beViet.fontFamily,
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: 24,
              color: textColor,
              letterSpacing: 0.3,
              textShadow:
                "0 0 3px rgba(0,0,0,0.85), 0 2px 10px rgba(0,0,0,0.65)",
            }}
          >
            NGÀY ĐĂNG: {dateStamp}
          </div>

          <div
            style={{
              maxWidth: "100%",
              marginTop: 40,
              transform: `translateY(${titleY}px)`,
              opacity: titleOpacity,
            }}
          >
            <div
              style={{
                fontFamily: `${mainTitleFontFamily}, ${beViet.fontFamily}, sans-serif`,
                fontWeight: 400,
                fontSize: headlineFontSize,
                lineHeight: 1.2,
                color: textColor,
                maxWidth: SAFE_HEADLINE_WIDTH,
                wordBreak: "break-word",
                overflowWrap: "anywhere",
                whiteSpace: "pre-wrap",
                textShadow:
                  "0 0 1px rgba(0,0,0,0.95), 0 2px 11px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,0.9)",
              }}
            >
              {mainHeadline}
            </div>
          </div>
        </div>
      </div>

      {/* Credit góc trên canvas — tách khỏi panel đáy; nội dung từ props (khớp render_plan) */}
      <AbsoluteFill style={{zIndex: 10, pointerEvents: "none"}}>
        <div
          style={{
            position: "absolute",
            top: CANVAS_EDGE_MARGIN,
            left: CANVAS_EDGE_MARGIN,
            maxWidth: `calc(100% - ${CANVAS_EDGE_MARGIN * 2}px)`,
            fontFamily: beViet.fontFamily,
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: 0.5,
            color: textColor,
            textShadow:
              "0 0 4px rgba(0,0,0,0.9), 0 2px 12px rgba(0,0,0,0.75), 0 1px 3px rgba(0,0,0,0.95)",
          }}
        >
          {videoCredit}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const MainComposition: React.FC<MainCompositionProps> = ({
  introDurationFrames,
  sourceDurationFrames,
  sourceVideo,
  introVoice,
  mainHeadline,
  videoCredit,
  dateStamp,
  brandNumber,
  brandLabel,
  logoPath,
  overlayColor,
  textColor,
  headlineFontScale,
  introObjectPosition,
  introTransform,
  sourceObjectPosition,
}) => {
  const [handle] = useState(() => delayRender("fonts"));
  const [mainTitleFontFamily, setMainTitleFontFamily] = useState(bebas.fontFamily);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        await Promise.all([beViet.waitUntilDone(), bebas.waitUntilDone()]);
        const titleFam = await loadUtmBebasFontFamily(bebas.fontFamily);
        if (!cancelled) {
          flushSync(() => {
            setMainTitleFontFamily(titleFam);
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
    <AbsoluteFill style={{backgroundColor: "black"}}>
      <Sequence from={0} durationInFrames={introDurationFrames}>
        <IntroLayer
          sourceVideo={sourceVideo}
          mainHeadline={mainHeadline}
          videoCredit={videoCredit}
          dateStamp={dateStamp}
          brandNumber={brandNumber}
          brandLabel={brandLabel}
          logoPath={logoPath}
          overlayColor={overlayColor}
          textColor={textColor}
          headlineFontScale={headlineFontScale}
          introObjectPosition={introObjectPosition}
          introTransform={introTransform}
          mainTitleFontFamily={mainTitleFontFamily}
        />
      </Sequence>

      <Sequence from={0} durationInFrames={introDurationFrames}>
        <Audio src={staticFile(introVoice)} />
      </Sequence>

      <Sequence from={introDurationFrames} durationInFrames={sourceDurationFrames}>
        <OffthreadVideo
          src={staticFile(sourceVideo)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: sourceObjectPosition,
          }}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
