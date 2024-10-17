/* eslint-disable react/prop-types */
"use client";

import { useEffect, useState } from "react";
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
import { useTags } from "../../context/TagsProviderContext";

export function TagSelector({ onSelect, selectedValues = [], error }) {
  const { tags: initialTags } = useTags();
  const [open, setOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState(selectedValues || []);
  const [tags, setTags] = useState(initialTags || []);
  const [newTag, setNewTag] = useState("");
  const [searching, setSearching] = useState(false);

  /**
   * Handle Value Selection
   */
  const handleSelect = (value) => {
    // SET SELECTED VALUES
    const selectedTag = tags.find((tag) => tag.value === value);
    setSelectedTags((prev) => {
      if (prev.includes(selectedTag)) {
        return prev.filter((tag) => tag !== selectedTag);
      } else {
        return [...prev, selectedTag];
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
    const newTagObj = {
      value: newTag.toLowerCase().replace(/\s+/g, "-"),
      label: newTag,
    };

    setTags((prev) => [...prev, newTagObj]);

    setSelectedTags((prev) => [...prev, newTagObj]);

    setNewTag("");
    setSearching(false);
    setOpen(false);
  };
  /**
   * Remove Tag
   */
  const removeTag = (e, tag) => {
    // stop the event from propagating
    e.stopPropagation();
    setSelectedTags((current) => {
      return current.filter((cur) => cur !== tag);
    });
  };
  /**
   * useEffect to update values on change of selectedTags
   */
  useEffect(() => {
    setTags(initialTags);
    onSelect({ target: { name: "tags", value: selectedTags } });
  }, [selectedTags, initialTags]);

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
                    {tag.label}
                    <button
                      aria-label="close"
                      type="button"
                      onClick={(e) => removeTag(e, tag)}
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
                .filter((tag) => !selectedTags.includes(tag))
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
