"use client";

import { useMobileNav } from "@/hooks/useMobileNavigation";
import { useSmallScreen } from "@/hooks/useSmallScreen";
import { authLinks, navigationLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
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

  const mobileNavAnimationWrapper = useCallback(
    (children: React.ReactNode) => {
      return (
        <AnimatePresence>
          {isMobileNavActive && (
            <motion.div
              key="mobile-nav"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.2 } }}
              exit={{ x: "100%", transition: { duration: 0.1 } }}
              className="fixed inset-y-0 right-0 z-20 w-[64%] max-w-sm overflow-y-auto bg-is-almost-white pl-6 pr-5 pt-[74px] shadow-lg shadow-black/50"
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
      setActiveDropdown(null);
    },
    [closeMobileNav],
  );

  useEffect(() => {
    if (!isMobileNavActive) {
      setActiveDropdown(null);
    }
  }, [isMobileNavActive]);

  // useOutsideClick(dropdownRef, () => setActiveDropdown(null));

  const NavContent = () => (
    <>
      <ul
        className="flex flex-col gap-y-[10px] text-is-medium-gray sm:flex-row sm:items-center sm:gap-x-[38px] sm:pb-[5px] sm:pl-[62px] sm:text-[0.8825rem]"
        role="menu"
      >
        {navigationLinks.map((link, index) => (
          <li className="relative" key={`nav-link-${link.label}-${index}`}>
            {link.subLinks?.length ? (
              <div
                className="transition-color cursor-pointer py-1 duration-300 hover:text-is-almost-black"
                onClick={(e) => toggleDropdown(e, link.label)}
                role="menuitem"
                // ref={dropdownRef}
              >
                {link.label}{" "}
                {activeDropdown === link.label ? (
                  <span className="relative ml-3 inline-block size-[0.65rem] sm:ml-1">
                    <Image
                      src="/images/icon-arrow-up.svg"
                      fill
                      alt="close"
                      className="object-contain object-bottom"
                    />
                  </span>
                ) : (
                  <span className="relative ml-3 inline-block size-[0.65rem] sm:ml-1">
                    <Image
                      src="/images/icon-arrow-down.svg"
                      fill
                      alt="open"
                      className="object-contain object-bottom"
                    />
                  </span>
                )}
              </div>
            ) : (
              <Link
                className="transition-color block py-1 duration-300 hover:text-is-almost-black"
                role="menuitem"
                href={link.href}
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            )}
            {activeDropdown === link.label && link.subLinks?.length && (
              <motion.ul
                layout
                key={`sublink-${link.label}-${index}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cn(
                  "ml-4 mt-4 flex flex-col gap-y-[2px] text-nowrap rounded-lg sm:absolute sm:ml-0 sm:border sm:bg-white sm:px-6 sm:py-4 sm:shadow-xl sm:shadow-is-almost-black/30",
                  link.label === "Features" && "sm:-left-20",
                )}
                role="menu"
              >
                {link.subLinks.map((subLink, index) => (
                  <li key={`${subLink.label}-${index}`}>
                    <Link
                      href={subLink.href}
                      role="menuitem"
                      className="flex gap-x-2 py-2 transition-all duration-300 hover:text-is-almost-black sm:pl-0 sm:pr-2"
                      onClick={handleLinkClick}
                    >
                      {subLink.icon ? (
                        // dynamically add the icon from data.js
                        <div
                          className="h-[20px] w-[34px] bg-contain bg-center bg-no-repeat hover:text-is-almost-black"
                          style={{
                            backgroundImage: `url(${subLink.icon})`,
                          }}
                        />
                      ) : (
                        ""
                      )}
                      {subLink.label}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </li>
        ))}
      </ul>
      <ul className="mt-5 flex flex-col gap-y-2 text-center text-sm text-is-medium-gray sm:mt-0 sm:w-full sm:max-w-[180px] sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-4">
        {authLinks.map((authLink) => (
          <li
            className={cn(
              "transition-colors duration-300 hover:text-is-almost-black",
              authLink.label === "Register" &&
                "rounded-[12px] border-2 border-is-medium-gray/80 hover:border-is-almost-black sm:mb-2 sm:border-[3px] sm:px-5 sm:leading-none",
            )}
            key={authLink.label}
          >
            <Link
              href={authLink.href}
              className="block py-2 sm:py-3"
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
        {isSmallScreen ? (
          mobileNavAnimationWrapper(<NavContent />)
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
          onClick={toggleMobileNav}
        ></button>
      </nav>
    </>
  );
}
