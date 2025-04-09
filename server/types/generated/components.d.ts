import type { Schema, Struct } from '@strapi/strapi';

export interface IngredientsRecipeIngredient extends Struct.ComponentSchema {
  collectionName: 'components_ingredients_recipe_ingredients';
  info: {
    displayName: 'Recipe_ingredient';
  };
  attributes: {
    Amount: Schema.Attribute.Float;
    ingredient: Schema.Attribute.Relation<
      'oneToOne',
      'api::ingredient.ingredient'
    >;
  };
}

export interface RecipesMenuRecipe extends Struct.ComponentSchema {
  collectionName: 'components_recipes_menu_recipes';
  info: {
    description: '';
    displayName: 'Menu_recipe';
  };
  attributes: {
    Recipe: Schema.Attribute.Relation<
      'oneToOne',
      'api::medical-food-recipe.medical-food-recipe'
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'ingredients.recipe-ingredient': IngredientsRecipeIngredient;
      'recipes.menu-recipe': RecipesMenuRecipe;
    }
  }
}
