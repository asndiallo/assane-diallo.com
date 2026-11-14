import { CONTACT_EMAIL, isTodo, site } from "../config.ts";

/** Each helper returns null while its fact is still a TODO, so callers can show a placeholder. */
export const whatsappHref = (message: string): string | null =>
  isTodo(site.whatsappNumber)
    ? null
    : `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

/**
 * The email never appears in the HTML as text or as a mailto: link, to keep it away from scrapers.
 * It ships reversed and base64-encoded, and EmailLink.astro decodes it in the browser.
 */
export const encodedEmail = (): string | null =>
  isTodo(CONTACT_EMAIL) ? null : btoa([...CONTACT_EMAIL].reverse().join(""));

export const bookingHref = (): string | null => (isTodo(site.bookingUrl) ? null : site.bookingUrl);

/** The WhatsApp number as people read it: "+1 210-960-5715" for US numbers. For print, where links don't work. */
export const whatsappDisplay = (): string | null => {
  if (isTodo(site.whatsappNumber)) return null;
  const us = /^1(\d{3})(\d{3})(\d{4})$/.exec(site.whatsappNumber);
  return us ? `+1 ${us[1]}-${us[2]}-${us[3]}` : `+${site.whatsappNumber}`;
};
