export enum Header {
  Empty = "",
  Welcome = "welcome",

  ExtraBiblicalStudies = "extra-biblical-studies",
  GotQuestions = "got-questions",
  TippingPoint = "tipping-point",
  Generation2434 = "generation2434",
  FrontierAllianceInternational = "fai",
  ProphecyDepot = "prophecy-depot",
  JonathanCahn = "jonathan-cahn",

  BibleStudies = "bible-studies",
  IsraelRegathered = "israel-regathered",
  DividingTheLand = "dividing-the-land",
  InstantCommunication = "instant-communication",
  WorldWar = "world-war",
}

export const STUDY_URL_PARAM = "study";

export enum Study {
  ExtraBiblicalStudies = "extra-biblical-studies",
  BibleStudies = "bible-studies",
}

export const HEADER_STUDY_MAP: Record<Header, Study | null> = {
  [Header.Empty]: null,
  [Header.Welcome]: null,

  [Header.ExtraBiblicalStudies]: Study.ExtraBiblicalStudies,
  [Header.GotQuestions]: Study.ExtraBiblicalStudies,
  [Header.TippingPoint]: Study.ExtraBiblicalStudies,
  [Header.Generation2434]: Study.ExtraBiblicalStudies,
  [Header.FrontierAllianceInternational]: Study.ExtraBiblicalStudies,
  [Header.ProphecyDepot]: Study.ExtraBiblicalStudies,
  [Header.JonathanCahn]: Study.ExtraBiblicalStudies,

  [Header.BibleStudies]: Study.BibleStudies,
  [Header.IsraelRegathered]: Study.BibleStudies,
  [Header.DividingTheLand]: Study.BibleStudies,
  [Header.WorldWar]: Study.BibleStudies,
  [Header.InstantCommunication]: Study.BibleStudies,
};

export const THREAD_ID_PARAM = "thread";

export const CHAT_MODAL_OPEN_PARAM = "chat";
