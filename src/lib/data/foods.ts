import type {
  FoodRecord,
  HouseholdPortion,
  HouseholdPortionUnit,
} from "@/lib/types/nutrition";

/** pt-MZ display labels for household portion units. */
export const PORTION_UNIT_LABELS: Record<HouseholdPortionUnit, string> = {
  colher_cha: "colher de chá",
  colher_sopa: "colher de sopa",
  copo: "copo",
  chavena: "chávena",
  concha: "concha",
  prato: "prato",
  fatia: "fatia",
  unidade: "unidade",
  embalagem: "embalagem",
  grama: "grama",
};

function portion(
  unit: HouseholdPortionUnit,
  gramsEquivalent: number,
  labelOverride?: string,
): HouseholdPortion {
  return {
    unit,
    label: labelOverride ?? `1 ${PORTION_UNIT_LABELS[unit]}`,
    gramsEquivalent,
  };
}

const DEMO_SOURCE_ATTRIBUTION =
  "Conjunto de dados de demonstração SG NutriMZ (valores fictícios)";

const DEMO_NOTES =
  "Valor exclusivamente demonstrativo. Não utilizar para decisões alimentares.";

/**
 * Shared provenance metadata applied to every Phase 1A demonstration
 * record. All values are synthetic and have never been verified against a
 * real nutrition database.
 */
const DEMO_PROVENANCE = {
  dataStatus: "DEMO_SYNTHETIC",
  sourceType: "DEMO_DATASET",
  sourceAttribution: DEMO_SOURCE_ATTRIBUTION,
  sourceUrl: undefined,
  lastVerifiedAt: null,
  isEstimated: true,
  confidenceLevel: "NAO_VERIFICADA",
  reviewStatus: "NAO_REVISTO",
  notes: DEMO_NOTES,
} as const;

/**
 * Local demonstration dataset for SG NutriMZ Phase 1A.
 *
 * All entries are `DEMO_SYNTHETIC`, fictional values created for this
 * project. They are not sourced from FAO/INFOODS, USDA FoodData Central,
 * Open Food Facts, or any third-party product database, and must not be
 * treated as verified nutrition facts.
 */
export const demoFoods: FoodRecord[] = [
  {
    id: "xima-milho",
    name: "Papa de milho (xima)",
    description: "Papa espessa de farinha de milho, alimento base do dia a dia.",
    category: "CEREAL_STAPLE",
    nutrientsPer100g: {
      energyKcal: 110,
      proteinG: 1.5,
      carbohydrateG: 24,
      totalFatG: 0.5,
      saturatedFatG: 0.1,
      fibreG: 1,
      totalSugarsG: 0.3,
      sodiumMg: 2,
      potassiumMg: 50,
      calciumMg: 5,
      ironMg: 0.4,
      magnesiumMg: 10,
      zincMg: 0.3,
      vitaminAMcg: 0,
      vitaminCMg: 0,
      vitaminDMcg: 0,
      folateMcg: 5,
    },
    householdPortions: [
      portion("concha", 150),
      portion("prato", 220),
      portion("colher_sopa", 25),
    ],
    ...DEMO_PROVENANCE,
  },
  {
    id: "arroz-branco",
    name: "Arroz branco cozido",
    description: "Arroz branco simples, cozido em água.",
    category: "CEREAL_STAPLE",
    nutrientsPer100g: {
      energyKcal: 130,
      proteinG: 2.4,
      carbohydrateG: 28,
      totalFatG: 0.3,
      saturatedFatG: 0.1,
      fibreG: 0.4,
      totalSugarsG: 0,
      sodiumMg: 1,
      potassiumMg: 35,
      calciumMg: 10,
      ironMg: 0.2,
      magnesiumMg: 12,
      zincMg: 0.5,
      vitaminAMcg: 0,
      vitaminCMg: 0,
      vitaminDMcg: 0,
      folateMcg: 8,
    },
    householdPortions: [
      portion("chavena", 150),
      portion("prato", 180),
      portion("colher_sopa", 20),
    ],
    ...DEMO_PROVENANCE,
  },
  {
    id: "mandioca-cozida",
    name: "Mandioca cozida",
    description: "Raiz de mandioca cozida, servida como acompanhamento.",
    category: "CEREAL_STAPLE",
    nutrientsPer100g: {
      energyKcal: 160,
      proteinG: 1.4,
      carbohydrateG: 38,
      totalFatG: 0.3,
      saturatedFatG: 0.1,
      fibreG: 1.8,
      totalSugarsG: 1.7,
      sodiumMg: 14,
      potassiumMg: 270,
      calciumMg: 16,
      ironMg: 0.3,
      magnesiumMg: 21,
      zincMg: 0.3,
      vitaminAMcg: 1,
      vitaminCMg: 21,
      vitaminDMcg: 0,
      folateMcg: 27,
    },
    householdPortions: [
      portion("prato", 200),
      portion("fatia", 80),
      portion("unidade", 150),
    ],
    ...DEMO_PROVENANCE,
  },
  {
    id: "matapa",
    name: "Matapa (folhas com amendoim)",
    description:
      "Folhas verdes cozinhadas com amendoim moído e coco, prato típico.",
    category: "LEAFY_VEGETABLE_DISH",
    nutrientsPer100g: {
      energyKcal: 150,
      proteinG: 6,
      carbohydrateG: 8,
      totalFatG: 10,
      saturatedFatG: 3,
      fibreG: 4,
      totalSugarsG: 2,
      sodiumMg: 250,
      potassiumMg: 400,
      calciumMg: 120,
      ironMg: 2.5,
      magnesiumMg: 60,
      zincMg: 1.2,
      vitaminAMcg: 300,
      vitaminCMg: 15,
      vitaminDMcg: 0,
      folateMcg: 60,
    },
    householdPortions: [
      portion("concha", 120),
      portion("prato", 200),
      portion("colher_sopa", 30),
    ],
    ...DEMO_PROVENANCE,
  },
  {
    id: "feijao-nhemba",
    name: "Feijão nhemba guisado",
    description: "Feijão nhemba cozinhado em guisado simples.",
    category: "LEGUME_DISH",
    nutrientsPer100g: {
      energyKcal: 130,
      proteinG: 8,
      carbohydrateG: 18,
      totalFatG: 3,
      saturatedFatG: 0.6,
      fibreG: 6,
      totalSugarsG: 1.5,
      sodiumMg: 200,
      potassiumMg: 350,
      calciumMg: 30,
      ironMg: 2,
      magnesiumMg: 45,
      zincMg: 1.1,
      vitaminAMcg: 5,
      vitaminCMg: 2,
      vitaminDMcg: 0,
      folateMcg: 90,
    },
    householdPortions: [
      portion("concha", 130),
      portion("prato", 200),
      portion("copo", 200),
    ],
    ...DEMO_PROVENANCE,
  },
  {
    id: "peixe-grelhado",
    name: "Peixe grelhado",
    description: "Filete de peixe grelhado, sem molhos adicionados.",
    category: "FISH_DISH",
    nutrientsPer100g: {
      energyKcal: 145,
      proteinG: 22,
      carbohydrateG: 0,
      totalFatG: 6,
      saturatedFatG: 1.5,
      fibreG: 0,
      totalSugarsG: 0,
      sodiumMg: 320,
      potassiumMg: 380,
      calciumMg: 20,
      ironMg: 0.8,
      magnesiumMg: 28,
      zincMg: 0.6,
      vitaminAMcg: 15,
      vitaminCMg: 0,
      vitaminDMcg: 5,
      folateMcg: 10,
    },
    householdPortions: [
      portion("unidade", 120, "1 filete"),
      portion("prato", 150),
      portion("fatia", 80),
    ],
    ...DEMO_PROVENANCE,
  },
  {
    id: "banana",
    name: "Banana",
    description: "Banana fresca, unidade média.",
    category: "FRUIT",
    nutrientsPer100g: {
      energyKcal: 90,
      proteinG: 1.1,
      carbohydrateG: 23,
      totalFatG: 0.3,
      saturatedFatG: 0.1,
      fibreG: 2.6,
      totalSugarsG: 12,
      sodiumMg: 1,
      potassiumMg: 360,
      calciumMg: 5,
      ironMg: 0.3,
      magnesiumMg: 27,
      zincMg: 0.2,
      vitaminAMcg: 3,
      vitaminCMg: 9,
      vitaminDMcg: 0,
      folateMcg: 20,
    },
    householdPortions: [portion("unidade", 100, "1 banana média")],
    ...DEMO_PROVENANCE,
  },
  {
    id: "manga",
    name: "Manga",
    description: "Manga fresca, unidade média.",
    category: "FRUIT",
    nutrientsPer100g: {
      energyKcal: 60,
      proteinG: 0.8,
      carbohydrateG: 15,
      totalFatG: 0.4,
      saturatedFatG: 0.1,
      fibreG: 1.6,
      totalSugarsG: 14,
      sodiumMg: 1,
      potassiumMg: 170,
      calciumMg: 11,
      ironMg: 0.2,
      magnesiumMg: 10,
      zincMg: 0.1,
      vitaminAMcg: 54,
      vitaminCMg: 36,
      vitaminDMcg: 0,
      folateMcg: 43,
    },
    householdPortions: [
      portion("unidade", 200, "1 manga média"),
      portion("fatia", 50),
    ],
    ...DEMO_PROVENANCE,
  },
  {
    id: "snack-milho-embalado",
    name: "Snack de milho embalado (exemplo)",
    description: "Salgadinho de milho embalado, exemplo genérico de demonstração.",
    category: "PACKAGED_SNACK",
    nutrientsPer100g: {
      energyKcal: 480,
      proteinG: 6,
      carbohydrateG: 60,
      totalFatG: 22,
      saturatedFatG: 9,
      fibreG: 3,
      totalSugarsG: 2,
      sodiumMg: 600,
      potassiumMg: 120,
      calciumMg: 20,
      ironMg: 1,
      magnesiumMg: 30,
      zincMg: 0.8,
      vitaminAMcg: 0,
      vitaminCMg: 0,
      vitaminDMcg: 0,
      folateMcg: 10,
    },
    householdPortions: [
      portion("embalagem", 30, "1 embalagem pequena"),
      portion("unidade", 30),
    ],
    ...DEMO_PROVENANCE,
  },
  {
    id: "refresco-fruta-acucarado",
    name: "Refresco de fruta açucarado (exemplo)",
    description: "Bebida açucarada sabor fruta, exemplo genérico de demonstração.",
    category: "SWEETENED_DRINK",
    nutrientsPer100g: {
      energyKcal: 42,
      proteinG: 0,
      carbohydrateG: 10.5,
      totalFatG: 0,
      saturatedFatG: 0,
      fibreG: 0,
      totalSugarsG: 10,
      sodiumMg: 5,
      potassiumMg: 5,
      calciumMg: 2,
      ironMg: 0.1,
      magnesiumMg: 1,
      zincMg: 0,
      vitaminAMcg: 0,
      vitaminCMg: 5,
      vitaminDMcg: 0,
      folateMcg: 0,
    },
    householdPortions: [
      portion("copo", 250),
      portion("embalagem", 330, "1 embalagem (330 ml)"),
    ],
    ...DEMO_PROVENANCE,
  },
];

export function getFoodById(id: string): FoodRecord | undefined {
  return demoFoods.find((food) => food.id === id);
}

export function searchFoods(query: string): FoodRecord[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return demoFoods;
  return demoFoods.filter((food) =>
    food.name.toLowerCase().includes(normalized) ||
    food.description?.toLowerCase().includes(normalized),
  );
}
