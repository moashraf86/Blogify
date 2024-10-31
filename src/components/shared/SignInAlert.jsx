/* eslint-disable react/prop-types */
import { RiCloseLine, RiInformationLine } from "@remixicon/react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { GoogleIcon } from "./GoogleIcon";

export const SignInAlert = ({ signIn }) => {
  /**
   * Hide the alert message
   */
  const hideAlert = (e) => {
    e.target.closest(".container").style.display = "none";
  };

  return (
    <div className="container pt-6 px-6 max-w-5xl">
      <Alert
        variant="info"
        className="flex flex-col gap-4 sm:flex-row justify-between sm:items-center p-4 sm:py-6 sm:px-8"
      >
        <div className="flex gap-3">
          <RiInformationLine className="text-lg min-w-6" />
          <div className="flex flex-col">
            <AlertTitle>Action Required</AlertTitle>
            <AlertDescription>
              Sign in with Google to publish your posts.
            </AlertDescription>
          </div>
        </div>
        <Button
          size="lg"
          variant="default"
          className="md:text-base flex gap-[10px] h-11"
          onClick={signIn}
        >
          <GoogleIcon />
          Sign in with Google
        </Button>
        <button className="absolute top-3 right-3" onClick={hideAlert}>
          <RiCloseLine />
        </button>
      </Alert>
    </div>
  );
};
