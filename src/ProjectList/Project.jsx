import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { fetchProject } from "@/Redux/Project/Action";

const tags = [
  "all", "react", "next.js", "springboot",
  "mysql", "mongodb", "angular", "python", "flask", "django",
];

const categories = ["all", "fullStack", "Frontend", "Backend"];

const getSavedFilter = (key, fallback) => {
  try { return localStorage.getItem(key) || fallback; }
  catch { return fallback; }
};

const Project = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((store) => store.project);

  const [keyword, setKeyword] = useState("");
  const [activeCategory, setActiveCategory] = useState(() => getSavedFilter("filter_category", "all"));
  const [activeTag, setActiveTag] = useState(() => getSavedFilter("filter_tag", "all"));

  useEffect(() => {

    if (!projects || projects.length === 0) {
      dispatch(fetchProject({ category: "", tag: "" }));
    }
  }, []); // runs once on mount

  useEffect(() => {
    localStorage.setItem("filter_category", activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    localStorage.setItem("filter_tag", activeTag);
  }, [activeTag]);

  // All filtering is client-side — no API call on filter change
  const filteredProjects = (projects || []).filter((p) => {
    const matchesKeyword = p.name?.toLowerCase().includes(keyword.toLowerCase());
    const matchesCategory =
      activeCategory === "all" ||
      p.category?.toLowerCase() === activeCategory.toLowerCase();
    const matchesTag =
      activeTag === "all" ||
      p.tags?.map((t) => t.toLowerCase()).includes(activeTag.toLowerCase());
    return matchesKeyword && matchesCategory && matchesTag;
  });

  const handleTagClick = (tag) => setActiveTag(tag);

  return (
    <div className='min-h-screen w-full bg-[#0e0f1f] relative px-5 lg:px-10 lg:flex gap-5 py-5'>

      {/* ===== FILTER SIDEBAR — always visible ===== */}
      <aside className="w-full lg:w-[20rem] shrink-0">
        <Card className="p-6 sticky top-10 rounded-xl shadow-lg bg-[#131525]/80 border border-[#252a45] backdrop-blur-sm">

          <div className="flex items-center justify-between w-full mb-4">
            <p className="text-lg font-semibold tracking-wide text-white">Filters</p>
            <div className="flex items-center gap-1">
              {(activeCategory !== "all" || activeTag !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-500 hover:text-white hover:bg-[#1e2340]"
                  onClick={() => { setActiveCategory("all"); setActiveTag("all"); }}
                >
                  Reset
                </Button>
              )}
              <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-[#1e2340] hover:text-white">
                <MixerHorizontalIcon />
              </Button>
            </div>
          </div>

          <CardContent className="mt-3 px-0">
            <ScrollArea className="h-[70vh] pr-2">
              <div className="space-y-6">

                {/* Category */}
                <div>
                  <h1 className="pb-2 text-xs uppercase tracking-widest text-gray-500 border-b border-[#252a45]">
                    Category
                  </h1>
                  <div className="pt-4">
                    <RadioGroup
                      value={activeCategory}
                      onValueChange={(value) => setActiveCategory(value)}
                      className="space-y-1"
                    >
                      {categories.map((item, i) => (
                        <div key={item} className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-[#1e2340] cursor-pointer transition-colors">
                          <RadioGroupItem value={item} id={`cat-${i}`} />
                          <Label className="text-sm text-gray-300 hover:text-white cursor-pointer" htmlFor={`cat-${i}`}>
                            {item === "all" ? "All" : item}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h1 className="pb-2 text-xs uppercase tracking-widest text-gray-500 border-b border-[#252a45]">
                    Tags
                  </h1>
                  <div className="pt-4">
                    <RadioGroup
                      value={activeTag}
                      onValueChange={(value) => setActiveTag(value)}
                      className="grid grid-cols-2 gap-1 pt-2"
                    >
                      {tags.map((item) => (
                        <div key={item} className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#1e2340] cursor-pointer transition-colors">
                          <RadioGroupItem value={item} id={`tag-${item}`} />
                          <Label className="text-sm text-gray-300 hover:text-white cursor-pointer" htmlFor={`tag-${item}`}>
                            {item}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>

              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </aside>

      {/* ===== PROJECT LIST ===== */}
      <section className="w-full min-w-0">

        {/* Search */}
        <div className="flex gap-2 items-center pb-5">
          <div className="relative w-full">
            <Input
              placeholder="Search Project..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="px-9 bg-[#131525]/80 border border-[#252a45] text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-indigo-500 transition-colors"
            />
            <MagnifyingGlassIcon className="absolute top-3 left-3 text-gray-500" />
          </div>
        </div>

        {/* Active filter badges */}
        {(activeTag !== "all" || activeCategory !== "all") && (
          <div className="flex items-center gap-2 mb-3 pl-1 flex-wrap">
            <span className="text-xs text-gray-500">Active filters:</span>
            {activeCategory !== "all" && (
              <span
                onClick={() => setActiveCategory("all")}
                className="text-xs px-3 py-1 rounded-full border border-blue-500 text-blue-400 bg-blue-500/10 cursor-pointer hover:bg-blue-500/20 transition-colors"
              >
                {activeCategory} ✕
              </span>
            )}
            {activeTag !== "all" && (
              <span
                onClick={() => setActiveTag("all")}
                className="text-xs px-3 py-1 rounded-full border border-indigo-500 text-indigo-400 bg-indigo-500/10 cursor-pointer hover:bg-indigo-500/20 transition-colors"
              >
                #{activeTag} ✕
              </span>
            )}
          </div>
        )}

        {/* Results count */}
        <p className="text-xs text-gray-600 mb-3 pl-1">
          Showing <span className="text-indigo-400">{filteredProjects.length}</span> of {projects?.length || 0} projects
        </p>

        {/* Cards */}
        <div className="space-y-4 min-h-[74vh]">
          {/*  Show cached projects instantly, loading only shown on first ever load */}
          {loading && projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-600">
              <p className="text-sm">Loading projects...</p>
            </div>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.id || i}
                project={project}
                activeTag={activeTag}
                onTagClick={handleTagClick}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-gray-600">
              <p className="text-sm">No projects found</p>
            </div>
          )}
        </div>

      </section>
    </div>
  );
};

export default Project;