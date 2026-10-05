import { ImageResponse } from "next/og";

// Default social card for every page without its own CMS share image.
export const alt = "INTEMA Trading PLC.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(180deg, #3b3b3b 0%, #1f1f1f 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ width: 96, height: 8, borderRadius: 4, background: "#fe0001" }} />
        <div style={{ marginTop: 40, fontSize: 96, fontWeight: 800, letterSpacing: -2, color: "#fe0001" }}>INTEMA</div>
        <div style={{ marginTop: 8, fontSize: 40, color: "#dcdcdd" }}>Trading PLC. · The Quality Warehouse</div>
        <div style={{ marginTop: 48, fontSize: 28, color: "#979798" }}>Ethiopia · Djibouti · Sudan</div>
      </div>
    ),
    size,
  );
}
