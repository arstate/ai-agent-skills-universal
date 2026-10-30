import { LayoutType } from '../types/slide';

export interface LayoutDefinition {
  id: LayoutType;
  name: string;
  category: string;
  archetype: 'cover' | 'split' | 'metrics' | 'pillars' | 'bento' | 'quote' | 'comparison' | 'timeline' | 'image' | 'team' | 'process' | 'html';
  variant: number; // 1 to 10
  desc: string;
}

export const LAYOUT_CATEGORIES: string[] = [
  '01. Covers & Hero Openers',
  '02. Executive Narrative & Thesis',
  '03. Key Metrics & Data',
  '04. Systems & Architecture',
  '05. Modern Bento Matrices',
  '06. Processes & Step Frameworks',
  '07. Team, People & Leadership',
  '08. Comparisons & Problem-Solution',
  '09. Timelines & Roadmaps',
  '10. Media, Visuals & Showcase',
  '11. AI GEN (Autonomous)',
];

export const LAYOUT_CATALOG: LayoutDefinition[] = [
  // ============================================================
  // GROUP 1: COVERS & HERO OPENERS (10)
  // ============================================================
  {
    id: 'cover-headline',
    name: 'Cover · Executive Headline',
    category: '01. Covers & Hero Openers',
    archetype: 'cover',
    variant: 1,
    desc: 'High-impact title with context tags and clean typography',
  },
  {
    id: 'cover-minimal',
    name: 'Cover · Swiss Minimalist',
    category: '01. Covers & Hero Openers',
    archetype: 'cover',
    variant: 2,
    desc: 'Pure typography with generous negative space and micro metadata',
  },
  {
    id: 'cover-asymmetric',
    name: 'Cover · Asymmetric Hero',
    category: '01. Covers & Hero Openers',
    archetype: 'cover',
    variant: 3,
    desc: 'Off-center bold headline with date badge and accent marker',
  },
  {
    id: 'cover-manifesto',
    name: 'Cover · Strategic Manifesto',
    category: '01. Covers & Hero Openers',
    archetype: 'cover',
    variant: 4,
    desc: 'Core conviction mission statement preceding title',
  },
  {
    id: 'cover-split-brand',
    name: 'Cover · Dual Tone Split',
    category: '01. Covers & Hero Openers',
    archetype: 'cover',
    variant: 5,
    desc: 'Two-tone contrast with brand tagline on left and title on right',
  },
  {
    id: 'cover-darkroom',
    name: 'Cover · Monolith Center',
    category: '01. Covers & Hero Openers',
    archetype: 'cover',
    variant: 6,
    desc: 'Monumental centered title with subtle border framing',
  },
  {
    id: 'cover-editorial',
    name: 'Cover · Broadsheet Editorial',
    category: '01. Covers & Hero Openers',
    archetype: 'cover',
    variant: 7,
    desc: 'Classic publication style with hairline kicker and serif dominance',
  },
  {
    id: 'cover-technical',
    name: 'Cover · Technical Architecture',
    category: '01. Covers & Hero Openers',
    archetype: 'cover',
    variant: 8,
    desc: 'Engineering keynote opener with clean context specification',
  },
  {
    id: 'cover-center-stage',
    name: 'Cover · Center Stage Spotlight',
    category: '01. Covers & Hero Openers',
    archetype: 'cover',
    variant: 9,
    desc: 'Symmetrical keynote title anchored by status badge',
  },
  {
    id: 'cover-stat-hero',
    name: 'Cover · Giant Stat Hero',
    category: '01. Covers & Hero Openers',
    archetype: 'cover',
    variant: 10,
    desc: 'Dominant anchor metric with opening pitch headline below',
  },

  // ============================================================
  // GROUP 2: EXECUTIVE NARRATIVE & THESIS (10)
  // ============================================================
  {
    id: 'split-narrative',
    name: 'Narrative · 60/40 Asymmetric Split',
    category: '02. Executive Narrative & Thesis',
    archetype: 'split',
    variant: 1,
    desc: 'Core declarative thesis on left, supporting bullet ledger on right',
  },
  {
    id: 'split-callout-hero',
    name: 'Narrative · Thesis Callout Hero',
    category: '02. Executive Narrative & Thesis',
    archetype: 'split',
    variant: 2,
    desc: 'Prominent accented doctrine callout box with structured points',
  },
  {
    id: 'split-dual-column',
    name: 'Narrative · Dual Paragraph Columns',
    category: '02. Executive Narrative & Thesis',
    archetype: 'split',
    variant: 3,
    desc: 'Equal 50/50 two-column longform editorial narrative',
  },
  {
    id: 'split-problem-solution',
    name: 'Narrative · Problem & Core Solution',
    category: '02. Executive Narrative & Thesis',
    archetype: 'split',
    variant: 4,
    desc: 'Problem framing column paired with direct platform solution',
  },
  {
    id: 'split-3-column-text',
    name: 'Narrative · Three Editorial Columns',
    category: '02. Executive Narrative & Thesis',
    archetype: 'split',
    variant: 5,
    desc: 'Broadsheet triple-column exposition with top headline rule',
  },
  {
    id: 'split-sidebar-context',
    name: 'Narrative · Sidebar Context Ledger',
    category: '02. Executive Narrative & Thesis',
    archetype: 'split',
    variant: 6,
    desc: 'Narrow left summary ribbon and wide right comprehensive narrative',
  },
  {
    id: 'split-statement-evidence',
    name: 'Narrative · Assertion & Evidence',
    category: '02. Executive Narrative & Thesis',
    archetype: 'split',
    variant: 7,
    desc: 'Single bold claim headline supported by evidentiary cards',
  },
  {
    id: 'split-quote-takeaway',
    name: 'Narrative · Quote & Synthesis',
    category: '02. Executive Narrative & Thesis',
    archetype: 'split',
    variant: 8,
    desc: 'Impact quote on left with strategic breakdown synthesis on right',
  },
  {
    id: 'split-glossary-terms',
    name: 'Narrative · Concepts & Glossary',
    category: '02. Executive Narrative & Thesis',
    archetype: 'split',
    variant: 9,
    desc: 'Key terminology tags with clear authoritative definitions',
  },
  {
    id: 'split-action-agenda',
    name: 'Narrative · Action Plan & Agenda',
    category: '02. Executive Narrative & Thesis',
    archetype: 'split',
    variant: 10,
    desc: 'Strategic objectives and deliverable checklist matrix',
  },

  // ============================================================
  // GROUP 3: KEY METRICS & DATA (10)
  // ============================================================
  {
    id: 'metrics-quad',
    name: 'Metrics · 4-Column Telemetry',
    category: '03. Key Metrics & Data',
    archetype: 'metrics',
    variant: 1,
    desc: 'Standard 4-card metric grid with delta tags and labels',
  },
  {
    id: 'metrics-hero-trio',
    name: 'Metrics · 1 Hero + 2 Sub-Stats',
    category: '03. Key Metrics & Data',
    archetype: 'metrics',
    variant: 2,
    desc: 'Giant dominant primary stat with two secondary indicators',
  },
  {
    id: 'metrics-trio',
    name: 'Metrics · 3 Balanced Stat Pillars',
    category: '03. Key Metrics & Data',
    archetype: 'metrics',
    variant: 3,
    desc: 'Three wide numeric cards with generous breathing room',
  },
  {
    id: 'metrics-duo-compare',
    name: 'Metrics · Dual Giant Numbers',
    category: '03. Key Metrics & Data',
    archetype: 'metrics',
    variant: 4,
    desc: 'Two high-contrast giant stats comparing core outcomes',
  },
  {
    id: 'metrics-solo-monolith',
    name: 'Metrics · Single Number Monolith',
    category: '03. Key Metrics & Data',
    archetype: 'metrics',
    variant: 5,
    desc: 'One monumental statistic anchoring an executive takeaway',
  },
  {
    id: 'metrics-compact-hex',
    name: 'Metrics · 6-Tile Financial Ledger',
    category: '03. Key Metrics & Data',
    archetype: 'metrics',
    variant: 6,
    desc: 'Compact 2x3 matrix of critical KPIs and ratios',
  },
  {
    id: 'metrics-delta-trend',
    name: 'Metrics · Growth & Velocity Deltas',
    category: '03. Key Metrics & Data',
    archetype: 'metrics',
    variant: 7,
    desc: 'Emphasized growth percentage pills with baseline context',
  },
  {
    id: 'metrics-stat-strip',
    name: 'Metrics · Panoramic 5-Stat Ribbon',
    category: '03. Key Metrics & Data',
    archetype: 'metrics',
    variant: 8,
    desc: 'Continuous horizontal strip of operational indicators',
  },
  {
    id: 'metrics-donut-chart',
    name: 'Metrics · Distribution Visualizer',
    category: '03. Key Metrics & Data',
    archetype: 'metrics',
    variant: 9,
    desc: 'Visual circular data breakdown with metric cards (Borcelle style)',
  },
  {
    id: 'metrics-kpi-scorecard',
    name: 'Metrics · Target vs Actual Scorecard',
    category: '03. Key Metrics & Data',
    archetype: 'metrics',
    variant: 10,
    desc: 'Quarterly achievement metrics with verification badges',
  },

  // ============================================================
  // GROUP 4: SYSTEMS & ARCHITECTURE (10)
  // ============================================================
  {
    id: 'pillars-trio',
    name: 'Architecture · 3-Pillar Foundation',
    category: '04. Systems & Architecture',
    archetype: 'pillars',
    variant: 1,
    desc: 'Three vertical modular architectural capability pillars',
  },
  {
    id: 'pillars-quad',
    name: 'Architecture · 4-Column Module Grid',
    category: '04. Systems & Architecture',
    archetype: 'pillars',
    variant: 2,
    desc: 'Four system component cards with technical crosshairs',
  },
  {
    id: 'pillars-duo',
    name: 'Architecture · Dual Core Pillars',
    category: '04. Systems & Architecture',
    archetype: 'pillars',
    variant: 3,
    desc: 'Two wide structural pillars detailing core platform primitives',
  },
  {
    id: 'system-pipeline',
    name: 'Architecture · Input-Core-Output Flow',
    category: '04. Systems & Architecture',
    archetype: 'process',
    variant: 1,
    desc: 'Horizontal linear data pipeline with connector arrows',
  },
  {
    id: 'system-layer-stack',
    name: 'Architecture · 3-Layer System Stack',
    category: '04. Systems & Architecture',
    archetype: 'pillars',
    variant: 4,
    desc: 'Stacked vertical tiers from infrastructure to application layer',
  },
  {
    id: 'system-protocol-grid',
    name: 'Architecture · Protocol Enclaves',
    category: '04. Systems & Architecture',
    archetype: 'bento',
    variant: 1,
    desc: 'Four isolated security and protocol execution boundaries',
  },
  {
    id: 'system-hub-spoke',
    name: 'Architecture · Central Core & Satellites',
    category: '04. Systems & Architecture',
    archetype: 'bento',
    variant: 2,
    desc: 'Central engine block orchestrating four connected modules',
  },
  {
    id: 'system-security-boundary',
    name: 'Architecture · Zero-Leak Sandbox',
    category: '04. Systems & Architecture',
    archetype: 'pillars',
    variant: 5,
    desc: 'Confidential execution enclaves with telemetry status indicators',
  },
  {
    id: 'system-api-telemetry',
    name: 'Architecture · API & Service Ledger',
    category: '04. Systems & Architecture',
    archetype: 'split',
    variant: 11,
    desc: 'Endpoint architecture with latency and protocol specifications',
  },
  {
    id: 'system-monolith-micro',
    name: 'Architecture · System Topology Split',
    category: '04. Systems & Architecture',
    archetype: 'comparison',
    variant: 1,
    desc: 'Monolithic simplicity vs distributed micro-agent scale',
  },

  // ============================================================
  // GROUP 5: MODERN BENTO MATRICES (10)
  // ============================================================
  {
    id: 'bento-matrix',
    name: 'Bento · 2x2 Balanced Matrix',
    category: '05. Modern Bento Matrices',
    archetype: 'bento',
    variant: 3,
    desc: 'Four harmonious cards with tags, descriptions, and metrics',
  },
  {
    id: 'bento-asymmetric-3',
    name: 'Bento · Panoramic Top + 2 Bottom',
    category: '05. Modern Bento Matrices',
    archetype: 'bento',
    variant: 4,
    desc: 'Full-width top hero card with two balanced columns beneath',
  },
  {
    id: 'bento-hero-left',
    name: 'Bento · Tall Left Hero + Stacked Right',
    category: '05. Modern Bento Matrices',
    archetype: 'bento',
    variant: 5,
    desc: 'Dominant 2-row left showcase card with two stacked right cards',
  },
  {
    id: 'bento-hero-right',
    name: 'Bento · Stacked Left + Tall Right Hero',
    category: '05. Modern Bento Matrices',
    archetype: 'bento',
    variant: 6,
    desc: 'Two stacked overview cards with a dominant right showcase card',
  },
  {
    id: 'bento-mosaic-5',
    name: 'Bento · 5-Tile Mosaic Matrix',
    category: '05. Modern Bento Matrices',
    archetype: 'bento',
    variant: 7,
    desc: 'Dynamic asymmetric mosaic combining stats and feature cards',
  },
  {
    id: 'bento-feature-highlight',
    name: 'Bento · Center Hero + 4 Corners',
    category: '05. Modern Bento Matrices',
    archetype: 'bento',
    variant: 8,
    desc: 'Focal center product capability surrounded by four key specs',
  },
  {
    id: 'bento-stat-split',
    name: 'Bento · Top Stats + Bottom Features',
    category: '05. Modern Bento Matrices',
    archetype: 'bento',
    variant: 9,
    desc: 'Quantitative proof bar above qualitative architectural cards',
  },
  {
    id: 'bento-horizontal-strip',
    name: 'Bento · 3 Horizontal Panoramas',
    category: '05. Modern Bento Matrices',
    archetype: 'bento',
    variant: 10,
    desc: 'Three wide horizontal cards highlighting progressive milestones',
  },
  {
    id: 'bento-dense-6',
    name: 'Bento · 6-Card Product Suite',
    category: '05. Modern Bento Matrices',
    archetype: 'bento',
    variant: 11,
    desc: 'Comprehensive 3x2 matrix covering entire product capability',
  },
  {
    id: 'bento-media-hybrid',
    name: 'Bento · Hybrid Image & Stat Bento',
    category: '05. Modern Bento Matrices',
    archetype: 'bento',
    variant: 12,
    desc: 'Visual photography card embedded inside modern bento layout',
  },

  // ============================================================
  // GROUP 6: PROCESSES & STEP FRAMEWORKS (10)
  // ============================================================
  {
    id: 'process-stepped-3',
    name: 'Process · 3-Step Numbered Cards',
    category: '06. Processes & Step Frameworks',
    archetype: 'process',
    variant: 2,
    desc: 'Sequential 01-02-03 execution framework with accent headers',
  },
  {
    id: 'process-stepped-4',
    name: 'Process · 4-Phase Delivery Pipeline',
    category: '06. Processes & Step Frameworks',
    archetype: 'process',
    variant: 3,
    desc: 'Discover -> Design -> Build -> Scale horizontal progression',
  },
  {
    id: 'process-stepped-5',
    name: 'Process · 5-Step Methodology',
    category: '06. Processes & Step Frameworks',
    archetype: 'process',
    variant: 4,
    desc: 'End-to-end operational playbook (Borcelle style numbered columns)',
  },
  {
    id: 'process-circular-loop',
    name: 'Process · Continuous Iteration Loop',
    category: '06. Processes & Step Frameworks',
    archetype: 'process',
    variant: 5,
    desc: 'Agile feedback and self-correction cycle with milestone pills',
  },
  {
    id: 'process-chevron-flow',
    name: 'Process · Chevron Milestone Stream',
    category: '06. Processes & Step Frameworks',
    archetype: 'process',
    variant: 6,
    desc: 'Interlocking chevron stages indicating directional momentum',
  },
  {
    id: 'process-checklist-card',
    name: 'Process · Verified Quality Checklist',
    category: '06. Processes & Step Frameworks',
    archetype: 'process',
    variant: 7,
    desc: 'Audited gate checklist with verified status badges',
  },
  {
    id: 'process-action-ledger',
    name: 'Process · Action Items & Ownership',
    category: '06. Processes & Step Frameworks',
    archetype: 'process',
    variant: 8,
    desc: 'Strategic next steps table detailing owner, timeline, and deliverables',
  },
  {
    id: 'process-rule-of-three',
    name: 'Process · 3 Golden Non-Negotiables',
    category: '06. Processes & Step Frameworks',
    archetype: 'process',
    variant: 9,
    desc: 'Three bold architectural rules with giant Roman numerals',
  },
  {
    id: 'process-staircase-cards',
    name: 'Process · Ascending Maturity Model',
    category: '06. Processes & Step Frameworks',
    archetype: 'process',
    variant: 10,
    desc: 'Staircase progressive tiers showing scale and maturity over time',
  },
  {
    id: 'process-faq-accordion',
    name: 'Process · Architecture FAQ Ledger',
    category: '06. Processes & Step Frameworks',
    archetype: 'process',
    variant: 11,
    desc: 'Direct Q&A format addressing critical stakeholder inquiries',
  },

  // ============================================================
  // GROUP 7: TEAM, PEOPLE & LEADERSHIP (10)
  // ============================================================
  {
    id: 'team-trio-portraits',
    name: 'Team · 3 Leadership Cards',
    category: '07. Team, People & Leadership',
    archetype: 'team',
    variant: 1,
    desc: 'Three portrait cards with colored role pills (Klyro / Chuckle style)',
  },
  {
    id: 'team-quad-portraits',
    name: 'Team · 4 Executive Profiles',
    category: '07. Team, People & Leadership',
    archetype: 'team',
    variant: 2,
    desc: 'Four rounded portraits with title tags and specialty badges',
  },
  {
    id: 'team-duo-founders',
    name: 'Team · Co-Founder Split Spotlight',
    category: '07. Team, People & Leadership',
    archetype: 'team',
    variant: 3,
    desc: 'Two deep executive profiles detailing track record and vision',
  },
  {
    id: 'team-solo-lead',
    name: 'Team · Keynote Speaker & Bio',
    category: '07. Team, People & Leadership',
    archetype: 'team',
    variant: 4,
    desc: 'Prominent portrait with credentials, publications, and background',
  },
  {
    id: 'team-org-hierarchy',
    name: 'Team · Division Structure Tree',
    category: '07. Team, People & Leadership',
    archetype: 'team',
    variant: 5,
    desc: 'Clean organizational flow connecting leadership to core units',
  },
  {
    id: 'team-principles-grid',
    name: 'Team · Cultural DNA & Principles',
    category: '07. Team, People & Leadership',
    archetype: 'team',
    variant: 6,
    desc: 'Four cultural pillars guiding high-velocity team execution',
  },
  {
    id: 'team-board-advisors',
    name: 'Team · Advisory Board & Partners',
    category: '07. Team, People & Leadership',
    archetype: 'team',
    variant: 7,
    desc: 'Distinguished advisors with industry affiliations and roles',
  },
  {
    id: 'team-engineering-squad',
    name: 'Team · Engineering Squad Matrix',
    category: '07. Team, People & Leadership',
    archetype: 'team',
    variant: 8,
    desc: 'Cross-functional engineering pod breakdown with focus areas',
  },
  {
    id: 'team-global-network',
    name: 'Team · Global Footprint & Nodes',
    category: '07. Team, People & Leadership',
    archetype: 'team',
    variant: 9,
    desc: 'Distributed team hubs with timezone and coverage indicators',
  },
  {
    id: 'team-culture-manifesto',
    name: 'Team · Team Credo & Values',
    category: '07. Team, People & Leadership',
    archetype: 'team',
    variant: 10,
    desc: 'Full-bleed team doctrine emphasizing craftsmanship and autonomy',
  },

  // ============================================================
  // GROUP 8: COMPARISONS & PROBLEM-SOLUTION (10)
  // ============================================================
  {
    id: 'comparison-dual',
    name: 'Comparison · Side-by-Side Dual',
    category: '08. Comparisons & Problem-Solution',
    archetype: 'comparison',
    variant: 2,
    desc: 'Classic legacy vs autonomous system side-by-side comparison',
  },
  {
    id: 'comparison-problem-solution',
    name: 'Comparison · Challenges vs Opportunity',
    category: '08. Comparisons & Problem-Solution',
    archetype: 'comparison',
    variant: 3,
    desc: 'Red alert friction card vs Emerald green breakthrough opportunity',
  },
  {
    id: 'comparison-legacy-modern',
    name: 'Comparison · Legacy Friction vs Modern',
    category: '08. Comparisons & Problem-Solution',
    archetype: 'comparison',
    variant: 4,
    desc: 'Direct line-item contrast showing operational speed advantages',
  },
  {
    id: 'comparison-3-tier',
    name: 'Comparison · 3-Tier Matrix',
    category: '08. Comparisons & Problem-Solution',
    archetype: 'comparison',
    variant: 5,
    desc: 'Three comparative tiers (Standard, Enhanced, Enterprise Core)',
  },
  {
    id: 'comparison-features-table',
    name: 'Comparison · Feature Check Table',
    category: '08. Comparisons & Problem-Solution',
    archetype: 'comparison',
    variant: 6,
    desc: 'Clear tabular checklist comparing capabilities against competitors',
  },
  {
    id: 'comparison-pros-cons',
    name: 'Comparison · Trade-offs & Advantages',
    category: '08. Comparisons & Problem-Solution',
    archetype: 'comparison',
    variant: 7,
    desc: 'Honest engineering analysis of architectural benefits and tradeoffs',
  },
  {
    id: 'comparison-quadrant',
    name: 'Comparison · 2x2 Strategic Quadrant',
    category: '08. Comparisons & Problem-Solution',
    archetype: 'comparison',
    variant: 8,
    desc: 'Two-axis positioning matrix showing market leadership',
  },
  {
    id: 'comparison-pricing',
    name: 'Comparison · Engagement Packages',
    category: '08. Comparisons & Problem-Solution',
    archetype: 'comparison',
    variant: 9,
    desc: 'Three pricing tiers with deliverables and clear hero recommendations',
  },
  {
    id: 'comparison-swot-matrix',
    name: 'Comparison · SWOT Analysis Matrix',
    category: '08. Comparisons & Problem-Solution',
    archetype: 'comparison',
    variant: 10,
    desc: 'Four-quadrant assessment of Strengths, Weaknesses, Ops & Threats',
  },
  {
    id: 'comparison-buy-vs-build',
    name: 'Comparison · Buy vs Build Analysis',
    category: '08. Comparisons & Problem-Solution',
    archetype: 'comparison',
    variant: 11,
    desc: 'In-house development costs vs autonomous platform ROI timeline',
  },

  // ============================================================
  // GROUP 9: TIMELINES, ROADMAPS & MILESTONES (10)
  // ============================================================
  {
    id: 'timeline-roadmap',
    name: 'Timeline · Horizontal 4-Phase Roadmap',
    category: '09. Timelines & Roadmaps',
    archetype: 'timeline',
    variant: 1,
    desc: 'Four sequential phase cards connected by a temporal baseline',
  },
  {
    id: 'timeline-quarterly',
    name: 'Timeline · Q1-Q4 Execution Horizon',
    category: '09. Timelines & Roadmaps',
    archetype: 'timeline',
    variant: 2,
    desc: 'Quarter-by-quarter strategic targets and delivery commitments',
  },
  {
    id: 'timeline-vertical',
    name: 'Timeline · Vertical Chronology Spine',
    category: '09. Timelines & Roadmaps',
    archetype: 'timeline',
    variant: 3,
    desc: 'Vertical spine with alternating chronological milestone nodes',
  },
  {
    id: 'timeline-3-horizons',
    name: 'Timeline · McKinsey 3 Horizons Model',
    category: '09. Timelines & Roadmaps',
    archetype: 'timeline',
    variant: 4,
    desc: 'Core business optimization, emerging opportunities, future vision',
  },
  {
    id: 'timeline-releases',
    name: 'Timeline · Platform Release Changelog',
    category: '09. Timelines & Roadmaps',
    archetype: 'timeline',
    variant: 5,
    desc: 'Version milestones highlighting breakthrough platform features',
  },
  {
    id: 'timeline-gantt-minimal',
    name: 'Timeline · Minimalist Gantt Schedule',
    category: '09. Timelines & Roadmaps',
    archetype: 'timeline',
    variant: 6,
    desc: 'Clean horizontal duration bars indicating track dependencies',
  },
  {
    id: 'timeline-awards',
    name: 'Timeline · Awards & Recognition',
    category: '09. Timelines & Roadmaps',
    archetype: 'timeline',
    variant: 7,
    desc: 'Year-by-year list of industry accolades and performance awards',
  },
  {
    id: 'timeline-sprint-flow',
    name: 'Timeline · Sprint Iteration Cycles',
    category: '09. Timelines & Roadmaps',
    archetype: 'timeline',
    variant: 8,
    desc: 'Rapid two-week sprint cadences with deliverables checklist',
  },
  {
    id: 'timeline-growth-curve',
    name: 'Timeline · Historical Scale Curve',
    category: '09. Timelines & Roadmaps',
    archetype: 'timeline',
    variant: 9,
    desc: 'From founding inception to scale-up inflection points',
  },
  {
    id: 'timeline-launch-sequence',
    name: 'Timeline · Product Launch Countdown',
    category: '09. Timelines & Roadmaps',
    archetype: 'timeline',
    variant: 10,
    desc: 'Pre-launch rehearsal, public release, and post-launch review',
  },

  // ============================================================
  // GROUP 10: MEDIA, VISUALS & SHOWCASE (10)
  // ============================================================
  {
    id: 'image-hero-right',
    name: 'Media · Text Left + Hero Photo Right',
    category: '10. Media, Visuals & Showcase',
    archetype: 'image',
    variant: 1,
    desc: 'Zero-stretch editorial photo enclosure with narrative on left',
  },
  {
    id: 'image-hero-left',
    name: 'Media · Hero Photo Left + Text Right',
    category: '10. Media, Visuals & Showcase',
    archetype: 'image',
    variant: 2,
    desc: 'Dominant left visual frame paired with right explanatory column',
  },
  {
    id: 'image-split-cards',
    name: 'Media · Visual Showcase + 2 Cards',
    category: '10. Media, Visuals & Showcase',
    archetype: 'image',
    variant: 3,
    desc: 'Top photo spotlight supported by two structured insight cards',
  },
  {
    id: 'image-dual-compare',
    name: 'Media · Dual Image Comparison',
    category: '10. Media, Visuals & Showcase',
    archetype: 'image',
    variant: 4,
    desc: 'Two zero-stretch optical photos side-by-side with captions',
  },
  {
    id: 'image-trio-gallery',
    name: 'Media · 3-Image Gallery Strip',
    category: '10. Media, Visuals & Showcase',
    archetype: 'image',
    variant: 5,
    desc: 'Three vertical architectural photo frames with individual labels',
  },
  {
    id: 'image-floating-badges',
    name: 'Media · Portrait + Floating Badges',
    category: '10. Media, Visuals & Showcase',
    archetype: 'image',
    variant: 6,
    desc: 'Portrait photograph framed with floating certification tags',
  },
  {
    id: 'image-device-frame',
    name: 'Media · Device & Hardware Mockup',
    category: '10. Media, Visuals & Showcase',
    archetype: 'image',
    variant: 7,
    desc: 'Clean hardware device bezel enclosing interface screenshot',
  },
  {
    id: 'image-full-statement',
    name: 'Media · Visual Backdrop Manifesto',
    category: '10. Media, Visuals & Showcase',
    archetype: 'quote',
    variant: 1,
    desc: 'Subtle photo backdrop supporting high-contrast bold statement',
  },
  {
    id: 'manifesto-color-block',
    name: 'Media · High-Contrast Color Block',
    category: '10. Media, Visuals & Showcase',
    archetype: 'quote',
    variant: 2,
    desc: 'Vibrant full-bleed color block with giant punchy agency typography',
  },
  {
    id: 'html-bespoke',
    name: 'Media · Standalone HTML Slide Standard',
    category: '10. Media, Visuals & Showcase',
    archetype: 'html',
    variant: 1,
    desc: 'Pure 1-slide = 1 HTML file standard with unlimited creative freedom',
  },
  // ============================================================
  // GROUP 11: AI GEN (AUTONOMOUS CREATIVE ENGINE - SINGLE OPTION)
  // ============================================================
  {
    id: 'ai-gen',
    name: 'AI GEN (Autonomous Creative Layout)',
    category: '11. AI GEN (Autonomous)',
    archetype: 'html',
    variant: 1,
    desc: 'Autonomous AI-generated slide with complete creative design freedom. AI agent determines visual layout, geometry, color accents, and typography adaptively without template locks.',
  },
];

/**
 * Quick lookup dictionary by layout ID
 */
export const LAYOUT_LOOKUP: Record<string, LayoutDefinition> = {};
LAYOUT_CATALOG.forEach((item) => {
  LAYOUT_LOOKUP[item.id] = item;
});

/**
 * Helper to resolve archetype and variant for any layout ID
 */
export function resolveLayoutMeta(layoutId: string | LayoutType): LayoutDefinition {
  if (layoutId === 'ai-gen' || (typeof layoutId === 'string' && layoutId.startsWith('ai-'))) {
    return LAYOUT_CATALOG[LAYOUT_CATALOG.length - 1]; // The single AI GEN definition
  }

  if (LAYOUT_LOOKUP[layoutId]) {
    return LAYOUT_LOOKUP[layoutId];
  }

  // Graceful fallback for legacy archetype IDs
  const legacyMap: Record<string, LayoutDefinition> = {
    cover: LAYOUT_CATALOG[0],
    split: LAYOUT_CATALOG[10],
    metrics: LAYOUT_CATALOG[20],
    pillars: LAYOUT_CATALOG[30],
    bento: LAYOUT_CATALOG[40],
    timeline: LAYOUT_CATALOG[60],
    comparison: LAYOUT_CATALOG[70],
    quote: LAYOUT_CATALOG[90],
    image: LAYOUT_CATALOG[90],
    html: LAYOUT_CATALOG[99],
    bespoke: LAYOUT_CATALOG[99],
  };

  return (
    legacyMap[layoutId] || {
      id: layoutId as LayoutType,
      name: layoutId.toUpperCase(),
      category: '01. Covers & Hero Openers',
      archetype: 'split',
      variant: 1,
      desc: 'Dynamic presentation slide layout',
    }
  );
}
