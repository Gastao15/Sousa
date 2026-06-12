import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BmiCalculator } from "@/components/bmi/BmiCalculator";
import { strings } from "@/lib/i18n/strings";
import { STORAGE_KEYS } from "@/lib/utils/storage";

beforeEach(() => {
  window.localStorage.clear();
});

async function fillForm(
  user: ReturnType<typeof userEvent.setup>,
  { weight, height, age }: { weight: string; height: string; age: string },
) {
  await user.type(screen.getByLabelText(strings.bmi.form.weightLabel), weight);
  await user.type(screen.getByLabelText(strings.bmi.form.heightLabel), height);
  await user.type(screen.getByLabelText(strings.bmi.form.ageLabel), age);
}

describe("BmiCalculator", () => {
  it("shows validation errors for implausible inputs", async () => {
    const user = userEvent.setup();
    render(<BmiCalculator />);

    await fillForm(user, { weight: "5", height: "50", age: "200" });
    await user.click(screen.getByRole("button", { name: strings.bmi.form.submit }));

    expect(screen.getByText(strings.bmi.form.invalidWeight)).toBeInTheDocument();
    expect(screen.getByText(strings.bmi.form.invalidHeight)).toBeInTheDocument();
    expect(screen.getByText(strings.bmi.form.invalidAge)).toBeInTheDocument();
    expect(screen.queryByTestId("bmi-result-card")).toBeNull();
  });

  it("calculates and classifies an adult BMI", async () => {
    const user = userEvent.setup();
    render(<BmiCalculator />);

    await fillForm(user, { weight: "70", height: "175", age: "30" });
    await user.click(screen.getByRole("button", { name: strings.bmi.form.submit }));

    const card = await screen.findByTestId("bmi-result-card");
    expect(card).toHaveTextContent(`${strings.bmi.result.bmiLabel}: 22.9`);
    expect(screen.getByTestId("bmi-classification-badge")).toHaveTextContent(
      strings.bmi.classifications.REFERENCE_RANGE,
    );
  });

  it("shows the child/adolescent exclusion for ages under 18", async () => {
    const user = userEvent.setup();
    render(<BmiCalculator />);

    await fillForm(user, { weight: "45", height: "150", age: "15" });
    await user.click(screen.getByRole("button", { name: strings.bmi.form.submit }));

    expect(
      await screen.findByText(strings.bmi.exclusions.childOrAdolescentText),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("bmi-classification-badge")).toBeNull();
  });

  it("shows the pregnancy exclusion when the pregnancy checkbox is checked", async () => {
    const user = userEvent.setup();
    render(<BmiCalculator />);

    await fillForm(user, { weight: "70", height: "165", age: "28" });
    await user.click(screen.getByLabelText(strings.bmi.form.pregnantLabel));
    await user.click(screen.getByRole("button", { name: strings.bmi.form.submit }));

    expect(
      await screen.findByText(strings.bmi.exclusions.pregnancyText),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("bmi-classification-badge")).toBeNull();
  });

  it("does not save a result automatically, only on explicit consent + save", async () => {
    const user = userEvent.setup();
    render(<BmiCalculator />);

    await fillForm(user, { weight: "70", height: "175", age: "30" });
    await user.click(screen.getByRole("button", { name: strings.bmi.form.submit }));
    await screen.findByTestId("bmi-result-card");

    expect(window.localStorage.getItem(STORAGE_KEYS.bmiResult)).toBeNull();

    const saveButton = screen.getByRole("button", { name: strings.bmi.result.saveButton });
    expect(saveButton).toBeDisabled();

    await user.click(screen.getByLabelText(strings.bmi.result.consentLabel));
    expect(saveButton).toBeEnabled();

    await user.click(saveButton);
    expect(window.localStorage.getItem(STORAGE_KEYS.bmiResult)).toBeTruthy();
    expect(await screen.findByTestId("bmi-saved-note")).toBeInTheDocument();
  });

  it("deletes a saved result locally", async () => {
    const user = userEvent.setup();
    render(<BmiCalculator />);

    await fillForm(user, { weight: "70", height: "175", age: "30" });
    await user.click(screen.getByRole("button", { name: strings.bmi.form.submit }));
    await screen.findByTestId("bmi-result-card");

    await user.click(screen.getByLabelText(strings.bmi.result.consentLabel));
    await user.click(screen.getByRole("button", { name: strings.bmi.result.saveButton }));
    await screen.findByTestId("bmi-saved-note");

    await user.click(screen.getByRole("button", { name: strings.bmi.result.deleteButton }));
    expect(window.localStorage.getItem(STORAGE_KEYS.bmiResult)).toBeNull();
    expect(screen.queryByTestId("bmi-saved-note")).toBeNull();
  });

  it("shows a referral notice when red-flag topics are selected", async () => {
    const user = userEvent.setup();
    render(<BmiCalculator />);

    await fillForm(user, { weight: "70", height: "175", age: "30" });
    await user.click(screen.getByLabelText(strings.bmi.form.redFlags.DIABETES));
    await user.click(screen.getByRole("button", { name: strings.bmi.form.submit }));

    expect(await screen.findByTestId("referral-notice")).toBeInTheDocument();
  });
});
