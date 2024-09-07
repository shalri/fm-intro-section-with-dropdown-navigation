"use client";

import { useMobileNav } from "@/hooks/useMobileNavgation";
import { useSmallScreen } from "@/hooks/useSmallScreen";
import { authLinks, navigationLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useState, useRef, useEffect } from "react";

export default function Navigation() {
  const isSmallScreen = useSmallScreen();
  const navRef = useRef<HTMLDivElement>(null);

  const { isMobileNavActive, closeMobileNav, toggleMobileNav } = useMobileNav(
    navRef,
    isSmallScreen,
  );

  const NavContent = () => (
    <>
      <ul className="sm:flex" role="menu">
        {navigationLinks.map((link) => (
          <li className="group relative" key={link.label}>
            <Link
              className="block py-2"
              role="menuitem"
              href={link.href}
              onClick={closeMobileNav}
            >
              {link.label}
            </Link>
            {/* Dropdown */}
            {link.subLinks && (
              <ul
                className="ml-4 sm:absolute sm:ml-0 sm:hidden sm:group-hover:block"
                role="menu"
              >
                {link.subLinks?.map((sublink) => (
                  <li className="" key={sublink.label}>
                    <Link
                      href={sublink.href}
                      role="menuitem"
                      onClick={closeMobileNav}
                      className="block py-2"
                    >
                      {sublink.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {/* Auth links */}
      <ul className="mt-4 sm:mt-0 sm:flex">
        {authLinks.map((authLink) => (
          <li className="" key={authLink.label}>
            <Link
              href={authLink.href}
              onClick={closeMobileNav}
              className="block py-2"
            >
              {authLink.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
  const animationWrapper = useCallback(
    (children: React.ReactNode) => {
      return (
        <AnimatePresence>
          {isMobileNavActive && (
            <motion.div
              ref={navRef}
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.2 } }}
              exit={{ x: "100%" }}
              className="fixed inset-y-0 right-0 z-20 w-[64%] overflow-y-auto bg-white p-4 shadow-lg"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      );
    },
    [isMobileNavActive],
  );

  return (
    <>
      <AnimatePresence>
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
      >
        {isSmallScreen ? (
          // <AnimatePresence>
          //   {isMobileNavActive && (
          //     <motion.div
          //       ref={navRef}
          //       initial={{ opacity: 0, x: "100%" }}
          //       animate={{ opacity: 1, x: 0 }}
          //       exit={{ opacity: 0, x: "100%" }}
          //       className="fixed inset-y-0 right-0 top-16 z-20 w-[80%] max-w-sm overflow-y-auto bg-white p-4 shadow-lg"
          //     >
          //       <NavContent />
          //     </motion.div>
          //   )}
          // </AnimatePresence>
          animationWrapper(<NavContent />)
        ) : (
          <NavContent />
        )}
        <button
          type="button"
          aria-label={isMobileNavActive ? "Close Menu" : "Open Menu"}
          aria-expanded={isMobileNavActive}
          className={cn(
            "pointer-events-auto z-50 ml-auto h-[30px] w-[28px] self-end bg-[url('/images/icon-menu.svg')] bg-no-repeat sm:hidden",
            isMobileNavActive && "bg-[url('/images/icon-close-menu.svg')]",
          )}
          // onClick={() => {
          //   console.log("Button clicked");
          //   setMobileNavActive((prev) => !prev);
          // }}
          onClick={toggleMobileNav}
        ></button>
      </nav>
    </>
  );
}
