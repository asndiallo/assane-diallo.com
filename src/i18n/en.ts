import { pricing, type ServiceId, type TierId, getTier as tier } from "../config.ts";

const n = pricing.foundingClients;
/** Package names, defined once: pricing, the services note and the FAQ all use these. */
const names = { profile: "Get Found", website: "Get Booked" } satisfies Record<TierId, string>;
const money = (amount: number): string => `$${amount.toLocaleString("en-US")}`;

export const en = {
  lang: "en",
  money,
  /** Label separator; French puts a non-breaking space before the colon. */
  colon: ":",
  /** Wraps quoted words in the language's quotation marks. */
  quoted: (text: string) => `“${text}”`,
  newTab: "(opens in a new tab)",
  photoAlt: "Assane Diallo, wearing round glasses and a navy turtleneck",
  nav: {
    label: "Main",
    skip: "Skip to main content",
    work: "Client work",
    about: "About",
    contact: "Contact",
  },
  language: {
    /** Text of the link to the other language, written in that language. */
    switchTo: "Français",
    /** Same, on the narrowest phones. */
    switchToShort: "FR",
    switchLabel: "Lire cette page en français",
    switchLang: "fr",
  },
  theme: {
    label: "Color theme",
    system: "System",
    light: "Light",
    dark: "Dark",
  },
  cta: {
    whatsapp: "Message me on WhatsApp",
    whatsappMessage: "Hi Assane, I'd like a free Google check-up for my business. My business is: ",
    booking: "Book a free 15-minute Google check-up",
    email: "Email me",
  },
  footer: {
    tagline: "Local SEO and Google Business Profile setup for small businesses in the US.",
    engineering: "My software engineering work",
    privacy: "Privacy",
    terms: "Terms",
    social: "Follow on social media",
    languages: "English et français.",
    groups: {
      services: "Services",
      verticals: "Business types",
      pricing: "Prices",
      how: "How it works",
      about: "About",
    },
  },
  home: {
    meta: {
      title: "Local SEO for small businesses in the US | Assane Diallo",
      description:
        "I help small businesses in the US get found on Google and win more calls and bookings. Free check-up. English & French.",
    },
    hero: {
      h1: "Get found on Google. Get more calls and bookings.",
      subhead:
        "I help small businesses across the US look right on Google: correct hours, real photos, a booking link that works. You run your business. I handle the Google part.",
      languages: "English et français.",
    },
    listing: {
      caption: "Illustration: how your business can look on Google when your profile is complete.",
      query: "braiding near me",
      name: "Your business name",
      category: "Hair braiding salon",
      open: "Open now",
      closes: "Closes 7 PM",
      prices: "Prices listed",
      reviews: "Recent reviews",
      actions: ["Call", "Book", "Directions"],
    },
    whoFor: {
      h2: "Who this is for",
      intro: "Small businesses in the US that serve customers nearby.",
      points: [
        "Salons, restaurants, home services, garages, and shops that get customers from their own city.",
        "Owners who are busy running the business and don't have time to learn Google.",
        "Anyone who wants more calls and bookings, not a complicated marketing plan.",
      ],
      verticalsLink: "See what I set up for your kind of business",
    },
    problem: {
      h2: "Your customers are searching. Are they finding you?",
      points: [
        'People search things like "plumber near me", "auto repair near me" or "African restaurant near me" and choose from the first few results.',
        "If your hours, phone number, or prices are wrong or missing on Google, they call someone else.",
        "If booking is hard, they give up.",
      ],
    },
    services: {
      h2: "What I set up for you",
      items: {
        profile: {
          title: "Google Business Profile, set up right.",
          body: "Correct categories, hours, services, photos, and a link to book or call.",
        },
        website: {
          title: "A simple, fast website.",
          body: "Your services, prices, story, map, and tap-to-call. If you already have a site, I improve it.",
        },
        searchPages: {
          title: "Pages for what people actually search.",
          body: "For example, your service, style, or dish plus your city.",
        },
        reviews: {
          title: "An easy way to get reviews.",
          body: "A link and a short message you can send to happy customers.",
        },
        report: {
          title: "Monthly updates and a report in plain language.",
          body: "I keep your profile fresh and show you calls, direction requests, what changed, and what's next.",
        },
      } satisfies Record<ServiceId, { title: string; body: string }>,
      websiteOnly: `Website and search pages come with the ${names.website} package.`,
      onlineShops: "Online shops: audits by request.",
      onlineShopsLink: "See the shop I'm working with now",
    },
    steps: {
      h2: "Three simple steps",
      items: [
        {
          title: "Free check-up (15 minutes).",
          body: "On WhatsApp or by phone, I look at how your business shows up on Google and tell you the top three fixes, even if you don't hire me.",
        },
        {
          title: "Setup.",
          body: `I do the work. You approve your photos, prices, and wording before anything goes live. Usually ${pricing.setupWeeks} weeks. If it's going to take longer, I'll tell you before, not after.`,
        },
        {
          title: "Grow.",
          body: "Every month I keep your profile up to date and send a short report on what's working. It's part of the package. Cancel anytime.",
        },
      ],
    },
    proof: {
      h2: "My first clients",
      body: `I'm taking my first ${n} projects at a founding-client price. In return, you let me share the results.`,
      allWork: "See all client work",
    },
    pricing: {
      h2: "Prices",
      intro: "Two packages. Pick the one that fits where your business is today.",
      foundingLabel: `For my first ${n} clients`,
      standardLabel: `After my first ${n} clients`,
      startingAt: "Starting at",
      startingAtLower: "starting at",
      setup: "setup",
      perMonth: "a month",
      includes: "Setup, paid once",
      monthlyPlan: "Every month, cancel anytime",
      notes: [
        "Final quote after a free check-up.",
        "The setup is paid once. Monthly updates and the report are part of the package, with no contract: cancel anytime.",
      ],
      tiers: {
        profile: {
          name: names.profile,
          tagline: "Google profile setup",
          summary: "For businesses that don't need a website yet.",
        },
        website: {
          name: names.website,
          tagline: "Google profile + website",
          summary: `Everything in ${names.profile}, plus a simple website and pages for what people search.`,
        },
      } satisfies Record<TierId, { name: string; tagline: string; summary: string }>,
    },
    about: {
      h2: "Who I am",
      body: "I'm Assane. My cousin runs a braiding salon in Savannah, and her Google profile had never been claimed. Fixing it and building her website is how this started. I'm a software engineer with a Master's in Data Engineering & AI, and I built and grew an SEO-driven ecommerce store to about 800 pages with no ad spend. I speak French and English, and I work with owners across the US, mostly over WhatsApp.",
      more: "More about me",
    },
    faq: {
      h2: "Questions owners ask",
      items: [
        {
          q: "Do I need a website?",
          a: "Not always. For many local businesses, a well-set-up Google profile is the first step. A simple site helps when you want to show prices, photos, and your story.",
        },
        {
          q: "How long until I see results?",
          a: "Some fixes help within days or weeks. Rankings usually take a few months. I'll tell you honestly what to expect for your business.",
        },
        {
          q: "Do I keep control of my accounts?",
          a: "Yes. Your Google profile and domain stay in your name. I'm added as a manager, and you can remove me anytime.",
        },
        {
          q: "What do you need from me?",
          a: "Your hours, price list, photos, and access to your Google profile. I'll guide you through it.",
        },
        {
          q: "Do you guarantee rankings?",
          a: "No. Nobody honestly can. I'll show you the changes and the numbers.",
        },
        {
          q: "What does it cost?",
          a: `${names.profile} (Google profile) starts at ${money(tier("profile").founding.setup)} setup and ${money(tier("profile").founding.monthly)} a month. ${names.website} (profile + website) starts at ${money(tier("website").founding.setup)} setup and ${money(tier("website").founding.monthly)} a month. The monthly part keeps your profile up to date and includes a plain-language report. Those are founding prices for my first ${n} clients. You get a final quote after the free check-up.`,
        },
        {
          q: "Is there a contract?",
          a: "No long contract. The monthly part is month to month, and you can cancel anytime.",
        },
        {
          q: "Do you work with businesses outside your city?",
          a: "Yes. I work with businesses anywhere in the US. Most of the work can be done remotely, on WhatsApp, by phone, and by email.",
        },
        {
          q: "Parlez-vous français ?",
          a: "Oui. Je travaille en français et en anglais, et ce site existe aussi en français.",
          lang: "fr",
        },
      ] as { q: string; a: string; lang?: string }[],
    },
    contact: {
      h2: "Start with a free check-up",
      body: "Send me your business name on WhatsApp, or email me.",
      privacy: "How I handle your details",
    },
  },
  work: {
    meta: {
      title: "Client work: local SEO case studies | Assane Diallo",
      description:
        "Real projects for small businesses: what I set up and what changed. Published with each owner's permission.",
    },
    h1: "Client work",
    lead: "Real projects, published with each owner's permission. I only share numbers the owner has approved.",
    empty: "I'm writing up my first client projects now. Ask me about them on WhatsApp.",
  },
  verticals: {
    meta: {
      title: "Local SEO by type of business | Assane Diallo",
      description:
        "Google profile and local SEO setup for home services, auto repair shops, braiding salons, restaurants and other local businesses.",
    },
    h1: "Who I help",
    lead: "Small businesses that get their customers nearby. Pick yours to see what customers look for and what I set up.",
    notListed:
      "Don't see your kind of business? Message me anyway: if customers search for you nearby, I can probably help.",
  },
  caseStudy: {
    title: (business: string, location: string) => `${business}, ${location}: what changed`,
    metaTitle: (business: string) => `${business}: case study | Assane Diallo`,
    readMore: (business: string) => `See what changed for ${business}`,
    readShort: "Read the case study",
    visit: (business: string) => `Visit the ${business} website`,
    all: "All client work",
    facts: "Project facts",
    services: "Services",
    results: "Results",
    source: "Source",
    inProgress: "In progress",
    /** Shown under a translated quote. With two locales, the original is always the other one. */
    quoteTranslated: "Translated from French.",
    inProgressNote:
      "This project is in progress. I'll add results here once there's enough data and the owner approves them.",
    home: "Home",
  },
  vertical: {
    more: "See",
    prices: "prices",
    and: "and",
    how: "how it works",
    orMessage: ", or message me with your business name.",
  },
  aboutPage: {
    meta: {
      title: "About Assane Diallo | Local SEO in English & French",
      description:
        "I'm Assane. I help small businesses in the US, especially African-owned ones, get found on Google. Software engineer. English and French.",
    },
    h1: "About me",
    paragraphs: [
      "I'm Assane. I help small businesses in the US get found on Google and get more calls and bookings.",
      "My focus is African-owned businesses. I share the culture, so we start on the same page.",
      "I'm a software engineer with a Master's in Data Engineering & AI. I built and grew an SEO-driven ecommerce store to about 800 pages with no ad spend.",
      "I work in English and French, mostly over WhatsApp, so we don't have to schedule long meetings.",
      "Your accounts stay in your name. I'll always tell you what I'm doing, why, and what it did.",
      "This started with family. My cousin does hair and my sister runs an online clothing store, and both do great work that not enough people can find. A wrong phone number or missing hours on Google can cost a small business real customers, and I like fixing that. I want the next person searching nearby to find you first.",
    ],
    engineering: "Looking for my software work?",
    engineeringLink: "See my engineering projects",
  },
  thanks: {
    meta: {
      title: "Message sent | Assane Diallo",
      description: "Thanks for your message. I'll reply soon, on WhatsApp or by email.",
    },
    h1: "Message sent",
    lead: "Thanks. I'll reply soon, on WhatsApp or by email, whichever you gave me.",
    back: "Back to the home page",
  },
  privacy: {
    meta: {
      title: "Privacy | Assane Diallo",
      description:
        "What this site collects (no cookies, no ads) and how I handle your details when you message me, book a free check-up or hire me.",
    },
    h1: "Privacy",
    lead: "No cookies, no ads, no tracking across sites. When you contact me, I use your details only to reply and, if we work together, to do the work.",
    updated: "Last updated",
    site: {
      h2: "What this site collects",
      paragraphs: [
        "Nothing that identifies you. Cloudflare Web Analytics counts visits without cookies: the page viewed, the site you came from, your type of browser and device, and your country. It doesn't follow you to other sites.",
        "Cloudflare also hosts this site, so it handles the technical data every website needs to send you a page, such as your IP address.",
        "If you choose a language or a color theme, that choice is saved in your own browser and never sent to me.",
      ],
    },
    contact: {
      h2: "When you contact me or book a call",
      intro: "You decide what to share. Here is what reaches me, by channel:",
      whatsapp: {
        label: "WhatsApp",
        body: "your name, your number and what you write. The conversation goes through WhatsApp (Meta).",
      },
      booking: {
        label: "Booking a free check-up",
        body: "the details you enter on the Google Calendar booking page, such as your name and email.",
      },
      email: {
        label: "Email",
        body: "your address and your message. My mailbox is hosted by Zoho Mail.",
      },
      form: {
        label: "Contact form",
        body: "your name, your business, how to reach you and your message, delivered to me by a form service.",
      },
    },
    work: {
      h2: "When you hire me",
      paragraphs: [
        "Billing goes through Stripe. On an invoice or a payment link, you enter your name, your business name, your email, your phone and your billing address. Stripe uses the address to work out sales tax. Card and bank details go to Stripe only: I never see them.",
        "To do the work, I'm added as a manager on the accounts it needs: your Google profile, and tools such as Google Search Console (the searches that bring people to your site) or your website's analytics. I see what those accounts show, such as your statistics and reviews, and I use it only for your work and your monthly report.",
      ],
    },
    use: {
      h2: "How I use it",
      body: "Only to reply to you, prepare your free check-up and, if you hire me, do the work and bill for it. I don't sell your details, I don't share them for advertising, and I don't add you to a mailing list.",
    },
    keep: {
      h2: "How long I keep it",
      body: "While we're talking or working together. If we don't end up working together, I delete our messages and your details within 12 months of our last contact. For clients, I keep what the work needs, and invoices and billing records for as long as tax law requires (in Texas, at least 4 years).",
    },
    rights: {
      h2: "Seeing, correcting or deleting your details",
      body: "Ask me at any time what I have about you, or to correct or delete it.",
      whatsappMessage: "Hi Assane, about my details: ",
    },
    services: {
      h2: "Services involved",
      intro: "Each one has its own privacy policy:",
    },
  },
  terms: {
    meta: {
      title: "Terms of service | Assane Diallo",
      description:
        "How setup, monthly billing, cancelling and refunds work when you hire me for your Google profile or website. Plain language, no long contract.",
    },
    h1: "Terms of service",
    lead: "The rules for working together, in plain language. Paying an invoice or a payment link from me means you agree to them.",
    updated: "Last updated",
    sections: [
      {
        h2: "What you get",
        paragraphs: [
          "Your package and its price are the ones on your quote, invoice or payment link. Every package has a setup, paid once, and a monthly part (updates and a report) that is included in it.",
          `I usually finish the setup ${pricing.setupWeeks} weeks after I have what I need from you.`,
        ],
      },
      {
        h2: "Paying",
        paragraphs: [
          "You pay the setup and the first month together, before I start. After that, the monthly price is charged to the same card or bank account at the start of each month, and Stripe emails you a receipt.",
          "Prices don't include sales tax. When tax is due, it's added on top and shown on the invoice.",
          "If a payment fails, Stripe tries again for up to 2 weeks. If it still fails, the subscription ends and the monthly work stops.",
          "If I change my prices, I'll tell you at least 30 days before. Founding clients keep their founding price.",
        ],
      },
      {
        h2: "Cancelling",
        paragraphs: [
          "There's no long contract. Cancel anytime with the link in your Stripe emails, or just tell me. Cancelling takes effect at the end of the month you've already paid for, and I keep working until then.",
        ],
      },
      {
        h2: "Refunds",
        paragraphs: [
          "Setup: a full refund if you cancel before I start the work. I'll tell you on WhatsApp or by email the day I start. Once I've started, the setup isn't refunded, because that work is done up front.",
          "Monthly: no refund for a month that has already started, unless we agree otherwise.",
          "If I stop the work myself before the setup is finished, I refund the part I haven't done.",
        ],
      },
      {
        h2: "What I need from you",
        paragraphs: [
          `Access to your Google profile and to the other tools the work needs (such as Google Search Console, or your website for ${names.website}), your hours, prices and photos, and your OK on the wording. I can only go as fast as I get these.`,
          "If I'm waiting on you for more than 60 days, I finish what I can and the setup counts as done. The monthly part keeps running until you cancel.",
          "You're responsible for the information you give me being true, and for having the right to use the photos and logos you send.",
        ],
      },
      {
        h2: "Your accounts stay yours",
        paragraphs: [
          "Your Google profile, your Search Console and analytics accounts, your domain, your website hosting and any other account stay in your name. You pay for the domain and hosting directly: they're not part of my prices. I'm added as a manager, never as the owner, and I never need your passwords.",
          "When we stop working together, just remove me from your accounts. Everything I made for you and you paid for (website, pages, text) is yours to keep.",
        ],
      },
      {
        h2: "No ranking guarantees",
        paragraphs: [
          "Google decides rankings, and it can change how search works or suspend a profile at any time. I don't guarantee a ranking, a position or a timeline: SEO usually takes months. What I promise is to do the work in your package and to show you what changed in the monthly report.",
        ],
      },
      {
        h2: "Sharing your results",
        paragraphs: [
          "I only publish your business name, results, screenshots or words with your OK in writing (a WhatsApp message counts).",
        ],
      },
      {
        h2: "Responsibility",
        paragraphs: [
          "If something goes wrong because of my work, my responsibility is limited to what you paid me in the 12 months before. I'm not responsible for lost sales, or for decisions made by Google or other platforms.",
        ],
      },
      {
        h2: "Everything else",
        paragraphs: [
          "If there's a problem, talk to me first: most things can be fixed in a message, and it's faster than a dispute with your bank.",
          "These terms follow Texas law. If I change them, I'll tell current clients by email before the change applies. The French version is a translation: if the two differ, the English one applies.",
        ],
      },
    ] as { h2: string; paragraphs: string[] }[],
    contact: {
      h2: "Questions",
      body: "Ask me before you pay, or anytime after.",
      whatsappMessage: "Hi Assane, a question about your terms: ",
    },
  },
  form: {
    h3: "Or send a message here",
    name: "Your name",
    business: "Business name and city",
    reply: "WhatsApp number or email for my reply",
    message: "What would you like help with?",
    optional: "optional",
    submit: "Send message",
  },
};

export type Dictionary = typeof en;
