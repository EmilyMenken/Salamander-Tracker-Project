"use client";

import { HexColorPicker, HexColorInput } from "react-colorful";
import { useRouter } from "next/navigation";   // <-- add this

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

  const router = useRouter();  // <-- initialize router

  return (
    <div>

      <HexColorPicker color={color} onChange={onColorChange} />

      <div>
        <label>
          Hex Color:
          <HexColorInput
            color={color}
            onChange={onColorChange}
            prefixed
          />
        </label>

        <label>
          Threshold Slider:
          <input
            type="range"
            min={0}
            max={255}
            value={threshold}
            onChange={(e) =>
              onThresholdChange(Number(e.target.value))
            }
          />
        </label>

        {/* --- NEW BUTTON TO NAVIGATE --- */}
        <button
          onClick={() => router.push("/process")}
          style={{ marginTop: "1rem" }}
        >
          Process Video
        </button>
      </div>
    </div>
  );
}
