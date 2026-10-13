# Product PDF Specifications

Place the official product specification and brochure PDFs in this directory using the following filenames:

- `peb-buildings.pdf` - Pre-Engineered Buildings Specification
- `primary-framing.pdf` - Primary Framing Members Brochure
- `secondary-framing-systems.pdf` - Secondary Framing Systems (Purlins & Girts)
- `roofing-wall-cladding.pdf` - Metal Roofing & Wall Cladding Systems
- `standing-seam-roofing.pdf` - Standing Seam 360° Roofing System
- `mezzanine-floors.pdf` - Heavy-Duty Mezzanine Floors
- `erection-installation.pdf` - Erection & Installation Quality Manual

Once a PDF is placed in this folder, update `pdfAvailable: true` in `src/routes/products.index.tsx` (or `src/lib/buildingSystemsData.ts`) to enable the active download button.
