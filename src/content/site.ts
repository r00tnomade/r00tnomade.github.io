/**
 * All website content lives in this file.
 *
 * - Text wrapped in todo('…') is placeholder copy. It renders in a muted,
 *   dashed style on the site so it is easy to spot. Replace it with a plain
 *   string when the final text is ready.
 * - Image paths are relative to src/assets/images/. To swap a placeholder,
 *   replace the file with your own image under the same name (see
 *   ASSETS_NEEDED.md). If the format changes (e.g. .jpg), update the path here.
 */

export type Copy = string | { todo: string };
export const todo = (text: string): Copy => ({ todo: text });

export interface SiteImage {
  src: string;
  alt: string;
  /** CSS object-position, e.g. 'center 30%'. Controls the crop. */
  position?: string;
}

export const site = {
  name: 'Sami Adam Moughli',
  // GitHub Pages address. Change this if you later add a custom domain.
  url: 'https://r00tnomade.github.io',
  description:
    'Sami Adam Moughli is a Computer Engineering student at Technische Hochschule Mannheim, working on intelligent systems that connect software, machine learning and the physical world.',
  locale: 'en',
  ogImage: '/og-image.jpg',
};

export const social = {
  // Taken from your CV. Change here if you prefer a different public address.
  email: 'samiadammoughli@proton.me',
  github: 'https://github.com/r00tnomade',
  linkedin: 'https://www.linkedin.com/in/sami-adam-moughli-46371b2a4/',
};

export const nav = {
  left: [
    { label: 'About', href: '#about' },
    { label: 'Research', href: '#research' },
  ],
  right: [
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ],
};

export const hero = {
  image: {
    src: 'hero/hero-portrait.webp',
    alt: 'Sami Adam Moughli',
    position: 'center 40%',
  } satisfies SiteImage,
  // Portrait crop served below 700px wide.
  mobileImage: {
    src: 'hero/hero-portrait-mobile.webp',
    alt: 'Sami Adam Moughli',
    position: 'center 35%',
  } satisfies SiteImage,
  /**
   * 'ink' = dark navigation, for photographs with a light sky at the top.
   * 'light' = white navigation, for darker photographs.
   */
  navTone: 'light' as 'ink' | 'light',
  line: 'Building intelligent systems for the physical world.',
};

/**
 * Logo strip beneath the hero. Files are white, transparent derivatives built by
 * `node scripts/prepare-logos.mjs` from the uploaded originals in the project root.
 * `height` is the desktop display height in px; widths follow each logo's own ratio,
 * so tune it per logo until both carry the same visual weight.
 */
export const affiliations = [
  {
    name: 'Technische Hochschule Mannheim',
    image: { src: 'logos/th-mannheim-white.png', alt: 'Technische Hochschule Mannheim' },
    height: 47,
  },
  {
    // Student Collective membership, not employment.
    name: 'OpenAI Student Collective',
    image: { src: 'logos/openai-white.png', alt: 'OpenAI' },
    height: 52,
  },
];

export const focus = {
  label: 'Areas of focus',
  items: ['Applied Machine Learning', 'Autonomous Systems', 'AI Systems Engineering'],
};

export interface Story {
  title: string;
  body: Copy[];
  /** A photograph. Omit it when the card uses a typeset or drawn `visual` instead. */
  image?: SiteImage;
  /** Built-in visual for cards without a photograph (see src/components/visuals/). */
  visual?: 'greeting' | 'harmonics';
}

export const about: Story[] = [
  {
    title: 'About',
    body: [
      'I’m Sami, a Computer Engineering student (Technische Informatik) at Technische Hochschule Mannheim in Germany.',
      'I’m drawn to systems where software, machine learning and the physical world meet: machines that sense, learn and act.',
    ],
    visual: 'greeting',
  },
  {
    title: 'Studies',
    body: [
      'My studies centre on systems-level software in C and Python, embedded systems, Linux and the interfaces between AI and hardware.',
      'Alongside university, I work on research software for robotic tactile sensing and build engineering projects of my own.',
    ],
    visual: 'harmonics',
  },
  {
    title: 'Black Forest Hackathon 2026',
    body: [
      'I co-led a five-person team building a tactile-intelligence prototype that brought together robotic sensor hardware, a digital twin and MuJoCo simulation. I focused on the system architecture and simulation, including generating synthetic data to support model training.',
    ],
    image: {
      src: 'about/about-hackathon.webp',
      alt: 'Robotic hand on a wooden plinth, with a tactile heat map on the screen behind it, at the Black Forest Hackathon 2026',
      position: 'center 58%',
    },
  },
];

export const research = {
  intro:
    'I’m interested in how robots can perceive through touch, and in the software that turns that sensing into understanding.',
  feature: {
    title: 'Biomimetic Visuotactile Sensing',
    meta: ['Research in progress', 'TH Mannheim'],
    // Keep this high level until details are cleared for publication.
    body: [
      'Research software for a biomimetic, camera-based tactile sensor: a robotic fingertip that perceives contact through vision.',
      'This is ongoing work at Technische Hochschule Mannheim. More detail will follow once it is cleared for publication.',
    ],
    image: {
      src: 'research/visuotactile-sensing.webp',
      alt: 'Abstract visualisation of a fine hexagonal mesh deforming as if under touch',
      position: 'center 52%',
    } satisfies SiteImage,
  },
  directions: {
    title: 'Directions I’m exploring',
    items: [
      { title: 'Physical AI', body: 'Embodied intelligence: systems that perceive, interact with and adapt to the real world.' },
      { title: 'Tactile perception', body: 'Vision-based approaches to touch, so robots can sense contact, texture and slip.' },
      { title: 'Simulation & control', body: 'Simulation as a tool to develop, train and evaluate intelligent controllers.' },
    ],
  },
};

export type Ownership = 'personal' | 'team' | 'research' | 'tbd';
export type Status = 'in-progress' | 'prototype' | 'completed' | 'concept' | 'tbd';

export const ownershipLabel: Record<Exclude<Ownership, 'tbd'>, string> = {
  personal: 'Independent project',
  team: 'Team project',
  research: 'Research',
};
export const statusLabel: Record<Exclude<Status, 'tbd'>, string> = {
  'in-progress': 'In progress',
  prototype: 'Simulation prototype',
  completed: 'Completed',
  concept: 'Concept',
};

export interface Layer {
  name: string;
  /** How often this layer runs, e.g. '240 Hz'. */
  rate: string;
  body: string;
}

export interface Result {
  /** The figure itself, e.g. '82%'. */
  value: string;
  label: string;
}

export interface Section {
  heading: string;
  body?: Copy[];
  /** Optional blocks shown after the paragraphs. */
  layers?: Layer[];
  results?: Result[];
}

/** One piece of a metadata value: plain text, or text that links out. */
export type FactPart = string | { text: string; href: string };

export interface Fact {
  label: string;
  /** Parts are joined as written, so put separators such as ', ' in the array. */
  value: FactPart[];
}

export interface Project {
  slug: string;
  title: string;
  /** One-line hook shown under the title on the detail page. */
  tagline?: string;
  summary: Copy;
  ownership: Ownership;
  status: Status;
  /** Default metadata for the detail page. Ignored when `facts` is set. */
  role?: Copy;
  period?: Copy;
  tools?: Copy;
  /** Exact metadata fields for the detail page, with optional links. Overrides the defaults. */
  facts?: Fact[];
  image: SiteImage;
  links?: { label: string; href: string }[];
  sections: Section[];
}

const detailPlaceholders = (name: string): Project['sections'] => [
  { heading: 'Overview', body: [todo(`What ${name} is, the problem it addresses and who it is for.`)] },
  { heading: 'My contribution', body: [todo('What you personally designed and built, and what was done by others.')] },
  { heading: 'Approach', body: [todo('Key technical decisions, architecture and the reasoning behind them.')] },
  { heading: 'Status and next steps', body: [todo('Where the project stands today and what is planned next.')] },
];

/**
 * Every project's content is kept here. Only the slugs in `published` appear on
 * the website (home page and /work/<slug>/ pages); the rest are not built,
 * linked or shipped. To publish another project, add its slug to `published`.
 *
 * Order matters: the first published project is shown as a large feature, the
 * next two as image-and-text rows, and any remaining ones as a pair of tiles.
 */
const allProjects: Project[] = [
  {
    slug: 'dynaptics-studio',
    title: 'Dynaptics Studio',
    summary: todo('One or two sentences on what Dynaptics Studio is and what you built.'),
    ownership: 'tbd',
    status: 'tbd',
    role: todo('Your role'),
    period: todo('Year'),
    tools: todo('Main technologies'),
    image: { src: 'projects/dynaptics-studio.webp', alt: 'Dynaptics Studio' },
    sections: detailPlaceholders('Dynaptics Studio'),
  },
  {
    slug: 'cloudspill',
    title: 'CloudSpill',
    summary:
      'A static security analysis engine for infrastructure as code. CloudSpill parses Terraform configurations and Dockerfiles into a typed syntax tree, builds a graph of resource dependencies and uses taint analysis to trace how misconfigurations propagate.',
    ownership: 'personal',
    status: 'tbd',
    role: 'Design and development',
    period: todo('Year'),
    tools: 'Python, Terraform, Docker',
    image: { src: 'projects/cloudspill.webp', alt: 'CloudSpill logo' },
    links: [{ label: 'Source on GitHub', href: 'https://github.com/SamiAdamMoughli/CloudSpill' }],
    sections: [
      {
        heading: 'Overview',
        body: [
          'CloudSpill is a static application security testing engine for infrastructure as code. Instead of matching patterns line by line, it reasons about the structure of an infrastructure definition.',
        ],
      },
      {
        heading: 'Approach',
        body: [
          'Terraform configurations and Dockerfiles are parsed into a typed abstract syntax tree. From there, CloudSpill builds a directed acyclic graph of resource dependencies and runs taint analysis over it, showing how a single misconfiguration can spread to the resources that depend on it.',
          'Findings can be reported as a table, JSON or Markdown, filtered by severity and used to fail a CI pipeline above a chosen threshold.',
        ],
      },
      { heading: 'Status and next steps', body: [todo('Where CloudSpill stands today and what is planned next.')] },
    ],
  },
  {
    slug: 'tactile-intelligence-platform',
    title: 'Tactile Intelligence Platform',
    summary: todo('One or two sentences on what the platform does and what you built.'),
    ownership: 'tbd',
    status: 'tbd',
    role: todo('Your role'),
    period: todo('Year'),
    tools: todo('Main technologies'),
    image: { src: 'projects/tactile-intelligence-platform.webp', alt: 'Tactile Intelligence Platform' },
    sections: detailPlaceholders('the Tactile Intelligence Platform'),
  },
  {
    slug: 'aeroagent',
    title: 'AeroAgent',
    tagline: 'A drone that sees the air.',
    summary:
      'AeroAgent reconstructs invisible airflow from 32 pressure sensors mounted on an obstacle, and uses it to help a simulated drone anticipate turbulent gusts instead of reacting to them.',
    ownership: 'personal',
    status: 'prototype',
    facts: [
      { label: 'Type', value: ['Independent project'] },
      {
        label: 'Challenge',
        value: [{ text: 'Nebius × NVIDIA Global AI Hackathon 2026', href: 'https://nebiusglobalaihackathon.devpost.com/' }],
      },
      { label: 'Role', value: ['Solo developer'] },
      { label: 'Year', value: ['2026'] },
      {
        label: 'Presented by',
        value: [
          { text: 'Nebius', href: 'https://nebius.com/' },
          ', ',
          { text: 'NVIDIA', href: 'https://www.nvidia.com/' },
        ],
      },
    ],
    image: {
      src: 'projects/aeroagent.webp',
      alt: 'Quadcopter drone in flight above an alpine mountain trail',
      position: '18% 50%',
    },
    sections: [
      {
        heading: 'The problem',
        body: [
          'Wind doesn’t arrive evenly. Behind a building, a bridge or a ship, the air breaks into turbulent wakes, and those wakes can push a drone off course.',
          'A conventional flight controller typically reacts after the gust has already moved the aircraft. It can correct the error, but it can’t see the error coming.',
        ],
      },
      {
        heading: 'The idea',
        body: [
          'AeroAgent gives the controller a picture of the air around it. Thirty-two pressure sensors on the obstacle, not on the drone, feed a neural network that reconstructs the surrounding two-dimensional flow. The wind predicted at the drone’s position goes straight into the controller as a feedforward signal, so the correction starts before the gust lands.',
          'Everything runs in simulation: the airflow, the learned reconstruction, the flight control and a language-model supervisor, all in one closed loop.',
        ],
      },
      {
        heading: 'Three layers, three speeds',
        body: [
          'Each layer runs at the pace its job needs.',
        ],
        layers: [
          {
            name: 'Control',
            rate: '240 Hz',
            body: 'A conventional PID controller keeps the drone stable and runs the fast loop.',
          },
          {
            name: 'Reflex',
            rate: '~50 Hz',
            body: 'A Fourier Neural Operator turns the 32 pressure readings into velocity, pressure and vorticity fields. The estimated wind force flows into the controller, which lets the drone respond before it is displaced.',
          },
          {
            name: 'Judgment',
            rate: '~2 Hz',
            body: 'NVIDIA Nemotron acts as a supervisory flight engineer, choosing flight modes and proposing control parameters. A deterministic validator checks, clamps and rate-limits every output before it reaches the controller.',
          },
        ],
      },
      {
        heading: 'Why it’s built this way',
        body: [
          'Keeping the language model out of the time-critical loop was deliberate. Neural prediction and LLM reasoning add to classical control instead of replacing it, so flight stability never depends on a model’s latency or availability.',
        ],
      },
      {
        heading: 'What I built',
        body: [
          'I built AeroAgent alone, from first simulation to final evaluation. That includes a custom Lattice-Boltzmann solver that generated the training data across 41 runs, the 6.3-million-parameter Fourier Neural Operator that learns to reconstruct the flow from sparse readings, and the integration of its wind estimates into the PID-controlled drone.',
          'I also built the Nemotron supervisory layer with its validator, and the evaluation, benchmarking and visualisation pipelines that make every result reproducible.',
        ],
      },
      {
        heading: 'Results',
        results: [
          { value: '82%', label: 'lower hover-position error than PID alone, across four held-out airflow runs.' },
          { value: '0.55 cm', label: 'RMS hover error for the hybrid controller with Nemotron and deterministic rule guardrails, against 3.10 cm for PID alone, over three closed-loop repeats.' },
          { value: '6 ms', label: 'median time to reconstruct the airflow field, with a 95th percentile of 7.3 ms.' },
          { value: '88 of 88', label: 'language-model decisions valid across nine closed-loop runs.' },
        ],
      },
      {
        heading: 'Where it stands',
        body: [
          'AeroAgent is a reproducible, end-to-end simulation prototype, with automated data generation, model training, closed-loop evaluation, robustness testing and visualisation.',
          'Next, I want to take it across more obstacle shapes and airflow conditions, try other sensor layouts and explore hardware-in-the-loop validation.',
        ],
      },
    ],
  },
  {
    slug: 'vesselx',
    title: 'VesselX',
    summary: todo('One sentence on what VesselX is.'),
    ownership: 'tbd',
    status: 'tbd',
    role: todo('Your role'),
    period: todo('Year'),
    tools: todo('Main technologies'),
    image: { src: 'projects/vesselx.webp', alt: 'VesselX' },
    sections: detailPlaceholders('VesselX'),
  },
];

const published = ['aeroagent'];

export const projects: Project[] = allProjects.filter((p) => published.includes(p.slug));

export const contact = {
  title: 'Get in touch',
  lead: 'Let’s talk',
  body: 'I’m always open to conversations about applied AI, robotics research, engineering collaborations and opportunities to build meaningful things together.',
};

export const footer = {
  line: 'Computer Engineering, Technische Hochschule Mannheim',
  // Add an Impressum / Datenschutz page here if required, e.g. { label: 'Impressum', href: '/impressum' }.
  links: [] as { label: string; href: string }[],
};
