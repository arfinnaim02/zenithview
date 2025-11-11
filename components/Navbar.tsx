"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/solutions/dashboard', label: 'Solutions' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/careers', label: 'Careers' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  // Hide nav on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 150) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScroll(currentScroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  // lock body scroll when menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <div className={`fixed top-0 w-full z-50 transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-full'}`}>      
      <nav className="glass px-4 py-2 lg:px-8 lg:py-4 flex items-center justify-between">
        <Link href="/">
          <span className="font-heading text-xl font-semibold tracking-wide text-neon">ZenithView</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-sm hover:text-neon transition-colors">
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-neon ml-4 whitespace-nowrap">Book Consultation</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Navigation" className="focus:outline-none">
            <motion.span initial={{ rotate: 0 }} animate={{ rotate: isOpen ? 45 : 0 }} className="block w-6 h-0.5 bg-neon mb-1"></motion.span>
            <motion.span initial={{ opacity: 1 }} animate={{ opacity: isOpen ? 0 : 1 }} className="block w-6 h-0.5 bg-neon mb-1"></motion.span>
            <motion.span initial={{ rotate: 0 }} animate={{ rotate: isOpen ? -45 : 0 }} className="block w-6 h-0.5 bg-neon"></motion.span>
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-base/90 backdrop-blur-sm flex flex-col items-center justify-center space-y-8 md:hidden z-40"
          >
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-heading hover:text-neon transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="btn-neon px-8 py-4 text-lg"
            >
              Book Consultation
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}