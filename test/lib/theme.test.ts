import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import * as tokens from "@/app/theme/tokens";

const css = fs.readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8");
const cssColour = (name: string) => new RegExp(`--color-${name}:\\s*(#[0-9a-f]{6})`, "i").exec(css)?.[1]?.toLowerCase();

describe("theme tokens", () => {
  it("match the colours the stylesheet actually uses", () => {
    for (const [scale, values] of [["accent", tokens.ACCENT], ["gold", tokens.GOLD]] as const) {
      for (const [step, hex] of Object.entries(values)) {
        expect(`${scale}-${step} ${hex.toLowerCase()}`).toBe(`${scale}-${step} ${cssColour(`${scale}-${step}`)}`);
      }
    }
  });

  it("export every scale", () => {
    for (const name of ["NAVY", "SLATE", "ZINC", "TEXT", "BACKGROUND", "BORDER", "ICON", "STATE", "SPACING", "SECTION_PADDING", "CONTAINER", "GAP", "FONT_SIZE", "FONT_WEIGHT", "TRACKING", "LEADING", "TYPE_SCALE", "RADIUS", "SHADOW"]) {
      expect(tokens).toHaveProperty(name);
    }
    expect([tokens.WHITE, tokens.BLACK, tokens.TRANSPARENT]).toEqual(["#ffffff", "#000000", "transparent"]);
  });
});
