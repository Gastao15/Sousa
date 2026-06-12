/**
 * Keyword-based referral detection.
 *
 * SG NutriMZ never gives therapeutic advice. Whenever free-text input
 * (quick log, consultation request, etc.) mentions one of these general
 * topics, the UI should show a referral notice pointing the user towards a
 * qualified professional instead of attempting any automated guidance.
 */

import { normalizeText } from "./text";

export type ReferralTopic =
  | "DIABETES"
  | "HIPERTENSAO"
  | "DOENCA_RENAL"
  | "DOENCA_HEPATICA"
  | "GRAVIDEZ"
  | "AMAMENTACAO"
  | "ALERGIAS"
  | "PERTURBACAO_ALIMENTAR"
  | "PERDA_DE_PESO"
  | "CRIANCAS"
  | "MEDICACAO"
  | "EMERGENCIA";

export const REFERRAL_TOPIC_LABELS: Record<ReferralTopic, string> = {
  DIABETES: "Diabetes",
  HIPERTENSAO: "Hipertensão arterial",
  DOENCA_RENAL: "Doença renal",
  DOENCA_HEPATICA: "Doença hepática",
  GRAVIDEZ: "Gravidez",
  AMAMENTACAO: "Amamentação",
  ALERGIAS: "Alergias",
  PERTURBACAO_ALIMENTAR: "Perturbações alimentares",
  PERDA_DE_PESO: "Perda de peso não intencional",
  CRIANCAS: "Crianças com preocupações nutricionais",
  MEDICACAO: "Medicação",
  EMERGENCIA: "Sintomas de emergência",
};

const REFERRAL_KEYWORDS: Record<ReferralTopic, string[]> = {
  DIABETES: ["diabetes", "diabetico", "diabetica", "glicemia", "glicose alta", "acucar no sangue"],
  HIPERTENSAO: ["hipertensao", "tensao alta", "pressao alta", "pressao arterial alta"],
  DOENCA_RENAL: ["doenca renal", "insuficiencia renal", "dialise", "problemas nos rins", "rim", "rins"],
  DOENCA_HEPATICA: ["doenca hepatica", "figado", "hepatite", "cirrose"],
  GRAVIDEZ: ["gravidez", "gravida", "gestante", "gestacao", "estou gravida"],
  AMAMENTACAO: ["amamentacao", "amamentar", "aleitamento", "leite materno", "a amamentar"],
  ALERGIAS: ["alergia", "alergico", "alergica", "intolerancia alimentar", "intolerancia"],
  PERTURBACAO_ALIMENTAR: [
    "anorexia",
    "bulimia",
    "transtorno alimentar",
    "perturbacao alimentar",
    "compulsao alimentar",
  ],
  PERDA_DE_PESO: [
    "perda de peso sem",
    "perdendo peso sem",
    "a perder peso sem motivo",
    "emagrecimento sem motivo",
    "perdi peso sem fazer nada",
  ],
  CRIANCAS: [
    "crianca com",
    "criancas com",
    "meu filho nao come",
    "minha filha nao come",
    "bebe nao come",
    "lactente",
  ],
  MEDICACAO: ["medicamento", "medicacao", "remedio", "insulina", "comprimidos", "tomar remedios"],
  EMERGENCIA: [
    "emergencia",
    "dor no peito",
    "falta de ar",
    "desmaio",
    "convulsao",
    "sangramento intenso",
    "perda de consciencia",
  ],
};

/**
 * Returns the list of referral topics matched in `text`, in a stable
 * order. Returns an empty array when no topic is detected.
 */
export function detectReferralTopics(text: string): ReferralTopic[] {
  const normalized = normalizeText(text);
  const matches: ReferralTopic[] = [];
  for (const topic of Object.keys(REFERRAL_KEYWORDS) as ReferralTopic[]) {
    const keywords = REFERRAL_KEYWORDS[topic];
    if (
      keywords.some((keyword) => normalized.includes(normalizeText(keyword)))
    ) {
      matches.push(topic);
    }
  }
  return matches;
}

export function hasReferralTopics(text: string): boolean {
  return detectReferralTopics(text).length > 0;
}
