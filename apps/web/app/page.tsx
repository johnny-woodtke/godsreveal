import Link from "next/link";

import ArticleImage from "@/components/article-image";
import ExternalLink from "@/components/external-link";

export default async function Home() {
  return (
    <article className="prose w-full min-w-full overflow-y-scroll pb-12 dark:prose-invert max-sm:prose-sm">
      <ArticleImage
        src="/second-coming.jpg"
        alt="The second coming of Jesus Christ."
        caption="The second coming of Jesus Christ."
      />

      <h2 id="welcome">Welcome</h2>
      <p>
        This website provides resources, tools, and a platform for
        everyone—whether theologians, unbelievers, or anyone in between—to
        explore Biblical end times and the return of Jesus Christ.
      </p>
      <p>
        The content here is not exhaustive but represents a collection of
        thoughts, ideas, questions, and resources that have been on my mind
        since I began exploring this topic in 2020.
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
        caption="The end times are centered around Israel and the Middle East."
      />

      <h2 id="foundational-resources">Foundational Resources</h2>
      <p>
        The following resources were foundational to my understanding of Bible's
        end times narrative:
      </p>

      <h4 id="frontier-alliance-international">
        <ExternalLink href="https://subsplash.com/frontierallianceinternat/fai">
          Frontier Alliance International
        </ExternalLink>
      </h4>
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

      <h4 id="tipping-point-with-jimmy-evans">
        <ExternalLink href="https://www.youtube.com/channel/UCoQ_Psj81henXRMe9ZAynbQ">
          Tipping Point with Jimmy Evans
        </ExternalLink>
      </h4>
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

      <h4 id="got-questions">
        <ExternalLink href="https://www.gotquestions.org/questions_end-times.html">
          Got Questions
        </ExternalLink>
      </h4>
      <ul>
        <li>
          <ExternalLink href="https://www.gotquestions.org/end-times-Israel.html">
            What is Israel's role in the end times?
          </ExternalLink>
        </li>
      </ul>
    </article>
  );
}
