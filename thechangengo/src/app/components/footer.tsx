import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-aliceblue py-8 px-4 sm:px-8 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-gray-700 text-sm md:text-base">
            &copy; 2025 Marpu - The Change NGO. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <span className="text-gray-700 text-sm md:text-base">Follow us on</span>
            <div className="flex gap-4">
              <SocialLink href="https://www.facebook.com/marpu">Facebook</SocialLink>
              <SocialLink href="https://www.twitter.com/marpu">Twitter</SocialLink>
              <SocialLink href="https://www.instagram.com/marpu">Instagram</SocialLink>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex gap-4 text-sm md:text-base">
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <span className="text-gray-400">|</span>
            <FooterLink href="/terms">Terms & Conditions</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Reusable styled components
const SocialLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
  >
    {children}
  </Link>
);

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-gray-700 hover:text-teal-600 transition-colors"
  >
    {children}
  </Link>
);