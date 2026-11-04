# The 26 Signs of AI Writing & Structural Tells

Distilled from Wikipedia's *Signs of AI Writing* (WikiProject AI Cleanup) and `blader/humanizer` v3.1.0.

A language model writes whatever is most likely to come next. By default, it chooses what fits the widest range of readers and subjects. A human writer chooses for one specific reader and one specific subject. Every pattern below is one form of the default generic choice.

---

## Group A: Staging Instead of Stating
The sentence signals importance instead of adding a concrete fact. §1 to §5 justify an edit on one sighting.

### §1. Not X but Y (Negative-Positive Contrast)
- **Watch for:** Sentences asserting what something is *not* before stating what it *is*, or contrasting two clauses where the first exists solely to build momentum for the second.
- **Why AI uses it:** Creates artificial literary weight without adding factual information.
- **Before:** "It is not merely a tool for code completion, but a paradigm shift in software architecture."
- **After:** "It changes how developers write and structure software."
- **Before:** "The project is not about cutting costs; it is about building sustainable long-term value."
- **After:** "The project aims to keep the system reliable over several years."

### §2. One-Line Closers & Dramatic Fragments
- **Watch for:** A single short sentence or fragment standing alone as a paragraph at the end of a section ("Let that sink in.", "And that changes everything.", "The rest is history.", "Only time will tell.").
- **Why AI uses it:** Mimics emotional climax in thought-leadership essays.
- **Before:** "Companies that adapt will thrive. Those that don't will vanish. The clock is ticking."
- **After:** "Companies that adapt keep their market share."

### §3. Sayings That Sound Deep ("At its core", "In a world where")
- **Watch for:** Pseudo-philosophical phrases opening a thought ("At its core", "At the end of the day", "In today's fast-paced digital world", "Fundamentally speaking").
- **Why AI uses it:** Universal filler to stall while summarizing.
- **Before:** "At its core, authentication is about trust."
- **After:** "Authentication confirms who sent a request."

### §4. Staged Run-Up ("Here's the thing", "Make no mistake")
- **Watch for:** Conversational throat-clearing designed to simulate intimacy or authority ("Here's why that matters:", "Make no mistake:", "The truth is:", "Look no further:").
- **Why AI uses it:** Synthesizes casual urgency.
- **Before:** "Make no mistake: cache invalidation is the hardest problem in distributed systems."
- **After:** "Cache invalidation is the most common failure point in distributed systems."

### §5. Arguing with No One (Strawman & Preemptive Defense)
- **Watch for:** Sentences addressing hypothetical critics or stating obvious non-controversies ("While some may argue that testing takes time, quality is non-negotiable.").
- **Why AI uses it:** Simulates academic debate where none exists.
- **Before:** "While critics may claim documentation slows down sprints, well-documented code saves hours during outages."
- **After:** "Documentation saves time when debugging outages."

---

## Group B: Rhythm by Rule
Patterns where structural templates replace genuine thought cadence.

### §6. Forced Triads (The Rule of Three)
- **Watch for:** Endless lists of exactly three items ("fast, reliable, and secure"; "design, build, and deploy"; "vision, strategy, and execution").
- **Why AI uses it:** Language models heavily favor tripartite balance.
- **Before:** "Our platform is scalable, intuitive, and robust."
- **After:** "The platform handles 50,000 concurrent websocket connections without dropped frames."

### §7. Repeated Sentence Openings
- **Watch for:** Multiple consecutive sentences starting with the same grammatical structure: Participle clauses ("By leveraging X, by enabling Y..."), Gerunds ("Building on this..."), or Pronouns ("It provides... It enables... It offers...").
- **Why AI uses it:** Parallel syntactic loops.
- **Before:** "By optimizing queries, we reduced latency. By caching responses, we lowered server load. By adding CDN rules, we cut bandwidth."
- **After:** "Optimized database queries and added CDN edge caching, reducing overall p99 latency to 45ms."

### §8. Dashes as Universal Connectors (Em-Dash Overuse `—`)
- **Watch for:** Sentences held together by multiple em-dashes (`—`) instead of commas, semicolons, conjunctions, or two separate sentences.
- **Why AI uses it:** Allows chaining unrelated clauses without committing to grammatical subordination.
- **Before:** "The new API—designed for speed—handles millions of requests—without breaking a sweat."
- **After:** "The new API handles millions of requests with sub-50ms latency."

### §9. Stacked Qualifiers
- **Watch for:** Strings of 3+ adjectives or adverbs modifying a single noun ("a seamless, cutting-edge, mission-critical solution").
- **Why AI uses it:** Adjective salad to inflate mundane descriptions.
- **Before:** "We built a modern, responsive, highly scalable, and user-centric web interface."
- **After:** "We built a Next.js interface that loads in under 1 second on mobile."

### §10. Hyphenated Pairs & Syrupy Compounds
- **Watch for:** Overuse of compound adjectives ("battle-tested", "laser-focused", "value-driven", "future-proof", "action-oriented").
- **Before:** "Our team uses a laser-focused, value-driven development process."
- **After:** "The team prioritizes bug fixes by customer impact."

### §11. Unnecessary Passive Voice
- **Watch for:** Passive constructions hiding the actor ("Decisions were made", "Optimizations were implemented").
- **Before:** "Improvements were made to the database indexing strategy."
- **After:** "The backend team indexed the `user_id` column."

---

## Group C: Inflation & Borrowed Authority
Dressing up modest facts as historic breakthroughs.

### §12. Stock AI Buzzwords
- **Watch for:** *Testament, tapestry, delve, pivotal, beacon, crucial, multifaceted, holistic, revolutionize, game-changer, seamless, bespoke, unleash, embark, navigating, fostering, bolster, underscore.*
- **Action:** Replace with plain, specific nouns and verbs.
- **Before:** "This feature stands as a testament to our commitment to delving into user needs."
- **After:** "We built this feature because users requested automated exports."

### §13. Inflated Significance
- **Watch for:** Describing minor software updates or normal operational steps as monumental transformations ("transforms the entire landscape", "redefining industry benchmarks").
- **Before:** "Version 1.2 revolutionizes how teams manage their daily standup notes."
- **After:** "Version 1.2 adds markdown formatting to daily standup notes."

### §14. Vague Causal Connections
- **Watch for:** Phrases like "plays a key role in", "contributes significantly to", "helps ensure that", with zero metrics.
- **Before:** "Clean code plays a pivotal role in ensuring software reliability."
- **After:** "Small, pure functions reduce regression bugs during refactoring."

### §15. Shallow `-ing` Riders (Tacked-On Participles)
- **Watch for:** Sentences ending with dangling `-ing` clauses claiming consequences ("..., ensuring optimal throughput", "..., reflecting our core values", "..., unlocking unprecedented possibilities").
- **Before:** "We refactored the auth module, ensuring maximum security and peace of mind for our customers."
- **After:** "We refactored the auth module to enforce HTTP-only session cookies."

### §16. Generic Sales Pitch in Technical Docs
- **Watch for:** Marketing puffery inside READMEs, engineering tickets, or internal wikis ("Unlock the true power of...", "Experience the next level of...").
- **Before:** "Unlock the true power of container orchestration with our intuitive CLI tool."
- **After:** "This CLI deploys Docker containers to Kubernetes clusters."

### §17. Borrowed Authority ("Experts agree", "Studies show")
- **Watch for:** Vague appeals to anonymous authority without named citations or links.
- **Before:** "Studies show that faster websites lead to better user satisfaction."
- **After:** "Amazon found every 100ms of latency cost 1% in sales."

### §18. Avoiding Plain Verbs (Circumlocution for "Is", "Has", "Does")
- **Watch for:** Replacing simple verbs with bloated synonyms ("serves as", "boasts", "features", "exhibits", "showcases", "functions as").
- **Before:** "The dashboard boasts real-time metric tracking capabilities."
- **After:** "The dashboard shows real-time metrics."

---

## Group D: Formatting by Rule

### §19. Bold as Decoration on Every Bullet Point
- **Watch for:** Bulleted lists where every single item begins with a **Bold Label:** followed by an explanation, regardless of necessity.
- **Why AI uses it:** Default markdown structuring habit.
- **Fix:** Remove bolding unless the list is an explicit reference glossary. Let the text read as natural sentences.

### §20. Decorative Title-Case Headings
- **Watch for:** Unnecessarily dramatic, capitalized headings ("Harnessing The Full Spectrum Of Digital Innovation").
- **Fix:** Use sentence case and factual descriptions ("API rate limits and retry behavior").

### §21. Curly Quotes & Punctuation Inconsistencies
- **Watch for:** Mixing curly quotes (`“` `”`) with straight quotes (`"` `'`) or using weird typographic dashes inside code comments.

---

## Group E: Chat & Draft Leftovers

### §22. Chatbot Residue
- **Watch for:** Conversational openers and closers ("Certainly!", "Here is a breakdown of...", "I hope this helps!", "Let me know if you need anything else!").
- **Fix:** Cut completely.

### §23. Knowledge-Limit & Liability Disclaimers
- **Watch for:** Unsolicited reminders ("It is important to remember that...", "As an AI, I recommend consulting a professional...").
- **Fix:** Cut or convert to a factual engineering constraint.

### §24. Heading Repeated in the First Sentence
- **Watch for:** Section headers immediately echoed in the first sentence ("### Database Sharding\nDatabase sharding is an essential technique...").
- **Fix:** Dive straight into the specific mechanism.

### §25. Writing About the Document Instead of Its Subject
- **Watch for:** Meta-narrating the text itself ("This document outlines...", "As discussed in the previous section...", "The following table illustrates...").
- **Fix:** State the subject directly. Cut descriptions of what the text is doing.

---

## Group F: Writing for the Wrong Reader

### §26. Re-explaining What the Reader Already Knows
- **Watch for:** In PR comments, email replies, or internal tickets, repeating the entire background, ticket summary, and theoretical justification before giving the 1-line answer.
- **Fix:** Lead with the decision. Provide only the new fact or action needed.
