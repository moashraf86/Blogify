import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";

// if there are new tags, add them to the database
export const syncNewTags = async (tags, currentTags) => {
  // Filter new tags from selected tags
  const newTags = tags.filter(
    (tag) =>
      !currentTags.some((currentTag) => currentTag.value === tag.toLowerCase())
  );
  const tagsRef = collection(db, "tags");
  // add new tags to the database if there are new tags
  if (newTags.length) {
    newTags.forEach(async (tag) => {
      await addDoc(tagsRef, {
        value: tag.toLowerCase().replace(/\s+/g, "-"),
        label: tag,
      });
    });
  }
};
