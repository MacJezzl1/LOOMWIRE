export type Painting = {
  slug: string;
  title: string;
  room: string;
  image: string;
  route: string;
  statement: string;
  evidence: string[];
};

export const paintings: Painting[] = [
  {
    slug: "name-room",
    title: "Name Room Study",
    room: "The Name Room",
    image: "/art/paintings/loomwire-name-room-painting.png",
    route: "/rooms/name-room",
    statement:
      "A painting about the moment a raw word becomes a system with memory, conflict, and ten-year meaning.",
    evidence: [
      "Name logic diagrams",
      "Cultural memory traces",
      "Signal-green discovery marks"
    ]
  },
  {
    slug: "cultural-map",
    title: "Cultural Map Atlas",
    room: "Cultural Map",
    image: "/art/paintings/loomwire-cultural-map-painting.png",
    route: "/cultural-map",
    statement:
      "A global creator atlas linking streetwear, music, AI, identity, poetry, architecture, and youth culture.",
    evidence: [
      "Culture territories",
      "Wire-path relationships",
      "Market difference marks"
    ]
  },
  {
    slug: "drop-room",
    title: "Drop Room Altar",
    room: "The Drop Room",
    image: "/art/paintings/loomwire-drop-room-painting.png",
    route: "/rooms/drop-room",
    statement:
      "A product-drop painting where blank garments, launch proof, commerce tags, and archive cards become one release ritual.",
    evidence: [
      "Product blank language",
      "Launch calendar fragments",
      "Evidence-card composition"
    ]
  },
  {
    slug: "vault-padlock",
    title: "Proof Vault Padlock",
    room: "Creator Proof Vault",
    image: "/art/loomwire-vault-padlock.png",
    route: "/vault",
    statement:
      "The lock as a cultural object: a symbol for timestamped proof, source files, authorship records, and creator ownership.",
    evidence: [
      "Artful lock symbol",
      "Ownership timeline cue",
      "Archive security language"
    ]
  }
];
