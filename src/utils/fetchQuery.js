const fetchQuery = async (query, headers) => {
  const URL = "https://transformartbackend-production.up.railway.app/api/v1/gql";
  const headerToken = localStorage.getItem("headerToken");
  const headersFinal = headers || {};
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
        ) : null,
        ...headersFinal
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
