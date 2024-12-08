import Link from "next/link";

import ArticleHeader from "@/components/article-header";
import ArticleImage from "@/components/article-image";
import ExternalLink from "@/components/external-link";

export default async function Home() {
  return (
    <article className="prose w-full min-w-full overflow-y-scroll pb-12 dark:prose-invert max-sm:prose-sm">
      <ArticleHeader id="" as="h1" className="invisible">
        God's Reveal
      </ArticleHeader>

      <ArticleImage
        className="-mt-12"
        src="/second-coming.jpg"
        alt="The second coming of Jesus Christ."
        caption={
          <>
            The first place Jesus' feet will touch is the Mount of Olives upon
            His glorious return to earth [
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

      <ArticleHeader id="welcome" as="h1">
        Welcome
      </ArticleHeader>
      <p>
        This website provides resources, tools, and a platform for everyone—from
        unbelievers to die-hard Christians—to explore the Biblical end times and
        the return of Jesus Christ.
      </p>
      <p>
        The content here is not exhaustive but represents a collection of
        thoughts, ideas, questions, and resources that have been on my mind
        since I began exploring this topic in 2020. It acts as more of a
        testimony than a scholarly work.
      </p>
      <p>
        Understanding Biblical prophecy can be complex, involving interwoven
        ideas, cross-references, and hypotheses. To assist with this, I've
        developed EschatoloGPT, an AI-powered tool that can answer your
        questions and clarify any confusion about end times Bible prophecy. You
        can access it at the bottom right of your screen or by clicking{" "}
        <Link href="/?chat=true">here</Link>.
      </p>
      <p>
        My hope is that as you study what the Bible says about the end times,
        you will share in the hope and excitement for the rapidly approaching
        second coming of our Lord and Savior.
      </p>

      <ArticleImage
        src="/middle-east-what-is-to-come.jpg"
        alt="The end times are centered around Israel and the Middle East."
        caption={
          <>
            The end times are centered around Israel and the Middle East. In
            fact, the United States is not even mentioned as having a role in
            the unfolding of the end times events [
            <ExternalLink
              href="https://www.gotquestions.org/united-states-Bible.html"
              muted
            >
              Got Questions
            </ExternalLink>
            ].
          </>
        }
      />

      <ArticleHeader id="foundational-resources" as="h1">
        Foundational Resources
      </ArticleHeader>
      <p>
        The following resources were foundational to my understanding of Bible's
        end times narrative:
      </p>

      <ArticleHeader as="h2" id="got-questions">
        Got Questions
      </ArticleHeader>
      <ul>
        <li>
          <ExternalLink href="https://www.gotquestions.org/tribulation.html">
            What is the end times tribulation?
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://www.gotquestions.org/end-times-Israel.html">
            What is Israel's role in the end times?
          </ExternalLink>
        </li>
      </ul>

      <ArticleHeader as="h2" id="fai">
        Frontier Alliance International
      </ArticleHeader>
      <ul>
        <li>
          <ExternalLink href="https://subsplash.com/frontierallianceinternat/fai/li/+4mjd7gk">
            Maranatha Fast 2020 // The End of the Age (Main Sessions)
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://subsplash.com/frontierallianceinternat/fai/li/+p7pddmh">
            Maranatha: The Church in Splendor at the End of All Things
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://subsplash.com/frontierallianceinternat/fai/li/+ppk2w6g">
            The Prophecies of Daniel
          </ExternalLink>
        </li>
      </ul>

      <ArticleHeader as="h2" id="tipping-point">
        Tipping Point with Jimmy Evans
      </ArticleHeader>
      <ul>
        <li>
          <ExternalLink href="https://endtimes.substack.com/p/gods-7000-year-calendar">
            God's 7,000-Year Calendar
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://www.youtube.com/watch?v=wQW4D9YMqzk">
            Revelation 12 Sign on September 23rd, 2017
          </ExternalLink>
        </li>
      </ul>
    </article>
  );
}
