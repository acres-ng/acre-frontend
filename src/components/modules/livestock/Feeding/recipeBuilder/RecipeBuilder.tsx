import RecipeBuilderForm from "./RecipeBuilderForm";
import RecipeBuilderPreparation from "./RecipeBuilderPreparation";
import RecipeBuilderDetailForm from "./RecipeBuilderDetailForm";

const RecipeBuilder = () => {
  return (
    <div className="flex flex-col md:flex-row ">
      {/* Left Column */}
      <div className="md:w-2/5 p-4">
        <RecipeBuilderDetailForm />

        <RecipeBuilderPreparation />
      </div>

      {/* Right Column */}
      <div className="md:w-3/5 p-4">
        <RecipeBuilderForm />
      </div>
    </div>
  );
};

export default RecipeBuilder;
