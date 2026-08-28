import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  CircleX,
  Gamepad2,
  GraduationCap,
  Home,
  Lightbulb,
  MapPin,
  Wrench,
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { absoluteUrl, createPageMetadata, siteName } from "@/lib/seo";

const pagePath = "/capitalization-rules-for-kids";
const title = "Capitalization Rules for Kids | Majuscape";
const description =
  "Learn capitalization rules for Grades 2-5 with clear examples. Practice sentence beginnings, proper nouns, names, places, calendar words, titles, and lowercase words.";

export const metadata: Metadata = createPageMetadata({ title, description, path: pagePath });

const rules = [
  {
    id: "sentence-beginnings",
    title: "Beginning of a sentence",
    shortRule: "Capitalize the first word in every sentence.",
    correct: "The library opens at nine.",
    incorrect: "the library opens at nine.",
    detail: "A capital letter signals that a new sentence has started, even when the first word is a common noun.",
  },
  {
    id: "pronoun-i",
    title: "The pronoun I",
    shortRule: "Always write the pronoun I as a capital letter.",
    correct: "Maya and I made a model.",
    incorrect: "Maya and i made a model.",
    detail: "The pronoun I is capitalized wherever it appears in a sentence. Other pronouns, such as he and they, do not follow this rule.",
  },
  {
    id: "people",
    title: "Names of people",
    shortRule: "Capitalize a person's first, middle, and last name.",
    correct: "Jordan Lee joined our team.",
    incorrect: "jordan lee joined our team.",
    detail: "A person's name identifies one specific person, so each main part of the name begins with a capital letter.",
  },
  {
    id: "places",
    title: "Specific places",
    shortRule: "Capitalize names of cities, states, countries, and named places.",
    correct: "We drove from Austin to New Mexico.",
    incorrect: "We drove from austin to new mexico.",
    detail: "A specific place name is a proper noun. General place words, such as city, park, and school, usually stay lowercase.",
  },
  {
    id: "calendar",
    title: "Days and months",
    shortRule: "Capitalize days of the week and months of the year.",
    correct: "Our trip begins Monday, June 8.",
    incorrect: "Our trip begins monday, june 8.",
    detail: "Monday and June are official calendar names. Seasons such as spring and winter usually remain lowercase.",
  },
  {
    id: "holidays",
    title: "Holidays",
    shortRule: "Capitalize the important words in holiday names.",
    correct: "School closes for Labor Day.",
    incorrect: "School closes for labor day.",
    detail: "A holiday has a specific name. Short connecting words may stay lowercase when they are part of a longer holiday name.",
  },
  {
    id: "languages-nationalities",
    title: "Languages and nationalities",
    shortRule: "Capitalize the names of languages and nationalities.",
    correct: "Noah speaks Spanish and English.",
    incorrect: "Noah speaks spanish and english.",
    detail: "Language and nationality names are proper nouns and proper adjectives, so they begin with capital letters.",
  },
  {
    id: "titles",
    title: "Titles before names",
    shortRule: "Capitalize a title when it comes directly before a person's name.",
    correct: "Professor Lee welcomed us.",
    incorrect: "professor Lee welcomed us.",
    detail: "Use a capital in President Lincoln or Dr. Rivera. Keep the title lowercase when it is general: the president or our doctor.",
  },
  {
    id: "unnecessary-capitals",
    title: "Common nouns stay lowercase",
    shortRule: "Do not capitalize ordinary words unless another rule requires it.",
    correct: "My brother plays soccer every Saturday.",
    incorrect: "My Brother Plays Soccer Every Saturday.",
    detail: "Important-looking words are not automatically proper nouns. Brother, plays, soccer, and every are common words in this sentence.",
  },
] as const;

const contextExamples = [
  {
    word: "mom / Mom",
    lowercase: "My mom is cooking.",
    capitalized: "Thanks, Mom!",
    reason: "Use lowercase after a word such as my. Capitalize Mom when it is used directly as a name.",
  },
  {
    word: "president / President",
    lowercase: "The president gave a speech.",
    capitalized: "President Lincoln gave a speech.",
    reason: "A general job title stays lowercase. A title directly before a name is capitalized.",
  },
  {
    word: "school / School",
    lowercase: "Our school has a garden.",
    capitalized: "Lincoln Elementary School has a garden.",
    reason: "A general place word stays lowercase. Every important word in a school's official name is capitalized.",
  },
  {
    word: "seasons / calendar names",
    lowercase: "We hike in summer.",
    capitalized: "We hike every June.",
    reason: "Seasons are usually common nouns, while days and months are specific calendar names.",
  },
] as const;

const faqs = [
  {
    question: "Does every important word need a capital letter?",
    answer: "No. A word is capitalized because a rule requires it, not because it feels important. Common nouns such as teacher, school, brother, and soccer usually stay lowercase unless they begin a sentence or belong to a specific name.",
  },
  {
    question: "Should mom and dad be capitalized?",
    answer: "Capitalize Mom or Dad when the word is used as a name, as in 'Thanks, Mom.' Use lowercase after words such as my, your, or our, as in 'My mom packed lunch.'",
  },
  {
    question: "Are seasons capitalized?",
    answer: "The names of seasons are usually lowercase: spring, summer, fall, and winter. Capitalize a season only when it begins a sentence or appears in an official name or title.",
  },
  {
    question: "Why are days and months capitalized?",
    answer: "Days and months are capitalized because Monday, Friday, January, and October are specific calendar names. They are proper nouns. General time words such as day, week, month, and season stay lowercase.",
  },
  {
    question: "How can students practice capitalization rules?",
    answer: "Students can practice by correcting complete sentences, sorting words with context, and finding mixed capitalization errors quickly. Majuscape provides all three kinds of practice with an explanation after each mistake.",
  },
] as const;

export default function CapitalizationRulesPage() {
  const pageUrl = absoluteUrl(pagePath);
  const homeUrl = absoluteUrl("/");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: "en-US",
        isPartOf: { "@id": `${homeUrl}#website` },
      },
      {
        "@type": "LearningResource",
        "@id": `${pageUrl}#learning-resource`,
        name: "Capitalization Rules for Kids",
        url: pageUrl,
        description,
        inLanguage: "en-US",
        isAccessibleForFree: true,
        educationalLevel: "Grades 2-5",
        typicalAgeRange: "7-11",
        learningResourceType: "Reference guide",
        teaches: rules.map((rule) => rule.title),
        provider: { "@type": "Organization", name: siteName, url: homeUrl },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Majuscape", item: homeUrl },
          { "@type": "ListItem", position: 2, name: "Capitalization Rules for Kids", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return (
    <>
      <SiteHeader />
      <main className="rules-page">
        <section className="rules-hero" aria-labelledby="rules-heading">
          <div className="rules-shell">
            <nav className="rules-breadcrumb" aria-label="Breadcrumb">
              <Link href="/"><Home aria-hidden="true" /> Majuscape</Link>
              <span aria-hidden="true">/</span>
              <span>Capitalization Rules for Kids</span>
            </nav>
            <div className="rules-hero-grid">
              <div className="rules-hero-copy">
                <p className="rules-kicker"><BookOpenCheck aria-hidden="true" /> LETTER ENGINEER HANDBOOK</p>
                <h1 id="rules-heading">Capitalization Rules for Kids</h1>
                <p className="rules-definition"><strong>Capitalization means using an uppercase letter when an English rule requires one.</strong> Capital letters begin sentences and mark specific names, places, calendar words, holidays, languages, and some titles. Words that are common nouns usually stay lowercase. The goal is to decide which rule fits each word in its sentence.</p>
                <div className="rules-hero-actions">
                  <Link href="#quick-rule-map" className="game-button game-button-secondary">View the rules <ArrowRight aria-hidden="true" /></Link>
                  <Link href="/games/capitalization-repair" className="game-button game-button-primary"><Gamepad2 aria-hidden="true" /> Practice now</Link>
                </div>
              </div>
              <div className="handbook-machine" aria-label="Capitalization repair example">
                <div className="handbook-topbar"><span><Wrench aria-hidden="true" /> RULE SCANNER</span><span><i /> ONLINE</span></div>
                <div className="handbook-screen">
                  <span className="handbook-label">Find the capitalization changes</span>
                  <p className="handbook-before"><CircleX aria-hidden="true" /> my friend lucas moved to texas in june.</p>
                  <p className="handbook-after"><CheckCircle2 aria-hidden="true" /> My friend Lucas moved to Texas in June.</p>
                </div>
                <div className="handbook-readout"><span>Sentence start</span><span>Person</span><span>Place</span><span>Month</span></div>
              </div>
            </div>
          </div>
        </section>

        <nav className="rules-jump-band" aria-label="Capitalization rule sections">
          <div className="rules-shell rules-jump-list">
            <span>QUICK ACCESS</span>
            {rules.map((rule, index) => <a key={rule.id} href={`#${rule.id}`}>{String(index + 1).padStart(2, "0")} {rule.title}</a>)}
          </div>
        </nav>

        <section className="rules-overview" id="quick-rule-map" aria-labelledby="quick-rule-heading">
          <div className="rules-shell">
            <div className="rules-section-heading">
              <p>QUICK RULE MAP</p>
              <h2 id="quick-rule-heading">When should a word be capitalized?</h2>
              <span>Use a capital when a rule applies. Keep the word lowercase when no capitalization rule applies.</span>
            </div>
            <div className="rules-table-panel">
              <div className="rules-table-title"><MapPin aria-hidden="true" /><span>CAPITALIZATION CONTROL BOARD</span><b>9 RULES</b></div>
              <div className="rules-table-wrap" tabIndex={0} role="region" aria-label="Capitalization rules comparison table">
                <table>
                  <thead><tr><th>Category</th><th>Rule</th><th>Correct</th><th>Common error</th></tr></thead>
                  <tbody>
                    {rules.map((rule) => (
                      <tr key={rule.id}>
                        <th scope="row">{rule.title}</th>
                        <td data-label="Rule">{rule.shortRule}</td>
                        <td data-label="Correct"><span className="table-example table-example-correct"><CheckCircle2 aria-hidden="true" />{rule.correct}</span></td>
                        <td data-label="Common error"><span className="table-example table-example-error"><CircleX aria-hidden="true" />{rule.incorrect}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="rules-detail-band" aria-labelledby="rules-detail-heading">
          <div className="rules-shell">
            <div className="rules-section-heading rules-section-heading-left">
              <p>RULE-BY-RULE GUIDE</p>
              <h2 id="rules-detail-heading">Nine capitalization rules to practice</h2>
              <span>Read each rule, compare the examples, and notice why the capital letter belongs there.</span>
            </div>
            <div className="rule-card-grid">
              {rules.map((rule, index) => (
                <article className="rule-card" id={rule.id} key={rule.id}>
                  <header><span>{String(index + 1).padStart(2, "0")}</span><h3>{rule.title}</h3></header>
                  <p className="rule-card-rule">{rule.shortRule}</p>
                  <div className="rule-example-pair">
                    <p className="rule-good"><CheckCircle2 aria-hidden="true" /><span><b>Correct</b>{rule.correct}</span></p>
                    <p className="rule-fix"><CircleX aria-hidden="true" /><span><b>Fix it</b>{rule.incorrect}</span></p>
                  </div>
                  <p className="rule-card-detail"><Lightbulb aria-hidden="true" />{rule.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="context-band" aria-labelledby="context-heading">
          <div className="rules-shell context-layout">
            <div className="rules-section-heading rules-section-heading-left">
              <p>CONTEXT CHECK</p>
              <h2 id="context-heading">Some words change with the sentence</h2>
              <span>A word is not always uppercase or always lowercase. Its job in the sentence decides which form is correct.</span>
            </div>
            <div className="context-list">
              {contextExamples.map((example) => (
                <article key={example.word}>
                  <h3>{example.word}</h3>
                  <div><span>KEEP LOWERCASE</span><p>{example.lowercase}</p></div>
                  <div><span>CAPITALIZE</span><p>{example.capitalized}</p></div>
                  <p>{example.reason}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="practice-path-band" aria-labelledby="practice-heading">
          <div className="rules-shell">
            <div className="rules-section-heading">
              <p>FROM RULES TO PLAY</p>
              <h2 id="practice-heading">Practice the rule in three different ways</h2>
              <span>Choose the learning job you need: repair a sentence, classify a word in context, or apply mixed rules quickly.</span>
            </div>
            <div className="practice-path-grid">
              <Link href="/games/capitalization-repair" className="practice-station practice-station-repair">
                <span>01 / NOTICE AND FIX</span><Wrench aria-hidden="true" /><h3>Capitalization Repair</h3><p>Correct every capitalization error in a complete sentence and read the rule feedback.</p><b>Open the repair workshop <ArrowRight aria-hidden="true" /></b>
              </Link>
              <Link href="/games/capitalization-sort" className="practice-station practice-station-sort">
                <span>02 / CLASSIFY THE RULE</span><BookOpenCheck aria-hidden="true" /><h3>Capitalization Sort</h3><p>Use sentence context to decide whether a word belongs in CAPITALIZE or KEEP LOWERCASE.</p><b>Enter the sorting dock <ArrowRight aria-hidden="true" /></b>
              </Link>
              <Link href="/games/capitalization-rush" className="practice-station practice-station-rush">
                <span>03 / APPLY IT FAST</span><Gamepad2 aria-hidden="true" /><h3>Capitalization Rush</h3><p>Find mixed capitalization changes before time runs out and restore the city power grid.</p><b>Start the city rescue <ArrowRight aria-hidden="true" /></b>
              </Link>
            </div>
          </div>
        </section>

        <section className="teacher-rules-band" aria-labelledby="teacher-rules-heading">
          <div className="rules-shell teacher-rules-layout">
            <div>
              <p className="rules-kicker"><GraduationCap aria-hidden="true" /> FOR TEACHERS AND FAMILIES</p>
              <h2 id="teacher-rules-heading">A simple Grades 2-5 practice path</h2>
              <p>Use the guide as a quick reference before a game round, then ask learners to explain which rule caused each change. Short, repeated practice works well for classroom warm-ups, literacy stations, homework, and homeschool lessons.</p>
            </div>
            <ol>
              <li><b>Grade 2 focus</b><span>Sentence beginnings, names of people, and the pronoun I.</span></li>
              <li><b>Grade 3 focus</b><span>Days, months, holidays, cities, states, and countries.</span></li>
              <li><b>Grades 4-5 focus</b><span>Titles, named places, contextual family words, and unnecessary capitals.</span></li>
            </ol>
          </div>
        </section>

        <section className="rules-faq-band" aria-labelledby="rules-faq-heading">
          <div className="rules-shell rules-faq-layout">
            <div className="rules-section-heading rules-section-heading-left">
              <p>RULE DESK FAQ</p>
              <h2 id="rules-faq-heading">Capitalization questions students ask</h2>
              <span>Short answers for the rules that depend most on context.</span>
            </div>
            <div className="rules-faq-list">
              {faqs.map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <JsonLd data={jsonLd} />
    </>
  );
}
