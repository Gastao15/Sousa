import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DataStatusBadge } from "@/components/ui/DataStatusBadge";
import { strings } from "@/lib/i18n/strings";

describe("DataStatusBadge", () => {
  it("renders the label for DEMO_SYNTHETIC data", () => {
    render(<DataStatusBadge status="DEMO_SYNTHETIC" />);
    const badge = screen.getByTestId("data-status-badge");
    expect(badge).toHaveTextContent(strings.dataStatus.DEMO_SYNTHETIC.label);
    expect(badge).toHaveAttribute(
      "title",
      strings.dataStatus.DEMO_SYNTHETIC.description,
    );
  });

  it("renders a different label for ESTIMATED_REQUIRES_CONFIRMATION data", () => {
    render(<DataStatusBadge status="ESTIMATED_REQUIRES_CONFIRMATION" />);
    expect(screen.getByTestId("data-status-badge")).toHaveTextContent(
      strings.dataStatus.ESTIMATED_REQUIRES_CONFIRMATION.label,
    );
  });
});
