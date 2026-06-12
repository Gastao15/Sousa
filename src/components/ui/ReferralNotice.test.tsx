import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReferralNotice } from "@/components/ui/ReferralNotice";
import { strings } from "@/lib/i18n/strings";
import { REFERRAL_TOPIC_LABELS } from "@/lib/utils/referral";

describe("ReferralNotice", () => {
  it("renders nothing when there are no topics", () => {
    render(<ReferralNotice topics={[]} />);
    expect(screen.queryByTestId("referral-notice")).toBeNull();
  });

  it("shows the referral banner and matched topic labels", () => {
    render(<ReferralNotice topics={["DIABETES", "GRAVIDEZ"]} />);
    const notice = screen.getByTestId("referral-notice");
    expect(notice).toHaveTextContent(strings.referral.bannerTitle);
    expect(notice).toHaveTextContent(REFERRAL_TOPIC_LABELS.DIABETES);
    expect(notice).toHaveTextContent(REFERRAL_TOPIC_LABELS.GRAVIDEZ);
    expect(notice).not.toHaveTextContent(strings.referral.emergencyNote);
  });

  it("shows an extra emergency note when EMERGENCIA is included", () => {
    render(<ReferralNotice topics={["EMERGENCIA"]} />);
    expect(screen.getByTestId("referral-notice")).toHaveTextContent(
      strings.referral.emergencyNote,
    );
  });

  it("links to the consultation page and the medical disclaimer", () => {
    render(<ReferralNotice topics={["DIABETES"]} />);
    expect(
      screen.getByRole("link", { name: strings.referral.ctaConsultation }),
    ).toHaveAttribute("href", "/consulta");
    expect(
      screen.getByRole("link", { name: strings.referral.ctaDisclaimer }),
    ).toHaveAttribute("href", "/aviso-medico");
  });
});
