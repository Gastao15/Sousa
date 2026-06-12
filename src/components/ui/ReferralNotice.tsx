import Link from "next/link";
import { strings } from "@/lib/i18n/strings";
import {
  REFERRAL_TOPIC_LABELS,
  type ReferralTopic,
} from "@/lib/utils/referral";

interface ReferralNoticeProps {
  topics: ReferralTopic[];
}

/**
 * Shown whenever free-text input mentions a topic that should be referred
 * to a qualified professional. Never offers therapeutic advice.
 */
export function ReferralNotice({ topics }: ReferralNoticeProps) {
  if (topics.length === 0) return null;

  return (
    <div
      className="rounded-md border border-accent-300 bg-accent-50 p-4 text-sm text-accent-700"
      role="alert"
      data-testid="referral-notice"
    >
      <p className="font-semibold">{strings.referral.bannerTitle}</p>
      <p className="mt-1">{strings.referral.bannerText}</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {topics.map((topic) => (
          <li
            key={topic}
            className="rounded-full bg-accent-100 px-2.5 py-0.5 text-xs font-semibold"
          >
            {REFERRAL_TOPIC_LABELS[topic]}
          </li>
        ))}
      </ul>
      {topics.includes("EMERGENCIA") && (
        <p className="mt-2 font-semibold">{strings.referral.emergencyNote}</p>
      )}
      <div className="mt-3 flex flex-wrap gap-3">
        <Link
          href="/consulta"
          className="rounded-md bg-accent-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-accent-600"
        >
          {strings.referral.ctaConsultation}
        </Link>
        <Link
          href="/aviso-medico"
          className="rounded-md border border-accent-300 px-3 py-1.5 text-xs font-semibold text-accent-700 hover:bg-accent-100"
        >
          {strings.referral.ctaDisclaimer}
        </Link>
      </div>
    </div>
  );
}
