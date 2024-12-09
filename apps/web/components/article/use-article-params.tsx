import { useSearchParams } from "next/navigation";

import { usePushUrl } from "@/components/use-push-url";

export enum ArticleStudy {
  BIBLE = "bible",
  EXTRA_BIBLICAL = "extra-biblical",
}

export function useArticleParams() {
  const searchParams = useSearchParams();

  const { push } = usePushUrl();

  const study = getStudy(searchParams);

  function setStudy(study: ArticleStudy) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(STUDY_PARAM, study);
    push({
      searchParams: newSearchParams,
    });
  }

  return {
    study,
    setStudy,
  };
}

const STUDY_PARAM = "study";

function getStudy(searchParams: URLSearchParams): ArticleStudy {
  const rawStudy = searchParams.get(STUDY_PARAM);
  return !rawStudy ||
    !Object.values(ArticleStudy).includes(rawStudy as ArticleStudy)
    ? ArticleStudy.EXTRA_BIBLICAL
    : (rawStudy as ArticleStudy);
}
