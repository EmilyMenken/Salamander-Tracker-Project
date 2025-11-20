"use client";

import { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

type ColorProps = {
  onSubmit: (color: string, threshold: number) => void;
};

export default function Color({ onSubmit }: ColorProps) {
  const [color, setColor] = useState("#ff0000");
  const [threshold, setThreshold] = useState(100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(color, threshold);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "start",
      }}
    >
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <div>
          <HexColorPicker color={color} onChange={setColor} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label>
            Hex Color:
            <HexColorInput color={color} onChange={setColor} prefixed />
          </label>

          <label>
            Threshold:
            <input
              type="number"
              value={threshold}
              min={0}
              max={255}
              onChange={(e) => setThreshold(Number(e.target.value))}
            />
          </label>

          <button type="submit" style={{ marginTop: "10px" }}>
            Process Video
          </button>
        </div>
      </div>
    </form>
  );
}
