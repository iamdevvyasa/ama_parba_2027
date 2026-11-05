import { Hero } from "@/components/home/Hero";
import { InsideTheBox } from "@/components/products/InsideTheBox";
import { Payment } from "@/components/products/Payment";
// import { Personalise } from "@/components/home/Personalise";
import { Gifting } from "@/components/home/Gifting";
import { WhyAmaParba } from "@/components/home/WhyAmaParba";
// import { Stories } from "@/components/home/Stories";
import { Faq } from "@/components/home/Faq";
import { ClosingCta } from "@/components/home/ClosingCta";

/**
 * Homepage section order.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <InsideTheBox />
      <Payment />
      {/* <Personalise /> */}
      <Gifting />
      <WhyAmaParba />
      {/* <Stories /> */}
      <Faq />
      <ClosingCta />
    </>
  );
}
