import Link from "next/link";
import { redirect } from "next/navigation";

import Article from "@/components/article";
import ArticleHeader from "@/components/article/article-header";
import ArticleImage from "@/components/article/article-image";
import ExternalLink from "@/components/article/external-link";
import Scripture from "@/components/article/scripture";
import TableOfContents from "@/components/article/table-of-contents";
import StudyTabs from "@/components/study-tabs";
import { Header, Study } from "@/lib/constants/url-params";

type HomeLayoutProps = {
  children: React.ReactNode;
  params: {
    tab: Study;
  };
};

export default function HomeLayout({ children, params }: HomeLayoutProps) {
  const { tab } = params;
  if (!Object.values(Study).includes(tab)) {
    return redirect(`/${Study.ExtraBiblicalStudies}`);
  }

  return (
    <div className="flex w-full">
      <div className="w-0 flex-1 max-2xl:invisible"></div>
      <div className="flex w-full max-w-screen-lg flex-shrink-0 flex-col gap-4">
        <Article>
          <ArticleHeader id={Header.Empty} as="h1" className="invisible">
            God's Reveal
          </ArticleHeader>

          <ArticleImage
            className="-mt-12"
            src="/second-coming.jpg"
            alt="The second coming of Jesus Christ."
            caption={
              <>
                The first place Jesus' feet will touch is the Mount of Olives
                upon His glorious return to earth [
                <ExternalLink
                  href="https://www.biblegateway.com/passage/?search=Zechariah%2014%3A4-11&version=KJV"
                  muted
                >
                  Zechariah 14:4-11
                </ExternalLink>
                ].
              </>
            }
          />

          <ArticleHeader id={Header.Welcome} as="h1">
            Welcome
          </ArticleHeader>
          <p>
            This website provides resources for everyone to explore the Biblical
            end times and the return of Jesus Christ.
          </p>

          <p>
            Understanding Bible prophecy can be challenging and complex. To help
            with this, I've developed{" "}
            <span className="font-bold">EschatoloGPT</span>, an AI-powered tool
            that can answer your questions and clarify any confusion about end
            times Bible prophecy. You can access it at the bottom right of your
            screen or by clicking <Link href="/?chat=true">here</Link>.
          </p>

          <p>
            Ultimately, as you learn what the Bible says about the end times and
            how it relates to our world today, I pray you will be more willing
            and able to fall out of love with this wicked, fallen world [
            <ExternalLink href="https://www.biblegateway.com/passage/?search=1%20John%202%3A15-17&version=KJV">
              1 John 2:15-17
            </ExternalLink>
            ], and instead share in my ever-growing hope and excitement for the
            rapidly approaching second coming of our Lord and Savior, Jesus
            Christ.
          </p>

          <Scripture
            text={
              <>
                And when these things begin to come to pass, then look up, and
                lift up your heads; for your redemption draweth nigh.
              </>
            }
            cite="Luke 21:28"
          />
        </Article>

        <StudyTabs tab={params.tab}>{children}</StudyTabs>
      </div>
      <div className="w-0 flex-1 max-2xl:invisible 2xl:mt-[1050px] 2xl:pr-4">
        <TableOfContents />
      </div>
    </div>
  );
}
