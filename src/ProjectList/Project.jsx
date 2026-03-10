import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MixerHorizontalIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Project = () => {
  const [keyword, setkeyword] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTag, setActiveTag] = useState("all");

  const handleFilterChange = (type, value) => {
    if (type === "category") setActiveCategory(value);
    if (type === "tag") setActiveTag(value);
  };

  const handleSearchChange = (e) => {
    setkeyword(e.target.value);
  };

  const tags = [
    "all",
    "react",
    "next.js",
    "SpringBoot",
    "mysql",
    "mongodb",
    "angular",
    "python",
    "Flask",
    "django",
  ];

  const projects = [
    {
      name: "Project Management System",
      description: "Full Stack project using React + SpringBoot",
      tech: ["React", "SpringBoot", "MySQL"],
      category: "FullStack",
      tags: ["react", "SpringBoot", "mysql"],
    },
    {
      name: "AI Chat Application",
      description: "Realtime chat app using MERN stack",
      tech: ["React", "Node", "MongoDB"],
      category: "FullStack",
      tags: ["react", "mongodb"],
    },
    {
      name: "Portfolio Website",
      description: "Developer portfolio using Next.js",
      tech: ["Next.js", "Tailwind"],
      category: "Frontend",
      tags: ["next.js"],
    },
    {
      name: "Task Manager",
      description: "Productivity app with dashboard",
      tech: ["React", "Express", "MongoDB"],
      category: "FullStack",
      tags: ["react", "mongodb"],
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesKeyword = project.name.toLowerCase().includes(keyword.toLowerCase());
    const matchesCategory = activeCategory === "all" || project.category === activeCategory;
    const matchesTag = activeTag === "all" || project.tags.includes(activeTag.toLowerCase());
    return matchesKeyword && matchesCategory && matchesTag;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#05060a] via-[#0b0f19] to-[#05060a] text-white px-5 py-8 flex justify-center gap-8">

      {/* FILTER SECTION */}
      <section className="w-full lg:w-[20rem]">

        <Card className="p-6 sticky top-10 bg-[#0f1117]/80 backdrop-blur border border-[#2a2d35] rounded-xl shadow-xl">

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-semibold">Filters</p>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-[#1e2130]"
            >
              <MixerHorizontalIcon />
            </Button>
          </div>

          <CardContent>

            <ScrollArea className="h-[70vh] pr-2 space-y-8">

              {/* CATEGORY */}
              <div>

                <h1 className="text-sm text-gray-400 border-b border-[#2a2d35] pb-2 uppercase">
                  Category
                </h1>

                <RadioGroup
                  defaultValue="all"
                  onValueChange={(value) =>
                    handleFilterChange("category", value)
                  }
                  className="space-y-3 pt-5"
                >

                  {["all", "FullStack", "Frontend", "Backend"].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 px-2 py-1 rounded hover:bg-[#1e2130]"
                    >
                      <RadioGroupItem value={item} id={item} />
                      <Label htmlFor={item} className="text-gray-200">
                        {item}
                      </Label>
                    </div>
                  ))}

                </RadioGroup>

              </div>

              {/* TAGS */}
              <div>

                <h1 className="text-sm text-gray-400 border-b border-[#2a2d35] pb-2 uppercase">
                  Tags
                </h1>

                <RadioGroup
                  defaultValue="all"
                  onValueChange={(value) =>
                    handleFilterChange("tag", value)
                  }
                  className="grid grid-cols-2 gap-3 pt-5"
                >

                  {tags.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 px-2 py-1 rounded hover:bg-[#1e2130]"
                    >
                      <RadioGroupItem value={item} id={`tag-${item}`} />

                      <Label htmlFor={`tag-${item}`} className="text-gray-200">
                        {item}
                      </Label>
                    </div>
                  ))}

                </RadioGroup>

              </div>

            </ScrollArea>

          </CardContent>

        </Card>

      </section>

      {/* PROJECT SECTION */}
      <section className="w-full lg:w-[700px]">

        {/* SEARCH */}
        <div className="flex justify-center pb-6">

          <div className="relative w-[60%]">

            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <Input
              placeholder="Search Project..."
              onChange={handleSearchChange}
              className="pl-10 bg-[#0f1117] border border-[#2a2d35] text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-[#3b82f6]"
            />

          </div>

        </div>

        {/* PROJECT LIST */}
        <div className="space-y-4">

          {filteredProjects.map((project, index) => (

            <Card
              key={index}
              className="bg-[#0f1117] border border-[#2a2d35] hover:border-[#3b82f6] transition duration-200 cursor-pointer"
            >

              <CardContent className="p-5">

                <h2 className="text-lg font-semibold">
                  {project.name}
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  {project.description}
                </p>

                <div className="flex gap-2 mt-3 flex-wrap">

                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded bg-[#1e2130] text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}

                </div>

              </CardContent>

            </Card>

          ))}

        </div>

      </section>

    </div>
  );
};

export default Project;