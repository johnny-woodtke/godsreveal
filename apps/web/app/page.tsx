import Link from "next/link";

import Article from "@/components/article";
import ArticleHeader from "@/components/article/article-header";
import ArticleImage from "@/components/article/article-image";
import ExternalLink from "@/components/article/external-link";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <Article className="pb-12">
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
        unbelievers to die-hard watchmen—to explore the Biblical end times and
        the return of Jesus Christ.
      </p>
      <p>
        The content here is not exhaustive but represents a growing collection
        of thoughts, ideas, questions, and resources that have been on my mind
        since I began exploring this topic in 2020. It acts as more of a
        testimony than a scholarly work.
      </p>
      <p>
        Understanding Biblical prophecy can be complex, involving interwoven
        ideas, cross-references, and hypotheses. To help with this, I've
        developed EschatoloGPT, an AI-powered tool that can answer your
        questions and clarify any confusion about end times Bible prophecy. You
        can access it at the bottom right of your screen or by clicking{" "}
        <Link href="/?chat=true">here</Link>.
      </p>
      <p>
        My goal is that as you study what the Bible says about the end times and
        how it relates to our world today, you will be more willing and able to
        fall out of love with the world [
        <ExternalLink href="https://www.biblegateway.com/passage/?search=1%20John%202%3A15-17&version=KJV">
          1 John 2:15-17
        </ExternalLink>
        ], and instead share in my hope and excitement for the rapidly
        approaching second coming of our Lord and Savior, Jesus Christ.
      </p>

      <blockquote>
        <p>
          And when these things begin to come to pass, then look up, and lift up
          your heads; for your redemption draweth nigh.
        </p>
        <cite>Luke 21:28</cite>
      </blockquote>

      <ArticleHeader id="studies" as="h1">
        Extra-Biblical Studies
      </ArticleHeader>
      <p>
        The following section contains resources that have been especially
        helpful to me in understanding the end times. These resources are
        extra-Biblical, but they all point to God's Word.
      </p>
      <p>
        I've done my best to include links to videos/articles that I think are
        particularly insightful from each ministry, but I encourage you to
        explore the ministries' websites/channels on your own if you'd like to
        know more.
      </p>
      <p>
        As always, please remember you can ask the Holy Spirit and/or come back
        to this website to ask EschatoloGPT any questions you may have about
        these resources.
      </p>

      <ArticleHeader as="h2" id="got-questions">
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

      <ArticleHeader as="h2" id="tipping-point">
        Tipping Point with Jimmy Evans
      </ArticleHeader>
      <ul>
        <li>
          <ExternalLink href="https://youtu.be/WlwzRhDpDFU?si=F5rFZm7KNRiIQmRz">
            Seven Major End Times Signs
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://youtu.be/hsITd6NoDH8?si=UBlHfLo3ip08Exga">
            The Mark of the Beast Revealed
          </ExternalLink>
        </li>
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

      <ArticleHeader as="h2" id="generation2434">
        Generation2434
      </ArticleHeader>
      <ul>
        <li>
          <ExternalLink href="https://www.youtube.com/live/UMuhAY_Etvg?si=ny9vTXvkfQ7oy7Sa">
            Rapture: The Final Four?
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://www.youtube.com/live/_inUGuQ8BwM?si=9UiIAemOImonCfZ5r">
            The Final Two - A Prophecy Perspective
          </ExternalLink>
        </li>
      </ul>

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
        <li>
          <ExternalLink href="https://joelstrumpet.com/wp-content/uploads/2019/02/MIdeast-Beast-Master-File-Joel-Richardson.pdf">
            The Mid-East Beast: The Scriptural Case for an Islamic Antichrist
          </ExternalLink>
        </li>
      </ul>

      <ArticleHeader as="h2" id="prophecy-depot">
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

      <ArticleHeader as="h1" id="bible-studies">
        Bible Studies
      </ArticleHeader>
      <p>Bible studies coming soon...</p>
    </Article>
  );
}
