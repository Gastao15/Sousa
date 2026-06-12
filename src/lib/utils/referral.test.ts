import { describe, expect, it } from "vitest";
import { detectReferralTopics, hasReferralTopics } from "@/lib/utils/referral";

describe("detectReferralTopics", () => {
  it("returns an empty array when no topic is mentioned", () => {
    expect(detectReferralTopics("Hoje comi arroz e feijão.")).toEqual([]);
    expect(hasReferralTopics("Hoje comi arroz e feijão.")).toBe(false);
  });

  it("detects diabetes-related keywords, including accent variants", () => {
    expect(detectReferralTopics("Tenho diabetes e quero controlar a glicemia")).toContain(
      "DIABETES",
    );
    expect(detectReferralTopics("DIABÉTICO há 5 anos")).toContain("DIABETES");
  });

  it("detects pregnancy and breastfeeding topics", () => {
    expect(detectReferralTopics("Estou grávida e quero saber sobre alimentação")).toContain(
      "GRAVIDEZ",
    );
    expect(detectReferralTopics("Estou a amamentar o meu bebé")).toContain("AMAMENTACAO");
  });

  it("detects kidney and liver disease topics", () => {
    expect(detectReferralTopics("Tenho problemas nos rins")).toContain("DOENCA_RENAL");
    expect(detectReferralTopics("O médico disse que tenho hepatite")).toContain(
      "DOENCA_HEPATICA",
    );
  });

  it("detects allergy, eating disorder, medication and children's nutrition topics", () => {
    expect(detectReferralTopics("Tenho alergia a amendoim")).toContain("ALERGIAS");
    expect(detectReferralTopics("Acho que tenho bulimia")).toContain(
      "PERTURBACAO_ALIMENTAR",
    );
    expect(detectReferralTopics("Tomo insulina todos os dias")).toContain("MEDICACAO");
    expect(detectReferralTopics("A minha filha não come nada")).toContain("CRIANCAS");
  });

  it("detects unintentional weight loss", () => {
    expect(
      detectReferralTopics("Estou a perder peso sem motivo nenhum"),
    ).toContain("PERDA_DE_PESO");
  });

  it("detects emergency symptoms", () => {
    expect(detectReferralTopics("Estou com dor no peito e falta de ar")).toContain(
      "EMERGENCIA",
    );
  });

  it("can detect multiple topics in the same text", () => {
    const topics = detectReferralTopics(
      "Estou grávida e também tenho diabetes",
    );
    expect(topics).toContain("GRAVIDEZ");
    expect(topics).toContain("DIABETES");
  });
});
