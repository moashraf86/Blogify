/* eslint-disable react/prop-types */
"use client";

import * as React from "react";
import { RiCheckLine, RiCloseLine, RiHashtag } from "@remixicon/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ComboboxDemo({ onSelect, selectedValues = [], error }) {
  const initialTags = [
    {
      value: "web",
      label: "Web",
    },
    {
      value: "react",
      label: "React",
    },
    {
      value: "javascript",
      label: "JavaScript",
    },
    {
      value: "html",
      label: "HTML",
    },
    {
      value: "css",
      label: "CSS",
    },
  ];
  const [open, setOpen] = React.useState(false);
  const [selectedTags, setSelectedTags] = React.useState(selectedValues || []);
  const [tags, setTags] = React.useState(initialTags || []);
  const [newTag, setNewTag] = React.useState("");
  const [searching, setSearching] = React.useState(false);

  /**
   * Handle Value Selection
   */
  const handleSelect = (value) => {
    // SET SELECTED VALUES
    setSelectedTags((prev) => {
      if (prev.includes(value)) {
        return prev.filter((val) => val !== value);
      } else {
        return [...prev, value];
      }
    });
    setOpen(false);
    onSelect({ target: { name: "tags", value: selectedTags } });
    setNewTag("");
    setSearching(false);
  };

  /**
   * Handle Input Change
   */
  const handleSearch = (value) => {
    setNewTag(value);
    setSearching(value.trim().length > 0);
  };

  /**
   * Add New Tag
   */
  const addNewTag = () => {
    setTags((prev) => [
      ...prev,
      {
        value: newTag,
        label: newTag,
      },
    ]);
    setSelectedTags((prev) => [...prev, newTag]);
    setNewTag("");
    setSearching(false);
    setOpen(false);
  };
  /**
   * Remove Tag
   */
  const removeTag = (tag) => {
    setSelectedTags((current) => {
      return current.filter((cur) => cur !== tag);
    });
  };
  /**
   * useEffect to update values on change of selectedTags
   */
  React.useEffect(() => {
    onSelect({ target: { name: "tags", value: selectedTags } });
  }, [selectedTags]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          className={`text-sm justify-start hover:bg-transparent ${
            error
              ? "border-danger text-danger hover:text-danger hover:bg-danger/10"
              : ""
          }`}
        >
          <RiHashtag size={16} className="mr-2 shrink-0 opacity-70" />
          {selectedTags.length > 0 ? (
            <ul className="flex gap-1">
              {selectedTags.map((tag, i) => {
                return (
                  <li
                    key={i}
                    className="flex items-center gap-1 bg-muted px-2 rounded-full text-sm text-muted-foreground"
                  >
                    {tag}
                    <button
                      aria-label="close"
                      type="button"
                      onClick={(e) => removeTag(tag)}
                    >
                      <RiCloseLine size={16} />
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            "Select Tag"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput
            onChange={handleSearch}
            placeholder="Search tag..."
            className="h-9"
          />
          <CommandList>
            {
              <CommandEmpty>
                {searching ? "No results found" : "No tags available"}
              </CommandEmpty>
            }
            <CommandGroup>
              {tags
                .filter((tag) => !selectedTags.includes(tag.value))
                .map((tag, i) => {
                  return (
                    <CommandItem
                      key={i}
                      value={tag.value}
                      onSelect={() => handleSelect(tag.value)}
                    >
                      {tag.label}
                      <RiCheckLine
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedTags.includes(tag.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
            </CommandGroup>
            <Button
              variant="ghost"
              className={`w-full rounded-none justify-start border-none hover:bg-muted ${
                !searching ? "hidden" : ""
              }`}
              onClick={addNewTag}
            >
              Create &quot;{newTag}&quot;
            </Button>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
