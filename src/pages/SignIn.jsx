import { RiUserLine } from "@remixicon/react";
import { GoogleIcon } from "../components/shared/GoogleIcon";
import { Button } from "../components/ui/button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../components/ui/loading-spinner";

export const SignIn = () => {
  const { signIn, signInAsGuest, currentUser, loading } =
    useContext(AuthContext);

  /**
   * Handle Sign In With Google
   */
  const handleGoogleSignIn = () => {
    signIn();
  };

  /**
   * Handle Sign In as Guest
   */
  const handleGuestSignIn = () => {
    signInAsGuest();
  };

  /**
   * Redirect user to home page if already signed in
   */
  if (currentUser) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur">
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl flex justify-center items-center h-[90dvh]">
      <div className="flex flex-col justify-center items-center gap-6 w-full -translate-y-1/4">
        <h1 className="text-2xl md:text-4xl font-bold">Welcome to Blogify</h1>
        <div className="flex flex-col items-stretch gap-2 w-full max-w-md p-6 border border-border rounded-lg">
          <Button
            size="lg"
            variant="default"
            className="md:text-base flex gap-[10px] h-11"
            onClick={handleGoogleSignIn}
          >
            <GoogleIcon />
            Sign in with Google
          </Button>
          <span className="text-center text-muted-foreground">OR</span>
          <Button
            size="lg"
            variant="outline"
            className="md:text-base flex gap-[10px] h-11"
            onClick={handleGuestSignIn}
          >
            <RiUserLine size={20} />
            Continue as Guest
          </Button>
        </div>
      </div>
    </div>
  );
};
