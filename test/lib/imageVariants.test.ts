import { describe, expect, it } from "vitest";
import { DEVICE_SIZES, IMAGE_SIZES, WIDTHS, hasVariants, variantPath, variantWidth } from "@lib/imageVariants";

describe("image variants", () => {
  it("are made for the site's raster pictures only", () => {
    expect(hasVariants("/images/services/kids-school.jpg")).toBe(true);
    expect(hasVariants("/images/experts/dankova.PNG")).toBe(true);
    expect(hasVariants("/images/a.jpeg")).toBe(true);
    expect(hasVariants("/images/a.webp")).toBe(true);
    // Vectors and animations are served as they are; so is anything outside images/.
    expect(hasVariants("/images/icons/check.svg")).toBe(false);
    expect(hasVariants("/images/a.gif")).toBe(false);
    expect(hasVariants("/favicon.png")).toBe(false);
    expect(hasVariants("https://cdn.example/a.jpg")).toBe(false);
  });

  it("keep the original's path inside their own", () => {
    expect(variantPath("/images/a/b.jpg", 640)).toBe("/optimized/640/images/a/b.jpg.webp");
  });

  it("cover a requested width with the smallest one made", () => {
    expect(variantWidth(1)).toBe(96);
    expect(variantWidth(96)).toBe(96);
    expect(variantWidth(97)).toBe(192);
    expect(variantWidth(750)).toBe(1080);
    expect(variantWidth(3840)).toBe(1920);
  });

  it("split into the two lists next/image expects, small ones first", () => {
    expect(Math.max(...IMAGE_SIZES)).toBeLessThan(Math.min(...DEVICE_SIZES));
    expect(WIDTHS).toEqual([...WIDTHS].sort((a, b) => a - b));
  });
});
