export type AnalysisType = "auto" | "soil" | "seed" | "crop";

export interface AnalysisCard {
  title: string;
  value: string;
  details?: string;
  severity?: "info" | "success" | "warning" | "danger";
}

export interface AnalysisResult {
  category: AnalysisType;
  cards: AnalysisCard[];
  summary: string;
}

function seededRandom(seed: number) {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export async function mockAnalyzeImage(
  file: File,
  type: AnalysisType,
): Promise<AnalysisResult> {
  const arrayBuf = await file.arrayBuffer();
  const seed = new Uint8Array(arrayBuf).reduce((a, b) => (a + b) % 100000, 0);
  const rnd = seededRandom(seed || 42);

  const pick = <T,>(arr: T[]) => arr[Math.floor(rnd() * arr.length)];

  if (type === "soil" || (type === "auto" && rnd() > 0.66)) {
    const soil = pick(["Loamy", "Clay", "Sandy", "Black", "Red", "Alluvial"]);
    const crops = pick([
      "Wheat, Barley",
      "Rice, Sugarcane",
      "Groundnut, Cotton",
      "Cotton, Soybean",
      "Millets, Pulses",
      "Paddy, Jute",
    ]);
    const fert = pick([
      "NPK 10-26-26",
      "DAP + Urea",
      "Compost + Vermi",
      "Potash Rich Mix",
    ]);
    return {
      category: "soil",
      summary: `Soil appears ${soil}. Suitable for ${crops}. Use ${fert}.`,
      cards: [
        { title: "Soil Type", value: soil },
        { title: "Suitable Crops", value: crops },
        { title: "Fertilizer", value: fert, details: "Apply 50–70 kg/acre as per need." },
        { title: "Irrigation", value: pick(["Low", "Medium", "High"]) },
      ],
    };
  }

  if (type === "seed" || (type === "auto" && rnd() > 0.33)) {
    const seedType = pick(["Wheat", "Rice", "Maize", "Pulses", "Oilseeds"]);
    const grade = pick(["A+", "A", "B"]);
    return {
      category: "seed",
      summary: `${seedType} seeds detected. Quality grade ${grade}.`,
      cards: [
        { title: "Seed Type", value: seedType },
        { title: "Quality", value: grade, severity: grade === "B" ? "warning" : "success" },
        { title: "Sowing Advice", value: pick(["Line sowing 20cm", "Broadcasting", "Raised bed"]) },
      ],
    };
  }

  const disease = pick([
    "Rust Fungus",
    "Leaf Blight",
    "Bacterial Spot",
    "Powdery Mildew",
    "Healthy",
  ]);
  const solution =
    disease === "Healthy"
      ? "Maintain regular irrigation and add micronutrients."
      : pick([
          "Spray fungicide Mancozeb",
          "Use organic Neem oil",
          "Copper oxychloride spray",
        ]);

  return {
    category: "crop",
    summary: disease === "Healthy" ? "Crop looks healthy." : `Detected ${disease}. ${solution}.`,
    cards: [
      { title: "Diagnosis", value: disease, severity: disease === "Healthy" ? "success" : "danger" },
      { title: "Confidence", value: `${Math.round(rnd() * 20 + 80)}%` },
      { title: "Solution", value: solution },
      { title: "Irrigation", value: pick(["Reduce watering", "Maintain", "Increase watering"]) },
      { title: "Nutrient", value: pick(["Add Nitrogen", "Add Potash", "Micronutrient foliar spray"]) },
    ],
  };
}
