import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { GoogleIcon } from "../shared/GoogleIcon";

export const SignInModal = ({ onCancel, handleGoogleSignIn, showModal }) => {
  return (
    <AlertDialog open={showModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Want to bookmark this post?</AlertDialogTitle>
          <AlertDialogDescription>
            Sign in with Google to save it to your account and access it
            anytime!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onCancel()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="md:text-base flex gap-[10px]"
            onClick={() => handleGoogleSignIn()}
          >
            <GoogleIcon />
            Sign in with Google
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
