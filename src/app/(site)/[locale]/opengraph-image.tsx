import { ImageResponse } from "next/og";

// Default social card for every page without its own CMS share image.
// Latin-only text, so it renders without loading an Ethiopic font.
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
          background: "#000000",
          color: "#ffffff",
        }}
      >
        <div style={{ width: 96, height: 8, background: "#f20000" }} />
        <div style={{ marginTop: 40, fontSize: 96, fontWeight: 800, letterSpacing: -2, color: "#f20000" }}>INTEMA</div>
        <div style={{ marginTop: 8, fontSize: 40, color: "#bdbdbd" }}>Trading PLC. · The Quality Warehouse</div>
        <div style={{ marginTop: 48, fontSize: 28, color: "#bdbdbd" }}>Ethiopia · Djibouti · Sudan</div>
      </div>
    ),
    size,
  );
}
