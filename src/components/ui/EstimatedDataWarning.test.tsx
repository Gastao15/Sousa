import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { EstimatedDataWarning } from "@/components/ui/EstimatedDataWarning";
import { strings } from "@/lib/i18n/strings";

describe("EstimatedDataWarning", () => {
  it("shows the estimated-value warning and the demo-only notice by default", () => {
    render(<EstimatedDataWarning isEstimated />);
    const warning = screen.getByTestId("estimated-data-warning");
    expect(warning).toHaveTextContent(strings.estimatedDataWarning.title);
    expect(warning).toHaveTextContent(strings.estimatedDataWarning.text);
    expect(warning).toHaveTextContent(strings.estimatedDataWarning.demoOnly);
  });

  it("omits the estimated-value warning when isEstimated is false but still shows the demo notice", () => {
    render(<EstimatedDataWarning isEstimated={false} />);
    const warning = screen.getByTestId("estimated-data-warning");
    expect(warning).not.toHaveTextContent(strings.estimatedDataWarning.title);
    expect(warning).toHaveTextContent(strings.estimatedDataWarning.demoOnly);
  });

  it("renders nothing when neither flag applies", () => {
    render(<EstimatedDataWarning isEstimated={false} showDemoNotice={false} />);
    expect(screen.queryByTestId("estimated-data-warning")).toBeNull();
  });
});
