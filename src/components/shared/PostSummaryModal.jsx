/* eslint-disable react/prop-types */
import { RiInformationLine } from "@remixicon/react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

export const PostSummaryModal = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="md:hidden text-sm">
          <RiInformationLine className="mr-2" size={16} />
          Post Summary
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-start">Post Summary</DialogTitle>
          <DialogDescription className="text-start">
            Check the summary of your post before publishing
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
