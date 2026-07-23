"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sun, Moon, Leaf } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/stories", label: "Stories" },
  { href: "/books", label: "Books" },
  { href: "/gallery", label: "Gallery" },
  { href: "/videos", label: "Videos" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-canopy-100/60 bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70 dark:bg-canopy-900/85">
        <div className="container-wide flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="flex items-center gap-1.5 group sm:gap-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-canopy-700 text-paper transition group-hover:bg-moss-700 sm:h-9 sm:w-9">
              <Leaf size={16} strokeWidth={2.5} className="sm:hidden" />
              <Leaf size={18} strokeWidth={2.5} className="hidden sm:block" />
            </span>
            <span className="font-display text-base font-semibold tracking-tight text-canopy-900 dark:text-paper sm:text-lg">
              Parilata Foundation
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative text-sm font-medium text-canopy-700 transition hover:text-moss-700 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-moss-500 after:transition-all hover:after:w-full dark:text-paper"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 text-canopy-700 hover:bg-canopy-50 dark:text-paper dark:hover:bg-canopy-700"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              href="/donate"
              className="hidden rounded-full bg-earth-700 px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-earth-500 md:inline-block"
            >
              Donate
            </Link>
            <button
              aria-label="Open menu"
              className="p-2 md:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu size={22} className="text-canopy-700 dark:text-paper" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-canopy-900 md:hidden"
          >
            <div className="container-wide flex h-16 items-center justify-between">
              <span className="font-display text-lg text-paper">Menu</span>
              <button aria-label="Close menu" onClick={() => setOpen(false)}>
                <X size={24} className="text-paper" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-6">
              {[...links, { href: "/donate", label: "Donate" }].map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-paper/10 py-4 font-display text-2xl text-paper"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
