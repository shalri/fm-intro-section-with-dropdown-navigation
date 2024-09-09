"use client";

import { useMobileNav } from "@/hooks/useMobileNavigation";
import { useSmallScreen } from "@/hooks/useSmallScreen";
import { authLinks, navigationLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Navigation() {
  const isSmallScreen = useSmallScreen();
  const navRef = useRef<HTMLDivElement>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isMobileNavActive, closeMobileNav, toggleMobileNav } = useMobileNav(
    navRef,
    isSmallScreen,
  );

  const animationWrapper = useCallback(
    (children: React.ReactNode) => {
      return (
        <AnimatePresence>
          {isMobileNavActive && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.2 } }}
              exit={{ x: "100%", transition: { duration: 0.1 } }}
              className="fixed inset-y-0 right-0 z-20 w-[64%] max-w-sm overflow-y-auto bg-red-500 px-6 pt-[74px] shadow-lg shadow-black/50"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      );
    },
    [isMobileNavActive],
  );

  const toggleDropdown = useCallback((e: React.MouseEvent, label: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown((prev) => (prev === label ? null : label));
  }, []);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      closeMobileNav();
    },
    [closeMobileNav],
  );

  useEffect(() => {
    if (!isMobileNavActive) {
      setActiveDropdown(null);
    }
  }, [isMobileNavActive]);

  const NavContent = () => (
    <>
      <ul className="flex flex-col gap-y-[10px]" role="menu">
        {navigationLinks.map((link) => (
          <li className="group relative" key={link.label}>
            {link.subLinks?.length ? (
              <div
                className="block cursor-pointer py-1"
                onClick={(e) => toggleDropdown(e, link.label)}
                role="menuitem"
              >
                {link.label} {activeDropdown === link.label ? "v" : ">"}
              </div>
            ) : (
              <Link
                className="block py-1"
                role="menuitem"
                href={link.href}
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            )}

            {link.subLinks?.length ? (
              <ul
                className={cn(
                  activeDropdown === link.label
                    ? "ml-4 sm:absolute sm:ml-0 sm:hidden sm:group-hover:block"
                    : "hidden",
                )}
                role="menu"
              >
                {link.subLinks.map((sublink) => (
                  <li className="" key={sublink.label}>
                    <Link
                      href={sublink.href}
                      role="menuitem"
                      className="block py-2"
                      onClick={handleLinkClick}
                    >
                      {sublink.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
      <ul className="mt-4 sm:mt-0 sm:flex">
        {authLinks.map((authLink) => (
          <li className="" key={authLink.label}>
            <Link
              href={authLink.href}
              className="block py-2"
              onClick={handleLinkClick}
            >
              {authLink.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <>
      <AnimatePresence>
        {/* Dark BG  on active nav*/}
        {isMobileNavActive && isSmallScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 bg-black/40"
          />
        )}
      </AnimatePresence>
      <nav
        className="relative z-50 flex h-full w-full flex-grow flex-col justify-between sm:flex-row"
        aria-label="Main Navigation"
        ref={navRef}
      >
        {isSmallScreen ? animationWrapper(<NavContent />) : <NavContent />}
        <button
          type="button"
          aria-label={isMobileNavActive ? "Close Menu" : "Open Menu"}
          aria-expanded={isMobileNavActive}
          className={cn(
            "pointer-events-auto z-50 ml-auto h-[30px] w-[28px] self-end bg-[url('/images/icon-menu.svg')] bg-no-repeat sm:hidden",
            isMobileNavActive && "bg-[url('/images/icon-close-menu.svg')]",
          )}
          onClick={toggleMobileNav}
        ></button>
      </nav>
    </>
  );
}
