import RecipeForm from "./recipeBuilderForm";
import Preparation from "./recipeBuilderPreparation";
import RecipeDetailForm from "./recipeBuilderDetailForm";

const RecipeBuilder = () => {
  return (
    <div className="flex flex-col md:flex-row ">
      {/* Left Column */}
      <div className="md:w-2/5 p-4">
        <RecipeDetailForm />

        <Preparation />
      </div>

      {/* Right Column */}
      <div className="md:w-3/5 p-4">
        <RecipeForm />
      </div>
    </div>
  );
};

export default RecipeBuilder;