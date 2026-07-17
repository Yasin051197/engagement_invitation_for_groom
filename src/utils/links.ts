/**
 * Helpers that build all external links (WhatsApp, Google Calendar, share).
 * Centralised here so the components never construct URLs by hand.
 */

import type { InvitationData } from "../data/invitationData";

/** Strip everything except digits (wa.me expects a bare international number). */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

/** Pre-filled WhatsApp chat to a given RSVP contact: wa.me/{phone}?text={msg} */
export function buildWhatsAppRsvpLink(data: InvitationData, phone: string): string {
  const number = sanitizePhone(phone);
  const text = encodeURIComponent(data.whatsappMessage);
  return `https://wa.me/${number}?text=${text}`;
}

/** Native tel: link for the "Call" button on mobile. */
export function buildTelLink(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** The text shared when forwarding the invitation itself. */
export function buildShareText(data: InvitationData): string {
  return [
    `${data.greeting}`,
    "",
    `You are cordially invited to the ${data.eventTitle} of`,
    `${data.groomName} & ${data.brideName}.`,
    "",
    `🗓️ ${data.date}`,
    `🕕 ${data.time}`,
    `📍 ${data.venueName}, ${data.address}`,
    "",
    `${data.footerQuote}`,
  ].join("\n");
}

/** Generic WhatsApp "share to anyone" fallback link. */
export function buildWhatsAppShareLink(data: InvitationData): string {
  const text = encodeURIComponent(`${buildShareText(data)}\n\n${currentUrl()}`);
  return `https://wa.me/?text=${text}`;
}

/** Current page URL (used in share text); safe during SSR/build. */
export function currentUrl(): string {
  if (typeof window !== "undefined" && window.location) {
    return window.location.href;
  }
  return "";
}

/** Format an ISO datetime to the compact UTC stamp Google Calendar expects. */
function toCalendarStamp(iso: string): string {
  const d = new Date(iso);
  // YYYYMMDDTHHMMSSZ
  return d
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

/** Google Calendar "add event" URL built from the event data. */
export function buildGoogleCalendarLink(data: InvitationData): string {
  const dates = `${toCalendarStamp(data.isoStart)}/${toCalendarStamp(data.isoEnd)}`;
  const details = `${data.invitationMessage}\n\n${data.footerQuote}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${data.groomName} & ${data.brideName} — ${data.eventTitle}`,
    dates,
    details,
    location: `${data.venueName}, ${data.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
