/*
 * Cafe Canna gallery photos — the single source of truth for the Cafe
 * page's photo carousel and its expanded-photo modal.
 *
 *   To add a photo:    copy one object below and fill in every field.
 *   To remove a photo: delete its object.
 *   To edit a photo:   change the field values — nothing else needs
 *                        touching, the carousel and modal both read from here.
 *
 * Field reference:
 *   image       Path to a photo once one exists, e.g.
 *               '../assets/images/cafe/gallery-1.jpg'
 *               (see assets/images/README.md). Leave as '' to keep
 *               showing the hand-drawn placeholder frame.
 *   alt         Descriptive alt text for the photo (required once a real
 *               image is added).
 *   caption     Short title shown on the slide and in the expanded view.
 *   description One or two sentences shown under the caption when the
 *               photo is clicked open.
 */
var CAFE_CANNA_GALLERY = [
  {
    image: '',
    alt: '',
    caption: 'The Espresso Bar',
    description: 'Where every drink starts — pulled with the same care we put into the rest of the menu.'
  },
  {
    image: '',
    alt: '',
    caption: 'Community Table',
    description: 'A long shared table built for catching up, working, or just people-watching.'
  },
  {
    image: '',
    alt: '',
    caption: 'The Reading Nook',
    description: 'A quiet corner with low light and house plants, made for slowing down.'
  },
  {
    image: '',
    alt: '',
    caption: 'Pastry Case',
    description: 'A rotating selection from local bakers, refreshed throughout the day.'
  },
  {
    image: '',
    alt: '',
    caption: 'Storefront Entrance',
    description: "Our own entrance and counter, kept separate from cannabis retail."
  },
  {
    image: '',
    alt: '',
    caption: 'Outdoor Seating',
    description: 'A few tables out front for catching some Virginia sunshine.'
  }
];
