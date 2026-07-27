import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Imagine you are an intergalactic gem hunter — every gemstone ranked by total mass in the universe";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const playfairBold = await readFile(
    join(process.cwd(), "assets/PlayfairDisplay-Bold.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#030308",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 900,
            height: 900,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(168,196,224,0.08) 0%, rgba(3,3,8,0) 70%)",
            display: "flex",
          }}
        />

        {/* Diamond shape */}
        <div
          style={{
            width: 40,
            height: 40,
            background: "linear-gradient(135deg, #bae6fd 0%, #0ea5e9 100%)",
            transform: "rotate(45deg)",
            marginBottom: 32,
            display: "flex",
          }}
        />

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "Playfair Display",
            color: "#e8e6e3",
            textAlign: "center",
            lineHeight: 1.15,
          }}
        >
          <div
            style={{ fontSize: 36, opacity: 0.7, marginBottom: 8, display: "flex" }}
          >
            Imagine you are
          </div>
          <div style={{ fontSize: 54, marginBottom: 4, display: "flex" }}>
            an intergalactic
          </div>
          <div
            style={{
              fontSize: 64,
              fontStyle: "italic",
              color: "#a8c4e0",
              display: "flex",
            }}
          >
            gem hunter
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 20,
            color: "#6b6b76",
            marginTop: 28,
            fontFamily: "Playfair Display",
            display: "flex",
          }}
        >
          Every gemstone ranked by total mass in the known universe
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Playfair Display",
          data: playfairBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
