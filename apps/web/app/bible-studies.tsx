import Article from "@/components/article";
import ArticleHeader from "@/components/article/article-header";
import { Header } from "@/lib/constants/url-params";

export default function BibleStudies() {
  return (
    <Article>
      <ArticleHeader as="h1" id={Header.BibleStudies}>
        Bible Studies
      </ArticleHeader>
      <p>Bible studies coming soon...</p>
    </Article>
  );
}
