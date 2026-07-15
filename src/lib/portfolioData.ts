export interface Project {
  id: string;
  title: string;
  category: "Industrial" | "Commercial";
  location: string;
  description: string;
  image: string;
  gallery: string[];
  specifications: {
    process: string;
    materials: string;
    industry: string;
    area: string;
  };
  highlights: string[];
}

export const portfolioProjects: Project[] = [
  {
    id: "jal-kal-vibhag",
    title: "Jal Kal Vibhag",
    category: "Industrial",
    location: "Varanasi, Uttar Pradesh",
    description: "A high-capacity pre-engineered structural facility designed for municipal water treatment and pumping infrastructure. Built to withstand local seismic activity and high load factors, the facility integrates a clear-span PEB structure that optimizes flow dynamics and heavy machinery movement.",
    image: "https://sumiraj.com/public/portfolio/Jalkal_3.jpg",
    gallery: [
      "https://sumiraj.com/public/portfolio/Jalkal_3.jpg",
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=1200&auto=format&fit=crop" // supporting clean industrial rendering
    ],
    specifications: {
      process: "Heavy Steel Fabrication & Automated MIG Welding",
      materials: "High-strength structural steel (IS 2062/ASTM A572), PPGI roofing sheets",
      industry: "Water Infrastructure / Municipal Public Works",
      area: "32,000 Sq. Ft."
    },
    highlights: [
      "Clear-span design of 32 meters without any interior columns for maximum machinery layout flexibility.",
      "Custom-fabricated crane brackets designed to support 15-ton overhead double-girder EOT cranes.",
      "Enhanced anti-corrosive coating system to withstand high humidity environments."
    ]
  },
  {
    id: "lp-infra",
    title: "LP Infra",
    category: "Commercial",
    location: "Charkhi Dadri, Haryana",
    description: "A premium commercial warehousing and logistical hub built using advanced Pre-Engineered Building technology. Designed for rapid cargo movement, the building features multiple dock levelers, high eave height, and modern wall cladding systems to ensure durability and aesthetic excellence.",
    image: "https://sumiraj.com/public/portfolio/LP_Infra_1.jpeg",
    gallery: [
      "https://sumiraj.com/public/portfolio/LP_Infra_1.jpeg",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop" // supporting logistics warehouse image
    ],
    specifications: {
      process: "Precision Cold-Forming, Automated Beam Assembly, & CNC Drilling",
      materials: "ASTM A572 Grade 50 steel, Leak-proof standing seam roofing systems",
      industry: "Logistics, Warehousing & Commercial Trade",
      area: "75,000 Sq. Ft."
    },
    highlights: [
      "Sprawling 75,000 sq. ft. clear-span structural design for optimal inventory storage.",
      "Leak-proof standing seam roof system with a 20-year structural warranty.",
      "Integrated skylight panels covering 8% of the roof area to maximize natural light and reduce energy usage."
    ]
  },
  {
    id: "renovator-appliances",
    title: "Renovator Appliances Ltd",
    category: "Industrial",
    location: "Greater Noida, Uttar Pradesh",
    description: "A state-of-the-art manufacturing plant designed specifically for appliance assembly lines. The building layout features a dual-span PEB framing system, high-load mezzanine floors for administrative offices, and custom ventilation systems to maintain optimal working conditions.",
    image: "https://sumiraj.com/public/portfolio/20230504_131218.jpg",
    gallery: [
      "https://sumiraj.com/public/portfolio/20230504_131218.jpg",
      "https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=1200&auto=format&fit=crop" // supporting modern assembly plant rendering
    ],
    specifications: {
      process: "Structural Steel Fabrication & Precision CNC Punching",
      materials: "High-tensile steel frame members, Insulated polyurethane sandwich panels",
      industry: "Electronics & Appliance Manufacturing",
      area: "45,000 Sq. Ft."
    },
    highlights: [
      "Integrated 15,000 sq. ft. heavy-duty mezzanine floor designed for a live load of 750 kg/sq.m.",
      "Multi-span frame layout optimizing steel tonnage per square meter.",
      "Ridge ventilators and turbo ventilators providing 6 air changes per hour naturally."
    ]
  }
];
