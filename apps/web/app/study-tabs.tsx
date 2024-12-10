"use client";

import { useSearchParams } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@godsreveal/ui";

import { StudyIds } from "@/components/article/constants";
import { usePushUrl } from "@/components/use-push-url";

import BibleStudies from "./bible-studies";
import ExtraBiblicalStudies from "./extra-biblical-studies";

export default function StudyTabs() {
  const searchParams = useSearchParams();
  const { push } = usePushUrl();

  function handleValueChange(value: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(URL_PARAM_NAME, value);
    push({
      searchParams: newSearchParams,
    });
  }

  const currentOption = searchParams.get(URL_PARAM_NAME) || DEFAULT_OPTION;

  return (
    <Tabs
      value={currentOption}
      onValueChange={handleValueChange}
      className="my-8"
    >
      <TabsList className="w-full">
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

const URL_PARAM_NAME = "study";

const DEFAULT_OPTION = StudyIds.ExtraBiblicalStudies;

const OPTIONS = [StudyIds.ExtraBiblicalStudies, StudyIds.BibleStudies] as const;

const LABELS: Record<StudyIds, string> = {
  [StudyIds.ExtraBiblicalStudies]: "Extra-Biblical Studies",
  [StudyIds.BibleStudies]: "Bible Studies",
};

const ELEMENTS: Record<StudyIds, React.ReactNode> = {
  [StudyIds.ExtraBiblicalStudies]: <ExtraBiblicalStudies />,
  [StudyIds.BibleStudies]: <BibleStudies />,
};
