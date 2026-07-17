/**
 * ============================================================================
 *  invitationData — THE SINGLE SOURCE OF TRUTH FOR ALL EVENT CONTENT
 * ============================================================================
 *
 *  👉  To personalise this invitation, EDIT ONLY THIS FILE.
 *      Every name, date, venue, phone number, message and decorative line
 *      shown on the website is read from the object below. No event detail
 *      is hard-coded anywhere else in the project.
 *
 *  Quick edit guide:
 *    • Names / families ....... groomName, brideName, groomTitle, brideTitle,
 *                               groomParents, brideParents, hostedBy
 *    • Date / time ............ date, time  (also isoStart / isoEnd for "Add to Calendar")
 *    • Venue / map ............ venueName, address, mapLink
 *    • RSVP ................... rsvpContacts[], whatsappMessage
 *    • Messages / quotes ...... greeting, invitationMessage, heroQuote, footerQuote …
 *    • Extra poetic lines ..... duas[], shayariLines[], quotes[], invitationLines[],
 *                               footerLines[], (pick whichever you like)
 * ============================================================================
 */

export interface ScheduleItem {
  time: string;
  title: string;
}

/**
 * A person a guest can contact to RSVP. List more than one and the guest may
 * reach out to whichever they prefer — the RSVP section renders a card each.
 */
export interface RsvpContact {
  /** Optional courtesy title shown before the name (e.g. "Mr.", "Mrs."). */
  title?: string;
  name: string;
  phone: string;
}

export interface InvitationData {
  eventTitle: string;
  eventSubtitle: string;
  groomName: string;
  brideName: string;
  groomFirstName: string;
  brideFirstName: string;
  /** Courtesy title shown before the groom's full name (e.g. "Mr."). */
  groomTitle: string;
  /** Courtesy title shown before the bride's full name (e.g. "Mrs."). */
  brideTitle: string;
  /**
   * Optional couple portrait / illustration shown in "The Blessed Couple" section.
   * Drop an image file into /public (e.g. public/couple.png) and set the path here
   * as "/couple.png". Leave empty ("") to show a tasteful placeholder instead.
   */
  coupleImage: string;
  /** Parents of the groom — shown in the elegant "With Blessings From" block. */
  groomParents: string;
  /** Parents of the bride — shown in the elegant "With Blessings From" block. */
  brideParents: string;
  hostedBy: string;
  greeting: string;
  bismillahArabic: string;
  bismillahEnglish: string;
  invitationMessage: string;
  heroQuote: string;
  islamicQuote: string;
  footerQuote: string;
  date: string;
  time: string;
  /** ISO 8601 start/end — used to build the "Add to Calendar" link. */
  isoStart: string;
  isoEnd: string;
  venueName: string;
  address: string;
  mapLink: string;
  dressCode: string;
  dinnerText: string;
  specialInstruction: string;
  /**
   * Groom-side RSVP contacts. Guests may reach out to ANY of them.
   * Add or remove entries freely — the RSVP section renders one card per contact.
   */
  rsvpContacts: RsvpContact[];
  whatsappMessage: string;
  privacyNote: string;
  schedule: ScheduleItem[];
  duas: string[];
  shayariLines: string[];
  quotes: string[];
  invitationLines: string[];
  footerLines: string[];
}

export const invitationData: InvitationData = {
  eventTitle: "Engagement Ceremony",
  eventSubtitle: "Mangni Ceremony",

  groomName: "Yasim Jamadar",
  brideName: "Fiza Shaikh",
  groomFirstName: "Yasim",
  brideFirstName: "Fiza",
  // Groom-side card: the groom is presented first, each name prefixed with a title.
  groomTitle: "Mr.",
  brideTitle: "Ms.",
  // Couple illustration (already includes the arch, florals and initials monogram).
  coupleImage: "/couple.png",
  groomParents: "Late Mr. Babasaheb Jamadar & Mrs. Shabana Jamadar",
  brideParents: "Mr. Zafar Shaikh & Mrs. NoorJahan Shaikh",
  // The groom's family are the hosts; the bride's side attends as honoured guests.
  hostedBy: "The Jamadar Family",

  greeting: "Assalamu Alaikum wa Rahmatullahi wa Barakatuhu",
  bismillahArabic: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
  bismillahEnglish: "Bismillahir Rahmanir Raheem",

  invitationMessage:
    "With the blessings of Allah Subhanahu Wa Ta’ala and the duas of our elders, we joyfully invite you to grace the engagement ceremony of our beloved son Yasim Jamadar with Fiza Shaikh.",
  heroQuote:
    "Every celebration becomes more meaningful when shared with special people.",
  islamicQuote: "With Allah’s blessings, we begin a beautiful new chapter.",
  // Distinct from quotes[0] (shown in the "You Are Invited" section) so the
  // same sentence never appears twice.
  footerQuote: "Your blessings and duas mean the world to us.",

  date: "Friday, 24 July 2026",
  time: "6:30 PM onwards",
  // 24 July 2026, 6:30 PM – 10:30 PM IST. Must match `time` above: isoStart also
  // drives the "Add to Calendar" reminder and the Save-the-Date month grid.
  isoStart: "2026-07-24T18:30:00+05:30",
  isoEnd: "2026-07-24T22:30:00+05:30",

  venueName: "Pearl Banquet",
  address:
    "Spine Rd, Sector Number 4, Moshi, Pimpri-Chinchwad, Maharashtra 412105",
  mapLink: "https://maps.app.goo.gl/zdtiTsPDaoTN6EmV8",

  dressCode: "Pastel / Traditional",
  dinnerText: "Dinner will be served after the ceremony.",
  specialInstruction: "Kindly arrive 10 minutes before the ceremony.",

  // Groom-side RSVP contacts — guests may reach out to whichever they prefer.
  rsvpContacts: [
    { title: "Mr.", name: "Mosin Jamadar", phone: "+91 9595597475" },
    { title: "Mrs.", name: "Shabana Jamadar", phone: "+91 8055059992" },
  ],
  whatsappMessage:
    "Assalamu Alaikum, I will be attending the Engagement Ceremony. In Sha Allah.",

  privacyNote: "Entry by invitation only.",

  schedule: [
    { time: "06:30 PM", title: "Guest Arrival" },
    { time: "07:00 PM", title: "Welcome Ceremony" },
    { time: "07:30 PM", title: "Ring Ceremony" },
    { time: "08:00 PM onwards", title: "Dinner" },
  ],

  // --------------------------------------------------------------------------
  //  POETIC / DUA CONTENT BANK
  //  Only 2–4 of these appear in the visible design (see components below).
  //  The rest are here for you to swap in whenever you like.
  // --------------------------------------------------------------------------
  duas: [
    "May Allah bless this beautiful beginning with barakah, love, respect, and endless happiness.",
    "May Allah fill their journey with mercy, understanding, patience, and togetherness.",
    "May this bond be surrounded by duas, guided by faith, and blessed with lifelong happiness.",
    "May Allah shower His blessings upon both families and make this occasion a source of joy and barakah.",
    "May Allah write goodness, peace, and love in every step of their new journey.",
  ],

  shayariLines: [
    "In the shade of duas and the glow of love, two hearts begin a beautiful journey.",
    "A new chapter begins today, written with love, blessed with duas, and sealed with family blessings.",
    "Where duas meet destiny, a beautiful bond begins.",
    "Under the mercy of Allah and the blessings of our elders, two souls step toward a graceful tomorrow.",
    "With soft smiles, warm hearts, and countless duas, we celebrate a bond made beautiful by faith.",
  ],

  quotes: [
    "Your presence and duas will make this occasion truly special.",
    "Every celebration becomes more meaningful when shared with loved ones.",
    "With Allah’s blessings, every beginning becomes beautiful.",
    "A blessed bond begins with love, respect, and the duas of family.",
    "Togetherness is more beautiful when it begins with faith and blessings.",
  ],

  invitationLines: [
    "With the blessings of Allah Subhanahu Wa Ta’ala and the duas of our elders, we cordially invite you to grace this beautiful occasion.",
    "We request your presence, blessings, and duas as our families come together to celebrate this special day.",
    "Your presence will add joy, warmth, and barakah to our celebration.",
    "Please join us as we celebrate a beautiful beginning filled with love, respect, and duas.",
    "It would be our honor to have you with us on this blessed occasion.",
  ],

  footerLines: [
    "Duas requested for the beautiful journey ahead.",
    "Your blessings and duas mean the world to us.",
    "May Allah bless this occasion with happiness, peace, and barakah.",
    "We look forward to celebrating this blessed moment with you.",
    "With warm regards and heartfelt duas from both families.",
  ],
};

export default invitationData;
