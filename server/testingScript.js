const XLSX = require("xlsx");
const axios = require("axios");

// Path to your XLSX file
const filePath = "./bazaNamirnica.xlsx"; // Update with your file path
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0]; // Access first sheet
const worksheet = workbook.Sheets[sheetName];

// Convert the sheet to JSON
const data = XLSX.utils.sheet_to_json(worksheet, { range: 3 });

// console.log("Data from XLSX file:", data);

// Ensure your data is being read as an array of objects
if (Array.isArray(data)) {
  const strapiData = data.map((row) => ({
    Code: row["Šifra"], // Column 1
    Name: row["Naziv namirnica"], // Column 2
    Amount: row["Količina (g)"], // Column 3
    Water: row["Voda"], // Column 4
    Kcal: row["Energetska vrednost (kcal)"], // Column 5
    Protein_plant: row["biljne"], // Column 6
    Protein_animal: row["animalne"], // Column 7
    Protein_total: row["ukupno"], // Column 8
    Fat_saturated: row["zasićene masne kiseline"], // Column 9
    Fat_unsaturated: row["nezasićene masne kiseline"], // Column 10
    Fat_total: row["ukupno_1"], // Column 11
    Cholesterol: row["holesterol"], // Column 12
    Carbohydrates_mono: row["monodis."] || null, // Column 13
    Carbohydrates_poli: row["polisaharidi"], // Column 14
    Carbohydrates_total: row["ukupno_2"], // Column 15
    Ashes: row["pepeo"] || null, // Column 16 (missing in first row, adding null fallback)
    Cellulose: row["celuloza"] || null, // Column 17 (missing in first row, adding null fallback)
    Mineral_Na: row["Na"], // Column 18
    Mineral_K: row["K"], // Column 19
    Mineral_Ca: row["Ca"], // Column 20
    Mineral_Mg: row["Mg"], // Column 21
    Mineral_P: row["P"], // Column 22
    Mineral_Fe: row["Fe"], // Column 23
    Mineral_Zn: row["Zn"], // Column 24
    Mineral_Cu: row["Cu"], // Column 25
    Vitamin_RE: row["RE (mikrograma)"], // Column 26
    Vitamin_B1: row["B1"], // Column 27
    Vitamin_B2: row["B2"], // Column 28
    Vitamin_B6: row["B6"], // Column 29
    Vitamin_PP: row["PP"], // Column 30
    Vitamin_C: row["C"], // Column 31
    Vitamin_E: row["E"] || null, // Column 32 (only available in the second row, adding null fallback)
  }));

  //   console.log("Data for Strapi:", strapiData);

  // Make POST request to Strapi API to add the data
  const API_URL = "http://localhost:1337/api/ingredients"; // Replace with your Strapi API URL

  //   Using Promise.all to handle multiple asynchronous POST requests
  Promise.all(
    strapiData.map(async (ingredient) => {
      try {
        const response = await axios.post(
          API_URL,
          {
            data: ingredient,
          },
          {
            headers: {
              Authorization: `Bearer ${"759c3cb602b5e27c4fd1bc582ddc1da5cc9939758b61b1201ffa77458d37006669ad0f0708d92543bca67c507ae1b47d06956d8edbbdb636594545562a1a50aafc8da4b9772760a43a4b6a00cad4d24186c9353c4e64ffb9ea2cdf66b7158a4b0b5d73ef753ed0be58ba94fd6d93c48e22dd7d31c1decfef69be96424139b79a"}`,
            },
          }
        );
        console.log("Ingredient successfully added:", response.data);
      } catch (error) {
        console.error(
          "Error adding ingredient:",
          error.response ? error : error
        );
      }
    })
  )
    .then(() => {
      console.log("All ingredients processed.");
    })
    .catch((err) => {
      console.error("Error processing ingredients:", err);
    });
}
// try {
//   axios.post(
//     "http://localhost:1337/api/ingredients",
//     {
//       data: {
//         Code: "brašno kukuruzno",
//         Name: "brašno kukuruzno",
//         Amount: 100,
//         Water: 13,
//         Kcal: 358.4,
//         Protein_plant: 8.3,
//         Protein_animal: 0,
//         Protein_total: 8.3,
//         Fat_saturated: 0.5,
//         Fat_unsaturated: 2,
//         Fat_total: 2.8,
//         // Cholesterol: 0,
//         // Carbohydrates_total: 75,
//         // Ashes: 0.8,
//         // Cellulose: 0.8,
//         // Mineral_na: 1.5,
//         // Mineral_k: 235,
//         // Mineral_ca: 6,
//         Mineral_mg: 97.5,
//         Mineral_p: 171,
//         Mineral_fe: 2,
//         Mineral_zn: 2.4,
//         Mineral_cu: 65.7,
//         Vitamin_re: 0.193,
//         Vitamin_b1: 0.07,
//         Vitamin_b2: 0.33,
//         Vitamin_b6: 1.65,
//         Vitamin_pp: 0,
//         Vitamin_c: 0.3,
//       },
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${"759c3cb602b5e27c4fd1bc582ddc1da5cc9939758b61b1201ffa77458d37006669ad0f0708d92543bca67c507ae1b47d06956d8edbbdb636594545562a1a50aafc8da4b9772760a43a4b6a00cad4d24186c9353c4e64ffb9ea2cdf66b7158a4b0b5d73ef753ed0be58ba94fd6d93c48e22dd7d31c1decfef69be96424139b79a"}`,
//       },
//     }
//   );
// } catch (error) {
//   console.error("Error adding ingredient:", error.response);
// }
