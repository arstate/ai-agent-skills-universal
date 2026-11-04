# Voice Matching, Cadence & Burstiness Architecture

Real human writing has **cadence** and **burstiness**: it alternates between very short, punchy sentences and longer, rhythmically complex ones. Language models, by contrast, naturally regress toward a uniform sentence length of 15 to 22 words with predictable clause structures.

---

## 1. The Burstiness Metric (Sentence Length Variation)

### AI Monotony (Uniform 18-Word Sentences)
> "The implementation of the new database schema significantly improves our overall query latency across all major endpoints. Furthermore, our development team worked diligently to ensure that backward compatibility was maintained throughout the migration process. As a result, end users will experience a much smoother transition without any noticeable disruption to their workflows."
*All three sentences hover between 18 and 24 words. The rhythm is completely flat.*

### Human Burstiness (Mixed 4-word, 26-word, and 8-word Sentences)
> "The new database schema cut query latency by 40%. The team spent three days writing migration scripts to keep older API clients working without downtime, which was tedious but paid off. Users won't notice a thing."
*Sentence lengths: 9 words $\rightarrow$ 23 words $\rightarrow$ 6 words. The cadence feels organic and human.*

---

## 2. Voice Matching Protocol

When a user provides a writing sample or specifies an author's voice:
1. **Analyze Punctuation Habits:** Does the sample use semicolons, parenthetical remarks, dashes, or strictly periods and commas?
2. **Measure Average Sentence Length:** Is the natural voice staccato (7–12 words/sentence) or flowing (18–30 words/sentence)?
3. **Inspect Vocabulary Register:** Does the author use earthy, direct Anglo-Saxon terms (*"buy", "build", "stop"*) or Latinate abstractions (*"procure", "architect", "terminate"*)?
4. **Preserve Quirks & Asides:** Keep self-corrections, parenthetical thoughts, and mild understatements. These are the fingerprints of human consciousness.

---

## 3. Sentence Length Rhythm Rules

To break the AI metronome, apply these three rules:
- **Rule of the Short Follow-Up:** After a sentence with two dependent clauses, place a sentence of under 7 words.
- **Rule of the Concrete Noun:** Strip qualifying adverbs (*"incredibly", "remarkably", "substantially"*) and replace them with specific nouns and numbers.
- **Rule of Asymmetry:** If listing items, avoid strict symmetry. Instead of three parallel clauses with identical verb-object structures, provide two concrete points or let one point carry more weight than the others.
