export const initialstate = {
  profile: 0,
};

export const reducer = (state, action) => {
  switch (action) {
    case "addProfile":
      return {
        ...state,
        profile: 1,
      };
    case "signout":
      return {
        ...state,
        profile: 0,
      };
  }
};
