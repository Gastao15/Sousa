"use client";

import { useState } from "react";
import Link from "next/link";
import { strings } from "@/lib/i18n/strings";
import { ReferralNotice } from "@/components/ui/ReferralNotice";
import { detectReferralTopics, type ReferralTopic } from "@/lib/utils/referral";
import { PlaceholderFeature } from "@/components/ui/PlaceholderFeature";

export default function ConsultationPage() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [topic, setTopic] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [referralTopics, setReferralTopics] = useState<ReferralTopic[]>([]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReferralTopics(detectReferralTopics(topic));
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-800">
        {strings.consultation.title}
      </h1>
      <p className="mt-1 text-sm text-brand-600">
        {strings.consultation.subtitle}
      </p>
      <p className="mt-3 rounded-md border border-accent-200 bg-accent-50 p-3 text-sm text-accent-700">
        {strings.consultation.disclaimer}
      </p>

      <div className="mt-3 rounded-md border border-brand-100 bg-brand-50 p-3 text-sm text-brand-700">
        <p>{strings.bmi.landingCard.subtitle}</p>
        <Link href="/imc" className="mt-2 inline-block font-semibold underline">
          {strings.bmi.landingCard.cta}
        </Link>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-brand-700">
              {strings.consultation.nameLabel}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="contact"
              className="text-sm font-medium text-brand-700"
            >
              {strings.consultation.contactLabel}
            </label>
            <input
              id="contact"
              name="contact"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="topic" className="text-sm font-medium text-brand-700">
              {strings.consultation.topicLabel}
            </label>
            <textarea
              id="topic"
              name="topic"
              rows={4}
              placeholder={strings.consultation.topicPlaceholder}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
          >
            {strings.consultation.submit}
          </button>
        </form>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          <div className="rounded-md border border-brand-200 bg-brand-50 p-4 text-sm text-brand-700">
            <p className="font-semibold">{strings.consultation.successTitle}</p>
            <p className="mt-1">{strings.consultation.successText}</p>
          </div>
          <ReferralNotice topics={referralTopics} />
        </div>
      )}

      <div className="mt-6">
        <PlaceholderFeature
          {...strings.placeholders.consultationScheduling}
          icon="🗓️"
        />
      </div>
    </div>
  );
}
