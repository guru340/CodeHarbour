import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import ProjectCard from "@/Project/ProjectCard";

const projects = [
  {
    name: "Project Management System",
    description: "Full Stack project using React + SpringBoot with real-time updates.",
    tech: ["React", "SpringBoot", "MySQL"],
    category: "FullStack",
    tags: ["react", "springboot", "mysql"],
  },
  {
    name: "AI Chat Application",
    description: "Realtime chat app using MERN stack with socket.io.",
    tech: ["React", "Node", "MongoDB"],
    category: "FullStack",
    tags: ["react", "mongodb"],
  },
  {
    name: "Portfolio Website",
    description: "Developer portfolio using Next.js with animations and dark mode.",
    tech: ["Next.js", "Tailwind"],
    category: "Frontend",
    tags: ["next.js"],
  },
  {
    name: "Task Manager",
    description: "Productivity app with a drag-and-drop dashboard.",
    tech: ["React", "Express", "MongoDB"],
    category: "Backend",
    tags: ["react", "mongodb"],
  },
];

const Project = () => {

  const [keyword, setKeyword] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTag, setActiveTag] = useState("all");

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleFilterChange = (type, value) => {
    if (type === "category") setActiveCategory(value);
    if (type === "tag") setActiveTag(value);
  };

  const tags = [
    "all", "react", "next.js", "SpringBoot",
    "mysql", "mongodb", "angular", "python", "Flask", "django"
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesKeyword = project.name.toLowerCase().includes(keyword.toLowerCase());
    const matchesCategory = activeCategory === "all" || project.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesTag = activeTag === "all" || project.tags.includes(activeTag.toLowerCase());
    return matchesKeyword && matchesCategory && matchesTag;
  });

  return (
  
    <div className='min-h-screen w-full bg-[#0e0f1f] relative px-5 lg:px-10 lg:flex gap-5 py-5'>

      {/* FILTER SECTION */}
      <section className="filtersection w-full lg:w-[20rem]">

        
        <Card className="p-6 sticky top-10 w-full rounded-xl shadow-lg bg-[#131525]/80 border border-[#252a45] backdrop-blur-sm">

          {/* Header */}
          <div className="flex items-center justify-between w-full mb-4">
            <p className="text-lg font-semibold tracking-wide text-white">
              Filters
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:bg-[#1e2340] hover:text-white"
            >
              <MixerHorizontalIcon />
            </Button>
          </div>

          <CardContent className="mt-3 px-0">

            <ScrollArea className="space-y-8 h-[70vh] pr-2">

              {/* Category */}
              <div>
                <h1 className="pb-2 text-xs uppercase tracking-widest text-gray-500 border-b border-[#252a45]">
                  Category
                </h1>

                <div className="pt-4">
                  <RadioGroup
                    defaultValue="all"
                    onValueChange={(value) => handleFilterChange("category", value)}
                    className="space-y-1"
                  >
                    {["all", "fullStack", "Frontend", "Backend"].map((item, i) => (
                      // ✅ CHANGED: hover bg to indigo-tinted
                      <div key={item} className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-[#1e2340] cursor-pointer transition-colors">
                        <RadioGroupItem value={item} id={`cat-${i}`} />
                        <Label className="text-sm text-gray-300 hover:text-white cursor-pointer" htmlFor={`cat-${i}`}>
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              {/* Tags */}
              <div className="pt-4">
                <h1 className="pb-2 text-xs uppercase tracking-widest text-gray-500 border-b border-[#252a45]">
                  Tags
                </h1>

                <div className="pt-4">
                  <RadioGroup
                    defaultValue="all"
                    onValueChange={(value) => handleFilterChange("tag", value)}
                    className="grid grid-cols-2 gap-1 pt-2"
                  >
                    {tags.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#1e2340] cursor-pointer transition-colors"
                      >
                        <RadioGroupItem value={item} id={`tag-${item}`} />
                        <Label className="text-sm text-gray-300 hover:text-white cursor-pointer" htmlFor={`tag-${item}`}>
                          {item}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>

            </ScrollArea>

          </CardContent>

        </Card>

      </section>

      {/* PROJECT LIST SECTION */}
      <section className="projectListSection w-full lg:w-[48rem]">

        {/* Search */}
        <div className="flex gap-2 items-center pb-5 justify-between">
          <div className="relative p-0 w-full">
            <Input
              placeholder="Search Project..."
           
              className="px-9 bg-[#131525]/80 border border-[#252a45] text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-indigo-500 transition-colors"
              onChange={handleSearchChange}
            />
            <MagnifyingGlassIcon className="absolute top-3 left-3 text-gray-500" />
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-gray-600 mb-3 pl-1">
          Showing <span className="text-indigo-400">{filteredProjects.length}</span> of {projects.length} projects
        </p>

        {/* Cards */}
        <div className="space-y-4 min-h-[74vh]">
          {filteredProjects.length > 0
            ? filteredProjects.map((project, i) => <ProjectCard key={i} project={project} />)
            : (
              <div className="flex flex-col items-center justify-center h-40 text-gray-600">
                <p className="text-sm">No projects found</p>
              </div>
            )
          }
        </div>

      </section>

    </div>
  );
};

export default Project;