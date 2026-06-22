# LDT Supplement: Integrations, External Datasets, and Standards Context

**Purpose:** Context for add-ons that connect LDT to climate, geospatial, field monitoring, PIM, procurement, and transparency ecosystems.

---

## 1. Integration Philosophy

Integrations should be added in layers:

1. **Reference-only:** Show source links and metadata.
2. **Imported indicator layer:** Preprocess external data into LDT release data.
3. **Interactive overlay:** Display spatial layer with legends and caveats.
4. **Decision-support rule:** Use external data as a trigger or badge.
5. **Workflow integration:** Link LDT records to official systems.
6. **Public transparency:** Publish selected project/contract/monitoring data.

Do not jump straight to workflow integration until data quality, licensing, auth, and institutional ownership are clear.

---

## 2. Climate and Hazard Sources

### ThinkHazard

Use case: First-pass hazard awareness by local unit or project area.

Potential LDT fields:

- Hazard type.
- Hazard level.
- Source URL.
- Source date/fetch date.
- Spatial match method.
- Caveat.
- Site-level study required flag.

Suggested UI:

- Risk badges in local profile.
- Hazard screen section in concept note.
- “Requires site-specific study” caveat.

### WRI Aqueduct

Use case: Water stress, drought, riverine/coastal flood risk, and flood protection planning context.

Potential LDT fields:

- Water stress score.
- Flood exposure class.
- Current/future risk where available.
- Aqueduct tool/source reference.
- Data resolution caveat.

Suggested UI:

- Climate/hazard screen.
- Geospatial Prioritization Studio layer.
- Scenario Builder climate constraint.

### Existing LDT climate/spatial layers

The live methodology already references public/global sources such as VIIRS, ERA5, Dynamic World, OpenWeatherMaps Air Pollution, GADM, WorldPop, OpenStreetMap/Openrouteservice, WRI Aqueduct Flood Hazard Maps, and Climate TRACE. Treat these as imported release data with metadata, not live API dependencies unless the engineering team explicitly chooses live connectors.

---

## 3. Field Monitoring and GEMS-style Integration

Reference: World Bank GEMS model using low-cost open-source tools and geotagged digital data collection.

Potential integrations:

- KoBoToolbox API.
- ODK Central API.
- CSV/XLSForm import.
- GeoJSON/photo evidence import.
- Third-party monitoring uploads.

Minimum schema:

- Project/opportunity ID.
- Field visit ID.
- GPS point/line/polygon.
- Timestamp.
- Photo/document references.
- Milestone observed.
- Progress status.
- Verification actor.
- Privacy/safeguards flags.

Activation requirements:

- Authentication.
- Role-based upload rights.
- Data protection review.
- Photo metadata policy.
- Moderation/review queue.

---

## 4. Open Contracting and Infrastructure Transparency

Reference: OC4IDS combines project-level CoST IDS-style disclosure with OCDS contract-level disclosure.

Future LDT mapping concepts:

| LDT entity | Future standard concept |
| --- | --- |
| `investment_opportunities` | Early project identification / project idea |
| `pim_registry_items` | Infrastructure project |
| `procurement_links` | Tender/award/contract reference |
| `field_evidence` | Implementation monitoring evidence |
| `asset_links` | Completion/asset handover reference |
| `concept_note_starters` | Preparation/appraisal documentation |

Do not expose public contract flags until official procurement data exists and rules are validated.

---

## 5. PIM, Budget, Treasury, and Asset Registry Integrations

Potential future official integrations:

- National PIM project bank.
- Capital budget/MTEF system.
- Financial management information system.
- E-procurement platform.
- Treasury/payment system.
- Asset registry.
- GIS/NSDI platform.

Recommended sequence:

1. Define LDT internal opportunity/project identifiers.
2. Add external reference fields.
3. Import read-only project status.
4. Add mapping/validation dashboard.
5. Add public transparency view only after official approval.

---

## 6. API/Data Product Strategy

### Public endpoints

- Release metadata.
- Published scores and indicators.
- Published source metadata.
- Public caveats.
- GeoJSON for approved boundaries/layers.

### Internal endpoints

- Validation reports.
- AI runs.
- Document chunks.
- Opportunity review status.
- Concept note drafts.
- Admin logs.

### Export formats

- CSV.
- Markdown.
- PDF-ready HTML.
- GeoJSON.
- JSON API.
- Future OC4IDS-style JSON.

---

## 7. Integration Readiness Checklist

Before adding a live connector:

- Source owner identified.
- License permits use.
- Update frequency understood.
- Data schema documented.
- Spatial resolution fit for purpose.
- Country coverage confirmed.
- Failure mode defined.
- Caching policy defined.
- Security/auth requirements defined.
- Caveats visible in UI.
