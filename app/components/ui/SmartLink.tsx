import Link from "next/link";

type Props = Omit<React.ComponentProps<"a">, "href"> & { href: string };

/**
 * A link whose destination comes from data and may be either kind.
 *
 * An internal path has to go through next/link, which is what applies the
 * deployment base path: a plain <a href="/trainers"> resolves at the domain
 * root and 404s when the site is served from a sub-path, as it is on GitHub
 * Pages. The lint rule that catches this only sees literal hrefs, so a
 * variable one slips through - which is how the footer shipped broken links on
 * every page. External, tel:, mailto: and #anchor targets stay plain anchors.
 */
export default function SmartLink({ href, children, ...rest }: Props) {
  const internal = href.startsWith("/") && !href.startsWith("//");
  return internal ? (
    <Link href={href} {...rest}>
      {children}
    </Link>
  ) : (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
