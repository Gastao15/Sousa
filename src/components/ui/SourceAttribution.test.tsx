import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SourceAttribution } from "@/components/ui/SourceAttribution";
import { strings } from "@/lib/i18n/strings";

describe("SourceAttribution", () => {
  it("shows the source attribution text and 'never verified' when lastVerifiedAt is null", () => {
    render(
      <SourceAttribution
        food={{
          sourceAttribution: "Conjunto de dados de demonstração SG NutriMZ",
          sourceUrl: undefined,
          lastVerifiedAt: null,
        }}
      />,
    );

    const node = screen.getByTestId("source-attribution");
    expect(node).toHaveTextContent("Conjunto de dados de demonstração SG NutriMZ");
    expect(node).toHaveTextContent(strings.sourceAttribution.neverVerified);
  });

  it("renders a link when sourceUrl is provided", () => {
    render(
      <SourceAttribution
        food={{
          sourceAttribution: "Fonte verificada de exemplo",
          sourceUrl: "https://example.org/fonte",
          lastVerifiedAt: "2026-01-01",
        }}
      />,
    );

    const link = screen.getByRole("link", { name: "Fonte verificada de exemplo" });
    expect(link).toHaveAttribute("href", "https://example.org/fonte");
    expect(screen.getByTestId("source-attribution")).toHaveTextContent("2026-01-01");
  });
});
