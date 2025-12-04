"use client";

import { useState, useEffect } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

type ColorProps = {
  color?: string;
  threshold?: number;
  onColorChange?: (color: string) => void;
  onThresholdChange?: (value: number) => void;
  onSubmit?: (color: string, threshold: number) => void;
};

export default function Color({
  color = "#ff0000",
  threshold = 100,
  onColorChange,
  onThresholdChange,
  onSubmit
}: ColorProps) {
  const [localColor, setLocalColor] = useState(color);
  const [localThreshold, setLocalThreshold] = useState(threshold);

  useEffect(() => {
    if (onColorChange) onColorChange(localColor);
  }, [localColor]);

  useEffect(() => {
    if (onThresholdChange) onThresholdChange(localThreshold);
  }, [localThreshold]);

  return (
    <div>
      <HexColorPicker color={localColor} onChange={setLocalColor} />

      <div>
        <label>
          Hex Color:
          <HexColorInput
            color={localColor}
            onChange={setLocalColor}
            prefixed
          />
        </label>

        <label>
          Threshold Slider:
          <input
            type="range"
            min={0}
            max={255}
            value={localThreshold}
            onChange={(e) => setLocalThreshold(Number(e.target.value))}
          />
        </label>

        {onSubmit && (
          <button onClick={() => onSubmit(localColor, localThreshold)}>
            Process Video
          </button>
        )}
      </div>
    </div>
  );
}
