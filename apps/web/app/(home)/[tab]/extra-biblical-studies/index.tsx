import Link from "next/link";

import Article from "@/components/article";
import ArticleHeader from "@/components/article/article-header";
import ArticleImage from "@/components/article/article-image";
import Callout from "@/components/article/callout";
import ExternalLink from "@/components/article/external-link";
import YoutubePlayer, { YoutubePlayerGrid } from "@/components/youtube-player";
import { CHAT_MODAL_OPEN_PARAM, Header } from "@/lib/constants/url-params";

export default function ExtraBiblicalStudies() {
  return (
    <Article>
      <ArticleHeader as="h1" id={Header.ExtraBiblicalStudies}>
        Extra-Biblical Studies
      </ArticleHeader>
      <p>
        The following section contains resources that are especially helpful in
        understanding the end times. These resources are "extra-Biblical," but
        they all point to God's true and holy Word.
      </p>
      <p>
        Remember, you can seek guidance from the Holy Spirit, consult{" "}
        <ExternalLink href="https://www.biblegateway.com/">
          God's Word
        </ExternalLink>
        , talk to trusted counsel, or ask{" "}
        <Link href={`/?${CHAT_MODAL_OPEN_PARAM}=true`}>EschatoloGPT</Link> any
        questions to clarify any concerns you may have while studying these
        resources.
      </p>

      <ArticleHeader as="h2" id={Header.GotQuestions}>
        Got Questions
      </ArticleHeader>
      <ul>
        <li>
          <ExternalLink href="https://www.gotquestions.org/Eschatology.html">
            What is Christian Eschatology?
          </ExternalLink>
        </li>
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
        <li>
          <ExternalLink href="https://www.gotquestions.org/millennium.html">
            What is the millennial kingdom, and should it be understood
            literally?
          </ExternalLink>
        </li>
      </ul>

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

      <ArticleHeader as="h2" id={Header.TippingPoint}>
        Tipping Point with Jimmy Evans
      </ArticleHeader>
      <ul>
        <li>
          <ExternalLink href="https://endtimes.substack.com/p/gods-7000-year-calendar">
            God's 7,000-Year Calendar
          </ExternalLink>
        </li>
      </ul>
      <YoutubePlayerGrid>
        <YoutubePlayer
          src="https://www.youtube.com/embed/WlwzRhDpDFU?si=F5rFZm7KNRiIQmRz"
          title="Seven Major End Times Signs"
        />
        <YoutubePlayer
          src="https://www.youtube.com/embed/hsITd6NoDH8?si=UBlHfLo3ip08Exga"
          title="The Mark of the Beast Revealed"
        />
        <YoutubePlayer
          src="https://www.youtube.com/embed/wQW4D9YMqzk"
          title="Revelation 12 Sign on September 23rd, 2017"
        />
      </YoutubePlayerGrid>

      <Callout
        text={
          <>
            Many of the earliest Christians believed in a 7,000 year time period
            which follows the pattern of seven days of creation in the book of
            Genesis [
            <ExternalLink href="https://www.prophecy-workshop.com/the-7-000-year-cycle">
              Prophecy Workshop
            </ExternalLink>
            ].
          </>
        }
      />

      <ArticleHeader as="h2" id={Header.Generation2434}>
        Generation2434
      </ArticleHeader>
      <YoutubePlayerGrid>
        <YoutubePlayer
          src="https://www.youtube.com/embed/UMuhAY_Etvg?si=ny9vTXvkfQ7oy7Sa"
          title="Rapture: The Final Four?"
        />
        <YoutubePlayer
          src="https://www.youtube.com/embed/_inUGuQ8BwM?si=9UiIAemOImonCfZ5r"
          title="The Final Two - A Prophecy Perspective"
        />
      </YoutubePlayerGrid>

      <ArticleImage
        large
        src="/final-two-chart.png"
        alt="The Final Two - A Prophecy Perspective"
        caption={
          <>
            An illustration of how our world has aligned with the Biblical
            characteristics of the end times over the last 100 years [
            <ExternalLink
              href="https://www.youtube.com/live/_inUGuQ8BwM?si=9UiIAemOImonCfZ5r"
              muted
            >
              Generation2434
            </ExternalLink>
            ].
          </>
        }
      />

      <ArticleHeader as="h2" id={Header.FrontierAllianceInternational}>
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
        <li>
          <ExternalLink href="https://joelstrumpet.com/wp-content/uploads/2019/02/MIdeast-Beast-Master-File-Joel-Richardson.pdf">
            The Mid-East Beast: The Scriptural Case for an Islamic Antichrist
          </ExternalLink>
        </li>
      </ul>

      <Callout
        text={
          <>
            The{" "}
            <ExternalLink href="https://subsplash.com/frontierallianceinternat/fai/li/+ppk2w6g">
              Prophecies of Daniel
            </ExternalLink>{" "}
            series was an absolute game changer in my understanding of end times
            Bible prophecy. I started this series with nothing but an interest
            in the end times, and I ended able to keep up with 90% of scholarly
            discussions.
          </>
        }
      />

      <ArticleHeader as="h2" id={Header.ProphecyDepot}>
        Prophecy Depot Ministries
      </ArticleHeader>
      <ul>
        <li>
          <ExternalLink href="http://www.prophecydepotministries.net/2022/ancient-prophecy-predicts-a-nuclear-disaster-in-iran/">
            Ancient Prophecy Predicts a Nuclear Disaster in Iran
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="http://www.prophecydepotministries.net/2023/why-the-destruction-of-damascus-is-a-future-war-prophecy/">
            Why the Destruction of Damascus is a Future War Prophecy
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="http://www.prophecydepotministries.net/2022/are-jeremiah-4934-39-and-ezekiel-38-the-same-event-what-about-psalm-83/">
            Are Jeremiah 49:34-39 and Ezekiel 38 the same event? What about
            Psalm 83?
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="http://www.prophecydepotministries.net/2018/exploring-the-timing-of-ezekiel-38-and-39/">
            Exploring the Timing of Ezekiel 38 and 39
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="http://www.prophecydepotministries.net/2008/psalm-83-or-ezekiel-38-which-is-the-next-middle-east-news-headline/">
            Psalm 83 or Ezekiel 38? Which is the Next Middle East News Headline?
          </ExternalLink>
        </li>
      </ul>

      <ArticleImage
        src="/psalm-83-confederacy.png"
        alt="Psalm 83 confederacy"
        caption={
          <>
            An illustration of the modern day equivalents of the Psalm 83
            confederacy [
            <ExternalLink
              href="http://www.prophecydepotministries.net/2022/are-jeremiah-4934-39-and-ezekiel-38-the-same-event-what-about-psalm-83/"
              muted
            >
              Prophecy Depot Ministries
            </ExternalLink>
            ].
          </>
        }
      />

      <ArticleHeader as="h2" id={Header.JonathanCahn}>
        Jonathan Cahn
      </ArticleHeader>
      <YoutubePlayerGrid>
        <YoutubePlayer
          src="https://www.youtube.com/embed/YagPnxYD09s?si=oG9t3LC0O7Vapa6B"
          title="Signs of the Coming Apocalypse"
        />
        <YoutubePlayer
          src="https://www.youtube.com/embed/yDaECVmd2gk?si=IshicYfZUro-tXR4"
          title="A Mystery for Joe Biden"
        />
        <YoutubePlayer
          src="https://www.youtube.com/embed/QYJO8oZuEa8?si=3tq-sBxiCqECqAnX"
          title="The Israel-Hamas End-Time Mystery"
        />
      </YoutubePlayerGrid>

      <ArticleHeader as="h2" id={Header.RobertBreaker}>
        Robert Breaker
      </ArticleHeader>
      <YoutubePlayerGrid>
        <YoutubePlayer
          src="https://www.youtube.com/embed/N4su0rYu1h8?si=8H3b5-Lhu8hVsVda"
          title="The Mark of the Beast"
        />
        <YoutubePlayer
          src="https://www.youtube.com/embed/gxbtCQT58xM?si=SQlMbrmqNOFVruC6"
          title="Jesus MUST Be Coming Soon"
        />
        <YoutubePlayer
          src="https://www.youtube.com/embed/DaQv3FmnxWE?si=deabm2uYsyYWdBaX"
          title="The End of the Church Age: The Great Reset"
        />
        <YoutubePlayer
          src="https://www.youtube.com/embed/lZZ7ZFTFmR8?si=HZ2sC54fSRBvzvvz"
          title="Who are the 144,000?"
        />
      </YoutubePlayerGrid>

      <ArticleHeader as="h2" id={Header.EndTimeHeadlines}>
        End Time Headlines
      </ArticleHeader>
      <YoutubePlayerGrid>
        <YoutubePlayer
          src="https://www.youtube.com/embed/FjA4UTlU66w?si=ps0sfLGABTKPPK9G"
          title="What May Be Coming in 2025"
        />
        <YoutubePlayer
          src="https://www.youtube.com/embed/y7ZUwZENj80?si=xiA_yziUmpHeeJkm"
          title="Could This Be Why America is Missing in a Major Prophetic War?"
        />
        <YoutubePlayer
          src="https://www.youtube.com/embed/oqheH2051lQ?si=F1RNONiv4horr3hA"
          title="I Saw This Happen 11 Years Ago in a Dream"
        />
      </YoutubePlayerGrid>
    </Article>
  );
}
