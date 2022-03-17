const fetchQuery = async (query) => {
  const URL = "http://localhost:4001/api/v1/gql";
  let state = {
    data: null,
    loading: true,
    error: false
  };

  try {
    const response = await (await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query
      })
    })).json();

    state = {
      ...state,
      data: response.data,
      loading: false,
      error: null
    };
  } catch (error) {
    console.error("[error-api]:", error);
    state = {
      ...state,
      data: null,
      loading: false,
      error: null
    };
  }

  return state;
};

export {
  fetchQuery
};
