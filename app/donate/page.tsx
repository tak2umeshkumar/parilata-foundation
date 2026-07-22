import { QrCode, Copy } from "lucide-react";
import { getSiteContent, DONATE_DEFAULTS } from "@/lib/site-content";

export const metadata = { title: "Donate" };

export default async function DonatePage() {
  const content = await getSiteContent("donate_info", DONATE_DEFAULTS);

  return (
    <div className="container-wide max-w-2xl py-16 md:py-24 text-center">
      <h1 className="font-display text-4xl font-semibold text-canopy-900 dark:text-paper">Support Our Work</h1>
      <p className="mx-auto mt-3 max-w-md text-canopy-700/80 dark:text-canopy-100/70">
        {content.intro_text}
      </p>

      <div className="mx-auto mt-10 max-w-sm rounded-2xl border border-canopy-100 p-8 dark:border-canopy-700">
        <div className="mx-auto grid h-48 w-48 place-items-center rounded-xl border-2 border-dashed border-canopy-300 text-canopy-400">
          <QrCode size={64} />
          <span className="sr-only">UPI QR code placeholder — replace with your real QR image</span>
        </div>
        <p className="mt-4 text-xs text-canopy-700/60 dark:text-canopy-100/60">
          Placeholder — replace with your bank/UPI app's real QR code image.
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-canopy-50 px-4 py-3 dark:bg-canopy-800">
          <span className="font-mono text-sm text-canopy-900 dark:text-paper">{content.upi_id}</span>
          <Copy size={14} className="text-canopy-600" />
        </div>
      </div>

      <p className="mt-8 text-sm text-canopy-700/70 dark:text-canopy-100/70">
        Prefer bank transfer or a receipt for tax purposes? <a href="/contact" className="font-semibold text-moss-700 underline">Contact us</a> and we'll help directly.
      </p>
    </div>
  );
}
