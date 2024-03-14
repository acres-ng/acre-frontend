import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { Button } from "@/components/common/ui/button"
import { Label } from "@/components/common/ui/label"
import { PiShieldPlusBold } from "react-icons/pi";
import { FaTimes } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card"

interface Ingredient {
  name: string;
  quantity: string;
}

const RecipeBuilderForm: React.FC = () => {
    const [ingredientName, setIngredientName] = useState<string>("");
    const [quantityType, setQuantityType] = useState<string>("kg");
    const [quantityValue, setQuantityValue] = useState<string>("");
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [quantityError, setQuantityError] = useState<string>("");
  
    const isNumeric = (value: string) => {
      return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
    };
  
    const handleAddIngredient = () => {
      if (ingredientName.trim() !== "" && quantityValue.trim() !== "") {
        if (!isNumeric(quantityValue)) {
          setQuantityError("Please enter a valid quantity");
          return;
        }
        const quantity = `${quantityValue} ${quantityType}`;
        setIngredients([...ingredients, { name: ingredientName, quantity }]);
        setIngredientName("");
        setQuantityValue("");
        setQuantityError("");
      }
    };
  
    const handleDeleteIngredient = (index: number) => {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    };
  
    return (
      <div className="max-w-2xl h-full p-4 bg-white rounded-lg shadow-lg">
        <CardHeader>
        <CardTitle className="flex">
        <span className="mr-2 bg-[#CCE6DA]  border-b rounded-full p-2">
        <PiShieldPlusBold   className="text-green-500" />
        </span>
        <span className="mt-2"> Preparation</span>
       
      </CardTitle>
        </CardHeader>
  
        {/* Rest of your form */}


        <div className="mb-4">
      <Label htmlFor="name">Ingredient Name</Label>
       <input
          type="text"
          placeholder="Ingredient Name"
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleAddIngredient();
          }}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none"
        />
      </div>
      <Label htmlFor="name">Quantity</Label>
      <div className="flex  mb-4">
      
        
        <input
          type="text"
          placeholder="Quantity"
          value={quantityValue}
          onChange={(e) => {
            setQuantityValue(e.target.value);
            setQuantityError("");
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleAddIngredient();
          }}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none"
        />
        <select
          value={quantityType}
          onChange={(e) => setQuantityType(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none"
        >
          <option value="kg">kg</option>
          <option value="mg">mg</option>
        </select>
      </div>

      {quantityError && <p className="text-red-500 mb-4">{quantityError}</p>}


      <CardFooter className="flex justify-center">
      <Button onClick={handleAddIngredient} className="bg-white border-green-400 border text-[#1B9C5C] w-[20rem] gap-2">
        <span className="">
        <FaPlus />
        </span>
       
        Add Ingredient
        </Button>
    
    </CardFooter>

      {/* <button
     
        className="w-full mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        Add Ingredient
      </button> */}
  
        {/* List of Ingredients */}


        <div className="mt-[10rem]  ">

        {ingredients.length === 0 ? "No added ingredients yet" : "Added ingredients"}
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <span>{ingredient.name}</span>
            <div className="flex gap-3">
              <span>{ingredient.quantity}</span>
              <FaTimes
                className="text-grey-500 cursor-pointer"
                onClick={() => handleDeleteIngredient(index)}
              />
            </div>
          </div>
        ))}

        </div>


      
      </div>
    );
  };
  

export default RecipeBuilderForm;
