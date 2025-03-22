export type MenuOption = {
    icon: React.ReactNode
    title: string
    path: string
}

export type Ingredient = {
    name: string;
    code: string;
    amount?: number;
    kcal?: number;
    protein_plant?: number;
    protein_animal?: number;
    protein_total?: number;
    fat_saturated?: number;
    fat_unsaturated?: number;
    fat_total?: number;
    cholesterol?: number;
    carbohydrates_mono?: number;
    carbohydrates_poli?: number;
    carbohydrates_total?: number;
    ashes?: number;
    cellulose?: number;
    mineral_Na?: number;
    mineral_K?: number;
    mineral_Ca?: number;
    mineral_Mg?: number;
    mineral_P?: number;
    mineral_Fe?: number;
    mineral_Zn?: number;
    mineral_Cu?: number;
    vitamin_RE?: number;
    vitamin_B1?: number;
    vitamin_B2?: number;
    vitamin_B6?: number;
    vitamin_PP?: number;
    vitamin_C?: number;
    vitamin_E?: number;
    glycemic_index?: number;
    glycemic_load?: number;
    atherogenic_index?: number;
  };
  