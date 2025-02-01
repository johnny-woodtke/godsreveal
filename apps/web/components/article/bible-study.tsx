import ArticleHeader from "@/components/article/article-header";
import ExternalLink from "@/components/article/external-link";
import Scripture, { ScriptureProps } from "@/components/article/scripture";
import { HeaderValues } from "@/lib/constants/url-params";

type Title = {
  id: HeaderValues;
  text: string;
};

type FurtherStudy = {
  text: string;
  href: string;
};

type BibleStudyProps = {
  title: Title;
  scriptures: ScriptureProps[];
  summary: React.ReactNode;
  interpretation: React.ReactNode;
  furtherStudy: FurtherStudy[];
};

export default function BibleStudy({
  title,
  scriptures,
  summary,
  interpretation,
  furtherStudy,
}: BibleStudyProps) {
  return (
    <>
      <ArticleHeader as="h2" id={title.id}>
        {title.text}
      </ArticleHeader>

      {scriptures.map((scripture) => (
        <Scripture
          key={scripture.cite}
          text={scripture.text}
          cite={scripture.cite}
        />
      ))}

      <h3>Summary</h3>
      {summary}

      <h3>Interpretation</h3>
      {interpretation}

      <h3>Further Study</h3>
      <ul>
        {furtherStudy.map((study) => (
          <li key={study.href}>
            <ExternalLink href={study.href}>{study.text}</ExternalLink>
          </li>
        ))}
      </ul>
    </>
  );
}
