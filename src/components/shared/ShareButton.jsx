/* eslint-disable react/prop-types */
import { RiCheckLine, RiShareForwardLine } from "@remixicon/react";
import { Button } from "../ui/button";
import { useState } from "react";

export const ShareButton = ({ post }) => {
  const [urlCopied, setUrlCopied] = useState(false);
  const isClipboardSupported = !!navigator.clipboard;
  return (
    <>
      {urlCopied ? (
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer text-primary h-11 w-11"
          label="URL Copied!"
          aria-label="URL Copied!"
        >
          <RiCheckLine size={24} />
        </Button>
      ) : (
        <Button
          label="Share this post"
          ari-label="Share this post"
          variant="ghost"
          size="icon"
          className="cursor-pointer text-primary h-11 w-11"
          aria-label="Share this post"
          onClick={() => {
            if (navigator.share) {
              navigator
                .share({
                  title: post.title,
                  text: post.title,
                  url: window.location.href,
                })
                .catch((error) => console.error("Error sharing:", error));
            } else if (isClipboardSupported) {
              // copy the post URL to the clipboard if the share API is not supported
              navigator.clipboard.writeText(window.location.href).then(() => {
                setUrlCopied(true);
                setTimeout(() => {
                  setUrlCopied(false);
                }, 3000);
              });
            } else {
              alert("Copy the URL from the address bar.");
            }
          }}
        >
          <RiShareForwardLine size={24} />
        </Button>
      )}
    </>
  );
};
