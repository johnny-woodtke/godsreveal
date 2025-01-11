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

      <BibleStudy
        title={{
          id: Header.SurveillanceAndBiotechnology,
          text: "Surveillance and Biotechnology",
        }}
        scriptures={[
          {
            text: (
              <>
                He causes all, both small and great, rich and poor, free and
                slave, to receive a mark on their right hand or on their
                foreheads, and that no one may buy or sell except one who has
                the mark or the name of the beast, or the number of his name.
              </>
            ),
            cite: "Revelation 13:16-17",
          },
        ]}
        summary={
          <p>
            No one can have a job or buy things without a mandatory
            hand/forehead procedure known as the mark of the beast.
          </p>
        }
        interpretation={
          <p>
            In the not-so-distant past, Christians believed there would be
            people standing outside every bank and business checking hands and
            foreheads to enforce this mark. Today, it's not so hard to imagine
            how a technocratic, megalomaniacal world leader could use the modern
            advances in medicine and surveillance technologies to almost
            single-handedly enforce these economic limitations.
          </p>
        }
        furtherStudy={[
          {
            href: "https://www.biblegateway.com/passage/?search=Revelation%2014%3A9-11&version=NKJV",
            text: "Revelation 14:9-11",
          },
          {
            href: "https://www.biblegateway.com/passage/?search=Revelation%2016%3A1-2&version=NKJV",
            text: "Revelation 16:1-2",
          },
          {
            href: "https://www.biblegateway.com/passage/?search=Revelation%203%3A7-13&version=NKJV",
            text: "Revelation 3:7-13",
          },
          {
            href: "https://www.biblegateway.com/passage/?search=Revelation%2022%3A1-4&version=NKJV",
            text: "Revelation 22:1-4",
          },
        ]}
      />

      <Callout
        text={
          <>
            The Covid-19 vaccines are NOT the mark of the beast. However, the
            nearly-worldwide vaccine mandates represented a dangerous precedent
            for the future enforcement of the mark of the beast.
          </>
        }
      />

      <BibleStudy
        title={{
          id: Header.IronAndClay,
          text: "Iron and Clay",
        }}
        scriptures={[
          {
            text: (
              <>
                But as the days of Noah were, so also will the coming of the Son
                of Man be. For as in the days before the flood, they were eating
                and drinking, marrying and giving in marriage, until the day
                that Noah entered the ark, and did not know until the flood came
                and took them all away, so also will the coming of the Son of
                Man be.
              </>
            ),
            cite: "Matthew 24:37-39",
          },
          {
            text: (
              <>
                Whereas you saw the feet and toes, partly of potter's clay and
                partly of iron, the kingdom shall be divided; yet the strength
                of the iron shall be in it, just as you saw the iron mixed with
                ceramic clay. And as the toes of the feet were partly of iron
                and partly of clay, so the kingdom shall be partly strong and
                partly fragile. As you saw iron mixed with ceramic clay, they
                will mingle with the seed of men; but they will not adhere to
                one another, just as iron does not mix with clay. And in the
                days of these kings the God of heaven will set up a kingdom
                which shall never be destroyed; and the kingdom shall not be
                left to other people; it shall break in pieces and consume all
                these kingdoms, and it shall stand forever.
              </>
            ),
            cite: "Daniel 2:41-44",
          },
        ]}
        summary={
          <p>
            Jesus said the end times will be like the days of Noah. In the days
            of Noah, fallen angels (sons of God) corrupted the seed of men by
            having children with human women (daughters of men). Likewise,
            according to Daniel's vision, the final kingdom of iron and clay
            will tamper with the seed of men.
          </p>
        }
        interpretation={
          <p>
            Like the days of Noah, demonic forces (fallen angels) in the last
            days will again try to corrupt humanity's seed. But instead of
            having children with women, will they corrupt us by attempting to
            implant technology (iron) into humans (clay)?
          </p>
        }
        furtherStudy={[
          {
            href: "https://www.biblegateway.com/passage/?search=Genesis%206%3A1-4&version=NKJV",
            text: "Genesis 6:1-4",
          },
          {
            href: "https://www.biblegateway.com/passage/?search=Genesis%202%3A7&version=NKJV",
            text: "Genesis 2:7",
          },
        ]}
      />

      <ArticleImage
        src="/neuralink.webp"
        alt="Elon Musk's Neuralink"
        caption={
          <>
            <ExternalLink href="https://neuralink.com/" muted>
              Neuralink
            </ExternalLink>{" "}
            is a brain implant that allows the human brain to directly interface
            with a computer. When this (or a more advanced version) is implanted
            into a human, does God consider him or her be made in His image
            anymore? If not, can Jesus' sacrifice on the cross atone for that
            person's sins?
          </>
        }
      />

      <BibleStudy
        title={{
          id: Header.NewWorldOrder,
          text: "New World Order",
        }}
        scriptures={[
          {
            text: (
              <>
                And I stood upon the sand of the sea, and saw a beast rise up
                out of the sea, having seven heads and ten horns, and upon his
                horns ten crowns, and upon his heads the name of blasphemy. And
                the beast which I saw was like unto a leopard, and his feet were
                as the feet of a bear, and his mouth as the mouth of a lion: and
                the dragon gave him his power, and his seat, and great
                authority. And I saw one of his heads as it were wounded to
                death; and his deadly wound was healed: and all the world
                wondered after the beast. And they worshipped the dragon which
                gave power unto the beast: and they worshipped the beast,
                saying, Who is like unto the beast? who is able to make war with
                him? And there was given unto him a mouth speaking great things
                and blasphemies; and power was given unto him to continue forty
                and two months. And he opened his mouth in blasphemy against
                God, to blaspheme his name, and his tabernacle, and them that
                dwell in heaven. And it was given unto him to make war with the
                saints, and to overcome them: and power was given him over all
                kindreds, over all kindreds, and tongues, and nations. And all
                that dwell upon the earth shall worship him, whose names are not
                written in the book of life of the Lamb slain from the
                foundation of the world.
              </>
            ),
            cite: "Revelation 13:1-8",
          },
        ]}
        summary={
          <p>
            The antichrist will be given power over all nations and be
            worshipped by the whole world (except for Christians) for 42 months
            (3.5 years).
          </p>
        }
        interpretation={
          <p>
            Today, as we witness the world advancing towards globalism,
            sophisticated surveillance, and nearly instant communication, while
            simultaneously facing increasingly severe conflicts, natural
            disasters, and economic crises, it is easy to envision how a single
            leader could wield unprecedented authority and be revered by the
            entire world as its savior just as the Bible describes will happen
            3.5 years before Jesus returns.
          </p>
        }
        furtherStudy={[
          {
            href: "https://www.biblegateway.com/passage/?search=Daniel%207%3A7-8&version=NKJV",
            text: "Daniel 7:7-8",
          },
          {
            href: "https://www.biblegateway.com/passage/?search=2%20Thessalonians%202%3A3-4&version=NKJV",
            text: "2 Thessalonians 2:3-4",
          },
          {
            href: "https://www.biblegateway.com/passage/?search=Revelation%2013%3A11-18&version=NKJV",
            text: "Revelation 13:11-18",
          },
          {
            href: "https://www.biblegateway.com/passage/?search=Revelation%2017%3A12-14&version=NKJV",
            text: "Revelation 17:12-14",
          },
        ]}
      />

      <Callout
        text={
          <>
            As global powers and shifting alliances catch our attention, the
            Bible reminds us that a future leader will unite the world
            politically, spiritually, and economically. While the phrase "New
            World Order" captures our modern imagination, the core message
            remains that every worldly kingdom, however powerful, stands under
            God's sovereignty. Ultimately, the true and everlasting kingdom is
            the one Jesus will establish at His return.
          </>
        }
      />
    </Article>
  );
}
