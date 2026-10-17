import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import TrainersGrid from "@/app/trainers/_components/TrainersGrid";
import { trainers } from "@/app/trainers/_components/trainers-data";
import AboutRequisites from "@/app/aboutus/_components/AboutRequisites";

describe("TrainersGrid", () => {
  it("opens each trainer's CV with everything it holds", async () => {
    const user = userEvent.setup();
    render(<TrainersGrid />);
    for (const t of trainers) {
      await user.click(screen.getByRole("button", { name: new RegExp(t.name) }));
      const cv = screen.getByText("Резюме тренера").closest(".fixed") as HTMLElement;
      expect(within(cv).getByRole("heading", { level: 2, name: t.name })).toBeInTheDocument();
      expect(within(cv).getByRole("img", { name: t.name })).toHaveAttribute("src", t.photo ?? "");
      for (const line of t.bio) expect(within(cv).getByText(line)).toBeInTheDocument();
      expect(within(cv).queryByText("Достижения") !== null).toBe(Boolean(t.achievements?.length));
      expect(within(cv).queryByText("Психология и психотерапия") !== null).toBe(Boolean(t.psychologySpec));
      expect(within(cv).queryByText("Медиация") !== null).toBe(Boolean(t.mediationSpec));
      expect(within(cv).queryByText("Контакты") !== null).toBe(t.contacts.length > 0);
      for (const c of t.contacts) {
        const value = within(cv).getByText(c.value);
        expect(value.tagName).toBe(c.href ? "A" : "SPAN");
      }
      await user.click(within(cv).getByRole("button", { name: "Закрыть" }));
      expect(screen.queryByText("Резюме тренера")).not.toBeInTheDocument();
    }
  });

  it("closes on Esc or a click outside the CV, but not inside it", async () => {
    const user = userEvent.setup();
    render(<TrainersGrid />);
    await user.click(screen.getByRole("button", { name: new RegExp(trainers[0].name) }));
    expect(document.body.style.overflow).toBe("hidden");
    await user.click(screen.getByText("Резюме тренера"));
    expect(screen.getByText("Резюме тренера")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Резюме тренера")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");

    await user.click(screen.getByRole("button", { name: new RegExp(trainers[0].name) }));
    await user.click(screen.getByText("Резюме тренера").closest(".fixed") as HTMLElement);
    expect(screen.queryByText("Резюме тренера")).not.toBeInTheDocument();
  });

  it("shows two tags on a card and how many more there are", () => {
    render(<TrainersGrid />);
    const many = trainers.find((t) => t.tags.length > 2)!;
    const card = screen.getByRole("button", { name: new RegExp(many.name) });
    expect(within(card).getByText(`+${many.tags.length - 2}`)).toBeInTheDocument();
  });
});

describe("AboutRequisites", () => {
  it("opens the registration certificate full-size and closes it", async () => {
    const user = userEvent.setup();
    render(<AboutRequisites />);
    await user.click(screen.getByRole("button", { name: "Открыть свидетельство о регистрации" }));
    const images = screen.getAllByRole("img", { name: "Свидетельство о государственной регистрации МедиаторОк" });
    expect(images).toHaveLength(2);
    await user.click(images[1]);
    expect(screen.getByRole("button", { name: "Закрыть" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Закрыть" }));
    expect(screen.queryByRole("button", { name: "Закрыть" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Открыть свидетельство о регистрации" }));
    await user.click(screen.getByRole("button", { name: "Закрыть" }).closest(".fixed") as HTMLElement);
    expect(screen.queryByRole("button", { name: "Закрыть" })).not.toBeInTheDocument();
  });
});
