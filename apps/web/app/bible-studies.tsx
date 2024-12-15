import Article from "@/components/article";
import ArticleHeader from "@/components/article/article-header";
import ArticleImage from "@/components/article/article-image";
import ExternalLink from "@/components/article/external-link";
import { Header } from "@/lib/constants/url-params";

export default function BibleStudies() {
  return (
    <Article>
      <ArticleHeader as="h1" id={Header.BibleStudies}>
        Bible Studies
      </ArticleHeader>
      <p>
        The following section contains a series of end-times Bible studies that
        I've put together over the years. I've done my best to make them short
        and sweet, but I will typically include references for further study if
        you're interested.
      </p>
      <p>
        If you have any questions or confusion, please consult the Bible, pray
        to God, talk to someone you trust, and/or ask EschatoloGPT.
      </p>

      <ArticleHeader as="h2" id={Header.IsraelRegathered}>
        Israel Regathered
      </ArticleHeader>
      <blockquote>
        <p>
          And from the time that the regular burnt offering is taken away and
          the abomination that makes desolate is set up, there shall be 1,290
          days. But go your way till the end. And you shall rest and shall stand
          in your allotted place at the end of the days.
        </p>
        <cite>Daniel 12:11, 13</cite>
      </blockquote>
      <h3>Summary</h3>
      <p>
        Sacrifices and offerings upon the temple mount will be stopped 3.5 years
        before the end of the world as we know it.
      </p>
      <h3>Interpretation</h3>
      <p>
        The Jews worshiping at the temple mount in the land of Israel is a
        prerequisite to the sacrifices and offerings being taken away.
        Therefore, the Jewish nation of Israel, recently formed in 1948, is a
        sign and precursor to this event which takes place 3.5 years before
        Jesus returns.
      </p>
      <h3>Further Study</h3>
      <ul>
        <li>
          <ExternalLink href="https://www.biblegateway.com/passage/?search=Daniel%209%3A24-27&version=NKJV">
            Daniel 9:24-27
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://www.biblegateway.com/passage/?search=Matthew%2024%3A15&version=NKJV">
            Matthew 24:15
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://www.biblegateway.com/passage/?search=2%20Thessalonians%202%3A1-4&version=NKJV">
            2 Thessalonians 2:1-4
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://www.biblegateway.com/passage/?search=Isaiah%2011%3A11-12&version=NKJV">
            Isaiah 11:11-12
          </ExternalLink>
        </li>
      </ul>

      <ArticleImage
        src="/abomination-of-desolation-imagery.webp"
        alt="Abomination of Desolation Imagery"
        caption={
          <>
            An artist's depiction of the beast performing the abomination of
            desolation on the temple mount in Jerusalem [
            <ExternalLink
              href="https://www.biblegateway.com/passage/?search=Revelation%2013%3A1-8&version=NKJV"
              muted
            >
              Revelation 13:1-8
            </ExternalLink>
            ].
          </>
        }
      />

      <ArticleHeader as="h2" id={Header.WorldWar}>
        World War
      </ArticleHeader>
      <blockquote>
        <p>
          For I will gather all the nations against Jerusalem to battle, and the
          city shall be taken and the houses plundered and the women raped. Half
          of the city shall go out into exile, but the rest of the people shall
          not be cut off from the city. Then the Lord will go out and fight
          against those nations as when he fights on a day of battle. On that
          day his feet shall stand on the Mount of Olives that lies before
          Jerusalem on the east, and the Mount of Olives shall be split in two…
        </p>
        <cite>Zechariah 14:2-4</cite>
      </blockquote>
      <h3>Summary</h3>
      <p>
        All nations will go to war against Jerusalem just before Jesus comes
        back to destroy them.
      </p>
      <h3>Interpretation</h3>
      <p>
        These verses illustrate that the ability to conduct world war will be
        characteristic of the world just before Jesus comes back. Until the last
        100 years or so, humans have not had the technology to wage war on a
        global scale.
      </p>
      <h3>Further Study</h3>
      <ul>
        <li>
          <ExternalLink href="https://www.biblegateway.com/passage/?search=Revelation%2016%3A12-16&version=NKJV">
            Revelation 16:12-16
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://www.biblegateway.com/passage/?search=Matthew%2024%3A6-7&version=NKJV">
            Matthew 24:6-7
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://www.biblegateway.com/passage/?search=Revelation%206%3A3-4&version=NKJV">
            Revelation 6:3-4
          </ExternalLink>
        </li>
      </ul>

      <ArticleImage
        src="/four-horsemen.jpg"
        alt="Four Horsement of the Apocalypse"
        caption={
          <>
            The four horsemen of the apocalypse [
            <ExternalLink
              href="https://www.biblegateway.com/passage/?search=Revelation%206%3A1-8&version=NKJV"
              muted
            >
              Revelation 6:1-8
            </ExternalLink>
            ].
          </>
        }
      />
    </Article>
  );
}
