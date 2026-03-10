import React from "react";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Project = () => {

  const handleFilterChange = (type, value) => {
    console.log(type, value);
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
    "django"
  ];

  return (
    <>
      <div className="relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5">

        <section className="filtersection w-full lg:w-[20rem]">

          <Card className="p-6 sticky top-10 w-full bg-[#0f1117] border border-[#2a2d35] rounded-xl shadow-lg">

            {/* Header */}
            <div className="flex items-center justify-between w-full mb-4">
              <p className="text-lg font-semibold tracking-wide text-white">
                Filters
              </p>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-[#1e2130] hover:text-white"
              >
                <MixerHorizontalIcon />
              </Button>
            </div>

            <CardContent className="mt-3">

              <ScrollArea className="space-y-8 h-[70vh] pr-2">

                {/* Category */}
                <div>
                  <h1 className="pb-2 text-sm uppercase text-gray-400 border-b border-[#2a2d35]">
                    Category
                  </h1>

                  <div className="pt-5">

                    <RadioGroup
                      defaultValue="all"
                      onValueChange={(value) =>
                        handleFilterChange("category", value)
                      }
                      className="space-y-3"
                    >

                      <div className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-[#1e2130] cursor-pointer">
                        <RadioGroupItem value="all" id="r1" />
                        <Label
                          className="text-sm text-gray-200 hover:text-white"
                          htmlFor="r1"
                        >
                          All
                        </Label>
                      </div>

                      <div className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-[#1e2130] cursor-pointer">
                        <RadioGroupItem value="fullStack" id="r2" />
                        <Label
                          className="text-sm text-gray-200 hover:text-white"
                          htmlFor="r2"
                        >
                          FullStack
                        </Label>
                      </div>

                      <div className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-[#1e2130] cursor-pointer">
                        <RadioGroupItem value="Frontend" id="r3" />
                        <Label
                          className="text-sm text-gray-200 hover:text-white"
                          htmlFor="r3"
                        >
                          Frontend
                        </Label>
                      </div>

                      <div className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-[#1e2130] cursor-pointer">
                        <RadioGroupItem value="Backend" id="r4" />
                        <Label
                          className="text-sm text-gray-200 hover:text-white"
                          htmlFor="r4"
                        >
                          Backend
                        </Label>
                      </div>

                    </RadioGroup>

                  </div>
                </div>

                {/* Tags */}
                <div>

                  <h1 className="pb-2 text-sm uppercase text-gray-400 border-b border-[#2a2d35]">
                    Tags
                  </h1>

                  <div className="pt-5">

                    <RadioGroup
                      defaultValue="all"
                      onValueChange={(value) =>
                        handleFilterChange("tag", value)
                      }
                      className="grid grid-cols-2 gap-3 pt-2"
                    >

                      {tags.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-[#1e2130] cursor-pointer"
                        >
                          <RadioGroupItem value={item} id={`tag-${item}`} />

                          <Label
                            className="text-sm text-gray-200 hover:text-white"
                            htmlFor={`tag-${item}`}
                          >
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

        

      </div>
    </>
  );
};

export default Project;