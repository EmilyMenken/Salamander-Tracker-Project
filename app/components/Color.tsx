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

  const useEyeDropper = async () => {
    if ("EyeDropper" in window) {
      const eyeDropper = new (window as any).EyeDropper();
      try {
        const result = await eyeDropper.open();
        if (result?.sRGBHex) setLocalColor(result.sRGBHex);
      } catch {
        console.error("Eyedropper canceled");
      }
    } else {
      alert("Your browser does not support the EyeDropper API.");
    }
  };

  return (
    <div className="binarize-controls">
      {/* Left: Color Picker */}
      <div className="color-controls">
        <HexColorPicker color={localColor} onChange={setLocalColor} />

        <button onClick={useEyeDropper}>
          Pick From Screen
        </button>
      </div>

      {/* Right: Threshold Controls + Hex Input */}
      <div className="threshold-controls">
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

        <p>Current Threshold: {localThreshold}</p>

        <label>
          Hex Color:
          <HexColorInput color={localColor} onChange={setLocalColor} prefixed />
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
