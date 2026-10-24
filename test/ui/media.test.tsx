import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import Modal from "@ui/Modal";
import Lightbox from "@ui/Lightbox";
import ImageSlider from "@ui/ImageSlider";
import ZoomableGrid from "@ui/ZoomableGrid";
import VideoEmbed from "@ui/VideoEmbed";

const images = [
  { src: "/images/a.jpg", width: 1600, height: 900, alt: "Первое" },
  { src: "/images/b.jpg", width: 900, height: 1600, alt: "" },
  { src: "/images/c.jpg", width: 0, height: 0, alt: "Третье" },
];

describe("Modal", () => {
  it("takes focus, locks the page, and closes on Esc, the backdrop or the button, but not on its content", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const opener = document.createElement("button");
    document.body.append(opener);
    opener.focus();

    const { unmount } = render(<Modal title="Запись" onClose={onClose}><p>Форма</p></Modal>);
    const close = screen.getByRole("button", { name: "Закрыть" });
    expect(close).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");

    await user.click(screen.getByText("Форма"));
    expect(onClose).not.toHaveBeenCalled();
    await user.keyboard("{Escape}");
    await user.click(screen.getByRole("dialog", { name: "Запись" }));
    await user.click(close);
    expect(onClose).toHaveBeenCalledTimes(3);

    unmount();
    expect(document.body.style.overflow).toBe("");
    expect(opener).toHaveFocus();
    opener.remove();
  });
});

function Zoom({ start = 0 as number | null }) {
  const [index, setIndex] = useState<number | null>(start);
  return <Lightbox images={images} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />;
}

describe("Lightbox", () => {
  it("is not there when nothing is open", () => {
    render(<Zoom start={null} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("steps through the images with buttons and arrow keys, wrapping around", async () => {
    const user = userEvent.setup();
    render(<Zoom />);
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Первое");
    await user.click(screen.getByRole("button", { name: "Предыдущее изображение" }));
    expect(screen.getByText("3 / 3")).toBeInTheDocument();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Следующее изображение" }));
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Фотография МедиаторОк");
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("closes on Esc or a click outside the picture, but not on the picture", async () => {
    const user = userEvent.setup();
    render(<Zoom />);
    await user.click(screen.getByRole("img"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows a single image without navigation", () => {
    render(<Lightbox images={images.slice(0, 1)} index={0} onClose={vi.fn()} onIndexChange={vi.fn()} />);
    expect(screen.queryByRole("button", { name: "Следующее изображение" })).not.toBeInTheDocument();
    expect(screen.queryByText("1 / 1")).not.toBeInTheDocument();
  });
});

describe("ImageSlider", () => {
  it("renders nothing without images", () => {
    const { container } = render(<ImageSlider images={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("moves with arrows and dots, and wraps when the live slider did", async () => {
    const user = userEvent.setup();
    render(<ImageSlider images={images} />);
    const current = () => screen.getAllByRole("img")[0];
    expect(current()).toHaveAttribute("alt", "Первое");
    await user.click(screen.getByRole("button", { name: "Предыдущий слайд" }));
    expect(current()).toHaveAttribute("alt", "Третье");
    await user.click(screen.getByRole("button", { name: "Следующий слайд" }));
    expect(current()).toHaveAttribute("alt", "Первое");
    await user.click(screen.getByRole("button", { name: "Слайд 2" }));
    expect(screen.getByRole("button", { name: "Слайд 2" })).toHaveAttribute("aria-current", "true");
  });

  it("stops at the ends when the live slider did not wrap", async () => {
    const user = userEvent.setup();
    render(<ImageSlider images={images.slice(0, 2)} cycle={false} />);
    const prev = screen.getByRole("button", { name: "Предыдущий слайд" });
    const next = screen.getByRole("button", { name: "Следующий слайд" });
    expect(prev).toBeDisabled();
    await user.click(next);
    expect(next).toBeDisabled();
  });

  it("shows a landscape slide filling the frame and an upright one whole", async () => {
    const user = userEvent.setup();
    render(<ImageSlider images={images} />);
    expect(screen.getAllByRole("img")[0]).toHaveClass("object-cover");
    await user.click(screen.getByRole("button", { name: "Слайд 2" }));
    expect(screen.getAllByRole("img")[0]).toHaveClass("object-contain");
  });

  it("opens the slide full-size when zoomable", async () => {
    const user = userEvent.setup();
    render(<ImageSlider images={images} zoomable arrows={false} dots={false} />);
    expect(screen.queryByRole("button", { name: "Слайд 1" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Открыть изображение" }));
    expect(screen.getByRole("dialog", { name: "Просмотр изображения" })).toBeInTheDocument();
  });

  it("wraps the other way at the end", async () => {
    const user = userEvent.setup();
    render(<ImageSlider images={images} />);
    await user.click(screen.getByRole("button", { name: "Слайд 3" }));
    await user.click(screen.getByRole("button", { name: "Следующий слайд" }));
    expect(screen.getAllByRole("img")[0]).toHaveAttribute("alt", "Первое");
  });
});

describe("ZoomableGrid", () => {
  it("renders nothing without images", () => {
    const { container } = render(<ZoomableGrid images={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("opens the tile that was clicked, whole", async () => {
    const user = userEvent.setup();
    render(<ZoomableGrid images={images} />);
    await user.click(screen.getByRole("button", { name: "Открыть изображение 2" }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("2 / 3")).toBeInTheDocument();
    await user.click(within(dialog).getByRole("button", { name: "Закрыть" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("VideoEmbed", () => {
  it("loads no player until play is pressed, then plays YouTube without tracking cookies", async () => {
    const user = userEvent.setup();
    render(<VideoEmbed video={{ provider: "youtube", id: "abc123" }} title="Кто такой медиатор" />);
    expect(document.querySelector("iframe")).toBeNull();
    expect(document.querySelector("img")).toHaveAttribute("src", "https://i.ytimg.com/vi/abc123/hqdefault.jpg");
    await user.click(screen.getByRole("button", { name: "Смотреть: Кто такой медиатор" }));
    expect(document.querySelector("iframe")).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/abc123?autoplay=1&rel=0",
    );
  });

  it("plays VK video through its embed player", async () => {
    const user = userEvent.setup();
    render(<VideoEmbed video={{ provider: "vk", id: "-123_456" }} />);
    expect(screen.getByText("VK Видео")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Смотреть: Видео" }));
    expect(document.querySelector("iframe")?.getAttribute("src")).toBe(
      "https://vkvideo.ru/video_ext.php?oid=-123&id=456&hd=2&autoplay=1",
    );
  });
});
