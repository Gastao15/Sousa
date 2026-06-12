/**
 * Centralized pt-MZ (Portuguese — Mozambique) strings for SG NutriMZ.
 *
 * Phase 1A ships a single locale. Keeping every user-facing string in one
 * tree makes a future i18n layer (or additional locales) a matter of
 * swapping this module, without touching components.
 */
export const strings = {
  brand: {
    name: "SG NutriMZ",
    tagline: "Alimentação com sentido, feita para Moçambique",
    shortDescription:
      "Aplicação educativa de nutrição para ajudar a entender alimentos, registar refeições e aprender sobre rótulos — pensada para a realidade moçambicana.",
  },

  nav: {
    home: "Início",
    search: "Pesquisar Alimentos",
    compare: "Comparar Produtos",
    education: "Educação Nutricional",
    journal: "Diário Alimentar",
    premium: "Premium",
    consultation: "Falar com Nutricionista",
    demo: "Modo de Demonstração",
    menuLabel: "Menu principal",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },

  footer: {
    privacy: "Privacidade",
    terms: "Termos de Utilização",
    medicalDisclaimer: "Aviso Médico",
    futureFeatures: "Funcionalidades Futuras",
    rightsReserved: "Todos os direitos reservados.",
    builtFor: "Criado para utilizadores em Moçambique.",
  },

  demoBadge: {
    label: "MODO DE DEMONSTRAÇÃO",
    description:
      "Está a utilizar uma versão de demonstração. Os dados ficam guardados apenas neste dispositivo.",
  },

  disclaimerBanner: {
    text:
      "SG NutriMZ é uma ferramenta educativa. Não substitui avaliação, diagnóstico ou tratamento por um profissional de saúde ou nutrição qualificado.",
    linkLabel: "Saber mais",
  },

  estimatedDataWarning: {
    title: "Valor estimado — confirme antes de usar",
    text:
      "Este valor é uma estimativa e pode não corresponder ao produto real. Reveja e confirme antes de registar.",
    demoOnly:
      "Dados exclusivamente demonstrativos. Não utilizar para decisões alimentares.",
  },

  dataStatus: {
    DEMO_SYNTHETIC: {
      label: "Demonstração",
      description: "Valor criado apenas para fins de demonstração.",
    },
    VERIFIED_SOURCE: {
      label: "Fonte verificada",
      description: "Valor proveniente de uma fonte de dados verificada.",
    },
    USER_ENTERED_UNVERIFIED: {
      label: "Inserido pelo utilizador",
      description: "Valor inserido por um utilizador e ainda não verificado.",
    },
    ESTIMATED_REQUIRES_CONFIRMATION: {
      label: "Estimativa — requer confirmação",
      description: "Valor estimado. Confirme antes de utilizar.",
    },
  },

  confidenceLevel: {
    ALTA: "Confiança alta",
    MEDIA: "Confiança média",
    BAIXA: "Confiança baixa",
    NAO_VERIFICADA: "Não verificada",
  },

  sourceAttribution: {
    label: "Fonte",
    lastVerified: "Última verificação",
    neverVerified: "Ainda não verificado",
    url: "Ver fonte",
  },

  common: {
    confirm: "Confirmar",
    cancel: "Cancelar",
    save: "Guardar",
    edit: "Editar",
    remove: "Remover",
    back: "Voltar",
    next: "Seguinte",
    close: "Fechar",
    learnMore: "Saber mais",
    seeDetails: "Ver detalhes",
    perPortion: "por porção",
    per100g: "por 100 g",
    search: "Pesquisar",
    optional: "opcional",
    yes: "Sim",
    no: "Não",
    loading: "A carregar…",
    today: "Hoje",
  },

  placeholder: {
    laterPhase: "Funcionalidade prevista para uma fase posterior.",
  },

  home: {
    heroTitle: "Conheça melhor o que está no seu prato",
    heroSubtitle:
      "Pesquise alimentos e produtos, registe as suas refeições e aprenda sobre nutrição — tudo em português de Moçambique, pensado para funcionar bem mesmo com internet limitada.",
    ctaSearch: "Pesquisar alimentos",
    ctaDemo: "Experimentar versão de demonstração",
    ctaJournal: "Abrir diário alimentar",
    featuresTitle: "O que pode fazer com o SG NutriMZ",
    features: [
      {
        title: "Pesquisar alimentos e produtos",
        text: "Encontre informação nutricional de alimentos do dia a dia e produtos embalados.",
      },
      {
        title: "Registar refeições rapidamente",
        text: "Use o diário alimentar com porções moçambicanas como colher, prato ou copo.",
      },
      {
        title: "Comparar produtos",
        text: "Veja lado a lado calorias, macronutrientes e micronutrientes selecionados.",
      },
      {
        title: "Aprender sobre rótulos e nutrição",
        text: "Artigos curtos e práticos sobre como interpretar rótulos e fazer escolhas informadas.",
      },
    ],
    mozambiqueTitle: "Pensado para Moçambique",
    mozambiqueText:
      "Interface leve, em português de Moçambique, com porções e alimentos do dia a dia, preparada para funcionar em telemóveis acessíveis e ligações de internet mais lentas.",
  },

  search: {
    title: "Pesquisar Alimentos",
    subtitle:
      "Procure alimentos do dia a dia e produtos embalados de demonstração.",
    placeholder: "Pesquisar por nome, ex.: xima, matapa, feijão…",
    noResults: "Nenhum alimento encontrado para esta pesquisa.",
    resultsCount: (n: number) =>
      n === 1 ? "1 resultado encontrado" : `${n} resultados encontrados`,
    categoryLabel: "Categoria",
    viewProduct: "Ver detalhes",
  },

  categories: {
    CEREAL_STAPLE: "Base de cereais",
    LEAFY_VEGETABLE_DISH: "Prato de folhas verdes",
    LEGUME_DISH: "Prato de leguminosas",
    FISH_DISH: "Prato de peixe",
    FRUIT: "Fruta",
    PACKAGED_SNACK: "Snack embalado",
    SWEETENED_DRINK: "Bebida açucarada",
  },

  product: {
    backToSearch: "Voltar à pesquisa",
    nutrientsTitle: "Informação nutricional",
    per100gTab: "Por 100 g",
    perPortionTab: "Por porção",
    portionLabel: "Porção",
    chooseAddToJournal: "Adicionar ao diário",
    compareAdd: "Adicionar à comparação",
    notesTitle: "Notas",
    nutrientNames: {
      energyKcal: "Energia",
      proteinG: "Proteína",
      carbohydrateG: "Hidratos de carbono",
      totalFatG: "Gordura total",
      saturatedFatG: "Gordura saturada",
      fibreG: "Fibra",
      totalSugarsG: "Açúcares totais",
      sodiumMg: "Sódio",
      potassiumMg: "Potássio",
      calciumMg: "Cálcio",
      ironMg: "Ferro",
      magnesiumMg: "Magnésio",
      zincMg: "Zinco",
      vitaminAMcg: "Vitamina A",
      vitaminCMg: "Vitamina C",
      vitaminDMcg: "Vitamina D",
      folateMcg: "Folato",
    },
    nutrientUnits: {
      energyKcal: "kcal",
      proteinG: "g",
      carbohydrateG: "g",
      totalFatG: "g",
      saturatedFatG: "g",
      fibreG: "g",
      totalSugarsG: "g",
      sodiumMg: "mg",
      potassiumMg: "mg",
      calciumMg: "mg",
      ironMg: "mg",
      magnesiumMg: "mg",
      zincMg: "mg",
      vitaminAMcg: "µg",
      vitaminCMg: "mg",
      vitaminDMcg: "µg",
      folateMcg: "µg",
    },
  },

  compare: {
    title: "Comparar Produtos",
    subtitle:
      "Escolha até três alimentos ou produtos para comparar lado a lado.",
    addProduct: "Adicionar produto",
    removeProduct: "Remover",
    emptySlot: "Escolher alimento…",
    limitReached:
      "Atingiu o limite de comparações gratuitas este mês. Veja as opções Premium para comparações ilimitadas.",
    usageLabel: (used: number, limit: number) =>
      `Comparações gratuitas utilizadas este mês: ${used} de ${limit}`,
  },

  education: {
    title: "Educação Nutricional",
    subtitle:
      "Artigos curtos sobre nutrição, rótulos e hábitos alimentares saudáveis — sem jargão.",
    readArticle: "Ler artigo",
    backToList: "Voltar à educação nutricional",
    sourceNote:
      "Estes artigos têm fins educativos gerais e não substituem aconselhamento profissional individualizado.",
  },

  premium: {
    title: "SG NutriMZ Premium",
    subtitle:
      "Recursos adicionais para quem quer acompanhar a alimentação com mais detalhe.",
    currentPlan: "Plano atual",
    freePlanName: "Gratuito",
    weeklyPlanName: "Semanal",
    monthlyPlanName: "Mensal",
    priceLabel: "Preço",
    pricePlaceholder: "XXX MT",
    perWeek: "por semana",
    perMonth: "por mês",
    mockNotice:
      "Os planos abaixo são apenas demonstrativos. Nenhum pagamento real é processado nesta fase.",
    selectPlan: "Escolher plano (demonstração)",
    selected: "Selecionado (demonstração)",
    benefitsTitle: "O que está incluído",
    freeBenefits: [
      "Pesquisa de alimentos ilimitada",
      "5 análises avançadas gratuitas por mês",
      "Comparações de produtos limitadas",
    ],
    paidBenefits: [
      "Análises avançadas ilimitadas (demonstração)",
      "Comparações de produtos ilimitadas (demonstração)",
      "Relatórios semanais (em fase futura)",
      "Acesso prioritário a novas funcionalidades",
    ],
    paymentMethodsTitle: "Métodos de pagamento previstos",
    paymentMethodsNote:
      "Estes métodos ainda não estão activos. Serão integrados em fases futuras.",
  },

  consultation: {
    title: "Pedir Consulta com Nutricionista",
    subtitle:
      "Preencha os dados abaixo para solicitar um contacto de um/a nutricionista. Esta funcionalidade está em modo de demonstração e não envia dados a nenhum profissional.",
    nameLabel: "Nome",
    contactLabel: "Contacto (telefone ou email)",
    topicLabel: "Sobre o que gostaria de falar?",
    topicPlaceholder: "Ex.: alimentação equilibrada, dúvidas sobre rótulos…",
    submit: "Enviar pedido (demonstração)",
    successTitle: "Pedido registado (demonstração)",
    successText:
      "Em modo de demonstração, este pedido não é enviado a nenhum profissional real. Numa fase futura, será encaminhado para agendamento.",
    disclaimer:
      "Este formulário não é um canal de emergência. Em caso de emergência médica, procure imediatamente um serviço de saúde.",
  },

  privacy: {
    title: "Privacidade",
    intro:
      "Esta é uma versão preliminar da política de privacidade do SG NutriMZ, criada para a fase de demonstração.",
    sections: [
      {
        heading: "Dados nesta versão de demonstração",
        text:
          "Nesta fase, a aplicação não recolhe dados pessoais reais. As informações que introduzir (refeições, notas, preferências de demonstração) ficam guardadas apenas no armazenamento local do seu dispositivo (localStorage) e podem ser apagadas a qualquer momento, limpando os dados do navegador.",
      },
      {
        heading: "Sem autenticação real",
        text:
          "O acesso de demonstração não cria uma conta real, não usa palavras-passe reais e não armazena credenciais em texto simples.",
      },
      {
        heading: "Sem recolha de dados de saúde",
        text:
          "O SG NutriMZ não recolhe nem armazena informação clínica ou de saúde. Os registos do diário alimentar destinam-se apenas a fins educativos e de demonstração.",
      },
      {
        heading: "Próximos passos",
        text:
          "Numa fase futura, esta política será revista por um profissional jurídico para cobrir contas reais, consentimento explícito, exportação e eliminação de dados.",
      },
    ],
  },

  terms: {
    title: "Termos de Utilização",
    intro:
      "Esta é uma versão preliminar dos termos de utilização do SG NutriMZ, criada para a fase de demonstração.",
    sections: [
      {
        heading: "Finalidade educativa",
        text:
          "O SG NutriMZ destina-se exclusivamente a fins educativos sobre nutrição e não constitui aconselhamento médico, diagnóstico ou tratamento.",
      },
      {
        heading: "Conteúdo de demonstração",
        text:
          "Os alimentos, valores nutricionais, preços e planos apresentados nesta fase são exemplos de demonstração e não representam produtos, preços ou valores reais.",
      },
      {
        heading: "Sem garantias",
        text:
          "A aplicação é fornecida tal como está, sem garantias de exatidão. Os valores apresentados podem conter erros ou estar incompletos.",
      },
      {
        heading: "Revisão futura",
        text:
          "Estes termos serão revistos por um profissional jurídico antes de qualquer disponibilização pública ou comercial.",
      },
    ],
  },

  medicalDisclaimer: {
    title: "Aviso Médico",
    intro:
      "Leia este aviso com atenção antes de utilizar o SG NutriMZ.",
    points: [
      "O SG NutriMZ é uma ferramenta educativa sobre alimentação e nutrição.",
      "Não diagnostica doenças, não prescreve dietas terapêuticas e não recomenda alterações de medicação.",
      "Não substitui a avaliação de um médico, nutricionista ou outro profissional de saúde qualificado.",
      "Os valores nutricionais apresentados podem ser estimativas e devem ser confirmados antes de qualquer decisão alimentar.",
      "Em caso de sintomas graves, urgência médica ou emergência, procure imediatamente um serviço de saúde.",
      "Se tiver uma condição de saúde específica (por exemplo diabetes, doença renal, doença hepática, gravidez, amamentação, alergias, perturbações alimentares ou estiver a tomar medicação), consulte um profissional de saúde antes de alterar a sua alimentação.",
    ],
  },

  referral: {
    bannerTitle: "Aviso importante",
    bannerText:
      "Detetámos que mencionou um tema que pode beneficiar de acompanhamento profissional. O SG NutriMZ não substitui aconselhamento médico ou nutricional individualizado.",
    ctaConsultation: "Pedir consulta com nutricionista",
    ctaDisclaimer: "Ver aviso médico completo",
    emergencyNote:
      "Se está numa situação de emergência médica, procure imediatamente um serviço de saúde. Esta aplicação não presta apoio de emergência.",
  },

  journal: {
    title: "Diário Alimentar",
    subtitle: "Registe as suas refeições do dia e veja os totais.",
    addEntry: "Adicionar refeição",
    emptyDay: "Ainda não há refeições registadas para este dia.",
    dailyTotalsTitle: "Totais do dia",
    previousDay: "Dia anterior",
    nextDay: "Dia seguinte",
    quickLogCta: "Registo rápido por texto",
    mealTypes: {
      PEQUENO_ALMOCO: "Pequeno-almoço",
      ALMOCO: "Almoço",
      JANTAR: "Jantar",
      LANCHE: "Lanche",
    },
    entryEditTitle: "Editar entrada",
    entryRemoveConfirm: "Remover esta entrada do diário?",
  },

  journalAdd: {
    title: "Adicionar Refeição",
    subtitle: "Escolha o alimento, a refeição, a porção e a quantidade.",
    mealTypeLabel: "Refeição",
    foodLabel: "Alimento",
    foodPlaceholder: "Escolha um alimento de demonstração…",
    portionLabel: "Porção",
    quantityLabel: "Quantidade de porções",
    notesLabel: "Notas (opcional)",
    notesPlaceholder: "Ex.: sem sal, porção pequena…",
    dateLabel: "Data",
    submit: "Guardar no diário",
    cancel: "Cancelar",
  },

  quickLog: {
    title: "Registo Assistido",
    badge: "Registo assistido — requer confirmação",
    subtitle:
      "Escreva o que comeu em linguagem natural. O SG NutriMZ vai sugerir alimentos de demonstração correspondentes para confirmar.",
    placeholder: "Ex.: Comi xima com matapa e peixe grelhado ao almoço.",
    submit: "Procurar correspondências",
    suggestionsTitle: "Sugestões encontradas",
    noMatches:
      "Não foram encontradas correspondências no conjunto de demonstração. Tente outras palavras (ex.: xima, matapa, feijão, peixe).",
    confirmInstruction:
      "Reveja cada sugestão, ajuste a porção e confirme antes de adicionar ao diário.",
    addSelected: "Adicionar selecionados ao diário",
    futureNote:
      "Numa fase futura, esta funcionalidade poderá usar reconhecimento de linguagem natural mais avançado. Por agora, nenhuma inferência automática é feita — toda a confirmação é manual.",
  },

  usage: {
    advancedAnalysisLabel: "Análises avançadas gratuitas este mês",
    comparisonLabel: "Comparações gratuitas este mês",
    remaining: (used: number, limit: number) =>
      `${Math.max(limit - used, 0)} de ${limit} restantes`,
    limitReachedTitle: "Limite gratuito atingido",
    limitReachedText:
      "Atingiu o limite de utilização gratuita este mês. Esta funcionalidade fica disponível novamente no próximo mês, ou pode explorar os planos Premium (demonstração).",
    seePremium: "Ver planos Premium",
  },

  demoEntry: {
    title: "Entrar em Modo de Demonstração",
    subtitle:
      "Experimente o SG NutriMZ com um perfil de demonstração. Não é necessária palavra-passe nem dados reais.",
    nameLabel: "Como quer ser chamado/a? (opcional)",
    namePlaceholder: "Ex.: Visitante",
    startButton: "Entrar em modo de demonstração",
    note:
      "Nenhuma conta real é criada. Os dados ficam apenas neste dispositivo e podem ser limpos a qualquer momento.",
  },

  demoDashboard: {
    title: "Painel de Demonstração",
    welcome: (name: string) => `Bem-vindo(a), ${name}`,
    summaryTitle: "Resumo de hoje",
    quickLinksTitle: "Acesso rápido",
    exitDemo: "Saír do modo de demonstração",
    links: {
      journal: "Abrir diário alimentar",
      search: "Pesquisar alimentos",
      compare: "Comparar produtos",
      education: "Educação nutricional",
    },
  },

  futureFeaturesPage: {
    title: "Funcionalidades Futuras",
    subtitle:
      "Estas funcionalidades estão planeadas para fases posteriores do SG NutriMZ e ainda não estão activas.",
    groups: {
      capture: "Captura de dados",
      assistance: "Assistência e conteúdo",
      payments: "Pagamentos",
      management: "Gestão e relatórios",
    },
  },

  bmi: {
    nav: "IMC",
    landingCard: {
      title: "Calcule gratuitamente o seu IMC",
      subtitle:
        "Conheça este indicador inicial e saiba quando procurar acompanhamento nutricional.",
      cta: "Calcular IMC",
    },
    page: {
      title: "Calculadora de IMC",
      subtitle:
        "Calcule o seu Índice de Massa Corporal (IMC) — gratuito, sem necessidade de criar conta.",
      freeNote:
        "Esta calculadora é sempre gratuita e não utiliza as suas análises avançadas gratuitas.",
      aboutLink: "Saber mais sobre o IMC",
      resultLink: "Ver resultado guardado",
    },
    form: {
      weightLabel: "Peso (kg)",
      heightLabel: "Altura",
      heightUnitLabel: "Unidade de altura",
      heightUnitCm: "Centímetros (cm)",
      heightUnitM: "Metros (m)",
      ageLabel: "Idade (anos)",
      waistLabel: "Perímetro da cintura (cm) — opcional",
      pregnantLabel: "Estou grávida",
      adultOnlyNote:
        "A classificação apresentada destina-se apenas a adultos (18 anos ou mais).",
      redFlagsTitle: "Tem alguma das seguintes situações? (opcional)",
      redFlags: {
        DIABETES: "Diabetes",
        HIPERTENSAO: "Hipertensão arterial",
        DOENCA_RENAL: "Doença renal",
        DOENCA_HEPATICA: "Doença hepática",
        AMAMENTACAO: "A amamentar",
        PERTURBACAO_ALIMENTAR: "Perturbação alimentar",
        ALERGIAS: "Alergia alimentar",
        MEDICACAO: "Estou a tomar medicação",
        EMERGENCIA: "Sintomas de emergência (ex.: dor no peito, falta de ar)",
      },
      consultationRequestLabel: "Quero solicitar uma consulta de nutrição",
      submit: "Calcular IMC",
      invalidWeight: "Introduza um peso válido, entre 20 e 300 kg.",
      invalidHeight: "Introduza uma altura válida.",
      invalidAge: "Introduza uma idade válida (0 a 120 anos).",
    },
    result: {
      title: "O seu resultado",
      bmiLabel: "IMC",
      classificationLabel: "Classificação",
      saveButton: "Guardar neste dispositivo",
      deleteButton: "Apagar resultado",
      consentLabel:
        "Aceito guardar este resultado apenas neste dispositivo (armazenamento local do navegador).",
      savedNote: "Resultado guardado neste dispositivo.",
      deletedNote: "Resultado apagado deste dispositivo.",
      savedAtLabel: "Guardado em",
      localOnlyNote:
        "Este resultado só é guardado se escolher \"Guardar neste dispositivo\" e fica apenas no armazenamento local do navegador — nunca é enviado para nenhum servidor. Pode apagá-lo em qualquer momento.",
      unintentionalWeightLossLabel:
        "Esta perda de peso não foi intencional?",
      unintentionalWeightLossReferral:
        "Perda de peso não intencional pode ter várias causas e benefícia de avaliação profissional.",
    },
    classifications: {
      SEVERE_UNDERWEIGHT: "Baixo peso acentuado",
      UNDERWEIGHT: "Baixo peso",
      REFERENCE_RANGE: "Intervalo de referência para adultos",
      OVERWEIGHT: "Excesso de peso",
      OBESITY_CLASS_I: "Obesidade — Classe I",
      OBESITY_CLASS_II: "Obesidade — Classe II",
      OBESITY_CLASS_III: "Obesidade — Classe III",
    },
    classificationDetails: {
      SEVERE_UNDERWEIGHT: {
        description:
          "O seu IMC está bastante abaixo do intervalo de referência habitual para adultos. Este valor está associado a maior risco para a saúde.",
        priorityWarning:
          "Este resultado benefícia de avaliação profissional prioritária.",
      },
      UNDERWEIGHT: {
        description:
          "O seu IMC está abaixo do intervalo de referência habitual para adultos. Uma avaliação nutricional pode ajudar a compreender melhor a sua situação.",
      },
      REFERENCE_RANGE: {
        description:
          "O seu IMC está dentro do intervalo de referência habitual para adultos. Continue a cultivar hábitos alimentares equilibrados e variados.",
      },
      OVERWEIGHT: {
        description:
          "O seu IMC está acima do intervalo de referência habitual para adultos. Uma avaliação preventiva pode ajudar a identificar hábitos e factores relevantes para a sua saúde.",
      },
      OBESITY_CLASS_I: {
        description:
          "O seu IMC está significativamente acima do intervalo de referência habitual para adultos, o que está associado a maior risco para a saúde. O IMC, por si só, não diagnostica nenhuma doença.",
      },
      OBESITY_CLASS_II: {
        description:
          "O seu IMC está significativamente acima do intervalo de referência habitual para adultos, o que está associado a risco aumentado para a saúde. O IMC, por si só, não diagnostica nenhuma doença.",
      },
      OBESITY_CLASS_III: {
        description:
          "O seu IMC está muito acima do intervalo de referência habitual para adultos, o que está associado a risco elevado para a saúde. O IMC, por si só, não diagnostica nenhuma doença.",
      },
    },
    exclusions: {
      childOrAdolescentTitle: "Avaliação para crianças e adolescentes",
      childOrAdolescentText:
        "A avaliação do estado nutricional de crianças e adolescentes requer interpretação do IMC para a idade e outros parâmetros de crescimento. Solicite uma avaliação profissional.",
      childOrAdolescentCta: "Marcar avaliação nutricional",
      pregnancyTitle: "IMC durante a gravidez",
      pregnancyText:
        "Durante a gravidez, o IMC deve ser interpretado no contexto clínico adequado. Solicite acompanhamento com um profissional de saúde.",
      pregnancyCta: "Solicitar acompanhamento profissional",
    },
    referral: {
      OPTIONAL:
        "Se desejar, pode solicitar uma avaliação nutricional para obter orientações personalizadas.",
      RECOMMENDED:
        "Recomenda-se marcar uma consulta com um/a nutricionista para uma avaliação mais completa.",
      PRIORITY:
        "Recomenda-se solicitar acompanhamento especializado com prioridade.",
      ctas: {
        OPTIONAL: "Solicitar avaliação nutricional",
        RECOMMENDED: "Marcar consulta com nutricionista",
        PRIORITY: "Solicitar acompanhamento especializado",
      },
    },
    disclaimer: {
      main:
        "O IMC é um indicador inicial de rastreio baseado na relação entre peso e altura. Não substitui uma avaliação nutricional individualizada nem confirma a presença de doença.",
      factors:
        "Outros factores, como perímetro da cintura, composição corporal, pressão arterial, exames laboratoriais, hábitos alimentares e história clínica, podem ser relevantes para a avaliação profissional.",
    },
    about: {
      title: "Sobre o IMC",
      subtitle:
        "O que é o Índice de Massa Corporal, como é calculado e quais são os seus limites.",
      whatIsTitle: "O que é o IMC?",
      whatIsText:
        "O Índice de Massa Corporal (IMC) é calculado a partir do peso e da altura: IMC = peso (kg) ÷ altura (m)². É amplamente utilizado como indicador inicial de rastreio em adultos.",
      tableTitle: "Intervalos de referência para adultos",
      limitationsTitle: "Limitações importantes",
      limitations: [
        "O IMC não distingue massa gorda de massa muscular, nem mostra como a gordura está distribuída no corpo.",
        "O IMC não é aplicável da mesma forma a crianças, adolescentes ou pessoas grávidas.",
        "O IMC não considera idade, sexo, etnia, nível de atividade física ou condições de saúde específicas.",
        "Um IMC dentro do intervalo de referência não garante boa saúde, e um IMC fora desse intervalo não significa, por si só, doença.",
      ],
      backToCalculator: "Ir para a calculadora de IMC",
    },
    resultPage: {
      title: "Resultado de IMC guardado",
      emptyTitle: "Não há nenhum resultado guardado",
      emptyText:
        "Ainda não guardou nenhum resultado de IMC neste dispositivo. Pode calcular o seu IMC na calculadora.",
      backToCalculator: "Ir para a calculadora de IMC",
    },
  },

  placeholders: {
    barcodeScanner: {
      title: "Leitura de código de barras",
      text: "Aponte a câmara para o código de barras de um produto para obter informação nutricional automaticamente.",
    },
    labelScanner: {
      title: "Leitura de rótulo por foto",
      text: "Fotografe o rótulo nutricional de um produto para preencher os valores automaticamente.",
    },
    voiceLogging: {
      title: "Registo por voz",
      text: "Registe refeições falando em vez de escrever.",
    },
    mealPhoto: {
      title: "Reconhecimento de refeição por foto",
      text: "Fotografe a sua refeição para sugestões automáticas de alimentos.",
    },
    aiAssistant: {
      title: "Assistente educativo com IA",
      text: "Tire dúvidas sobre nutrição com um assistente conversacional educativo.",
    },
    verifiedDatabase: {
      title: "Base de dados verificada de produtos locais",
      text: "Acesso a uma base de dados de produtos moçambicanos validada com fontes oficiais.",
    },
    consultationScheduling: {
      title: "Agendamento de consulta",
      text: "Marque consultas diretamente com nutricionistas parceiros.",
    },
    mpesa: { title: "M-Pesa", text: "Pagamento via M-Pesa." },
    emola: { title: "e-Mola", text: "Pagamento via e-Mola." },
    mkesh: { title: "mKesh", text: "Pagamento via mKesh." },
    stripe: {
      title: "Stripe (mercados internacionais)",
      text: "Pagamento por cartão para utilizadores fora de Moçambique.",
    },
    adminDashboard: {
      title: "Painel administrativo",
      text: "Gestão de conteúdos, utilizadores e moderação de dados.",
    },
    weeklyReport: {
      title: "Relatório semanal",
      text: "Resumo semanal dos padrões alimentares registados.",
    },
    savedFoods: {
      title: "Alimentos guardados",
      text: "Guarde alimentos favoritos para acesso rápido.",
    },
    hydration: {
      title: "Registo de hidratação",
      text: "Acompanhe a ingestão diária de líquidos.",
    },
    recipes: {
      title: "Receitas",
      text: "Receitas locais com informação nutricional associada.",
    },
    offlineSync: {
      title: "Sincronização offline",
      text: "Continue a usar a aplicação sem internet e sincronize mais tarde.",
    },
  },
} as const;

export type Strings = typeof strings;
