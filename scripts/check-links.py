#!/usr/bin/env python3
"""Checks the static export in out/ for links and images that would 404.

    BASE_PATH=/newMediatorSite npm run build && python3 scripts/check-links.py /newMediatorSite

Catches three things: internal links whose target was not exported, internal
links and images missing the deployment base path (they resolve at the domain
root and 404 when the site is served from a sub-path), and href="#" dead ends.
"""
import os, re, sys

OUT = "out"
BP = sys.argv[1] if len(sys.argv) > 1 else ""

def exported(path):
    path = path.strip("/")
    return path == "" or any(os.path.exists(os.path.join(OUT, path + s)) for s in ("", ".html", "/index.html"))

pages = [os.path.join(d, f) for d, _, fs in os.walk(OUT) for f in fs if f.endswith(".html")]
broken, unprefixed, bad_images, dead = {}, {}, {}, 0
targets, images = set(), set()

for page in pages:
    html = open(page, encoding="utf-8").read()
    dead += len(re.findall(r'href="#"', html))
    for href in set(re.findall(r'<a[^>]*\shref="([^"]+)"', html)):
        if not href.startswith("/") or href.startswith("//"):
            continue
        if BP and not href.startswith(BP):
            unprefixed.setdefault(href, page)
            continue
        path = href[len(BP):].split("#")[0].split("?")[0]
        targets.add(path)
        if not exported(path):
            broken.setdefault(path, page)
    for src in set(re.findall(r'<img[^>]*\ssrc="([^"]+)"', html)):
        if src.startswith(("http", "data:")):
            continue
        images.add(src)
        if (BP and not src.startswith(BP)) or not os.path.exists(OUT + src[len(BP):]):
            bad_images.setdefault(src, page)

print(f"pages {len(pages)} | link targets {len(targets)} | images {len(images)}")
print(f"broken links {len(broken)} | missing base path {len(unprefixed)} | broken images {len(bad_images)} | href=\"#\" {dead}")
for label, found in (("BROKEN", broken), ("NO BASE PATH", unprefixed), ("IMAGE", bad_images)):
    for target, page in list(found.items())[:10]:
        print(f"  {label}: {target}  (first seen in {page})")
sys.exit(1 if broken or unprefixed or bad_images or dead else 0)
