/* eslint-disable react/prop-types */
import {
  RiDeleteBinLine,
  RiEditBoxLine,
  RiFullscreenExitLine,
  RiFullscreenLine,
} from "@remixicon/react";
import { Button } from "../ui/button";

export const ImageActions = ({
  image,
  handleRemoveImage,
  handleToggleImageMode,
  setCoverModal,
}) => {
  return (
    <div className="items-center gap-2 absolute top-4 right-4 z-10 bg-[#262626]/25 rounded-full py-2 px-5 backdrop-blur-sm hidden group-hover:flex">
      {image.isInset ? (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="border-none size-8"
          title="Full Screen"
          onClick={handleToggleImageMode}
        >
          <RiFullscreenLine className="fill-white" />
        </Button>
      ) : (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          title="Full Screen Exit"
          className="border-none size-8"
          onClick={handleToggleImageMode}
        >
          <RiFullscreenExitLine className="fill-white" />
        </Button>
      )}
      <Button
        type="button"
        size="icon"
        variant="ghost"
        title="Edit image"
        className="border-none size-8 cursor-pointer"
        onClick={() => setCoverModal(true)}
      >
        <RiEditBoxLine className="fill-white" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        title="Delete Image"
        onClick={handleRemoveImage}
        className="border-none size-8"
      >
        <RiDeleteBinLine className="fill-white" />
      </Button>
    </div>
  );
};
