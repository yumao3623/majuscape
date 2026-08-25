import { ImageResponse } from "next/og";

export const alt = "Majuscape - free capitalization games for kids";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#dff3f2",
          color: "#0e252a",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            maxWidth: "980px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              alignItems: "center",
              background: "#ee6b52",
              border: "6px solid #0e252a",
              borderRadius: "12px",
              color: "white",
              display: "flex",
              fontSize: "42px",
              fontWeight: 800,
              height: "94px",
              justifyContent: "center",
              width: "94px",
            }}
          >
            M
          </div>
          <div style={{ color: "#a83e34", display: "flex", fontSize: "30px", fontWeight: 800, marginTop: "30px" }}>
            MAJUSCAPE
          </div>
          <div style={{ display: "flex", fontSize: "64px", fontWeight: 900, lineHeight: 1.05, marginTop: "18px" }}>
            Capitalization Games for Kids
          </div>
          <div style={{ color: "#466368", display: "flex", fontSize: "29px", lineHeight: 1.4, marginTop: "24px" }}>
            Repair sentences · Sort rules · Restore the city
          </div>
        </div>
      </div>
    ),
    size,
  );
}
