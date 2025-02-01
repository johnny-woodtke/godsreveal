import { Study, StudyValues } from "@/lib/constants/url-params";

import BibleStudies from "./bible-studies";
import ExtraBiblicalStudies from "./extra-biblical-studies";

type HomePageProps = {
  params: {
    tab: StudyValues;
  };
};

export default function HomePage({ params }: HomePageProps) {
  return ELEMENTS[params.tab];
}

const ELEMENTS: Record<StudyValues, React.ReactNode> = {
  [Study.ExtraBiblicalStudies]: <ExtraBiblicalStudies />,
  [Study.BibleStudies]: <BibleStudies />,
};
