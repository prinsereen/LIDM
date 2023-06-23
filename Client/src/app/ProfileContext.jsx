import React, { createContext, useReducer } from "react";

// Define the initial state
const initialState = {
  profileName: "",
  profilePhoto: "",
};

// Create the context
export const ProfileContext = createContext();

// Define the reducer function
const profileReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROFILE_NAME":
      return {
        ...state,
        profileName: action.payload,
      };
    case "SET_PROFILE_PHOTO":
      return {
        ...state,
        profilePhoto: action.payload,
      };
    default:
      return state;
  }
};

// Create the provider component
// eslint-disable-next-line react/prop-types
export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  // Define the actions to update the profile name and photo
  const setProfileName = (name) => {
    dispatch({
      type: "SET_PROFILE_NAME",
      payload: name,
    });
  };

  const setProfilePhoto = (photo) => {
    dispatch({
      type: "SET_PROFILE_PHOTO",
      payload: photo,
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        profileName: state.profileName,
        profilePhoto: state.profilePhoto,
        setProfileName,
        setProfilePhoto,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
