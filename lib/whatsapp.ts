// WhatsApp + social share URL generators
export function whatsappShareUrl(text: string, url: string) {
  const message = encodeURIComponent(`${text}\n${url}`);
  return `https://wa.me/?text=${message}`;
}

export function whatsappContactUrl(phone: string, text = "Hi Parilata Foundation, I'd like to know more about your work.") {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function facebookShareUrl(url: string) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

export function twitterShareUrl(text: string, url: string) {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
}
