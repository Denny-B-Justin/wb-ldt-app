export type ResourceFile = {
  title: string;
  format: "Briefing" | "One-pager" | "Slide deck" | "Notebook";
  href: string;
  description: string;
};

export type ResourceFolder = {
  title: string;
  href: string;
  description: string;
};

export const ldtResourceFolder: ResourceFolder = {
  title: "LDT reference materials",
  href: "https://drive.google.com/drive/folders/1wUbAx7svxoAI-1de5EUHzijQSiAv5Q-a?usp=sharing",
  description:
    "Shared source folder for the core Local Development Tracker overview, briefing, and presentation materials.",
};

export const ldtResourceFiles: ResourceFile[] = [
  {
    title: "pim-pam.net GPB LDT Briefing 2026-05-23",
    format: "Briefing",
    href: "https://docs.google.com/document/d/1xGgjxpaJm6brzIMqib_zHJc7PKms11XR/edit?usp=drivesdk&rtpof=true&sd=true",
    description:
      "Long-form briefing note covering the motivation, method, early country applications, and implementation considerations for the LDT.",
  },
  {
    title: "GPBP LDT v1.4 one-pager",
    format: "One-pager",
    href: "https://docs.google.com/document/d/1sF1cDEyQ7nAdEB5v6MZB_40Jlpl-rLAZ/edit?usp=drivesdk&rtpof=true&sd=true",
    description:
      "Concise overview for quickly explaining what the LDT provides, how it supports country teams, and where it fits in the GPB suite.",
  },
  {
    title: "GPBP LDT v1.4 intro deck",
    format: "Slide deck",
    href: "https://docs.google.com/presentation/d/1MvANeuR3x39SgNJaD1gRFiX4DIWBpNeq/edit?usp=drivesdk&rtpof=true&sd=true",
    description:
      "Presentation deck for introducing the LDT workflow, country replication model, and evidence-to-planning use cases.",
  },
];
