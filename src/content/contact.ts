/** Static contact details for the Directorate. Update here when they change. */
export const contact = {
  office: {
    name: "Directorate of Quality Assurance & Collaborations (QA&C)",
    address: "HITEC University, Taxila Cantt, Punjab 47080, Pakistan",
  },
  phone: {
    display: "+92-51-9490 8146-49",
    href: "tel:+92519490814649",
  },
  email: "director.qec@hitecuni.edu.pk",
  director: {
    name: "Prof. Dr. Muhammad Asif",
    title: "Director QA&C",
  },
  map: {
    // Keyless Google Maps embed (no API key required).
    embedSrc:
      "https://www.google.com/maps?q=HITEC%20University%20Taxila%20Cantt&output=embed",
    href: "https://www.google.com/maps/search/?api=1&query=HITEC+University+Taxila+Cantt",
    label: "HITEC University, Taxila",
  },
} as const;
