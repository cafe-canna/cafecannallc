# Image assets

Every image on the site is currently a CSS placeholder (`.placeholder-img`) with a hand-drawn frame effect, standing in until real photography/art exists. Drop files into the matching folder below using the exact filename listed, then see "Wiring an image in" for the one-line change each page needs.

Recommended format: `.jpg` for photos (`.webp` also fine), sRGB, no larger than ~1600px on the long edge — this is a static site with no image pipeline/optimization step, so files are served exactly as uploaded.

## `home/` — Home page "What We're Building" cards
| File | Aspect ratio | Used for |
|---|---|---|
| `retail-storefront.jpg` | 16:9 (wide) | Cannabis Retail card |
| `cafe-counter.jpg` | 16:9 (wide) | The Cafe card |
| `community-event.jpg` | 16:9 (wide) | Community & Education card |

## `about/` — About page story + team
| File | Aspect ratio | Used for |
|---|---|---|
| `founders.jpg` | 16:9 (wide) | "Our Story" section photo |
| `team-jordan.jpg` | 1:1 (circle) | Jordan Placeholder — Founder & CEO |
| `team-sam.jpg` | 1:1 (circle) | Sam Placeholder — Head of Cultivation |
| `team-riley.jpg` | 1:1 (circle) | Riley Placeholder — Cafe Director |
| `team-casey.jpg` | 1:1 (circle) | Casey Placeholder — Community & Education Lead |

## `products/` — Strain photos
Products are data-driven (see `assets/js/products-data.js`) — once a file is here, set that strain's `image` field to its path and the placeholder swaps for the real photo automatically. No other edit needed.

| File | Aspect ratio | Strain |
|---|---|---|
| `blue-ridge-haze.jpg` | 4:3 | Blue Ridge Haze |
| `shenandoah-kush.jpg` | 4:3 | Shenandoah Kush |
| `james-river-diesel.jpg` | 4:3 | James River Diesel |
| `piedmont-purple.jpg` | 4:3 | Piedmont Purple |
| `tidewater-tangerine.jpg` | 4:3 | Tidewater Tangerine |
| `commonwealth-og.jpg` | 4:3 | Commonwealth OG |

## `cafe/` — Cafe atmosphere + gallery
| File | Aspect ratio | Used for |
|---|---|---|
| `interior.jpg` | 16:9 (wide) | "Atmosphere" section photo |
| `gallery-1.jpg` … `gallery-6.jpg` | 1:1 (square) | The six gallery grid tiles, in order |

## `education/` — Article thumbnails
| File | Aspect ratio | Article |
|---|---|---|
| `strain-guide.jpg` | 16:9 (wide) | "A Beginner's Guide to Strain Types" |
| `culture-history.jpg` | 16:9 (wide) | "The History of Cannabis Culture in Virginia" |
| `small-batch.jpg` | 16:9 (wide) | "Cultivating Craft: What 'Small-Batch' Really Means" |

## Wiring an image in

**Products** — fully data-driven, just edit `assets/js/products-data.js` and set `image: '../assets/images/products/blue-ridge-haze.jpg'` (see comments in that file). Nothing else to touch.

**Every other page** (home, about, cafe, education) — find the matching `<div class="placeholder-img ...">` in that page's HTML and replace its `<span>...</span>` with an `<img src="../assets/images/<folder>/<file>" alt="...">`. The hand-drawn frame and rotation are CSS on the container, so they carry over automatically — just swap what's inside. Write a real, descriptive `alt` text for each image (not "placeholder").
