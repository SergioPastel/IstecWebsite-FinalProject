import { Link, usePage } from "@inertiajs/react";
import React from "react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Footer() {
  // Translation hook used to get footer texts from the language files
  const { t } = useTranslation();
  const { props: pageProps } = usePage();

  return (
    // Main footer container with background color and text styling
    <footer className="mt-20 bg-black text-white">
      <div className="max-w-[1600px] mx-auto px-6 py-16">

        {/* Footer grid layout with responsive columns */}
        <div className="grid grid-cols-[1.45fr_0.9fr_1fr_1fr] gap-x-6 gap-y-10 max-[1100px]:grid-cols-2 max-[640px]:grid-cols-1">
          {/* Brand and social media section */}
          <div>
            <div className="mb-4">
              <h3 className="text-[1.4rem] font-bold tracking-[-0.4px]">
                {t('footer.istecPorto')}
              </h3>
              {/* Decorative blue underline */}
              <div className="mt-3 h-[2px] w-14 bg-[#0d8fe8]" />
            </div>
            {/* Footer description text */}
            <p className="max-w-[320px] text-gray-400 leading-7">
              {pageProps.siteInfo.slogan}
            </p>
            {/* Social media links */}
           <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.instagram.com/istec.porto/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-[#0d8fe8] transition group"
              >
                <FaInstagram className="w-5 h-5 text-gray-300 group-hover:text-white" />
              </a>

              <a
                href="https://www.facebook.com/ISTECP/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-[#0d8fe8] transition group"
              >
                <FaFacebookF className="w-5 h-5 text-gray-300 group-hover:text-white" />
              </a>

              <a
                href="https://www.linkedin.com/school/istecporto/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-[#0d8fe8] transition group"
              >
                <FaLinkedinIn className="w-5 h-5 text-gray-300 group-hover:text-white" />
              </a>
            </div>
           </div>
                      
          {/* Navigation links section */}
          <div>
            <h4 className="mb-4 text-[1rem] font-semibold text-white">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  href={route("home")}
                  className="transition-colors duration-300 hover:text-[#0d8fe8]"
                >
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link
                  href={route("eventsandnews")}
                  className="transition-colors duration-300 hover:text-[#0d8fe8]"
                >
                  {t('footer.events')}
                </Link>
              </li>
              <li>
                <Link
                  href={route("applications.courses.apply")}
                  className="transition-colors duration-300 hover:text-[#0d8fe8]"
                >
                  {t('footer.applications')}
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact information section */}
          <div>
            <h4 className="mb-4 text-[1rem] font-semibold text-white">
              {t('footer.contacts')}
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-[#0d8fe8]">📍</span>
                <span>{pageProps.siteInfo.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#0d8fe8]">📧</span>
                <span>{pageProps.siteInfo.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#0d8fe8]">📞</span>
                <div>
                  <span>{pageProps.siteInfo.phone_number}</span>

                  {/* Extra note about the fixed phone line */}
                  <p className="text-xs text-gray-500 mt-1">
                    {t("footer.fixedLineNote")}
                  </p>
                </div>
              </li>
            </ul>
          </div>
          {/* Information links section */}
          <div>
            <h4 className="mb-4 text-[1rem] font-semibold text-white">
              {t('footer.information')}
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  href={route("privacy")}
                  className="transition-colors duration-300 hover:text-[#0d8fe8]"
                >
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link
                  href={route("terms")}
                  className="transition-colors duration-300 hover:text-[#0d8fe8]"
                >
                  {t('footer.termsConditions')}
                </Link>
              </li>
              <li>
                <Link
                  href={route('contacts') + '#contact-form'}
                  className="transition-colors duration-300 hover:text-[#0d8fe8]"
                >
                  {t('footer.requestInfo')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom footer bar */}
      <div className="border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 py-5 flex items-center justify-between gap-3 text-sm text-gray-500 max-[640px]:flex-col max-[640px]:items-start">
          
          {/* Dynamic copyright year */}
          <span>
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </span>
        </div>
      </div>
    </footer>
  );
}
