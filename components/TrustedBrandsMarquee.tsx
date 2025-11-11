"use client";

/**
 * A horizontally scrolling marquee of brand logos. By default it will render
 * the bundled logos from the public/logos directory. You can optionally
 * provide your own list of image paths via the `logos` prop. When no
 * argument is supplied the component falls back to its default array. The
 * internal array is duplicated multiple times to create a seamless loop.
 */
export type TrustedBrandsMarqueeProps = {
  /**
   * Paths to logo images located in the /public directory. When omitted, a
   * default set of four logos will be used. You can supply any number of
   * images – they will be repeated to fill the marquee.
   */
  logos?: string[];
};

export default function TrustedBrandsMarquee({ logos }: TrustedBrandsMarqueeProps) {
  // Use provided logos if passed, otherwise fall back to defaults
  const baseLogos =
    logos && logos.length > 0
      ? logos
      : [
          "/logos/logo1.png",
          "/logos/logo2.png",
          "/logos/logo3.png",
          "/logos/logo4.png",
        ];
  // Duplicate logos for continuous loop. Multiply by three to avoid abrupt repetition.
  const strip = [...baseLogos, ...baseLogos, ...baseLogos];

  return (
    <section className="py-16 bg-base/90 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-8 text-neon">
          Trusted by 50+ Global Brands
        </h2>

        <div className="relative marquee-mask">
          <div className="flex gap-16 animate-marquee items-center">
            {strip.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt="Brand logo"
                className="h-16 w-auto object-contain opacity-80 hover:opacity-100 transition duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
