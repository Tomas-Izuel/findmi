import { column, defineDb, defineTable } from "astro:db";

const Instrument = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    type: column.text(),
  },
});

const Contact = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    network: column.text(),
    href: column.text(),
  },
});

const Experience = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    experience: column.number(),
  },
});

const Musician = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    age: column.number(),
    nickname: column.text(),
    constact: column.json(),
    password: column.text(),
    about: column.text(),
    musicianInstrumentId: column.number({
      references: () => MusicianInstrument.columns.id,
    }),
    contactId: column.number({
      references: () => Contact.columns.id,
    }),
  },
});

const MusicianInstrument = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    instrumentId: column.number({ references: () => Instrument.columns.id }),
    experienceId: column.number({ references: () => Experience.columns.id }),
  },
});
export default defineDb({
  tables: {
    Instrument,
    Experience,
    Musician,
    MusicianInstrument,
    Contact,
  },
});
