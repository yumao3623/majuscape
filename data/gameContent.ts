import type { SentenceChallenge, SortChallenge, Zone } from "@/types/majuscape";

export const zones: Zone[] = [
  { id: "sentence-station", name: "Sentence Station", shortName: "Sentences", skill: "sentence-beginning", description: "Power up every sentence with a strong start.", unlockXp: 0 },
  { id: "name-district", name: "Name District", shortName: "Names", skill: "people", description: "Repair names of people and special places.", unlockXp: 80 },
  { id: "calendar-corner", name: "Calendar Corner", shortName: "Calendar", skill: "days", description: "Tune up days, months, and holidays.", unlockXp: 180 },
  { id: "map-zone", name: "Map Zone", shortName: "Places", skill: "places", description: "Restore cities, states, and countries.", unlockXp: 320 },
  { id: "proper-noun-factory", name: "Proper Noun Factory", shortName: "Proper Nouns", skill: "proper-nouns", description: "Sort special names from everyday nouns.", unlockXp: 500 },
  { id: "title-tower", name: "Title Tower", shortName: "Titles", skill: "titles", description: "Fix titles used before a person's name.", unlockXp: 720 },
  { id: "capitalization-core", name: "Capitalization Core", shortName: "The Core", skill: "mixed", description: "Master mixed rules at city speed.", unlockXp: 980 },
];

export const repairQuestions: SentenceChallenge[] = [
  { id: "repair-01", sentence: "last monday, emma visited texas.", correctedSentence: "Last Monday, Emma visited Texas.", grade: 2, difficulty: "easy", skills: ["sentence-beginning", "days", "people", "places"], questionType: "sentence-repair", changes: [
    { index: 0, explanation: "The first word of a sentence needs a capital letter." },
    { index: 1, explanation: "Monday is a day of the week, so it needs a capital letter." },
    { index: 2, explanation: "Emma is a person's name, so it needs a capital letter." },
    { index: 4, explanation: "Texas is the name of a specific state, so it needs a capital letter." },
  ] },
  { id: "repair-02", sentence: "My Sister Likes Pizza after school.", correctedSentence: "My sister likes pizza after school.", grade: 2, difficulty: "easy", skills: ["common-nouns"], questionType: "sentence-repair", changes: [
    { index: 1, explanation: "Sister is a common noun here, so it stays lowercase." },
    { index: 2, explanation: "Likes is not the first word or a proper noun, so it stays lowercase." },
    { index: 3, explanation: "Pizza is an everyday thing, so it stays lowercase." },
  ] },
  { id: "repair-03", sentence: "on saturday, maya and i will visit chicago.", correctedSentence: "On Saturday, Maya and I will visit Chicago.", grade: 2, difficulty: "easy", skills: ["sentence-beginning", "days", "people", "pronoun-i", "places"], questionType: "sentence-repair", changes: [
    { index: 0, explanation: "The first word of a sentence needs a capital letter." },
    { index: 1, explanation: "Saturday is a day of the week, so it needs a capital letter." },
    { index: 2, explanation: "Maya is a person's name, so it needs a capital letter." },
    { index: 4, explanation: "The pronoun I is always capitalized." },
    { index: 7, explanation: "Chicago is a specific city, so it needs a capital letter." },
  ] },
  { id: "repair-04", sentence: "our class celebrates thanksgiving in november.", correctedSentence: "Our class celebrates Thanksgiving in November.", grade: 3, difficulty: "easy", skills: ["sentence-beginning", "holidays", "months"], questionType: "sentence-repair", changes: [
    { index: 0, explanation: "The first word of a sentence needs a capital letter." },
    { index: 3, explanation: "Thanksgiving is a holiday, so it needs a capital letter." },
    { index: 5, explanation: "November is a month, so it needs a capital letter." },
  ] },
  { id: "repair-05", sentence: "uncle ben speaks english and spanish.", correctedSentence: "Uncle Ben speaks English and Spanish.", grade: 3, difficulty: "medium", skills: ["people", "languages-nationalities"], questionType: "sentence-repair", changes: [
    { index: 0, explanation: "Uncle begins the sentence and is part of the name Uncle Ben here." },
    { index: 1, explanation: "Ben is a person's name, so it needs a capital letter." },
    { index: 3, explanation: "English is a language, so it needs a capital letter." },
    { index: 5, explanation: "Spanish is a language, so it needs a capital letter." },
  ] },
  { id: "repair-06", sentence: "We met mayor Green near the Library.", correctedSentence: "We met Mayor Green near the library.", grade: 3, difficulty: "medium", skills: ["titles", "people", "common-nouns"], questionType: "sentence-repair", changes: [
    { index: 2, explanation: "Mayor is a title used directly before Green, so it needs a capital letter." },
    { index: 6, explanation: "Library is a common noun here, so it stays lowercase." },
  ] },
  { id: "repair-07", sentence: "my cousin moved from mexico to seattle in june.", correctedSentence: "My cousin moved from Mexico to Seattle in June.", grade: 3, difficulty: "medium", skills: ["sentence-beginning", "places", "months"], questionType: "sentence-repair", changes: [
    { index: 0, explanation: "The first word of a sentence needs a capital letter." },
    { index: 4, explanation: "Mexico is a country, so it needs a capital letter." },
    { index: 6, explanation: "Seattle is a city, so it needs a capital letter." },
    { index: 8, explanation: "June is a month, so it needs a capital letter." },
  ] },
  { id: "repair-08", sentence: "The Teacher greeted doctor patel on Tuesday.", correctedSentence: "The teacher greeted Doctor Patel on Tuesday.", grade: 4, difficulty: "medium", skills: ["common-nouns", "titles", "people", "days"], questionType: "sentence-repair", changes: [
    { index: 1, explanation: "Teacher is a common noun here, so it stays lowercase." },
    { index: 3, explanation: "Doctor is a title directly before Patel, so it needs a capital letter." },
    { index: 4, explanation: "Patel is a person's name, so it needs a capital letter." },
  ] },
  { id: "repair-09", sentence: "on friday, professor lee flew from seattle to new york.", correctedSentence: "On Friday, Professor Lee flew from Seattle to New York.", grade: 4, difficulty: "hard", skills: ["sentence-beginning", "days", "titles", "people", "places"], questionType: "sentence-repair", changes: [
    { index: 0, explanation: "The first word of a sentence needs a capital letter." },
    { index: 1, explanation: "Friday is a day of the week, so it needs a capital letter." },
    { index: 2, explanation: "Professor is a title used directly before Lee." },
    { index: 3, explanation: "Lee is a person's name, so it needs a capital letter." },
    { index: 6, explanation: "Seattle is a specific city, so it needs a capital letter." },
    { index: 8, explanation: "New York is a city name, so both words need capital letters." },
    { index: 9, explanation: "New York is a city name, so both words need capital letters." },
  ] },
  { id: "repair-10", sentence: "My Brother Plays Soccer Every Saturday.", correctedSentence: "My brother plays soccer every Saturday.", grade: 4, difficulty: "hard", skills: ["common-nouns", "days"], questionType: "sentence-repair", changes: [
    { index: 1, explanation: "Brother is a common noun here, so it stays lowercase." },
    { index: 2, explanation: "Plays is not a proper noun, so it stays lowercase." },
    { index: 3, explanation: "Soccer is the name of a sport, so it stays lowercase." },
    { index: 4, explanation: "Every is not the first word here, so it stays lowercase." },
  ] },
  { id: "repair-11", sentence: "president lincoln gave a speech in gettysburg, pennsylvania.", correctedSentence: "President Lincoln gave a speech in Gettysburg, Pennsylvania.", grade: 5, difficulty: "hard", skills: ["titles", "people", "places"], questionType: "sentence-repair", changes: [
    { index: 0, explanation: "President is a title used directly before Lincoln." },
    { index: 1, explanation: "Lincoln is a person's name, so it needs a capital letter." },
    { index: 6, explanation: "Gettysburg is a specific place, so it needs a capital letter." },
    { index: 7, explanation: "Pennsylvania is a state, so it needs a capital letter." },
  ] },
  { id: "repair-12", sentence: "the american student visited lincoln elementary school.", correctedSentence: "The American student visited Lincoln Elementary School.", grade: 5, difficulty: "hard", skills: ["sentence-beginning", "languages-nationalities", "proper-nouns"], questionType: "sentence-repair", changes: [
    { index: 0, explanation: "The first word of a sentence needs a capital letter." },
    { index: 1, explanation: "American is a nationality, so it needs a capital letter." },
    { index: 4, explanation: "Lincoln Elementary School is a specific school name." },
    { index: 5, explanation: "Elementary is part of the school's full name." },
    { index: 6, explanation: "School is capitalized because it is part of the full proper name." },
  ] },
];

export const sortQuestions: SortChallenge[] = [
  { id: "sort-01", term: "monday", context: "We have music on monday.", correctedContext: "We have music on Monday.", capitalize: true, grade: 2, difficulty: "easy", skills: ["days"], questionType: "word-sort", explanation: "Monday is a day of the week, so capitalize it." },
  { id: "sort-02", term: "teacher", context: "The teacher read a story.", correctedContext: "The teacher read a story.", capitalize: false, grade: 2, difficulty: "easy", skills: ["common-nouns"], questionType: "word-sort", explanation: "teacher is a common noun here, so it stays lowercase." },
  { id: "sort-03", term: "california", context: "Our cousins live in california.", correctedContext: "Our cousins live in California.", capitalize: true, grade: 2, difficulty: "easy", skills: ["places"], questionType: "word-sort", explanation: "California is the name of a specific state." },
  { id: "sort-04", term: "river", context: "A river runs beside the trail.", correctedContext: "A river runs beside the trail.", capitalize: false, grade: 2, difficulty: "easy", skills: ["common-nouns"], questionType: "word-sort", explanation: "river is an everyday common noun in this sentence." },
  { id: "sort-05", term: "james", context: "james brought the soccer ball.", correctedContext: "James brought the soccer ball.", capitalize: true, grade: 2, difficulty: "easy", skills: ["people"], questionType: "word-sort", explanation: "James is a person's name." },
  { id: "sort-06", term: "december", context: "Winter break begins in december.", correctedContext: "Winter break begins in December.", capitalize: true, grade: 2, difficulty: "easy", skills: ["months"], questionType: "word-sort", explanation: "December is a month, so capitalize it.", bonus: true },
  { id: "sort-07", term: "school", context: "Our school has a garden.", correctedContext: "Our school has a garden.", capitalize: false, grade: 3, difficulty: "medium", skills: ["common-nouns"], questionType: "context-sort", explanation: "school is a common noun when it is not part of a specific name." },
  { id: "sort-08", term: "Lincoln Elementary School", context: "I go to Lincoln Elementary School.", correctedContext: "I go to Lincoln Elementary School.", capitalize: true, grade: 3, difficulty: "medium", skills: ["proper-nouns"], questionType: "context-sort", explanation: "Lincoln Elementary School is the full name of one school." },
  { id: "sort-09", term: "president", context: "The president spoke on television.", correctedContext: "The president spoke on television.", capitalize: false, grade: 3, difficulty: "medium", skills: ["titles"], questionType: "context-sort", explanation: "president stays lowercase when it is used as a general job name." },
  { id: "sort-10", term: "President Lincoln", context: "President Lincoln gave a speech.", correctedContext: "President Lincoln gave a speech.", capitalize: true, grade: 3, difficulty: "medium", skills: ["titles", "people"], questionType: "context-sort", explanation: "President is capitalized when it comes directly before Lincoln's name." },
  { id: "sort-11", term: "mom", context: "My mom is cooking dinner.", correctedContext: "My mom is cooking dinner.", capitalize: false, grade: 3, difficulty: "medium", skills: ["common-nouns"], questionType: "context-sort", explanation: "mom stays lowercase when my comes before it." },
  { id: "sort-12", term: "Mom", context: "Can you help me, Mom?", correctedContext: "Can you help me, Mom?", capitalize: true, grade: 3, difficulty: "medium", skills: ["people"], questionType: "context-sort", explanation: "Mom acts like a name when someone is speaking directly to her.", bonus: true },
  { id: "sort-13", term: "spanish", context: "Nora is learning spanish.", correctedContext: "Nora is learning Spanish.", capitalize: true, grade: 4, difficulty: "medium", skills: ["languages-nationalities"], questionType: "context-sort", explanation: "Spanish is the name of a language." },
  { id: "sort-14", term: "summer", context: "We swim every summer.", correctedContext: "We swim every summer.", capitalize: false, grade: 4, difficulty: "medium", skills: ["common-nouns"], questionType: "context-sort", explanation: "Names of seasons usually stay lowercase." },
  { id: "sort-15", term: "the Grand Canyon", context: "We hiked near the Grand Canyon.", correctedContext: "We hiked near the Grand Canyon.", capitalize: true, grade: 4, difficulty: "hard", skills: ["places", "proper-nouns"], questionType: "context-sort", explanation: "Grand Canyon is the specific name of a geographic place." },
  { id: "sort-16", term: "canyon", context: "A deep canyon crossed the desert.", correctedContext: "A deep canyon crossed the desert.", capitalize: false, grade: 4, difficulty: "hard", skills: ["common-nouns"], questionType: "context-sort", explanation: "canyon is a common noun without a specific place name." },
  { id: "sort-17", term: "Doctor Chen", context: "Doctor Chen checked my ankle.", correctedContext: "Doctor Chen checked my ankle.", capitalize: true, grade: 4, difficulty: "hard", skills: ["titles", "people"], questionType: "context-sort", explanation: "Doctor is a title directly before Chen's name." },
  { id: "sort-18", term: "doctor", context: "The doctor checked my ankle.", correctedContext: "The doctor checked my ankle.", capitalize: false, grade: 4, difficulty: "hard", skills: ["titles"], questionType: "context-sort", explanation: "doctor stays lowercase when it is a general job name." },
];

export const rushQuestions: SentenceChallenge[] = repairQuestions.map((question, index) => ({
  ...question,
  id: question.id.replace("repair", "rush"),
  questionType: "speed-repair",
  difficulty: index < 3 ? "easy" : index < 8 ? "medium" : "hard",
}));
