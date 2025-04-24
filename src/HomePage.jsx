import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HomePage() {
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
    <main className="p-6 space-y-8">
      <motion.h1
        className="text-3xl md:text-5xl font-bold text-center text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {homepageData.name}
      </motion.h1>
      <motion.p
        className="text-center text-lg md:text-xl text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {homepageData.tagline}
      </motion.p>

      <div className="flex justify-center">
        <Button>{homepageData.cta}</Button>
      </div>

      <section className="space-y-6">
        {homepageData.projects.map((section) => (
          <div
            key={section.category}
            className="space-y-4 p-4 rounded-lg shadow-lg bg-gray-50 hover:bg-gray-100 transition-all"
          >
            <h2
              className="text-2xl font-semibold cursor-pointer text-gray-800 hover:text-blue-500"
              onClick={() => toggleCategory(section.category)}
            >
              {section.category}
            </h2>
            {collapsedSections[section.category] ? (
              <div className="grid md:grid-cols-2 gap-4">
                {section.projects.map((project) => (
                  <Card key={project.title} className="shadow-md rounded-lg overflow-hidden bg-white">
                    <CardContent className="space-y-2 p-4">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <p>{project.description}</p>
                      <p className="text-sm text-gray-500">Tech Stack: {project.tech}</p>
                      <div className="flex gap-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline">GitHub</Button>
                        </a>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button>Live Demo</Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2
          className="text-2xl font-semibold cursor-pointer text-gray-800 hover:text-blue-500"
          onClick={() => toggleCategory("Skills")}
        >
          Skills
        </h2>
        {collapsedSections["Skills"] ? (
          <div className="grid md:grid-cols-2 gap-4">
            {homepageData.skills.map((section) => (
              <Card key={section.category} className="shadow-sm rounded-lg overflow-hidden bg-white">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold">{section.category}</h3>
                  <ul className="list-disc list-inside">
                    {section.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
