import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { FaGithub, FaExternalLinkAlt, FaFilePdf, FaLinkedin, FaTwitter } from "react-icons/fa"; // Import more icons

export default function HomePage() {
  const { theme, toggleTheme } = useTheme();
  const [homepageData, setHomepageData] = useState(null);
  const [collapsedSections, setCollapsedSections] = useState({});

  useEffect(() => {
    fetch("/data/portfolio.json")
      .then((res) => res.json())
      .then((data) => setHomepageData(data));
  }, []);

  const toggleCategory = (category) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  if (!homepageData) return <div className="p-4 text-center">Loading...</div>;

  return (
    <main className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen py-12 px-6 md:px-12 lg:px-24 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-16">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h4 className="text-xl font-bold">{homepageData.name}</h4>
        </header>

        {/* Hero Section */}
        <section className="py-8 text-center">
          <motion.h4
            className="text-3xl md:text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {homepageData.name}
          </motion.h4>
          <motion.p
            className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {homepageData.tagline}
          </motion.p>
          {/* GitHub Profile Picture */}
          <div className="flex justify-center my-4">
            <img
              src={`https://github.com/Addisu-Taye.png`}
              alt="GitHub Profile"
              className="rounded-full w-24 h-24 border-2 border-blue-300 shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 100 }}
          >
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all text-sm md:text-base">
              {homepageData.cta}
            </Button>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Projects
          </h2>
          {homepageData.projects.map((section) => (
            <div key={section.category} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div
                className="px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleCategory(section.category)}
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center justify-between">
                  {section.category}
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      collapsedSections[section.category] ? "rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </h3>
              </div>
              {collapsedSections[section.category] && (
                <div className="p-4 grid md:grid-cols-2 gap-4">
                  {section.projects.map((project) => (
                    <motion.div
                      key={project.title}
                      className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * section.projects.indexOf(project) }}
                    >
                      <Card className="border-none">
                        <CardContent className="space-y-2">
                          <h4 className="text-md font-semibold text-gray-800 dark:text-white">
                            {project.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {project.description}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            Tech: {project.tech}
                          </p>
                          <div className="flex gap-2 mt-1">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors text-xs"
                              >
                                <FaGithub className="h-4 w-4" /> GitHub
                              </a>
                            )}
                            {project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-800 transition-colors text-xs"
                              >
                                <FaExternalLinkAlt className="h-4 w-4" /> Live Demo
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Skills Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Skills
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div
              className="px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => toggleCategory("Skills")}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center justify-between">
                Skills
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    collapsedSections["Skills"] ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </h3>
            </div>
            {collapsedSections["Skills"] && (
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {homepageData.skills.map((section) => (
                  <motion.div
                    key={section.category}
                    className="bg-gray-100 dark:bg-gray-900 rounded-md shadow-sm p-2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 * homepageData.skills.indexOf(section) }}
                  >
                    <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-1">
                      {section.category}
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-xs">
                      {section.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Contact
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-3">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all text-sm md:text-base">
            <a href={`mailto:${homepageData.email}`}>Email Me</a>
          </Button>
        </section>

        {homepageData?.resume && (
  <section className="py-8 text-center">
    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
      Resume
    </h2>
    <div className="flex justify-center gap-4">
      {/* Check if the PDF URL exists and create a button to view the PDF */}
      {homepageData.resume.pdfUrl && (
        <Button
          as="a"
          href={homepageData.resume.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all text-sm md:text-base inline-flex items-center"
        >
          <FaFilePdf className="mr-2" /> Read PDF
        </Button>
      )}
      {/* Check if the download URL exists and create a button to download the resume */}
      {homepageData.resume.downloadUrl && (
        <Button
          as="a"
          href={homepageData.resume.downloadUrl}
          download={`${homepageData.name}-resume.pdf`}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all text-sm md:text-base inline-flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l3 4.5m-3-4.5v13.5"
            />
          </svg>
          Download Resume
        </Button>
      )}
    </div>
    {/* Optional message for the resume section */}
    {homepageData.resume.message && (
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        {homepageData.resume.message}
      </p>
    )}
  </section>
)}


        {/* Footer */}
        <footer className="text-center text-gray-500 dark:text-gray-400 py-6 border-t border-gray-200 dark:border-gray-700 text-sm">
          <p>&copy; {new Date().getFullYear()} {homepageData.name}. All rights reserved.</p>
          {homepageData.social && (
            <div className="flex justify-center gap-3 mt-1">
              {Object.entries(homepageData.social).map(([platform, link]) => {
                const platformLower = platform.toLowerCase();
                let icon;
                if (platformLower === "linkedin") {
                  icon = <FaLinkedin className="h-5 w-5" />;
                } else if (platformLower === "github") {
                  icon = <FaGithub className="h-5 w-5" />;
                } else if (platformLower === "twitter") {
                  icon = <FaTwitter className="h-5 w-5" />;
                }
                return (
                  icon && (
                    <a
                      key={platform}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      {icon}
                    </a>
                  )
                );
              })}
            </div>
          )}
        </footer>
      </div>
    </main>
  );
}