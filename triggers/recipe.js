const listRecipes = async (z, bundle) => {
  const params = {};
  if (bundle.inputData.style) {
    params.style = bundle.inputData.style;
  }

  const requestOptions = {
    url: "http://57b20fb546b57d1100a3c405.mockapi.io/api/recipes",
    params: params,
  };

  const response = await z.request(requestOptions);
  return response.data;
};

module.exports = {
  key: "recipe",
  noun: "Recipe",
  display: {
    label: "New Recipe",
    description: "Triggers when a new recipe is created.",
  },
  operation: {
    inputFields: [
      {
        key: "style",
        type: "string",
        helpText: "Which styles of cuisine this should trigger on.",
        required: false,
      },
    ],

    perform: listRecipes,
    sample: {
      id: 1,
      createdAt: 1472069465,
      name: "Best Spagetti Ever",
      authorId: 1,
      directions: "1. Boil Noodles\n2.Serve with sauce",
      style: "italian",
    },
    outputFields: [
      { key: "id", label: "ID" },
      { key: "createdAt", label: "Created At" },
      { key: "name", label: "Name" },
      { key: "directions", label: "Directions" },
      { key: "authorId", label: "Author ID" },
      { key: "style", label: "Style" },
    ],
  },
};