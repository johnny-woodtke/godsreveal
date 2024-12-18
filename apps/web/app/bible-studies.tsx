import Article from "@/components/article";
import ArticleHeader from "@/components/article/article-header";
import ArticleImage from "@/components/article/article-image";
import Callout from "@/components/article/callout";
import ExternalLink from "@/components/article/external-link";
import { Header } from "@/lib/constants/url-params";

import BibleStudy from "./bible-study";

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

      <BibleStudy
        title={{
          id: Header.IsraelRegathered,
          text: "Israel Regathered",
        }}
        scriptures={[
          {
            text: (
              <>
                And from the time that the regular burnt offering is taken away
                and the abomination that makes desolate is set up, there shall
                be 1,290 days. But go your way till the end. And you shall rest
                and shall stand in your allotted place at the end of the days.
              </>
            ),
            cite: "Daniel 12:11, 13",
          },
        ]}
        summary={
          <p>
            Sacrifices and offerings upon the temple mount will be stopped 3.5
            years before the end of the world as we know it.
          </p>
        }
        interpretation={
          <p>
            The Jews worshiping at the temple mount in the land of Israel is a
            prerequisite to the sacrifices and offerings being taken away.
            Therefore, the Jewish nation of Israel, recently formed in 1948, is
            a sign and precursor to this event which takes place 3.5 years
            before Jesus returns.
          </p>
        }
        furtherStudy={[
          {
            href: "https://www.biblegateway.com/passage/?search=Daniel%209%3A24-27&version=NKJV",
            text: "Daniel 9:24-27",
          },
          {
            href: "https://www.biblegateway.com/passage/?search=Matthew%2024%3A15&version=NKJV",
            text: "Matthew 24:15",
          },
          {
            href: "https://www.biblegateway.com/passage/?search=2%20Thessalonians%202%3A1-4&version=NKJV",
            text: "2 Thessalonians 2:1-4",
          },
          {
            href: "https://www.biblegateway.com/passage/?search=Isaiah%2011%3A11-12&version=NKJV",
            text: "Isaiah 11:11-12",
          },
        ]}
      />

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

      <BibleStudy
        title={{
          id: Header.DividingTheLand,
          text: "Dividing the Land",
        }}
        scriptures={[
          {
            text: (
              <>
                For behold, in those days and at that time, when I bring back
                the captives of Judah and Jerusalem, I will also gather all
                nations, and bring them down to the Valley of Jehoshaphat; and I
                will enter into judgment with them there on account of my
                people, my heritage Israel, whom they have scattered among the
                nations; they have also divided up my land.
              </>
            ),
            cite: "Joel 3:1-2",
          },
        ]}
        summary={
          <p>
            After the Jews are regathered to the land of Israel, God will gather
            all the nations for judgment because they divided up the land of
            Israel.
          </p>
        }
        interpretation={
          <p>
            When the world is trying to divide up the land of Israel, it is an
            indicator of God's impending judgment of all nations at Armageddon
            (which takes place in the Valley of Jehoshaphat). Because we know
            that Jesus himself descends from heaven to destroy the opposing
            nations at Armageddon, the world attempting to divide the land of
            Israel today (evidenced by the United Nations making more
            resolutions against Israel than any other nation on earth [
            <ExternalLink href="https://unwatch.org/database/resolution-database/">
              United Nations Resolution Database
            </ExternalLink>
            ]) is a clear sign of Jesus' soon return.
          </p>
        }
        furtherStudy={[
          {
            href: "https://www.biblegateway.com/passage/?search=Joel%203%3A11-17&version=NKJV",
            text: "Joel 3:11-17",
          },
          {
            href: "https://www.biblegateway.com/passage/?search=Revelation%2016%3A12-16&version=NKJV",
            text: "Revelation 16:12-16",
          },
          {
            href: "https://www.biblegateway.com/passage/?search=Revelation%2019%3A11-20&version=NKJV",
            text: "Revelation 19:11-20",
          },
        ]}
      />

      <Callout
        text={
          <>
            A cosmic sign is prophesied to take place just before Jesus comes
            back to earth in{" "}
            <ExternalLink href="https://www.biblegateway.com/passage/?search=Joel%203%3A11-17&version=NKJV">
              Joel 3:11-17
            </ExternalLink>{" "}
            and in{" "}
            <ExternalLink href="https://www.biblegateway.com/passage/?search=Matthew%2024%3A29-30&version=NKJV">
              Matthew 24:29-30
            </ExternalLink>
            . An eerily similar sign takes place at the sixth seal of God's
            judgment in{" "}
            <ExternalLink href="https://www.biblegateway.com/passage/?search=Revelation%206%3A12-17&version=NKJV">
              Revelation 6:12-17
            </ExternalLink>
            , which leads me to believe that the seven seals, seven trumpets,
            and seven bowls of Revelation occur in parallel.
          </>
        }
      />

      <BibleStudy
        title={{
          id: Header.WorldWar,
          text: "World War",
        }}
        scriptures={[
          {
            text: (
              <>
                For I will gather all the nations against Jerusalem to battle,
                and the city shall be taken and the houses plundered and the
                women raped. Half of the city shall go out into exile, but the
                rest of the people shall not be cut off from the city. Then the
                Lord will go out and fight against those nations as when he
                fights on a day of battle. On that day his feet shall stand on
                the Mount of Olives that lies before Jerusalem on the east, and
                the Mount of Olives shall be split in two…
              </>
            ),
            cite: "Zechariah 14:2-4",
          },
        ]}
        summary={
          <p>
            All nations will go to war against Jerusalem just before Jesus comes
            back to destroy them.
          </p>
        }
        interpretation={
          <p>
            These verses illustrate that the ability to conduct world war will
            be characteristic of the world just before Jesus comes back. Until
            the last 100 years or so, humans have not had the technology to wage
            war on a global scale.
          </p>
        }
        furtherStudy={[
          {
            href: "https://www.biblegateway.com/passage/?search=Revelation%2016%3A12-16&version=NKJV",
            text: "Revelation 16:12-16",
          },
          {
            href: "https://www.biblegateway.com/passage/?search=Matthew%2024%3A6-7&version=NKJV",
            text: "Matthew 24:6-7",
          },
          {
            href: "https://www.biblegateway.com/passage/?search=Revelation%206%3A3-4&version=NKJV",
            text: "Revelation 6:3-4",
          },
        ]}
      />

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

      <BibleStudy
        title={{
          id: Header.InstantCommunication,
          text: "Instant Worldwide Communication",
        }}
        scriptures={[
          {
            text: (
              <>
                And I will give power to my two witnesses, and they will
                prophesy one thousand two hundred and sixty days, clothed in
                sackcloth. These are the two olive trees and the two lampstands
                standing before the God of the earth. And if anyone wants to
                harm them, fire proceeds from their mouth and devours their
                enemies. And if anyone wants to harm them, he must be killed in
                this manner. These have power to shut heaven, so that no rain
                falls in the days of their prophecy; and they have power over
                waters to turn them to blood, and to strike the earth with all
                plagues, as that no rain falls in the days of their prophecy;
                and they have power over waters to turn them to blood, and to
                strike the earth with all plagues, as often as they desire. When
                they finish their testimony, the beast that ascends out of the
                bottomless pit will make war against them, overcome them, and
                kill them. And their dead bodies will lie in the street of the
                great city which spiritually is called Sodom and Egypt, where
                also our Lord was crucified. Then those from the peoples,
                tribes, tongues, and nations will see their dead bodies
                three-and-a-half days, and not allow their dead bodies to be put
                into graves. And those who dwell on the earth will rejoice over
                them, make merry, and send gifts to one another, because these
                two prophets tormented those who dwell on the earth.
              </>
            ),
            cite: "Revelation 11:1-10",
          },
        ]}
        summary={
          <p>
            Two powerful evangelists will be killed by the antichrist in
            Jerusalem (where Jesus was crucified) and, within 3.5 days, all the
            inhabitants of the earth will give gifts to one another in
            celebration of their death.
          </p>
        }
        interpretation={
          <p>
            The only feasible way everyone on earth could learn about 2 people
            dying within 3.5 days is through instant worldwide communication
            like the internet, phones, etc., which have only existed for the
            last 50 years or so.
          </p>
        }
        furtherStudy={[
          {
            href: "https://www.biblegateway.com/passage/?search=Zechariah%204&version=NKJV",
            text: "Zechariah 4",
          },
        ]}
      />

      <Callout
        text={
          <>
            In{" "}
            <ExternalLink href="https://www.biblegateway.com/passage/?search=Revelation%2011&version=NKJV">
              Revelation 11
            </ExternalLink>
            , we see that the two witnesses have great authority for 3.5 years.
            Then, in the book of Daniel, we see the antichrist invade Jerusalem,
            set up the abomination of desolation, and become overwhelmingly
            powerful at the 3.5 year mark of the final seven year tribulation [
            <ExternalLink href="https://www.biblegateway.com/passage/?search=Daniel%207%3A23-27&version=NKJV">
              Daniel 7:23-27
            </ExternalLink>
            ,{" "}
            <ExternalLink href="https://www.biblegateway.com/passage/?search=Daniel%209%3A24-27&version=NKJV">
              Daniel 9:24-27
            </ExternalLink>
            ,{" "}
            <ExternalLink href="https://www.biblegateway.com/passage/?search=Daniel%2011%3A29-39&version=NKJV">
              Daniel 11:29-39
            </ExternalLink>
            ]. Therefore, it is reasonable to believe that the two witnesses'
            ministry takes place during the first half of the tribulation until
            they're killed during the antichrist's invasion.
          </>
        }
      />
    </Article>
  );
}
