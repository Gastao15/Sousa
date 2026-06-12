import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BmiDisclaimer } from "@/components/bmi/BmiDisclaimer";
import { strings } from "@/lib/i18n/strings";

describe("BmiDisclaimer", () => {
  it("always shows the educational disclaimer text", () => {
    render(<BmiDisclaimer />);
    const disclaimer = screen.getByTestId("bmi-disclaimer");
    expect(disclaimer).toHaveTextContent(strings.bmi.disclaimer.main);
    expect(disclaimer).toHaveTextContent(strings.bmi.disclaimer.factors);
  });
});
