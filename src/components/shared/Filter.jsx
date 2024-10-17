/* eslint-disable react/prop-types */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { useTags } from "../../context/TagsProviderContext";
export const Filter = ({ handleFilter }) => {
  const { tags } = useTags();

  return (
    <Select onValueChange={(value) => handleFilter(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.value} value={tag.value}>
              {tag.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
