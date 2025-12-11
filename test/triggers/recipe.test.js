const zapier = require("zapier-platform-core");
const App = require("../../index");

const appTester = zapier.createAppTester(App);

describe("triggers", () => {
  describe("new recipe trigger", () => {
    it("should load recipes", async () => {
      const bundle = {
        inputData: {
          style: "style 2",
        },
      };

      const results = await appTester(
        App.triggers.recipe.operation.perform,
        bundle,
      );

      expect(results.length).toBeGreaterThan(1);

      const firstRecipe = results[0];
      expect(firstRecipe.name).toEqual("name 2");
      expect(firstRecipe.directions).toEqual("directions 2");
    });

    it("should load recipes without filters", async () => {
      const bundle = {};

      const results = await appTester(
        App.triggers.recipe.operation.perform,
        bundle,
      );

      expect(results.length).toBeGreaterThan(1);

      const firstRecipe = results[0];
      expect(firstRecipe.name).toEqual("name 1");
      expect(firstRecipe.directions).toEqual("directions 1");
    });
  });
});