export type ResourceFile = {
  title: string;
  format: "Briefing" | "One-pager" | "Slide deck" | "Notebook" | "Update note";
  href: string;
  description: string;
};

export type ResourceFolder = {
  title: string;
  href: string;
  description: string;
};

export type CountryResourcePack = ResourceFolder & {
  country: "Serbia" | "Zambia" | "Nepal";
  files: ResourceFile[];
  emptyState?: string;
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

export const countryResourcePacks: CountryResourcePack[] = [
  {
    country: "Serbia",
    title: "Serbia country pack",
    href: "https://drive.google.com/drive/folders/1WIOlbm9Et6-0CdmwCtw8KAIEqLdtcJbV?usp=drive_link",
    description:
      "Country update note and analytical notebooks for Serbia local infrastructure, inclusion, jobs, and replication work.",
    files: [
      {
        title: "PIM-PAM SRB SNG LIID Update 2026-06-09",
        format: "Update note",
        href: "https://docs.google.com/document/d/134dPr5-Z4MsLMjBKVSQVGeCWvgeTQjwz/edit?usp=drivesdk&rtpof=true&sd=true",
        description:
          "Serbia update note for the sub-national GPB / LIID analysis and current country-facing findings.",
      },
      {
        title: "LIID Serbia - Visualization and Replication",
        format: "Notebook",
        href: "https://colab.research.google.com/drive/1G-9-BOJcl7_4XGJTbGGPhJb4Pi4KNnaQ",
        description:
          "Notebook for visualizing Serbia results and reproducing the LIID analytical workflow.",
      },
      {
        title: "LIID Serbia - Migration & Jobs Creation Analyses",
        format: "Notebook",
        href: "https://colab.research.google.com/drive/1G_cV3wgSVPNmknfvLNAMRw-SH5-njGNw",
        description:
          "Notebook covering Serbia migration and job creation analyses linked to local development patterns.",
      },
    ],
  },
  {
    country: "Zambia",
    title: "Zambia country pack",
    href: "https://drive.google.com/drive/folders/1bAHP-gN_0uLIIhCxhkkMBADylAvmbQdj?usp=drive_link",
    description:
      "Demo deck and notebooks for Zambia LDT exploration, AI-assisted analysis, and country presentation materials.",
    files: [
      {
        title: "Pim-Pam.net GPBP Zambia Demos",
        format: "Slide deck",
        href: "https://docs.google.com/presentation/d/1yWxDCvVHjNd0NPjM6UMofmXHg5GEltjw1utiV5V6OEY/edit?usp=drivesdk",
        description:
          "Country demo deck for sharing Zambia-specific LDT findings and examples with stakeholders.",
      },
      {
        title: "GPBP - LDT Zambia",
        format: "Notebook",
        href: "https://colab.research.google.com/drive/1VOQu4l75pPo0R7kOON-3Y2aqT35XDtvC",
        description:
          "Notebook for exploring Zambia LDT data preparation, analysis, and visualization outputs.",
      },
      {
        title: "Zambia AI demo",
        format: "Notebook",
        href: "https://colab.research.google.com/drive/1ciSSFXsWdqI3TAvyrbg4upmUnaNWaXJD",
        description:
          "Notebook demo for AI-assisted Zambia analysis and narrative generation workflows.",
      },
      {
        title: "GPB LDT - Zambia OSR analysis",
        format: "Notebook",
        href: "https://drive.google.com/file/d/18DX7cuGtZcmtet1qMurQpHri_SvNQhRp/view?usp=drive_link",
        description:
          "Notebook comparing Zambia PIL score patterns with own-source revenue outcomes and mining-district context.",
      },
    ],
  },
  {
    country: "Nepal",
    title: "Nepal country pack",
    href: "https://drive.google.com/drive/folders/115tYIXw9uxTD_MFFDQYYz66sHdqf7Inx?usp=drive_link",
    description:
      "Shared workspace for Nepal-specific documents, demos, analyses, and follow-up materials as they are added.",
    files: [],
    emptyState:
      "No top-level files were listed in the shared folder yet. Open the folder to add or review Nepal materials.",
  },
];
