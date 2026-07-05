/*
 * Cafe Canna product catalog — the single source of truth for the
 * Products page grid and its "View Full Profile" detail modal.
 *
 *   To add a strain:    copy one object below and fill in every field.
 *   To remove a strain: delete its object.
 *   To edit a strain:   change the field values — nothing else needs
 *                        touching, the card and modal both read from here.
 *
 * Field reference:
 *   name        Strain name shown on the card and in the detail view.
 *   type        One of 'sativa', 'indica', 'hybrid'.
 *   description Short flavor/aroma copy. No medical or health claims.
 *   thc, cbd    Estimated placeholder ranges, e.g. '19–23%'. Always
 *               labeled "estimated, pending lab testing" in the modal —
 *               do not present these as confirmed lab results.
 *   terpenes    Array of dominant terpene names.
 *   effects     Array of mood/experience words, descriptive only
 *               (e.g. "Relaxing", "Uplifting") — never medical claims.
 *   image       Path to a photo once one exists, e.g.
 *               '../assets/images/products/blue-ridge-haze.jpg'
 *               (see assets/images/README.md). Leave as '' to keep
 *               showing the hand-drawn placeholder frame.
 */
var CAFE_CANNA_PRODUCTS = [
  {
    name: 'Blue Ridge Haze',
    type: 'sativa',
    description: "Bright, citrus-forward aroma inspired by Virginia's mountain sunrises. A daytime favorite for staying social and productive.",
    thc: '19–23%',
    cbd: '<1%',
    terpenes: ['Limonene', 'Terpinolene', 'Pinene'],
    effects: ['Uplifting', 'Social', 'Energizing'],
    image: ''
  },
  {
    name: 'Shenandoah Kush',
    type: 'indica',
    description: 'Earthy, pine-forward notes with a deep, dense bud structure. An easygoing evening choice for winding down.',
    thc: '20–24%',
    cbd: '<1%',
    terpenes: ['Myrcene', 'Caryophyllene', 'Pinene'],
    effects: ['Relaxing', 'Calming', 'Sleepy'],
    image: ''
  },
  {
    name: 'James River Diesel',
    type: 'hybrid',
    description: 'A balanced cross with a sharp, fuel-forward aroma and a smooth, even-keeled character throughout the day.',
    thc: '21–25%',
    cbd: '<1%',
    terpenes: ['Caryophyllene', 'Limonene', 'Humulene'],
    effects: ['Balanced', 'Even-Keeled', 'Focused'],
    image: ''
  },
  {
    name: 'Piedmont Purple',
    type: 'indica',
    description: 'Deep violet hues with a sweet, grape-forward aroma. Dense, hand-trimmed buds built for slow evenings.',
    thc: '18–22%',
    cbd: '1–2%',
    terpenes: ['Myrcene', 'Linalool', 'Caryophyllene'],
    effects: ['Mellow', 'Sleepy', 'Cozy'],
    image: ''
  },
  {
    name: 'Tidewater Tangerine',
    type: 'sativa',
    description: 'Zesty citrus and tropical fruit notes with a light, uplifting character suited to daytime creative sessions.',
    thc: '20–24%',
    cbd: '<1%',
    terpenes: ['Limonene', 'Terpinolene', 'Ocimene'],
    effects: ['Uplifting', 'Creative', 'Energizing'],
    image: ''
  },
  {
    name: 'Commonwealth OG',
    type: 'hybrid',
    description: 'Our flagship house blend — woody and herbal with a smooth finish, grown as a small-batch signature offering.',
    thc: '22–26%',
    cbd: '<1%',
    terpenes: ['Caryophyllene', 'Myrcene', 'Pinene'],
    effects: ['Balanced', 'Smooth', 'Easygoing'],
    image: ''
  }
];
