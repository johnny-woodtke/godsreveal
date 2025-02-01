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
  RobertBreaker = "robert-breaker",
  EndTimeHeadlines = "end-time-headlines",

  BibleStudies = "bible-studies",
  IsraelRegathered = "israel-regathered",
  DividingTheLand = "dividing-the-land",
  InstantCommunication = "instant-communication",
  WorldWar = "world-war",
  SurveillanceAndBiotechnology = "surveillance-and-biotechnology",
  IronAndClay = "iron-and-clay",
  NewWorldOrder = "new-world-order",
  ImageOfTheBeast = "image-of-the-beast",

  Salvation = "salvation",
  SalvationStop1 = "stop-1",
  SalvationStop2 = "stop-2",
  SalvationStop3 = "stop-3",
  SalvationStop4 = "stop-4",
  SalvationStop5 = "stop-5",
  NextSteps = "next-steps",
}

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
  [Header.RobertBreaker]: Study.ExtraBiblicalStudies,
  [Header.EndTimeHeadlines]: Study.ExtraBiblicalStudies,

  [Header.BibleStudies]: Study.BibleStudies,
  [Header.IsraelRegathered]: Study.BibleStudies,
  [Header.DividingTheLand]: Study.BibleStudies,
  [Header.WorldWar]: Study.BibleStudies,
  [Header.InstantCommunication]: Study.BibleStudies,
  [Header.SurveillanceAndBiotechnology]: Study.BibleStudies,
  [Header.IronAndClay]: Study.BibleStudies,
  [Header.NewWorldOrder]: Study.BibleStudies,
  [Header.ImageOfTheBeast]: Study.BibleStudies,

  [Header.Salvation]: null,
  [Header.SalvationStop1]: null,
  [Header.SalvationStop2]: null,
  [Header.SalvationStop3]: null,
  [Header.SalvationStop4]: null,
  [Header.SalvationStop5]: null,
  [Header.NextSteps]: null,
};

export const THREAD_ID_PARAM = "thread";

export const CHAT_MODAL_OPEN_PARAM = "chat";
