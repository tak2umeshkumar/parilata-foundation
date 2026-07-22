import { MessageCircle, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { getSiteContent, CONTACT_DEFAULTS } from "@/lib/site-content";

export const metadata = { title: "Contact" };

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX";

export default async function ContactPage() {
  const content = await getSiteContent("contact_info", CONTACT_DEFAULTS);

  return (
    <div className="container-wide py-16 md:py-24">
      <h1 className="font-display text-4xl font-semibold text-canopy-900 dark:text-paper">Get in Touch</h1>
      <p className="mt-2 max-w-xl text-canopy-700/80 dark:text-canopy-100/70">
        Questions, partnership ideas, or press inquiries — we'd love to hear from you.
      </p>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <ContactForm />

        <div className="space-y-6">
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl border border-canopy-100 p-5 hover:bg-canopy-50 dark:border-canopy-700 dark:hover:bg-canopy-800">
            <MessageCircle className="text-moss-600" size={22} />
            <div>
              <p className="font-semibold text-canopy-900 dark:text-paper">WhatsApp</p>
              <p className="text-sm text-canopy-700/70 dark:text-canopy-100/70">Chat with us directly</p>
            </div>
          </a>
          <a href={`mailto:${content.email}`}
            className="flex items-center gap-4 rounded-xl border border-canopy-100 p-5 hover:bg-canopy-50 dark:border-canopy-700 dark:hover:bg-canopy-800">
            <Mail className="text-moss-600" size={22} />
            <div>
              <p className="font-semibold text-canopy-900 dark:text-paper">Email</p>
              <p className="text-sm text-canopy-700/70 dark:text-canopy-100/70">{content.email}</p>
            </div>
          </a>
          <div className="flex items-center gap-4 rounded-xl border border-canopy-100 p-5 dark:border-canopy-700">
            <MapPin className="text-moss-600" size={22} />
            <div>
              <p className="font-semibold text-canopy-900 dark:text-paper">Based in</p>
              <p className="text-sm text-canopy-700/70 dark:text-canopy-100/70">{content.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
