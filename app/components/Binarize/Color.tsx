"use client";

import { HexColorPicker, HexColorInput } from "react-colorful";

type ColorProps = {
  color: string;
  threshold: number;
  onColorChange: (color: string) => void;
  onThresholdChange: (value: number) => void;
};

export default function Color({
  color,
  threshold,
  onColorChange,
  onThresholdChange
}: ColorProps) {

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <HexColorPicker color={color} onChange={onColorChange} />

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>
          Hex Color:
          <HexColorInput
            color={color}
            onChange={onColorChange}
            prefixed
          />
        </label>

        <label>
          Threshold:
          <input
            type="number"
            min={0}
            max={255}
            value={threshold}
            onChange={(e) => onThresholdChange(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
}
