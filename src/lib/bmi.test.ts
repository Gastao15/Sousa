import { describe, expect, it } from "vitest";
import {
  assessBmi,
  calculateBmi,
  classifyAdultBmi,
  getReferralUrgency,
  heightToMeters,
  isValidHeight,
  isValidWeightKg,
  roundBmi,
} from "@/lib/bmi";

describe("calculateBmi", () => {
  it("computes BMI = weightKg / (heightMeters ^ 2)", () => {
    expect(calculateBmi(70, 1.75)).toBeCloseTo(22.857, 3);
  });
});

describe("heightToMeters", () => {
  it("converts centimetres to metres", () => {
    expect(heightToMeters(175, "cm")).toBeCloseTo(1.75, 5);
  });

  it("keeps metres unchanged", () => {
    expect(heightToMeters(1.75, "m")).toBe(1.75);
  });
});

describe("roundBmi", () => {
  it("rounds to one decimal place", () => {
    expect(roundBmi(22.857)).toBe(22.9);
    expect(roundBmi(22.84)).toBe(22.8);
  });
});

describe("isValidWeightKg", () => {
  it("rejects implausible weights", () => {
    expect(isValidWeightKg(5)).toBe(false);
    expect(isValidWeightKg(500)).toBe(false);
    expect(isValidWeightKg(NaN)).toBe(false);
  });

  it("accepts plausible weights", () => {
    expect(isValidWeightKg(70)).toBe(true);
  });
});

describe("isValidHeight", () => {
  it("rejects implausible heights regardless of unit", () => {
    expect(isValidHeight(50, "cm")).toBe(false);
    expect(isValidHeight(3, "m")).toBe(false);
    expect(isValidHeight(0, "cm")).toBe(false);
    expect(isValidHeight(NaN, "cm")).toBe(false);
  });

  it("accepts plausible heights in cm and m", () => {
    expect(isValidHeight(175, "cm")).toBe(true);
    expect(isValidHeight(1.75, "m")).toBe(true);
  });
});

describe("assessBmi", () => {
  it("calculates and rounds the BMI value for an adult", () => {
    const result = assessBmi({
      weightKg: 70,
      height: 175,
      heightUnit: "cm",
      age: 30,
      isPregnant: false,
    });
    expect(result.bmi).toBe(22.9);
    expect(result.type).toBe("ADULT");
  });

  it("produces the same BMI whether height is given in cm or m", () => {
    const inCm = assessBmi({
      weightKg: 70,
      height: 175,
      heightUnit: "cm",
      age: 30,
      isPregnant: false,
    });
    const inM = assessBmi({
      weightKg: 70,
      height: 1.75,
      heightUnit: "m",
      age: 30,
      isPregnant: false,
    });
    expect(inCm.bmi).toBe(inM.bmi);
  });

  it("returns CHILD_OR_ADOLESCENT for under-18, without adult classification", () => {
    const result = assessBmi({
      weightKg: 45,
      height: 150,
      heightUnit: "cm",
      age: 15,
      isPregnant: false,
    });
    expect(result.type).toBe("CHILD_OR_ADOLESCENT");
    expect(result).not.toHaveProperty("classification");
  });

  it("returns PREGNANCY for pregnant adults, without adult classification", () => {
    const result = assessBmi({
      weightKg: 70,
      height: 165,
      heightUnit: "cm",
      age: 28,
      isPregnant: true,
    });
    expect(result.type).toBe("PREGNANCY");
    expect(result).not.toHaveProperty("classification");
  });

  it("PREGNANCY takes precedence over a child/adolescent age (defensive check)", () => {
    const result = assessBmi({
      weightKg: 55,
      height: 160,
      heightUnit: "cm",
      age: 30,
      isPregnant: true,
    });
    expect(result.type).toBe("PREGNANCY");
  });
});

describe("classifyAdultBmi", () => {
  it("classifies SEVERE_UNDERWEIGHT (BMI < 16)", () => {
    expect(classifyAdultBmi(15.9)).toBe("SEVERE_UNDERWEIGHT");
  });

  it("classifies UNDERWEIGHT (16 <= BMI < 18.5)", () => {
    expect(classifyAdultBmi(17)).toBe("UNDERWEIGHT");
  });

  it("classifies REFERENCE_RANGE (18.5 <= BMI < 25)", () => {
    expect(classifyAdultBmi(22)).toBe("REFERENCE_RANGE");
  });

  it("classifies OVERWEIGHT (25 <= BMI < 30)", () => {
    expect(classifyAdultBmi(27)).toBe("OVERWEIGHT");
  });

  it("classifies OBESITY_CLASS_I (30 <= BMI < 35)", () => {
    expect(classifyAdultBmi(32)).toBe("OBESITY_CLASS_I");
  });

  it("classifies OBESITY_CLASS_II (35 <= BMI < 40)", () => {
    expect(classifyAdultBmi(37)).toBe("OBESITY_CLASS_II");
  });

  it("classifies OBESITY_CLASS_III (BMI >= 40)", () => {
    expect(classifyAdultBmi(41)).toBe("OBESITY_CLASS_III");
  });
});

describe("getReferralUrgency", () => {
  it("maps REFERENCE_RANGE to OPTIONAL", () => {
    expect(getReferralUrgency("REFERENCE_RANGE")).toBe("OPTIONAL");
  });

  it("maps UNDERWEIGHT, OVERWEIGHT and OBESITY_CLASS_I to RECOMMENDED", () => {
    expect(getReferralUrgency("UNDERWEIGHT")).toBe("RECOMMENDED");
    expect(getReferralUrgency("OVERWEIGHT")).toBe("RECOMMENDED");
    expect(getReferralUrgency("OBESITY_CLASS_I")).toBe("RECOMMENDED");
  });

  it("maps SEVERE_UNDERWEIGHT, OBESITY_CLASS_II and OBESITY_CLASS_III to PRIORITY", () => {
    expect(getReferralUrgency("SEVERE_UNDERWEIGHT")).toBe("PRIORITY");
    expect(getReferralUrgency("OBESITY_CLASS_II")).toBe("PRIORITY");
    expect(getReferralUrgency("OBESITY_CLASS_III")).toBe("PRIORITY");
  });
});
