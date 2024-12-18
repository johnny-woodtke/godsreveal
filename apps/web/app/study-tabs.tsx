"use client";

import { useSearchParams } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@godsreveal/ui";

import { usePushUrl } from "@/components/use-push-url";
import { STUDY_URL_PARAM, Study } from "@/lib/constants/url-params";

import BibleStudies from "./bible-studies";
import ExtraBiblicalStudies from "./extra-biblical-studies";

export default function StudyTabs() {
  const searchParams = useSearchParams();
  const { push } = usePushUrl();

  function handleValueChange(value: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(STUDY_URL_PARAM, value);
    push({
      searchParams: newSearchParams,
    });
  }

  const currentOption = searchParams.get(STUDY_URL_PARAM) || DEFAULT_OPTION;

  return (
    <Tabs
      value={currentOption}
      onValueChange={handleValueChange}
      className="my-8"
    >
      <TabsList className="w-full p-1 sm:h-auto">
        {OPTIONS.map((option) => (
          <TabsTrigger key={option} value={option} className="flex-1">
            <span className="font-bold tracking-tight sm:text-lg">
              {LABELS[option]}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
      {OPTIONS.map((option) => (
        <TabsContent key={option} value={option} className="mt-6">
          {ELEMENTS[option]}
        </TabsContent>
      ))}
    </Tabs>
  );
}

const DEFAULT_OPTION = Study.ExtraBiblicalStudies;

const OPTIONS = [Study.ExtraBiblicalStudies, Study.BibleStudies] as const;

const LABELS: Record<Study, string> = {
  [Study.ExtraBiblicalStudies]: "Extra-Biblical Studies",
  [Study.BibleStudies]: "Bible Studies",
};

const ELEMENTS: Record<Study, React.ReactNode> = {
  [Study.ExtraBiblicalStudies]: <ExtraBiblicalStudies />,
  [Study.BibleStudies]: <BibleStudies />,
};
