import { collection, getDocs, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useReducer } from "react";
import { db } from "../utils/firebase";

const initialState = {
  tags: [],
};

// Create the tags context
export const TagsContext = createContext();

// Create the reducer function to handle state updates
const tagsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_TAGS":
      return {
        ...state,
        tags: action.payload,
      };
    case "ADD_TAG":
      return {
        ...state,
        tags: [action.payload, ...state.tags],
      };
    default:
      return state;
  }
};

// Create the tags provider component
export const TagsProvider = ({ children }) => {
  // Use the useReducer hook to manage state
  const [state, dispatch] = useReducer(tagsReducer, initialState);

  // fetch tags from the database and set them to the state
  const fetchTags = async () => {
    try {
      const tagsQuery = query(collection(db, "tags"));
      const tagsSnapshot = await getDocs(tagsQuery);
      const tagsList = tagsSnapshot.docs.map((doc) => {
        return {
          value: doc.data().value,
          label: doc.data().label,
        };
      });
      // Dispatch the fetched tags to the reducer
      dispatch({ type: "FETCH_TAGS", payload: tagsList });
      console.log("tagsList", tagsList);
    } catch (error) {
      console.error("Error fetching tags: ", error.message);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <TagsContext.Provider
      value={{
        tags: state.tags,
        tagsDispatch: dispatch,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
};

// Define the custom hook to consume the tags context
export const useTags = () => {
  const context = useContext(TagsContext);
  if (!context) {
    throw new Error("useTags must be used within a TagsProvider");
  }
  return context;
};
