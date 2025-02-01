"use client";

import { useRouter } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@godsreveal/ui";

import { usePushUrl } from "@/components/use-push-url";
import { Study, StudyValues } from "@/lib/constants/url-params";

type StudyTabsProps = {
  tab: StudyValues;
  children: React.ReactNode;
};

export default function StudyTabs({ tab, children }: StudyTabsProps) {
  const { getUrl } = usePushUrl();
  const router = useRouter();

  function handleValueChange(tab: string) {
    router.push(
      getUrl({
        pathname: `/${tab}`,
        urlFragment: null,
        includeHost: false,
      }),
    );
  }

  return (
    <Tabs value={tab} onValueChange={handleValueChange} className="my-8">
      <div className="sticky top-[60px] z-10 bg-transparent py-2 sm:top-[68px]">
        <TabsList className="w-full p-1 sm:h-auto">
          {OPTIONS.map((option) => (
            <TabsTrigger key={option} value={option} className="flex-1">
              <span className="font-bold tracking-tight sm:text-lg">
                {LABELS[option]}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <TabsContent value={tab} className="mt-6">
        {children}
      </TabsContent>
    </Tabs>
  );
}

const OPTIONS = [Study.ExtraBiblicalStudies, Study.BibleStudies] as const;

const LABELS: Record<StudyValues, string> = {
  [Study.ExtraBiblicalStudies]: "Extra-Biblical Studies",
  [Study.BibleStudies]: "Bible Studies",
};
