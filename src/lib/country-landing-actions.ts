import type { Country } from "@/lib/countries";

export type CountryLandingAction = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  align: "left" | "right";
};

export type CountryCommandCenterTask = {
  label: string;
  href: string;
  description: string;
};

function lowerFirst(value: string) {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

export function getCountryLandingActions(country: Country): CountryLandingAction[] {
  const lowerUnitLabel = lowerFirst(country.adminLabels.lower.singular);
  const actions: CountryLandingAction[] = [
    {
      label: `Analyze ${lowerUnitLabel} metrics`,
      href: `/${country.slug}/analytics`,
      variant: "primary",
      align: "left",
    },
  ];

  if (country.slug === "serbia" || country.slug === "zambia") {
    actions.push({
      label: "Strategy inventory",
      href: `/${country.slug}/strategy-inventory`,
      variant: "secondary",
      align: "left",
    });
  }

  actions.push({
    label: "Return to Homepage",
    href: "/",
    variant: "secondary",
    align: "right",
  });

  return actions;
}

export function getCountryCommandCenterTasks(country: Country): CountryCommandCenterTask[] {
  const lowerPlural = lowerFirst(country.adminLabels.lower.plural);

  return [
    {
      label: "Compare",
      href: `/${country.slug}/analytics?tab=multi`,
      description: `Compare ${lowerPlural} across PIL score space.`,
    },
    {
      label: "Map & drivers",
      href: `/${country.slug}/analytics?tab=single`,
      description: "Read mapped indicator gaps and score-driver waterfalls.",
    },
    {
      label: "Planning brief",
      href: `/${country.slug}/analytics?tab=ai`,
      description: "Run staged AI planning evidence with cache provenance.",
    },
    {
      label: "Document readiness",
      href: "#document-readiness",
      description: "Inspect local plan source coverage and readiness.",
    },
    {
      label: "Trust center",
      href: "#country-trust-card",
      description: "Review release coverage, boundaries, caveats, and AI readiness.",
    },
  ];
}
