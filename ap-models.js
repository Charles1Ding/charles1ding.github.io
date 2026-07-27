/* ============================================================
   AP CONTENT SOURCE  —  fill this file, then it just works.
   ------------------------------------------------------------
   HOW TO FILL:
   • For each model, set the AP English `title` and one-line `desc`.
   • Leave a value as "" (empty) to auto fall back to the AL/IG copy.
   • You can fill just a few now and the rest later — safe anytime.
   • Detail-page (h1 + intro line) also reads title/desc from here.
   ============================================================ */

/* ---- AP topic / unit mapping (already pre-filled; tweak freely) ---- */
window.AP_TOPICS = {
  // Card & button labels shown in AP mode (topic key -> AP unit label)
  labels: {
    electrochemistry: "Unit 8 · Electrochemistry",
    acids:            "Unit 7 · Acids & Bases",
    metals:           "Unit 4 · Chemical Reactions",
    thermochemistry:  "Unit 6 · Thermodynamics",
    organic:          "Unit 9 · Organic Chemistry",
    equilibrium:      "Unit 6 · Equilibrium",
    kinetics:         "Unit 5 · Kinetics",
    other:            "AP Chemistry"
  },
  // Filter-button labels in AP mode (filter key -> AP label)
  filters: {
    all:             "All",
    en:              "English",
    cn:              "\u4e2d\u6587",
    electrochemistry:"Unit 8 Electrochem",
    acids:           "Unit 7 Acids/Bases",
    metals:          "Unit 4 Reactions",
    thermochemistry: "Unit 6 Thermo",
    organic:         "Unit 9 Organic",
    other:           "Other"
  },
  // "What to observe" hint in AP mode (topic key -> hint). "" = fall back.
  tips: {
    kinetics:        "",
    electrochemistry:"",
    metals:          "",
    acids:           "",
    thermochemistry: "",
    organic:         "",
    equilibrium:     "",
    other:           ""
  }
};

/* ---- Per-model AP copy (title + desc). Fill the strings. ----
   Key = exact model file name. Comment = current AL/IG title.     */
window.AP_MODELS = {
  "Collision.html":                       { title: "", desc: "" }, // Collision Theory
  "Copper plating.html":                  { title: "", desc: "" }, // Copper Electroplating
  "Extraction of Al .html":               { title: "", desc: "" }, // Extraction of Aluminium
  "Extraction of al.html":                { title: "", desc: "" }, // Extraction of Al (v2)
  "Haber process \u516c\u5f00\u8bfe\u6a21\u578b.html": { title: "", desc: "" }, // Haber Process (Open Lesson)
  "Halogen displacement.html":            { title: "", desc: "" }, // Halogen Displacement
  "Hydrogen fuel cell.html":              { title: "", desc: "" }, // Hydrogen Fuel Cell
  "Mass spectrum.html":                   { title: "", desc: "" }, // Mass Spectrum
  "mass_spec_model.html":                 { title: "", desc: "" }, // Mass Spectrometer
  "PH\u4e0e\u98df\u6b32.html":            { title: "", desc: "" }, // pH & Appetite
  "Titration 2 .html":                    { title: "", desc: "" }, // Titration
  "\u94f5\u76d0\u4e0e\u78b1.html":        { title: "", desc: "" }, // Ammonium Salt + Base
  "\u6c89\u6dc0\u7684\u4ea7\u751f.html":  { title: "", desc: "" }, // Precipitation
  "\u6c89\u6dc0\u76d0\u7684\u4ea7\u751f.html": { title: "", desc: "" }, // Precipitate Salt
  "\u89e6\u7535\u6a21\u62df.html":        { title: "", desc: "" }, // Electric Shock Sim
  "\u6ef4\u5b9a.html":                    { title: "", desc: "" }, // Titration (CN)
  "\u7535\u6c60\u95ed\u5408\u56de\u8def\u7684\u4ea7\u751f.html": { title: "", desc: "" }, // Closed Circuit Cell
  "\u7535\u9540\u7535\u6781\u6750\u6599.html": { title: "", desc: "" }, // Electroplating Electrodes
  "\u7535\u9540\u91d1\u6a21\u578b.html":  { title: "", desc: "" }, // Gold Electroplating
  "\u7535\u89e3\u4e0d\u540c\u6eb6\u6db2.html": { title: "", desc: "" }, // Electrolysis of Solutions
  "\u7535\u89e3\u6c60\u7684\u5fae\u89c2\u6784\u6210.html": { title: "", desc: "" }, // Electrolytic Cell Microstructure
  "\u7535\u89e3\u6c2f\u5316\u94dc.html":  { title: "", desc: "" }, // Electrolysis of CuCl2
  "\u7535\u89e3\u6c34.html":              { title: "", desc: "" }, // Electrolysis of Water
  "\u9540\u94dc.html":                    { title: "", desc: "" }, // Copper Plating (CN)
  "\u53cd\u5e94\u5e73\u8861.html":        { title: "", desc: "" }, // Reaction Equilibrium
  "\u9ad8\u7089\u70bc\u94c1.html":        { title: "", desc: "" }, // Blast Furnace
  "\u516c\u5f00\u8bfe\u6a21\u578b.html":  { title: "", desc: "" }, // Open Lesson Model
  "\u5408\u91d1\u7684\u5ef6\u5c55\u6027.html": { title: "", desc: "" }, // Alloy Malleability
  "\u78b1\u6027\u7684\u4e2d\u548c.html":  { title: "", desc: "" }, // Neutralisation
  "\u91d1\u5c5edisplacement reaction.html": { title: "", desc: "" }, // Metal Displacement
  "\u91d1\u5c5e\u4e0e\u9178.html":        { title: "", desc: "" }, // Metal + Acid
  "\u96be\u6eb6\u76d0\u7684\u5236\u5907.html": { title: "", desc: "" }, // Insoluble Salt Prep
  "\u5f3a\u9178\u7684\u8150\u8680\u6027.html": { title: "", desc: "" }, // Strong Acid Corrosion
  "\u5f3a\u9178\u5f31\u9178\u5b9e\u9a8c.html": { title: "", desc: "" }, // Strong/Weak Acid Experiment
  "\u5f3a\u9178\u4e0e\u5f31\u9178\u7684\u6c34\u89e3.html": { title: "", desc: "" }, // Strong/Weak Acid Hydrolysis
  "\u9178\u4e0e\u91d1\u5c5e.html":        { title: "", desc: "" }, // Acid + Metal
  "\u78b3\u9178\u6839.html":              { title: "", desc: "" }, // Carbonate Ion
  "\u76d0\u7684\u5236\u59071.html":       { title: "", desc: "" }, // Salt Preparation 1
  "\u5236\u5907\u53ef\u6eb6\u6027\u76d0.html": { title: "", desc: "" }, // Soluble Salt Prep
  "\u6cbb\u7597sting.html":               { title: "", desc: "" }, // Treating a Sting
  "delta H c.html":                       { title: "", desc: "" }, // Enthalpy of Combustion
  "Endo and exo .html":                   { title: "", desc: "" }, // Endo & Exothermic
  "\u516c\u5f00\u8bfesimple calorimeter.html": { title: "", desc: "" }, // Simple Calorimeter
  "\u6539\u8fdb\u91cf\u70ed\u8ba1.html":  { title: "", desc: "" }, // Improved Calorimeter
  "fractional distillation.html":         { title: "", desc: "" }, // Fractional Distillation
  "Ethane cracking.html":                 { title: "", desc: "" }, // Ethane Cracking
  "Substitution reaction.html":           { title: "", desc: "" }, // Substitution Reaction
  "Addtion reaction of ethene.html":      { title: "", desc: "" }, // Addition of Ethene
  "Cracking.html":                        { title: "", desc: "" }, // Cracking
  "Addtion reaction of ethene (16.4).html": { title: "", desc: "" }, // Addition of Ethene (16.4)
  "Fermentation.html":                    { title: "", desc: "" }, // Fermentation
  "oxidation of alcohol.html":            { title: "", desc: "" }, // Oxidation of Alcohol
  "alcohol change .html":                 { title: "", desc: "" }, // Alcohol Reactions
  "Polyamide.html":                       { title: "", desc: "" }, // Polyamide
  "Polyester.html":                       { title: "", desc: "" }, // Polyester
  "Protein.html":                         { title: "", desc: "" }, // Protein
  "esterification.html":                  { title: "", desc: "" }, // Esterification
  "Identify amino acid.html":             { title: "", desc: "" }, // Identify Amino Acid
  "identify substance.html":              { title: "", desc: "" }, // Identify Substance
  "\u6a59\u6c41\u5206\u6790.html":        { title: "", desc: "" }, // Orange Juice Analysis
  "\u9178\u6027\u8150\u8680.html":        { title: "", desc: "" }, // Acidic Corrosion
  "PHvalue.html":                         { title: "", desc: "" }, // pH Value Scale
  "\u5f3a\u9178\u4e0e\u5f31\u9178\u7684\u89e3\u79bb.html": { title: "", desc: "" }  // Strong/Weak Acid Dissociation
};
