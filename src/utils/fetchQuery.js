const fetchQuery = async (query) => {
  const URL = "http://localhost:4001/api/v1/gql";
  const headerToken = localStorage.getItem("headerToken");
  let state = {
    data: null,
    loading: true,
    error: false
  };

  try {
    const response = await (await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": headerToken ? (
          "Bearer " + headerToken
        ) : null
      },
      body: JSON.stringify({
        query
      })
    })).json();

    if (response.errors) {
      state = {
        ...state,
        data: {},
        loading: false,
        error: true
      };
    } else {
      state = {
        ...state,
        data: response.data,
        loading: false,
        error: false
      };
    }
  } catch (error) {
    console.error("[error-api]:", error);
    state = {
      ...state,
      data: null,
      loading: false,
      error: true
    };
  }

  return state;
};

export {
  fetchQuery
};
