"use client";

import { useEffect, useState } from "react";
import { strings } from "@/lib/i18n/strings";
import {
  assessBmi,
  isValidHeight,
  isValidWeightKg,
} from "@/lib/bmi";
import type { BmiAssessment, HeightUnit, SavedBmiResult } from "@/types/bmi";
import type { ReferralTopic } from "@/lib/utils/referral";
import {
  deleteSavedBmiResult,
  getSavedBmiResult,
  saveBmiResult,
} from "@/lib/utils/bmiStorage";
import { BmiResultCard } from "@/components/bmi/BmiResultCard";

const RED_FLAG_TOPICS: ReferralTopic[] = [
  "DIABETES",
  "HIPERTENSAO",
  "DOENCA_RENAL",
  "DOENCA_HEPATICA",
  "AMAMENTACAO",
  "PERTURBACAO_ALIMENTAR",
  "ALERGIAS",
  "MEDICACAO",
  "EMERGENCIA",
];

const MIN_PLAUSIBLE_AGE = 0;
const MAX_PLAUSIBLE_AGE = 120;

interface FormErrors {
  weight?: string;
  height?: string;
  age?: string;
}

/**
 * Free, registration-free adult BMI screening calculator. Calculations
 * happen entirely on the device — nothing is sent to a server and nothing
 * is saved unless the user explicitly chooses to.
 */
export function BmiCalculator() {
  const strs = strings.bmi;

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");
  const [age, setAge] = useState("");
  const [waist, setWaist] = useState("");
  const [isPregnant, setIsPregnant] = useState(false);
  const [redFlags, setRedFlags] = useState<Record<string, boolean>>({});
  const [consultationRequested, setConsultationRequested] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [assessment, setAssessment] = useState<BmiAssessment | null>(null);
  const [unintentionalWeightLoss, setUnintentionalWeightLoss] = useState(false);
  const [consentToSave, setConsentToSave] = useState(false);
  const [savedResult, setSavedResult] = useState<SavedBmiResult | null>(null);

  useEffect(() => {
    // Read localStorage only after hydration to avoid a server/client mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSavedResult(getSavedBmiResult());
  }, []);

  function toggleRedFlag(topic: ReferralTopic, checked: boolean) {
    setRedFlags((prev) => ({ ...prev, [topic]: checked }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const weightKg = Number(weight);
    const heightValue = Number(height);
    const ageYears = Number(age);

    const nextErrors: FormErrors = {};
    if (!isValidWeightKg(weightKg)) {
      nextErrors.weight = strs.form.invalidWeight;
    }
    if (!isValidHeight(heightValue, heightUnit)) {
      nextErrors.height = strs.form.invalidHeight;
    }
    if (
      !Number.isFinite(ageYears) ||
      ageYears < MIN_PLAUSIBLE_AGE ||
      ageYears > MAX_PLAUSIBLE_AGE
    ) {
      nextErrors.age = strs.form.invalidAge;
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setAssessment(null);
      return;
    }

    const result = assessBmi({
      weightKg,
      height: heightValue,
      heightUnit,
      age: ageYears,
      isPregnant,
    });
    setAssessment(result);
    setUnintentionalWeightLoss(false);
    setConsentToSave(false);
  }

  function handleSave() {
    if (!assessment) return;
    const result: SavedBmiResult = {
      weightKg: Number(weight),
      height: Number(height),
      heightUnit,
      age: Number(age),
      isPregnant,
      waistCircumferenceCm: waist ? Number(waist) : undefined,
      assessment,
      savedAt: new Date().toISOString(),
    };
    saveBmiResult(result);
    setSavedResult(result);
  }

  function handleDelete() {
    deleteSavedBmiResult();
    setSavedResult(null);
  }

  const redFlagTopics: ReferralTopic[] = RED_FLAG_TOPICS.filter(
    (topic) => redFlags[topic],
  );
  if (unintentionalWeightLoss) {
    redFlagTopics.push("PERDA_DE_PESO");
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="bmi-weight" className="text-sm font-medium text-brand-700">
            {strs.form.weightLabel}
          </label>
          <input
            id="bmi-weight"
            name="weight"
            type="number"
            inputMode="decimal"
            min={0}
            step={0.1}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full max-w-xs rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
          />
          {errors.weight && (
            <p className="text-xs text-accent-700" role="alert">
              {errors.weight}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-3 sm:items-end">
          <div className="flex flex-col gap-1">
            <label htmlFor="bmi-height" className="text-sm font-medium text-brand-700">
              {strs.form.heightLabel}
            </label>
            <input
              id="bmi-height"
              name="height"
              type="number"
              inputMode="decimal"
              min={0}
              step={0.1}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full max-w-xs rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="bmi-height-unit" className="text-sm font-medium text-brand-700">
              {strs.form.heightUnitLabel}
            </label>
            <select
              id="bmi-height-unit"
              name="height-unit"
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value as HeightUnit)}
              className="rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
            >
              <option value="cm">{strs.form.heightUnitCm}</option>
              <option value="m">{strs.form.heightUnitM}</option>
            </select>
          </div>
        </div>
        {errors.height && (
          <p className="text-xs text-accent-700" role="alert">
            {errors.height}
          </p>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="bmi-age" className="text-sm font-medium text-brand-700">
            {strs.form.ageLabel}
          </label>
          <input
            id="bmi-age"
            name="age"
            type="number"
            inputMode="numeric"
            min={0}
            step={1}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full max-w-xs rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
          />
          {errors.age && (
            <p className="text-xs text-accent-700" role="alert">
              {errors.age}
            </p>
          )}
          <p className="text-xs text-brand-500">{strs.form.adultOnlyNote}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="bmi-waist" className="text-sm font-medium text-brand-700">
            {strs.form.waistLabel}
          </label>
          <input
            id="bmi-waist"
            name="waist"
            type="number"
            inputMode="decimal"
            min={0}
            step={0.1}
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            className="w-full max-w-xs rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-brand-700">
          <input
            type="checkbox"
            checked={isPregnant}
            onChange={(e) => setIsPregnant(e.target.checked)}
          />
          {strs.form.pregnantLabel}
        </label>

        <fieldset className="flex flex-col gap-2 rounded-md border border-brand-100 p-3">
          <legend className="text-sm font-medium text-brand-700">
            {strs.form.redFlagsTitle}
          </legend>
          {RED_FLAG_TOPICS.map((topic) => (
            <label key={topic} className="flex items-center gap-2 text-sm text-brand-700">
              <input
                type="checkbox"
                checked={!!redFlags[topic]}
                onChange={(e) => toggleRedFlag(topic, e.target.checked)}
              />
              {strs.form.redFlags[topic as keyof typeof strs.form.redFlags]}
            </label>
          ))}
        </fieldset>

        <label className="flex items-center gap-2 text-sm text-brand-700">
          <input
            type="checkbox"
            checked={consultationRequested}
            onChange={(e) => setConsultationRequested(e.target.checked)}
          />
          {strs.form.consultationRequestLabel}
        </label>

        <button
          type="submit"
          className="self-start rounded-md bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
        >
          {strs.form.submit}
        </button>
      </form>

      {assessment && (
        <>
          <label className="flex items-start gap-2 text-sm text-brand-700">
            <input
              type="checkbox"
              className="mt-1"
              checked={consentToSave}
              onChange={(e) => setConsentToSave(e.target.checked)}
            />
            {strs.result.consentLabel}
          </label>

          <BmiResultCard
            assessment={assessment}
            redFlagTopics={redFlagTopics}
            consultationRequested={consultationRequested}
            unintentionalWeightLoss={unintentionalWeightLoss}
            onUnintentionalWeightLossChange={setUnintentionalWeightLoss}
            canSave={consentToSave}
            isSaved={savedResult !== null}
            savedAt={savedResult?.savedAt}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
}
