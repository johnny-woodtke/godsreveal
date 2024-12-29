"use client";

import { useRouter } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@godsreveal/ui";

import { usePushUrl } from "@/components/use-push-url";
import { Study } from "@/lib/constants/url-params";

type StudyTabsProps = {
  tab: Study;
  children: React.ReactNode;
};

export default function StudyTabs({ tab, children }: StudyTabsProps) {
  const { getUrl } = usePushUrl();
  const router = useRouter();

  function handleValueChange(tab: string) {
    const url = getUrl({
      pathname: `/${tab}`,
      urlFragment: null,
      includeHost: false,
    });
    router.push(url);
  }

  return (
    <Tabs value={tab} onValueChange={handleValueChange} className="my-8">
      <TabsList className="w-full p-1 sm:h-auto">
        {OPTIONS.map((option) => (
          <TabsTrigger key={option} value={option} className="flex-1">
            <span className="font-bold tracking-tight sm:text-lg">
              {LABELS[option]}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={tab} className="mt-6">
        {children}
      </TabsContent>
    </Tabs>
  );
}

const OPTIONS = [Study.ExtraBiblicalStudies, Study.BibleStudies] as const;

const LABELS: Record<Study, string> = {
  [Study.ExtraBiblicalStudies]: "Extra-Biblical Studies",
  [Study.BibleStudies]: "Bible Studies",
};
