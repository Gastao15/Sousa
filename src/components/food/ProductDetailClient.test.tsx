import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductDetailClient } from "@/components/food/ProductDetailClient";
import { getFoodById } from "@/lib/data/foods";
import { ADVANCED_ANALYSIS_FREE_LIMIT } from "@/lib/utils/usage";
import { strings } from "@/lib/i18n/strings";

const food = getFoodById("banana");
if (!food) throw new Error("expected demo food 'banana' to exist");

const advancedAnalysisButton = () =>
  screen.findByRole("button", {
    name: new RegExp(strings.product.nutrientsTitle),
  });

beforeEach(() => {
  window.localStorage.clear();
});

describe("ProductDetailClient advanced analysis paywall", () => {
  it("reveals the full nutrient table while under the free monthly limit", async () => {
    const user = userEvent.setup();
    render(<ProductDetailClient food={food} />);

    await user.click(await advancedAnalysisButton());

    expect(await screen.findByTestId("nutrient-table")).toBeInTheDocument();
  });

  it("activates the mock paywall once the free monthly limit is reached", async () => {
    const user = userEvent.setup();

    for (let i = 0; i < ADVANCED_ANALYSIS_FREE_LIMIT; i++) {
      const { unmount } = render(<ProductDetailClient food={food} />);
      await user.click(await advancedAnalysisButton());
      unmount();
    }

    render(<ProductDetailClient food={food} />);

    expect(
      await screen.findByText(strings.usage.limitReachedTitle),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: new RegExp(strings.product.nutrientsTitle),
      }),
    ).toBeNull();
    expect(
      screen.getByRole("link", { name: strings.usage.seePremium }),
    ).toHaveAttribute("href", "/premium");
  });
});
