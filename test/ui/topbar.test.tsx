import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("TopBar", () => {
  it("dials the phones without formatting and invents no opening hours", async () => {
    const { default: TopBar } = await import("@layout/TopBar/TopBar");
    render(<TopBar />);
    expect(screen.getByRole("link", { name: "+375 (29) 867‑82‑40" })).toHaveAttribute("href", "tel:+375298678240");
    expect(screen.queryByText("Часы работы")).not.toBeInTheDocument();
  });

  it("shows opening hours once they are published", async () => {
    vi.resetModules();
    vi.doMock("@lib/site", async (original) => {
      const real = await original<typeof import("@lib/site")>();
      return {
        ...real,
        site: {
          ...real.site,
          openingHours: [
            { days: "Пн–Чт", hours: "9:30 – 17:30", note: "обед 12:30 – 13:00" },
            { days: "Пт", hours: "9:30 – 16:00" },
          ],
        },
      };
    });
    const { default: TopBar } = await import("@layout/TopBar/TopBar");
    render(<TopBar />);
    expect(screen.getByText("Пн–Чт")).toBeInTheDocument();
    expect(screen.getByText("(обед 12:30 – 13:00)")).toBeInTheDocument();
    vi.doUnmock("@lib/site");
  });
});
