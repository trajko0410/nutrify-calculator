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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'ingredients.recipe-ingredient': IngredientsRecipeIngredient;
    }
  }
}
