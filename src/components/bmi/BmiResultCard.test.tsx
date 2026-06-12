import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BmiResultCard } from "@/components/bmi/BmiResultCard";
import { strings } from "@/lib/i18n/strings";
import type { BmiAssessment } from "@/types/bmi";

const noop = vi.fn();

describe("BmiResultCard", () => {
  it("shows the disclaimer for every assessment type", () => {
    const assessment: BmiAssessment = {
      type: "ADULT",
      bmi: 22.9,
      classification: "REFERENCE_RANGE",
    };
    render(
      <BmiResultCard
        assessment={assessment}
        redFlagTopics={[]}
        consultationRequested={false}
        unintentionalWeightLoss={false}
        onUnintentionalWeightLossChange={noop}
        canSave={false}
        isSaved={false}
        onSave={noop}
        onDelete={noop}
      />,
    );
    expect(screen.getByTestId("bmi-disclaimer")).toBeInTheDocument();
  });

  it("shows a referral notice when red-flag topics are present", () => {
    const assessment: BmiAssessment = {
      type: "ADULT",
      bmi: 22.9,
      classification: "REFERENCE_RANGE",
    };
    render(
      <BmiResultCard
        assessment={assessment}
        redFlagTopics={["DIABETES", "HIPERTENSAO"]}
        consultationRequested={false}
        unintentionalWeightLoss={false}
        onUnintentionalWeightLossChange={noop}
        canSave={false}
        isSaved={false}
        onSave={noop}
        onDelete={noop}
      />,
    );
    expect(screen.getByTestId("referral-notice")).toBeInTheDocument();
  });

  it("shows a priority warning for SEVERE_UNDERWEIGHT", () => {
    const assessment: BmiAssessment = {
      type: "ADULT",
      bmi: 15,
      classification: "SEVERE_UNDERWEIGHT",
    };
    render(
      <BmiResultCard
        assessment={assessment}
        redFlagTopics={[]}
        consultationRequested={false}
        unintentionalWeightLoss={false}
        onUnintentionalWeightLossChange={noop}
        canSave={false}
        isSaved={false}
        onSave={noop}
        onDelete={noop}
      />,
    );
    expect(screen.getByTestId("bmi-priority-warning")).toBeInTheDocument();
  });

  it("shows the child/adolescent exclusion message and CTA", () => {
    const assessment: BmiAssessment = { type: "CHILD_OR_ADOLESCENT", bmi: 18 };
    render(
      <BmiResultCard
        assessment={assessment}
        redFlagTopics={[]}
        consultationRequested={false}
        unintentionalWeightLoss={false}
        onUnintentionalWeightLossChange={noop}
        canSave={false}
        isSaved={false}
        onSave={noop}
        onDelete={noop}
      />,
    );
    expect(screen.getByText(strings.bmi.exclusions.childOrAdolescentText)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: strings.bmi.exclusions.childOrAdolescentCta }),
    ).toHaveAttribute("href", "/consulta");
  });

  it("shows the pregnancy exclusion message and CTA", () => {
    const assessment: BmiAssessment = { type: "PREGNANCY", bmi: 24 };
    render(
      <BmiResultCard
        assessment={assessment}
        redFlagTopics={[]}
        consultationRequested={false}
        unintentionalWeightLoss={false}
        onUnintentionalWeightLossChange={noop}
        canSave={false}
        isSaved={false}
        onSave={noop}
        onDelete={noop}
      />,
    );
    expect(screen.getByText(strings.bmi.exclusions.pregnancyText)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: strings.bmi.exclusions.pregnancyCta }),
    ).toHaveAttribute("href", "/consulta");
  });

  it("disables the save button until consent is given, and the delete button until a result is saved", () => {
    const assessment: BmiAssessment = {
      type: "ADULT",
      bmi: 22.9,
      classification: "REFERENCE_RANGE",
    };
    render(
      <BmiResultCard
        assessment={assessment}
        redFlagTopics={[]}
        consultationRequested={false}
        unintentionalWeightLoss={false}
        onUnintentionalWeightLossChange={noop}
        canSave={false}
        isSaved={false}
        onSave={noop}
        onDelete={noop}
      />,
    );
    expect(screen.getByRole("button", { name: strings.bmi.result.saveButton })).toBeDisabled();
    expect(screen.getByRole("button", { name: strings.bmi.result.deleteButton })).toBeDisabled();
    expect(screen.queryByTestId("bmi-saved-note")).toBeNull();
  });
});
