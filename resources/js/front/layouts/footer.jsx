import { usePage } from "@inertiajs/react";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const siteInfo = usePage().props.siteInfo;

  return (
    <footer className="mt-20 bg-black text-white">
      <div className="max-w-[1600px] mx-auto px-6 py-16">
        <div className="grid grid-cols-[1.45fr_0.9fr_1fr_1fr] gap-x-6 gap-y-10 max-[1100px]:grid-cols-2 max-[640px]:grid-cols-1">
          <div>
            <div className="mb-4">
              <h3 className="text-[1.4rem] font-bold tracking-[-0.4px]">
                {t('footer.istecPorto')}
              </h3>
              <div className="mt-3 h-[2px] w-14 bg-[#0d8fe8]" />
            </div>

            <p className="max-w-[320px] text-gray-400 leading-7">
              {siteInfo.slogan}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-[1rem] font-semibold text-white">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#0d8fe8]"
                >
                  {t('footer.home')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#0d8fe8]"
                >
                  {t('footer.courses')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#0d8fe8]"
                >
                  {t('footer.events')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#0d8fe8]"
                >
                  {t('footer.applications')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[1rem] font-semibold text-white">
              {t('footer.contacts')}
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                {/* <span className="text-[#0d8fe8]">📍</span> */}
                <span>{siteInfo.address}</span>
              </li>
              <li className="flex items-start gap-3">
                {/* <span className="text-[#0d8fe8]">📧</span> */}
                <span>{siteInfo.email}</span>
              </li>
              <li className="flex items-start gap-3">
                {/* <span className="text-[#0d8fe8]">📞</span> */}
                <span>{siteInfo.phone_number}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[1rem] font-semibold text-white">
              {t('footer.information')}
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#0d8fe8]"
                >
                  {t('footer.privacyPolicy')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#0d8fe8]"
                >
                  {t('footer.termsConditions')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#0d8fe8]"
                >
                  {t('footer.requestInfo')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 py-5 flex items-center justify-between gap-3 text-sm text-gray-500 max-[640px]:flex-col max-[640px]:items-start">
          <span>
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </span>

          <span>
            {t('footer.developed')}
          </span>
        </div>
      </div>
    </footer>
  );
}
