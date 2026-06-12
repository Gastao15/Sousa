import type { EducationArticle } from "@/lib/types/content";

const GENERAL_ATTRIBUTION =
  "Conteúdo educativo original SG NutriMZ, com base em princípios gerais de nutrição. Não constitui aconselhamento individualizado.";

/**
 * Original educational articles written for SG NutriMZ. These do not
 * reproduce text, structure or terminology from any third-party nutrition
 * product.
 */
export const educationArticles: EducationArticle[] = [
  {
    slug: "como-ler-um-rotulo",
    title: "Como ler um rótulo de informação nutricional",
    summary:
      "Um guia simples para entender os números que aparecem nos rótulos dos produtos embalados.",
    readingTime: "4 min",
    body: [
      "A maioria dos produtos embalados traz uma tabela de informação nutricional, normalmente apresentada por 100 g ou 100 ml e, por vezes, também por porção.",
      "Comece por verificar o tamanho da porção indicado. Muitas vezes, uma embalagem contém mais do que uma porção, o que significa que os valores totais consumidos podem ser superiores aos apresentados numa única linha.",
      "Olhe para a energia (calorias) e compare com outros produtos semelhantes para ter uma ideia geral, mas lembre-se que a energia não é o único factor importante.",
      "Verifique também os açúcares totais, o sódio e as gorduras saturadas — valores mais altos destes nutrientes são, em geral, consumidos com moderação.",
      "Por fim, veja a lista de ingredientes. Os ingredientes aparecem por ordem de quantidade, do maior para o menor.",
      "Esta informação é educativa e geral. Para orientações específicas sobre a sua alimentação, fale com um/a nutricionista.",
    ],
    sourceAttribution: GENERAL_ATTRIBUTION,
  },
  {
    slug: "macronutrientes-em-linguagem-simples",
    title: "Macronutrientes em linguagem simples",
    summary:
      "O que são proteínas, hidratos de carbono e gorduras, e porque é que o corpo precisa de todos eles.",
    readingTime: "5 min",
    body: [
      "Macronutrientes são os nutrientes que o corpo precisa em maiores quantidades: proteínas, hidratos de carbono e gorduras.",
      "As proteínas ajudam a construir e reparar músculos e outros tecidos. Estão presentes, por exemplo, em peixe, feijão, ovos e leite.",
      "Os hidratos de carbono são uma das principais fontes de energia. Encontram-se em alimentos como xima, arroz, mandioca, pão e frutas.",
      "As gorduras também fornecem energia e ajudam o corpo a absorver certas vitaminas. Estão presentes em óleos, amendoim, coco e em alguns peixes.",
      "Não existe um único alimento 'perfeito' — uma alimentação variada, com diferentes grupos de alimentos ao longo do dia, é geralmente uma boa base.",
      "Se tiver uma condição de saúde que exija atenção especial a algum destes nutrientes, procure orientação de um profissional de saúde.",
    ],
    sourceAttribution: GENERAL_ATTRIBUTION,
  },
  {
    slug: "porcoes-moçambicanas",
    title: "Porções moçambicanas: colher, prato, chávena e concha",
    summary:
      "Como usar utensílios comuns em casa para ter uma ideia do tamanho das porções.",
    readingTime: "3 min",
    body: [
      "Nem todas as casas têm uma balança de cozinha, e está tudo bem — utensílios comuns também ajudam a ter uma ideia das quantidades.",
      "Uma colher de sopa, uma chávena, um copo, uma concha ou um prato são referências práticas para descrever quanto se comeu.",
      "No SG NutriMZ, cada alimento de demonstração tem porções sugeridas com estas unidades, para facilitar o registo no diário alimentar.",
      "Estas equivalências em gramas são aproximadas. Tamanhos de pratos, copos e colheres variam de casa para casa.",
      "Use estas porções como ponto de partida e ajuste a quantidade quando achar que comeu mais ou menos do que a porção sugerida.",
    ],
    sourceAttribution: GENERAL_ATTRIBUTION,
  },
  {
    slug: "acucar-em-bebidas",
    title: "Açúcar escondido em bebidas açucaradas",
    summary:
      "Porque vale a pena prestar atenção à quantidade de açúcar em refrescos e bebidas adoçadas.",
    readingTime: "3 min",
    body: [
      "Bebidas açucaradas — como refrescos, refrigerantes e alguns sumos com adição de açúcar — podem conter quantidades significativas de açúcar numa única embalagem.",
      "Como são líquidas, estas bebidas costumam ser consumidas rapidamente, o que pode dificultar perceber a quantidade total de açúcar ingerida.",
      "Comparar o rótulo de diferentes bebidas pode ajudar a identificar opções com menos açúcar adicionado.",
      "A água, o chá sem açúcar e outras bebidas sem adição de açúcar são alternativas comuns para o dia a dia.",
      "Se tiver diabetes ou outra condição que exija atenção ao açúcar, converse com um profissional de saúde sobre o que é adequado para si.",
    ],
    sourceAttribution: GENERAL_ATTRIBUTION,
  },
  {
    slug: "fibra-alimentar",
    title: "Fibra alimentar: porque é importante",
    summary:
      "Uma introdução simples à fibra alimentar e onde encontrá-la em alimentos comuns.",
    readingTime: "3 min",
    body: [
      "A fibra alimentar é a parte dos alimentos de origem vegetal que o corpo não digere completamente, mas que desempenha um papel importante na digestão.",
      "Alimentos como feijão, folhas verdes, frutas com casca e cereais integrais costumam ser boas fontes de fibra.",
      "Incluir variedade de vegetais, leguminosas e frutas nas refeições é uma forma comum de aumentar a ingestão de fibra ao longo do dia.",
      "Aumentar a fibra de forma muito rápida pode causar desconforto digestivo em algumas pessoas — mudanças graduais tendem a ser mais confortáveis.",
      "Esta informação é geral. Pessoas com condições digestivas específicas devem procurar orientação individualizada de um profissional de saúde.",
    ],
    sourceAttribution: GENERAL_ATTRIBUTION,
  },
];

export function getArticleBySlug(slug: string): EducationArticle | undefined {
  return educationArticles.find((article) => article.slug === slug);
}
