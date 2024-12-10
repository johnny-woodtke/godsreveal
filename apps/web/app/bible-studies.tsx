import Article from "@/components/article";
import ArticleHeader from "@/components/article/article-header";
import { HeaderIds } from "@/components/article/constants";

export default function BibleStudies() {
  return (
    <Article>
      <ArticleHeader as="h1" id={HeaderIds.BibleStudies}>
        Bible Studies
      </ArticleHeader>
      <p>Bible studies coming soon...</p>
    </Article>
  );
}
