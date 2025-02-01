import { Metadata } from "next";

import Article from "@/components/article";
import ArticleHeader from "@/components/article/article-header";
import ArticleImage from "@/components/article/article-image";
import Scripture from "@/components/article/scripture";
import { Header } from "@/lib/constants/url-params";

export const metadata: Metadata = {
  title: "Salvation",
};

export default function SalvationPage() {
  return (
    <div className="mx-auto mb-12 mt-2 max-w-screen-lg">
      <Article>
        <ArticleHeader as="h1" id={Header.Salvation}>
          The Romans Road to Salvation
        </ArticleHeader>

        <ArticleImage src="/romans-road.jpg" alt="The Romans Road" />

        <p>
          The "Romans Road to Salvation" summarizes key verses in the book of
          Romans that guide us toward understanding our spiritual need and how
          to receive the gift of salvation in Jesus Christ. Whether you are
          exploring the Christian faith or looking for a way to share the gospel
          with loved ones, this step-by-step journey offers clarity and hope.
          Let this encourage you to take the next step with God.
        </p>

        <ArticleHeader as="h2" id={Header.SalvationStop1}>
          Stop #1 | Romans 3:23
        </ArticleHeader>

        <Scripture
          text="For all have sinned, and come short of the glory of God."
          cite="Romans 3:23"
        />

        <p>
          Romans 3:23 emphasizes that everyone—no matter their background—has
          fallen short of God's perfection. Sin is not just the "big" offenses
          we might think of; it includes any attitude or action in thought,
          word, or deed that goes against God's holiness. Recognizing this fact
          is crucial because it helps us see our need for a Savior.
        </p>

        <ArticleHeader as="h2" id={Header.SalvationStop2}>
          Stop #2 | Romans 5:8
        </ArticleHeader>

        <Scripture
          text="But God demonstrates His own love toward us, in that while we were still sinners, Christ died for us."
          cite="Romans 5:8"
        />

        <p>
          In our brokenness, God showed His incredible love by sending Jesus to
          die for us. He did not wait for us to "fix" ourselves or become
          worthy; instead, He acted out of unconditional love. Jesus' sacrifice
          bridges the gap our sin created, showing that mercy triumphs over
          judgment for all who believe.
        </p>

        <ArticleHeader as="h2" id={Header.SalvationStop3}>
          Stop #3 | Romans 6:23
        </ArticleHeader>

        <Scripture
          text="For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord."
          cite="Romans 6:23"
        />

        <p>
          The serious consequence of sin is spiritual and physical death—eternal
          separation from God. However, God offers life with Him, both now and
          forever, through Jesus Christ. This is no ordinary gift; it is a
          complete pardon and a new beginning, freely offered to anyone who
          believes.
        </p>

        <ArticleHeader as="h2" id={Header.SalvationStop4}>
          Stop #4 | Romans 8:1
        </ArticleHeader>

        <Scripture
          text="There is therefore now no condemnation for those who are in Christ Jesus."
          cite="Romans 8:1"
        />

        <p>
          Once we receive Christ, our guilt and shame are replaced with
          acceptance and freedom. Rather than living under the oppressive weight
          of sin, believers experience God's grace and the assurance that He no
          longer holds their past failures against them. This profound freedom
          invites us to live confidently in His love.
        </p>

        <ArticleHeader as="h2" id={Header.SalvationStop5}>
          Stop #5 | Romans 10:9-10
        </ArticleHeader>

        <Scripture
          text='That if you confess with your mouth, "Jesus is Lord," and believe in your heart that God raised Him from the dead, you will be saved.'
          cite="Romans 10:9-10"
        />

        <p>
          The final stop on this road offers a clear promise: if you openly
          declare Jesus as Lord and believe in His resurrection, you are saved.
          This involves more than speaking words; it is a heartfelt commitment
          that Jesus has the right to lead your life. Salvation is His gift to
          us, received by faith and demonstrated in a new way of living.
        </p>

        <p>
          Confessing Jesus as Lord symbolizes your trust in His power to
          transform you. It is turning from self-led choices and embracing a
          life aligned with God's purpose, fueled by the same power that raised
          Jesus from the dead.
        </p>

        <ArticleHeader as="h2" id={Header.NextSteps}>
          Next Steps
        </ArticleHeader>

        <p>
          If you recognize your need for salvation, you can respond in simple,
          genuine prayer—confessing your sins to God, asking for His forgiveness
          through Jesus, and inviting Him to lead your life. It is not about
          perfect words, but a sincere heart. For those who have already trusted
          in Christ, use the Romans Road to share God's plan of salvation with
          others. Whether young or old, near or far, the gospel has the power to
          transform lives and give hope for eternity.
        </p>

        <p>
          For further guidance or support, consider connecting with a local
          church or a trusted believer who can walk alongside you as you grow in
          your faith. Remember, you do not walk this journey alone—God's Spirit
          and His people are there to encourage you every step of the way.
        </p>
      </Article>
    </div>
  );
}
