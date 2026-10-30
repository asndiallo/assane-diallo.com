import { pricing, getTier as tier } from "../config.ts";

import type { Dictionary } from "./en.ts";

const n = pricing.foundingClients;
const names = { profile: "Visibilité", website: "Visibilité + Réservations" };
const nb = " "; // French typography: non-breaking space before ? ! : and currency
const money = (amount: number): string => `${amount.toLocaleString("fr-FR")}${nb}$`;

/** French copy for francophone business owners in the US. Same keys as en.ts, checked by the type. */
export const fr: Dictionary = {
  lang: "fr",
  money,
  colon: `${nb}:`,
  quoted: (text) => `«${nb}${text}${nb}»`,
  newTab: "(s'ouvre dans un nouvel onglet)",
  photoAlt: "Assane Diallo, avec des lunettes rondes et un col roulé bleu marine",
  nav: {
    label: "Principal",
    skip: "Aller au contenu principal",
    work: "Réalisations",
    about: "À propos",
    contact: "Contact",
  },
  language: {
    switchTo: "English",
    /** Same, on the narrowest phones. */
    switchToShort: "EN",
    switchLabel: "Read this page in English",
    switchLang: "en",
  },
  theme: {
    label: "Thème",
    system: "Système",
    light: "Clair",
    dark: "Sombre",
  },
  cta: {
    whatsapp: "Écrivez-moi sur WhatsApp",
    whatsappMessage:
      "Bonjour Assane, j'aimerais un bilan Google gratuit pour mon entreprise. Mon entreprise : ",
    booking: "Réserver un bilan Google gratuit de 15 minutes",
    email: "M'écrire par e-mail",
  },
  footer: {
    tagline:
      "Référencement local et fiche d'établissement Google pour les petites entreprises aux États-Unis, en particulier les entreprises africaines.",
    engineering: "Mon travail d'ingénieur logiciel (en anglais)",
    privacy: "Confidentialité",
    terms: "Conditions",
    social: "Suivre sur les réseaux sociaux",
    languages: "English et français.",
    groups: {
      services: "Services",
      verticals: "Types d'entreprises",
      pricing: "Tarifs",
      how: "Fonctionnement",
      about: "À propos",
    },
  },
  home: {
    meta: {
      title: "SEO local pour petites entreprises aux USA | Assane Diallo",
      description:
        "J'aide les petites entreprises aux États-Unis, surtout africaines, à être trouvées sur Google et à recevoir plus d'appels et de réservations. Bilan gratuit.",
    },
    hero: {
      h1: "Soyez visible sur Google. Recevez plus d'appels et de réservations.",
      subhead: `J'aide les petites entreprises aux États-Unis, surtout africaines, à être bien présentées sur Google${nb}: les bons horaires, de vraies photos, un lien de réservation qui marche. Vous gérez votre entreprise. Je m'occupe de Google.`,
      languages: "English et français.",
    },
    listing: {
      caption: `Illustration${nb}: à quoi peut ressembler votre entreprise sur Google quand votre fiche est complète.`,
      query: "braiding near me",
      name: "Le nom de votre entreprise",
      category: "Salon de tresses",
      open: "Ouvert",
      closes: `Ferme à 19${nb}h`,
      prices: "Prix affichés",
      reviews: "Avis récents",
      actions: ["Appeler", "Réserver", "Itinéraire"],
    },
    whoFor: {
      h2: `Pour qui${nb}?`,
      intro:
        "Les petites entreprises aux États-Unis qui servent une clientèle locale, en particulier les entreprises africaines.",
      points: [
        "Salons, restaurants, artisans, garages et boutiques dont les clients viennent de leur ville.",
        "Les propriétaires trop occupés par leur activité pour apprendre Google.",
        "Ceux qui veulent plus d'appels et de réservations, pas un plan marketing compliqué.",
      ],
      verticalsLink: "Voir ce que je mets en place pour votre type d'entreprise",
    },
    problem: {
      h2: `Vos clients cherchent. Est-ce qu'ils vous trouvent${nb}?`,
      points: [
        `Les gens tapent «${nb}plumber near me${nb}», «${nb}auto repair near me${nb}» ou «${nb}African restaurant near me${nb}» et choisissent parmi les premiers résultats.`,
        "Si vos horaires, votre numéro ou vos prix sont faux ou absents sur Google, ils appellent quelqu'un d'autre.",
        "Si réserver est compliqué, ils abandonnent.",
      ],
    },
    services: {
      h2: "Ce que je mets en place pour vous",
      items: {
        profile: {
          title: "Une fiche Google bien configurée.",
          body: "Les bonnes catégories, vos horaires, vos services, des photos et un lien pour réserver ou appeler.",
        },
        website: {
          title: "Un site simple et rapide.",
          body: "Vos services, vos prix, votre histoire, un plan et l'appel en un geste. Si vous avez déjà un site, je l'améliore.",
        },
        searchPages: {
          title: "Des pages pour ce que les gens cherchent vraiment.",
          body: "Par exemple, votre service, votre coiffure ou votre plat, suivi de votre ville.",
        },
        reviews: {
          title: "Un moyen simple d'obtenir des avis.",
          body: "Un lien et un court message à envoyer à vos clients satisfaits.",
        },
        report: {
          title: "Un suivi mensuel et un rapport en langage clair.",
          body: "Je garde votre fiche à jour et je vous montre les appels, les demandes d'itinéraire, ce qui a changé et la suite.",
        },
      },
      websiteOnly: `Le site et les pages de recherche sont inclus dans la formule ${names.website}.`,
      onlineShops: `Boutiques en ligne${nb}: audits sur demande.`,
      onlineShopsLink: "Voir la boutique avec laquelle je travaille en ce moment",
    },
    steps: {
      h2: "Trois étapes simples",
      items: [
        {
          title: "Bilan gratuit (15 minutes).",
          body: "Sur WhatsApp ou par téléphone, je regarde comment votre entreprise apparaît sur Google et je vous donne les trois corrections prioritaires, même si vous ne travaillez pas avec moi ensuite.",
        },
        {
          title: "Mise en place.",
          body: `Je fais le travail. Vous validez vos photos, vos prix et les textes avant que quoi que ce soit soit en ligne. En général ${pricing.setupWeeks}${nb}semaines. Si ça doit prendre plus longtemps, je vous préviens avant, pas après.`,
        },
        {
          title: "Croissance.",
          body: "Chaque mois, je garde votre fiche à jour et je vous envoie un court rapport sur ce qui marche. C'est compris dans la formule. Résiliable à tout moment.",
        },
      ],
    },
    proof: {
      h2: "Mes premiers clients",
      body: `Je prends mes ${n} premiers projets à un tarif «${nb}client fondateur${nb}». En échange, vous me laissez partager les résultats.`,
      allWork: "Voir toutes les réalisations",
    },
    pricing: {
      h2: "Tarifs",
      intro: "Deux formules. Choisissez celle qui correspond à votre entreprise aujourd'hui.",
      foundingLabel: `Pour mes ${n} premiers clients`,
      standardLabel: `Après mes ${n} premiers clients`,
      startingAt: "À partir de",
      startingAtLower: "à partir de",
      setup: "de mise en place",
      perMonth: "par mois",
      includes: "Mise en place, payée une fois",
      monthlyPlan: "Chaque mois, résiliable à tout moment",
      notes: [
        "Devis final après un bilan gratuit.",
        `La mise en place se paie une fois. Le suivi mensuel et le rapport sont compris dans la formule, sans engagement${nb}: résiliable à tout moment.`,
      ],
      tiers: {
        profile: {
          name: names.profile,
          tagline: "Configuration de la fiche Google",
          summary: "Pour les entreprises qui n'ont pas encore besoin d'un site.",
        },
        website: {
          name: names.website,
          tagline: "Fiche Google + site",
          summary: `Tout ce qu'inclut ${names.profile}, plus un site simple et des pages pour ce que les gens cherchent.`,
        },
      },
    },
    about: {
      h2: "Qui je suis",
      body: "Je m'appelle Assane. Ma cousine tient un salon de tresses à Savannah, et sa fiche Google n'avait jamais été revendiquée. Tout a commencé quand je l'ai corrigée et que j'ai créé son site. Je suis ingénieur logiciel, avec un master en Data Engineering et IA, et j'ai créé et développé une boutique en ligne d'environ 800 pages grâce au référencement naturel, sans publicité payante. Je parle français et anglais, et je travaille avec des entreprises partout aux États-Unis, surtout sur WhatsApp.",
      more: "En savoir plus sur moi",
    },
    faq: {
      h2: "Les questions qu'on me pose",
      items: [
        {
          q: `Ai-je besoin d'un site${nb}?`,
          a: "Pas toujours. Pour beaucoup d'entreprises locales, une fiche Google bien configurée est la première étape. Un site simple aide quand vous voulez montrer vos prix, vos photos et votre histoire.",
        },
        {
          q: `En combien de temps verrai-je des résultats${nb}?`,
          a: "Certaines corrections aident en quelques jours ou semaines. Le classement prend en général quelques mois. Je vous dirai honnêtement à quoi vous attendre pour votre entreprise.",
        },
        {
          q: `Est-ce que je garde le contrôle de mes comptes${nb}?`,
          a: "Oui. Votre fiche Google et votre nom de domaine restent à votre nom. Je suis ajouté comme gestionnaire, et vous pouvez me retirer à tout moment.",
        },
        {
          q: `De quoi avez-vous besoin de ma part${nb}?`,
          a: "Vos horaires, votre liste de prix, des photos et l'accès à votre fiche Google. Je vous guide à chaque étape.",
        },
        {
          q: `Garantissez-vous le classement${nb}?`,
          a: "Non. Personne ne peut honnêtement le faire. Je vous montrerai les changements et les chiffres.",
        },
        {
          q: `Combien ça coûte${nb}?`,
          a: `La formule ${names.profile} (fiche Google) commence à ${money(tier("profile").founding.setup)} de mise en place et ${money(tier("profile").founding.monthly)} par mois. La formule ${names.website} (fiche + site) commence à ${money(tier("website").founding.setup)} de mise en place et ${money(tier("website").founding.monthly)} par mois. Le suivi mensuel garde votre fiche à jour et comprend un rapport en langage clair. Ce sont les tarifs fondateurs pour mes ${n} premiers clients. Vous recevez un devis final après le bilan gratuit.`,
        },
        {
          q: `Y a-t-il un contrat${nb}?`,
          a: "Pas d'engagement long. Le suivi mensuel se paie au mois et vous pouvez arrêter à tout moment.",
        },
        {
          q: `Travaillez-vous avec des entreprises hors de votre ville${nb}?`,
          a: "Oui. Je travaille avec des entreprises partout aux États-Unis. L'essentiel se fait à distance, sur WhatsApp, par téléphone et par e-mail.",
        },
        {
          q: "Do you speak English?",
          a: "Yes. I work in English and French, and this site is also in English.",
          lang: "en",
        },
      ],
    },
    contact: {
      h2: "Commencez par un bilan gratuit",
      body: "Envoyez-moi le nom de votre entreprise sur WhatsApp, ou écrivez-moi par e-mail.",
      privacy: "Comment je traite vos informations",
    },
  },
  work: {
    meta: {
      title: `Réalisations${nb}: études de cas SEO local | Assane Diallo`,
      description:
        "De vrais projets pour des petites entreprises : ce que j'ai mis en place et ce qui a changé. Publiés avec l'accord de chaque propriétaire.",
    },
    h1: "Réalisations",
    lead: "De vrais projets, publiés avec l'accord de chaque propriétaire. Je ne partage que les chiffres qu'il a validés.",
    empty: "Je rédige mes premières études de cas. Posez-moi la question sur WhatsApp.",
  },
  verticals: {
    meta: {
      title: "SEO local par type d'entreprise | Assane Diallo",
      description:
        "Fiche Google et SEO local pour artisans, garages, salons de tresses, restaurants et autres entreprises locales.",
    },
    h1: "Qui j'aide",
    lead: "Les petites entreprises dont les clients viennent du quartier. Choisissez la vôtre pour voir ce que les clients regardent et ce que je mets en place.",
    notListed: `Votre activité n'est pas dans la liste${nb}? Écrivez-moi quand même${nb}: si vos clients vous cherchent près de chez eux, je peux sûrement vous aider.`,
  },
  caseStudy: {
    title: (business, location) => `${business}, ${location}${nb}: ce qui a changé`,
    metaTitle: (business) => `${business}${nb}: étude de cas | Assane Diallo`,
    readMore: (business) => `Voir ce qui a changé pour ${business}`,
    readShort: "Lire l'étude de cas",
    visit: (business) => `Visiter le site de ${business}`,
    all: "Toutes les réalisations",
    facts: "Le projet en bref",
    services: "Services",
    results: "Résultats",
    source: "Source",
    inProgress: "En cours",
    quoteTranslated: "Traduit de l'anglais.",
    inProgressNote:
      "Ce projet est en cours. J'ajouterai les résultats ici quand il y aura assez de données et que le propriétaire les aura validés.",
    home: "Accueil",
  },
  vertical: {
    more: "Voir",
    prices: "les tarifs",
    and: "et",
    how: "le fonctionnement",
    orMessage: ", ou envoyez-moi le nom de votre entreprise.",
  },
  aboutPage: {
    meta: {
      title: "À propos d'Assane Diallo | SEO local en français",
      description:
        "Je m'appelle Assane. J'aide les petites entreprises aux États-Unis, surtout africaines, à être trouvées sur Google. Ingénieur logiciel, français et anglais.",
    },
    h1: "À propos",
    paragraphs: [
      "Je m'appelle Assane. J'aide les petites entreprises aux États-Unis à être trouvées sur Google et à recevoir plus d'appels et de réservations.",
      "Ma spécialité, ce sont les entreprises africaines. Nous partageons la même culture, donc on se comprend vite.",
      "Je suis ingénieur logiciel, avec un master en Data Engineering et IA. J'ai créé et développé une boutique en ligne d'environ 800 pages grâce au référencement naturel, sans publicité payante.",
      "Je travaille en français et en anglais, surtout sur WhatsApp, pour ne pas vous imposer de longues réunions.",
      "Vos comptes restent à votre nom. Je vous explique toujours ce que je fais, pourquoi, et ce que ça a donné.",
      "Tout a commencé en famille. Ma cousine est coiffeuse et ma sœur gère une boutique de vêtements en ligne : toutes les deux font un excellent travail que trop peu de gens parviennent à trouver. Un numéro de téléphone erroné ou des horaires manquants sur Google peuvent faire perdre de vrais clients à une petite entreprise, et j'aime résoudre ce genre de problème. Je veux que la prochaine personne qui cherche près de chez elle vous trouve en premier.",
    ],
    engineering: `Vous cherchez mon travail d'ingénieur${nb}?`,
    engineeringLink: "Voir mes projets (en anglais)",
  },
  thanks: {
    meta: {
      title: "Message envoyé | Assane Diallo",
      description: "Merci pour votre message. Je vous réponds vite, sur WhatsApp ou par e-mail.",
    },
    h1: "Message envoyé",
    lead: "Merci. Je vous réponds vite, sur WhatsApp ou par e-mail, selon ce que vous m'avez laissé.",
    back: "Retour à l'accueil",
  },
  privacy: {
    meta: {
      title: "Confidentialité | Assane Diallo",
      description:
        "Ce que ce site collecte (pas de cookies, pas de publicité) et ce que je fais de vos informations quand vous m'écrivez, réservez un bilan ou m'engagez.",
    },
    h1: "Confidentialité",
    lead: "Pas de cookies, pas de publicité, pas de suivi d'un site à l'autre. Quand vous me contactez, j'utilise vos informations uniquement pour vous répondre et, si nous travaillons ensemble, pour faire le travail.",
    updated: "Dernière mise à jour",
    site: {
      h2: "Ce que ce site collecte",
      paragraphs: [
        `Rien qui permette de vous identifier. Cloudflare Web Analytics compte les visites sans cookies${nb}: la page vue, le site d'où vous venez, votre type de navigateur et d'appareil, et votre pays. Il ne vous suit pas sur d'autres sites.`,
        `Cloudflare héberge aussi ce site${nb}: il traite donc les données techniques dont tout site a besoin pour vous envoyer une page, comme votre adresse IP.`,
        "Si vous choisissez une langue ou un thème de couleur, ce choix est enregistré dans votre propre navigateur et ne m'est jamais envoyé.",
      ],
    },
    contact: {
      h2: "Quand vous me contactez ou réservez un appel",
      intro: `Vous choisissez ce que vous partagez. Voici ce qui me parvient, selon le moyen utilisé${nb}:`,
      whatsapp: {
        label: "WhatsApp",
        body: "votre nom, votre numéro et ce que vous écrivez. La conversation passe par WhatsApp (Meta).",
      },
      booking: {
        label: "Réservation d'un bilan gratuit",
        body: "les informations que vous saisissez sur la page de réservation Google Agenda, comme votre nom et votre e-mail.",
      },
      email: {
        label: "E-mail",
        body: "votre adresse et votre message. Ma messagerie est hébergée par Zoho Mail.",
      },
      form: {
        label: "Formulaire de contact",
        body: "votre nom, votre entreprise, le moyen de vous répondre et votre message, que me transmet un service de formulaires.",
      },
    },
    work: {
      h2: "Quand vous faites appel à moi",
      paragraphs: [
        `La facturation passe par Stripe. Sur une facture ou un lien de paiement, vous indiquez votre nom, le nom de votre entreprise, votre e-mail, votre téléphone et votre adresse de facturation. Stripe utilise l'adresse pour calculer la taxe de vente (sales tax). Les informations de carte et de compte bancaire vont uniquement à Stripe${nb}: je ne les vois jamais.`,
        `Pour faire le travail, je suis ajouté comme gestionnaire des comptes nécessaires${nb}: votre fiche Google, et des outils comme Google Search Console (les recherches qui amènent les gens sur votre site) ou les statistiques de votre site. Je vois ce que ces comptes affichent, comme vos statistiques et vos avis, et je ne m'en sers que pour votre travail et votre rapport mensuel.`,
      ],
    },
    use: {
      h2: "Ce que j'en fais",
      body: "Uniquement vous répondre, préparer votre bilan gratuit et, si vous faites appel à moi, faire le travail et le facturer. Je ne vends pas vos informations, je ne les partage pas à des fins publicitaires et je ne vous inscris à aucune liste de diffusion.",
    },
    keep: {
      h2: "Combien de temps je les garde",
      body: `Tant que nous échangeons ou travaillons ensemble. Si nous ne travaillons finalement pas ensemble, je supprime nos messages et vos informations dans les 12 mois suivant notre dernier échange. Pour mes clients, je garde ce dont le travail a besoin, ainsi que les factures et les données de facturation aussi longtemps que la loi fiscale l'exige (au Texas, au moins 4${nb}ans).`,
    },
    rights: {
      h2: "Consulter, corriger ou supprimer vos informations",
      body: "Vous pouvez me demander à tout moment ce que je détiens sur vous, ou de le corriger ou de le supprimer.",
      whatsappMessage: `Bonjour Assane, au sujet de mes informations${nb}: `,
    },
    services: {
      h2: "Services utilisés",
      intro: `Chacun a sa propre politique de confidentialité${nb}:`,
    },
  },
  terms: {
    meta: {
      title: "Conditions de service | Assane Diallo",
      description:
        "Mise en place, paiement mensuel, résiliation et remboursements quand vous faites appel à moi pour votre fiche Google ou votre site. Sans long contrat.",
    },
    h1: "Conditions de service",
    lead: "Les règles pour travailler ensemble, en termes simples. Payer une facture ou un lien de paiement de ma part signifie que vous les acceptez.",
    updated: "Dernière mise à jour",
    sections: [
      {
        h2: "Ce que vous obtenez",
        paragraphs: [
          "Votre offre et son prix sont ceux de votre devis, de votre facture ou de votre lien de paiement. Chaque offre comprend une mise en place, payée une seule fois, et une partie mensuelle (mises à jour et rapport) incluse dans l'offre.",
          `Je termine en général la mise en place ${pricing.setupWeeks}${nb}semaines après avoir reçu ce dont j'ai besoin de votre part.`,
        ],
      },
      {
        h2: "Paiement",
        paragraphs: [
          "Vous payez la mise en place et le premier mois ensemble, avant que je commence. Ensuite, le prix mensuel est prélevé sur la même carte ou le même compte bancaire au début de chaque mois, et Stripe vous envoie un reçu par e-mail.",
          "Les prix ne comprennent pas la taxe de vente (sales tax). Quand elle est due, elle s'ajoute au prix et figure sur la facture.",
          `Si un paiement échoue, Stripe réessaie pendant 2${nb}semaines au plus. S'il échoue toujours, l'abonnement prend fin et le travail mensuel s'arrête.`,
          `Si je change mes prix, je vous préviens au moins 30${nb}jours avant. Les premiers clients gardent leur prix de lancement.`,
        ],
      },
      {
        h2: "Résiliation",
        paragraphs: [
          "Pas de long contrat. Résiliez quand vous voulez avec le lien de vos e-mails Stripe, ou dites-le-moi simplement. La résiliation prend effet à la fin du mois déjà payé, et je continue le travail jusque-là.",
        ],
      },
      {
        h2: "Remboursements",
        paragraphs: [
          `Mise en place${nb}: remboursement complet si vous annulez avant que je commence le travail. Je vous préviens sur WhatsApp ou par e-mail le jour où je commence. Une fois le travail commencé, la mise en place n'est pas remboursée, car ce travail se fait au début.`,
          `Mensuel${nb}: pas de remboursement d'un mois déjà commencé, sauf accord entre nous.`,
          "Si j'arrête moi-même le travail avant la fin de la mise en place, je rembourse la partie non faite.",
        ],
      },
      {
        h2: "Ce dont j'ai besoin de votre part",
        paragraphs: [
          `L'accès à votre fiche Google et aux autres outils nécessaires (comme Google Search Console, ou votre site pour l'offre ${names.website}), vos horaires, vos prix et vos photos, et votre accord sur les textes. Je ne peux pas avancer plus vite que je ne les reçois.`,
          `Si j'attends après vous pendant plus de 60${nb}jours, je termine ce que je peux et la mise en place est considérée comme terminée. La partie mensuelle continue jusqu'à ce que vous résiliiez.`,
          "Vous êtes responsable de l'exactitude des informations que vous me donnez, et d'avoir le droit d'utiliser les photos et logos que vous m'envoyez.",
        ],
      },
      {
        h2: "Vos comptes restent à vous",
        paragraphs: [
          `Votre fiche Google, vos comptes Search Console et de statistiques, votre nom de domaine, l'hébergement de votre site et tout autre compte restent à votre nom. Vous payez le domaine et l'hébergement directement${nb}: ils ne font pas partie de mes prix. Je suis ajouté comme gestionnaire, jamais comme propriétaire, et je n'ai jamais besoin de vos mots de passe.`,
          "Quand nous arrêtons de travailler ensemble, il vous suffit de me retirer de vos comptes. Tout ce que j'ai fait pour vous et que vous avez payé (site, pages, textes) vous appartient.",
        ],
      },
      {
        h2: "Aucune garantie de classement",
        paragraphs: [
          `C'est Google qui décide des classements, et il peut changer le fonctionnement de la recherche ou suspendre une fiche à tout moment. Je ne garantis ni un classement, ni une position, ni un délai${nb}: le référencement prend en général plusieurs mois. Ce que je promets, c'est de faire le travail prévu dans votre offre et de vous montrer ce qui a changé dans le rapport mensuel.`,
        ],
      },
      {
        h2: "Partager vos résultats",
        paragraphs: [
          "Je ne publie le nom de votre entreprise, vos résultats, des captures d'écran ou vos mots qu'avec votre accord écrit (un message WhatsApp suffit).",
        ],
      },
      {
        h2: "Responsabilité",
        paragraphs: [
          `Si un problème vient de mon travail, ma responsabilité se limite à ce que vous m'avez payé pendant les 12${nb}mois précédents. Je ne suis pas responsable des ventes perdues, ni des décisions de Google ou d'autres plateformes.`,
        ],
      },
      {
        h2: "Le reste",
        paragraphs: [
          `En cas de problème, parlez-m'en d'abord${nb}: la plupart des choses se règlent en un message, et c'est plus rapide qu'une contestation auprès de votre banque.`,
          `Ces conditions relèvent du droit du Texas. Si je les modifie, je préviens mes clients actuels par e-mail avant que le changement s'applique. La version française est une traduction${nb}: en cas de différence, la version anglaise s'applique.`,
        ],
      },
    ],
    contact: {
      h2: `Des questions${nb}?`,
      body: "Posez-les-moi avant de payer, ou à tout moment après.",
      whatsappMessage: `Bonjour Assane, une question sur vos conditions${nb}: `,
    },
  },
  form: {
    h3: "Ou envoyez un message ici",
    name: "Votre nom",
    business: "Nom de l'entreprise et ville",
    reply: "Numéro WhatsApp ou e-mail pour ma réponse",
    message: `Comment puis-je vous aider${nb}?`,
    optional: "facultatif",
    submit: "Envoyer le message",
  },
};
