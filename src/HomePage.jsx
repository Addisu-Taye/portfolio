import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { 
  FaGithub, FaExternalLinkAlt, FaFilePdf, 
  FaLinkedin, FaTwitter, FaMoon, FaSun, 
  FaCaretDown, FaCaretRight 
} from "react-icons/fa";

// Constants
const isDevelopment = process.env.NODE_ENV === 'development';
const pdfPath = isDevelopment ? '/Addisu_Taye_Resume.pdf' : '/portfolio/Addisu_Taye_Resume.pdf';

// Components
const SidebarItem = ({ label, children, isExpanded, onToggle }) => (
  <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl shadow-lg backdrop-blur-md p-2 transition-all">
    <button
      className="w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-400 dark:hover:from-indigo-700 dark:hover:to-purple-700 text-gray-700 dark:text-gray-300 font-semibold flex items-center justify-between"
      onClick={onToggle}
    >
      {label}
      {children && (isExpanded ? <FaCaretDown className="ml-2" /> : <FaCaretRight className="ml-2" />)}
    </button>
    {children && isExpanded && (
      <ul className="ml-4 mt-2 space-y-1">
        {children.map((child) => (
          <li key={child.id}>
            <button
              className="w-full text-left py-1 px-3 rounded-md transition hover:bg-blue-100 dark:hover:bg-blue-900 text-sm text-gray-600 dark:text-gray-400"
              onClick={child.onClick}
            >
              {child.label}
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const FeedItem = ({ feed }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.1 }}
  >
    <div className="flex items-start gap-4">
      <img src={feed.avatar} alt={feed.author} className="w-10 h-10 rounded-full" />
      <div>
        <p className="font-semibold">{feed.author}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{feed.timestamp}</p>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{feed.content}</p>
        {feed.image && (
          <img 
            src={feed.image} 
            alt="Feed Image" 
            className="mt-4 rounded-md w-full object-cover" 
            style={{ maxHeight: '300px' }} 
          />
        )}
        <div className="mt-3 flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
          <button className="hover:text-blue-500">Like ({feed.likes || 0})</button>
          <button className="hover:text-blue-500">Comment ({feed.comments || 0})</button>
          <button className="hover:text-blue-500">Share</button>
        </div>
      </div>
    </div>
  </motion.div>
);

const ProjectCard = ({ project, onClick }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 cursor-pointer hover:scale-105 transition-transform duration-300"
    onClick={() => onClick(project)}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    {project.image && (
      <img
        src={project.image}
        alt={project.title}
        className="rounded-md w-full h-32 object-cover mb-2"
      />
    )}
    <h4 className="font-semibold text-lg">{project.title}</h4>
    <p className="text-gray-600 dark:text-gray-400 text-sm">
      {project.description?.substring(0, 60)}...
    </p>
    <div className="flex gap-2 mt-2">
      {project.github && (
        <a 
          href={project.github} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 hover:underline text-sm flex items-center gap-1"
        >
          <FaGithub className="h-4 w-4" /> GitHub
        </a>
      )}
      {project.demo && (
        <a 
          href={project.demo} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-purple-500 hover:underline text-sm flex items-center gap-1"
        >
          <FaExternalLinkAlt className="h-4 w-4" /> Demo
        </a>
      )}
    </div>
  </motion.div>
);

const SkillTag = ({ skill, index }) => (
  <motion.span
    className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full px-3 py-1 text-sm font-medium"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.2, delay: 0.05 * index }}
  >
    {skill}
  </motion.span>
);

const Header = ({ name, tagline, activeSection, scrollToSection, toggleTheme, theme }) => (
  <header className="sticky top-0 bg-inherit backdrop-blur-md py-4 z-20 flex flex-col md:flex-row justify-between items-center gap-4">
    <div className="flex items-center gap-4">
      <motion.img
        src={`https://github.com/Addisu-Taye.png`}
        alt="Profile"
        className="w-12 h-12 rounded-full border-2 border-blue-300 shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      <div>
        <h1 className="text-xl font-bold">{name}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">{tagline}</p>
      </div>
    </div>
    <div className="flex gap-2">
      <Button
        onClick={() => scrollToSection("blogs")}
        variant={activeSection === "blogs" ? "default" : "outline"}
      >
        Blogs
      </Button>
      <Button
        onClick={() => scrollToSection("projects")}
        variant={activeSection === "projects" ? "default" : "outline"}
      >
        Projects
      </Button>
      <Button
        onClick={() => scrollToSection("skills")}
        variant={activeSection === "skills" ? "default" : "outline"}
      >
        Skills
      </Button>
      <Button 
        onClick={toggleTheme} 
        className="rounded-full p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
      >
        {theme === 'dark' ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
      </Button>
    </div>
  </header>
);

const ResumeSection = ({ resumeData, pdfPath }) => (
  <section id="resume-section" className="py-8">
    <h2 className="text-2xl font-bold mb-4">Resume</h2>
    {resumeData?.message && <p className="mb-4">{resumeData.message}</p>}
    <div className="flex gap-4">
      {resumeData?.pdfUrl && (
        <Button asChild>
          <a href={pdfPath} target="_blank" rel="noopener noreferrer">
            <FaFilePdf className="mr-2" /> View Resume
          </a>
        </Button>
      )}
      {resumeData?.downloadUrl && (
        <Button asChild>
          <a href={pdfPath} download="Addisu_Taye_Resume.pdf">
            <FaFilePdf className="mr-2" /> Download Resume
          </a>
        </Button>
      )}
    </div>
  </section>
);

const ContactSection = ({ social, email }) => (
  <section id="contact-section" className="py-8">
    <h2 className="text-2xl font-bold mb-4">Connect With Me</h2>
    <p className="mb-4">You can find me on these platforms:</p>
    <div className="flex gap-4">
      {social?.LinkedIn && (
        <a 
          href={`https://${social.LinkedIn}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 hover:text-blue-600"
        >
          <FaLinkedin className="h-6 w-6" />
        </a>
      )}
      {social?.GitHub && (
        <a 
          href={social.GitHub} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
        >
          <FaGithub className="h-6 w-6" />
        </a>
      )}
      {social?.Twitter && (
        <a 
          href={social.Twitter} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-400 hover:text-blue-500"
        >
          <FaTwitter className="h-6 w-6" />
        </a>
      )}
    </div>
    {email && (
      <p className="mt-4">
        Or send me an email at: <a href={`mailto:${email}`} className="text-purple-500 hover:underline">{email}</a>
      </p>
    )}
  </section>
);

export default function HomePage() {
  // State
  const { theme, toggleTheme } = useTheme();
  const [homepageData, setHomepageData] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState(null);
  const [activeSection, setActiveSection] = useState("blogs");
  
  // Refs
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const blogsRef = useRef(null);

  // Effects
  useEffect(() => {
    fetch("portfolio.json")
      .then((res) => res.json())
      .then((data) => setHomepageData(data));
  }, []);

  // Handlers
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setSelectedSkillCategory(null);
  };

  const handleSkillClick = (skillCategory) => {
    setSelectedSkillCategory(skillCategory);
    setSelectedProject(null);
  };

  const resetCenter = () => {
    setSelectedProject(null);
    setSelectedSkillCategory(null);
  };

  const scrollToSection = (section) => {
    setActiveSection(section);
    const refs = {
      projects: projectsRef,
      skills: skillsRef,
      blogs: blogsRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Derived values
  const getVisibleBlogs = () => {
    if (!homepageData?.blogsFeed) return [];
    const currentDate = new Date();
    return homepageData.blogsFeed.filter((feed) => {
      const startDate = new Date(feed.startDate);
      const endDate = new Date(feed.endDate);
      return currentDate >= startDate && currentDate <= endDate;
    });
  };

  const sidebarData = [
    { label: "Blogs", id: "blogs-nav", onClick: () => scrollToSection("blogs") },
    { label: "Skills", id: "skills-nav", onClick: () => scrollToSection("skills") },
    { label: "Projects", id: "projects-nav", onClick: () => scrollToSection("projects") },
    { label: "Resume", id: "resume", onClick: () => document.getElementById("resume-section")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Contact", id: "contact", onClick: () => document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" }) },
  ];

  const visibleBlogs = getVisibleBlogs();

  if (!homepageData) return <div className="p-4 text-center">Loading...</div>;

  return (
    <main className="bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-all duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4">
        {/* Left Sidebar */}
        <aside className="md:col-span-1 sticky top-20 space-y-6 p-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Explore</h3>
          <nav className="space-y-4">
            {sidebarData.map((item) => (
              <button
                key={item.id}
                className="w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-400 dark:hover:from-indigo-700 dark:hover:to-purple-700 text-gray-700 dark:text-gray-300 font-semibold"
                onClick={item.onClick}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <section className="md:col-span-3 p-6 space-y-8">
          <Header 
            name={homepageData.name}
            tagline={homepageData.tagline}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            toggleTheme={toggleTheme}
            theme={theme}
          />

          {/* Blogs Section */}
          <div ref={blogsRef} className={activeSection === "blogs" ? "block space-y-6 mt-8" : "hidden"}>
            <h2 className="text-2xl font-bold">My Feed</h2>
            {visibleBlogs.length > 0 ? (
              visibleBlogs.map((feed) => <FeedItem key={feed.id} feed={feed} />)
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">No relevant feed updates at the moment.</p>
            )}
          </div>

          {/* Projects Section */}
          <div ref={projectsRef} className={activeSection === "projects" ? "block space-y-8 mt-8" : "hidden"}>
            <h2 className="text-2xl font-bold">Projects</h2>
            {homepageData.projects?.length > 0 ? (
              homepageData.projects.map((projectCategory) => (
                <div key={projectCategory.category} className="space-y-4">
                  <h3 className="text-xl font-semibold">{projectCategory.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectCategory.projects.map((project, index) => (
                      <ProjectCard 
                        key={project.title} 
                        project={project} 
                        onClick={handleProjectClick}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">No projects available.</p>
            )}
          </div>

          {/* Skills Section */}
          <div ref={skillsRef} className={activeSection === "skills" ? "block space-y-8 mt-8" : "hidden"}>
            <h2 className="text-2xl font-bold">Skills</h2>
            {homepageData.skills?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {homepageData.skills.map((skillCategory) => (
                  <div key={skillCategory.category} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4">
                    <h3 className="text-xl font-semibold mb-2">{skillCategory.category}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {skillCategory.skills.map((skill, index) => (
                        <SkillTag key={skill} skill={skill} index={index} />
                      ))}
                    </div>
                    <Button 
                      onClick={() => handleSkillClick(skillCategory)} 
                      variant="outline" 
                      className="mt-4 w-full"
                    >
                      View {skillCategory.category} Skills
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">No skills available.</p>
            )}
          </div>

          <ResumeSection 
            resumeData={homepageData.resume} 
            pdfPath={pdfPath} 
          />

          <ContactSection 
            social={homepageData.social} 
            email={homepageData.email} 
          />
        </section>
      </div>
    </main>
  );
}