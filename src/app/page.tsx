"use client";
import Image from "next/image";
import Link from "next/link";

import { useTranslation } from "@/context";
import { RichTextViewer, ResumeActions, ResumeNavbar } from "@/components";
import { socialsResume } from "@/constants/socials";

export default function Resume() {
  const { translations, location } = useTranslation();
  const textResumeAbout = translations.resume.about.description;

  return (
    <main className="max-w-7xl mx-auto pt-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-28 xl:border-x border-dark-theme/20 dark:border-white-theme/20 ">
      <div className="flex flex-col page-break-before:always">
        <div className="no-print">
          <ResumeNavbar />
        </div>

        <div className="flex flex-row space-x-4 lg:space-x-8 items-center">
          <Image
            src="/images/me_home.jpeg"
            alt="Profile photo"
            width={145}
            height={145}
            className="rounded-full border border-gray-900 dark:border-gray-50"
            priority
          />
          <div className="flex flex-col w-full">
            <div className="grid grid-row-2 md:flex md:flex-row md:items-center gap-2 justify-between">
              <h1 className="text-lg md:text-2xl font-bold order-2 md:order-1">
                {translations.resume.name}
              </h1>
            </div>
            <span className="text-base md:text-lg mb-2">
              {translations.resume.description}
            </span>
            <Link
              href="https://www.ffzanini.dev/"
              className="w-32 flex flex-row justify-center items-center bg-linear-to-r from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700 text-white font-semibold py-1 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-primary-600/25 group"
            >
              ffzanini.dev
            </Link>
          </div>
        </div>

        <ResumeActions
          language={location}
          aboutText={textResumeAbout}
          labels={translations.resume.icos}
          copySuccessText={translations.resume.toast}
        />

        <div className="flex flex-col gap-3">
          <h1 className="text-lg md:text-2xl font-bold">
            {translations.resume.about.title}
          </h1>
          <RichTextViewer content={textResumeAbout} />
        </div>

        <div className="flex flex-col gap-2 my-4">
          {socialsResume.map(({ href, icon: Icon, name, label }) => (
            <div key={name} className="flex flex-row gap-2 items-center">
              <Icon className="h-5 w-5" />
              <span className="text-base">{name} - </span>
              <a
                className="text-base font-semibold"
                href={href}
                target="_blank"
              >
                {label}
              </a>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 my-4">
          <h1 className="text-lg md:text-2xl font-bold">
            {translations.resume.experience.title}
          </h1>
          {translations.resume.experience.information.map((exp) => (
            <div
              key={exp.id}
              className="flex flex-col md:flex-row pt-4 md:pt-8 gap-4 print:page-break"
            >
              <div className="flex flex-row min-w-0 md:min-w-[220px]">
                <span className="text-lg font-semibold">
                  {exp.initial_date} — {exp.final_date}
                </span>
              </div>
              <div className="flex flex-col">
                <p className="text-lg md:text-xl font-semibold ">{exp.title}</p>
                <a
                  href={exp.link}
                  className="text-lg font-medium hover:underline pb-2"
                  target="_blank"
                >
                  {exp.company}
                </a>
                <RichTextViewer content={exp.description} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 my-4">
          <h1 className="text-lg md:text-2xl font-bold">
            {translations.resume.education.title}
          </h1>
          {translations.resume.education.information.map((edu) => (
            <div
              key={edu.id}
              className="flex flex-col md:flex-row pt-4 md:pt-8 gap-4 print:page-break"
            >
              <div className="flex flex-row min-w-0 md:min-w-[220px]">
                <span className="text-lg font-semibold">
                  {edu.initial_date} — {edu.final_date}
                </span>
              </div>
              <div className="flex flex-col">
                <a
                  href={edu.link}
                  className="text-lg md:text-xl font-semibold hover:underline"
                  target="_blank"
                >
                  {edu.title}
                </a>
                <span className="text-base md:text-lg">{edu.region}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 my-4">
          <h1 className="text-lg md:text-2xl font-bold">
            {translations.resume.certifications.title}
          </h1>
          {translations.resume.certifications.information.map((cert) => (
            <div
              key={cert.id}
              className="flex flex-col md:flex-row pt-4 md:pt-8 gap-4 print:page-break"
            >
              <div className="flex flex-row min-w-0 md:min-w-[220px]">
                <span className="text-lg font-semibold">
                  {cert.initial_date} — {cert.final_date}
                </span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg md:text-xl font-bold">{cert.title}</h1>
                <span className="text-base md:text-lg">{cert.region}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 my-4">
          <h1 className="text-lg md:text-2xl font-bold">
            {translations.resume.skills.title}
          </h1>
          {translations.resume.skills.information.map((skill) => (
            <div
              key={skill.id}
              className="flex flex-col pt-4 gap-2 print:page-break"
            >
              <h1 className="text-lg md:text-xl font-bold">{skill.title}</h1>
              <span className="text-base md:text-lg">{skill.desciption}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 my-4">
          <h1 className="text-lg md:text-2xl font-bold">
            {translations.resume.language.title}
          </h1>
          {translations.resume.language.information.map((lang) => (
            <div
              key={lang.id}
              className="flex flex-col pt-4 gap-2 print:page-break"
            >
              <h1 className="text-lg md:text-xl font-bold">{lang.title}</h1>
              <span className="text-base md:text-lg">{lang.desciption}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
