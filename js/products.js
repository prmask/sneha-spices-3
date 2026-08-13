const products = [
    // Spices
    {
        id: "black-pepper",
        name: "Black Pepper",
        botanicalName: "Piper nigrum",
        category: "Spices",
        origin: "Idukki, Kerala",
        moq: "500 kg",
        packaging: ["25kg PP Bag", "50kg Jute Bag"],
        image: "assets/images/black-pepper.webp",
        description: "Known as 'Black Gold', our Idukki-sourced black pepper is world-renowned for its high piperine content and bold aroma.",
        sourcingDetails: "Sourced from high-altitude rainforest estates in Idukki, harvested at peak maturity and sun-dried to lock in maximum piperine."
    },
    {
        id: "cardamom",
        name: "Cardamom",
        botanicalName: "Elettaria cardamomum",
        category: "Spices",
        origin: "Idukki, Kerala",
        moq: "100 kg",
        packaging: ["5kg Box", "25kg Box"],
        image: "assets/images/cardamom.webp",
        description: "Premium Green Cardamom with large pods and intense fragrance, freshly harvested from the Cardamom Hills.",
        sourcingDetails: "Hand-harvested from mist-covered plantations in the Cardamom Hills of Idukki, sorted by size (7.5-8mm+ extra bold pods)."
    },
    {
        id: "clove",
        name: "Clove",
        botanicalName: "Syzygium aromaticum",
        category: "Spices",
        origin: "Idukki, Kerala",
        moq: "200 kg",
        packaging: ["25kg Carton", "50kg Carton"],
        image: "assets/images/clove.webp",
        description: "Hand-picked cloves rich in essential oils, offering a strong, sweet, and pungent flavor profile.",
        sourcingDetails: "Grown in high-elevation organic estate gardens of the Western Ghats, hand-picked and air-dried to retain high eugenol content."
    },
    {
        id: "cinnamon",
        name: "Cinnamon",
        botanicalName: "Cinnamomum verum",
        category: "Spices",
        origin: "Idukki, Kerala",
        moq: "300 kg",
        packaging: ["25kg Bale", "10kg Carton"],
        image: "assets/images/cinnamon.webp",
        description: "True Ceylon-type cinnamon grown in Kerala, featuring delicate layers and a sweet, warm taste.",
        sourcingDetails: "Sourced from spice gardens of the Malabar coast, hand-peeled to preserve delicate inner bark layers and warm essential oils."
    },
    {
        id: "star-anise",
        name: "Star Anise",
        botanicalName: "Illicium verum",
        category: "Spices",
        origin: "Idukki, Kerala",
        moq: "500 kg",
        packaging: ["20kg Carton"],
        image: "assets/images/star-anise.webp",
        description: "Beautifully shaped star anise pods with a distinct liquorice flavor, essential for exotic blends.",
        sourcingDetails: "Procured from select high-altitude growers, chosen for unbroken 8-point star pods and intense anethole aroma."
    },
    {
        id: "cumin",
        name: "Cumin",
        botanicalName: "Cuminum cyminum",
        category: "Spices",
        origin: "Idukki, Kerala",
        moq: "1000 kg",
        packaging: ["25kg PP Bag", "50kg PP Bag"],
        image: "assets/images/cummin.webp",
        description: "Earthy and warm cumin seeds, processed to preserve their volatile oils and high potency.",
        sourcingDetails: "Sourced from the sun-drenched plains of Gujarat and Rajasthan, double-cleaned and processed to ensure purity and rich thymol."
    },
    {
        id: "turmeric",
        name: "Turmeric",
        botanicalName: "Curcuma longa",
        category: "Spices",
        origin: "Idukki, Kerala",
        moq: "1000 kg",
        packaging: ["25kg PP Bag", "50kg Jute Bag"],
        image: "assets/images/turmeric.webp",
        description: "High-curcumin turmeric powder and fingers, offering brilliant golden color and medicinal properties.",
        sourcingDetails: "Grown in fertile Alleppey soil, famous for naturally high curcumin levels (5.5%+) and intense earthy fragrance."
    },
    // Beverages
    {
        id: "black-tea",
        name: "Black Tea",
        botanicalName: "Camellia sinensis",
        category: "Beverages",
        origin: "Idukki, Kerala",
        moq: "2000 kg",
        packaging: ["50kg Paper Sack", "Bulk Chest"],
        image: "assets/images/black-tea.webp",
        description: "Robust and full-bodied black tea from high-altitude plantations, perfect for strong blends.",
        sourcingDetails: "Harvested from Munnar's high-altitude tea estates, selected for rich color, full body, and brisk flavor profile."
    },
    {
        id: "green-tea",
        name: "Green Tea",
        botanicalName: "Camellia sinensis",
        category: "Beverages",
        origin: "Idukki, Kerala",
        moq: "1000 kg",
        packaging: ["25kg Paper Sack", "Vacuum Pack"],
        image: "assets/images/green-tea.webp",
        description: "Minimally oxidized green tea leaves retaining natural antioxidants and a fresh, grassy flavor.",
        sourcingDetails: "Hand-plucked from organic single estates, processed immediately to preserve natural catechins and clean herbal notes."
    },
    // Staples
    {
        id: "rice",
        name: "Rice",
        botanicalName: "Oryza sativa",
        category: "Staples",
        origin: "Idukki, Kerala",
        moq: "5000 kg",
        packaging: ["25kg PP Bag", "50kg PP Bag"],
        image: "assets/images/rice.webp",
        description: "Premium local rice varieties, known for their unique taste and suitability for traditional dishes.",
        sourcingDetails: "Sourced from the fertile, organic paddy fields of Kerala, aged naturally to ensure long grains and rich aroma."
    },
    {
        id: "sugar",
        name: "Sugar",
        botanicalName: "Saccharum officinarum",
        category: "Staples",
        origin: "Idukki, Kerala",
        moq: "10000 kg",
        packaging: ["50kg PP Bag"],
        image: "assets/images/sugar.webp",
        description: "Refined and brown sugar options sourced from quality sugarcane crops.",
        sourcingDetails: "Refined from premium sugarcane grown in the rich soils of Maharashtra, processed under strict quality standards."
    },
    {
        id: "cashew",
        name: "Cashew",
        botanicalName: "Anacardium occidentale",
        category: "Staples",
        origin: "Idukki, Kerala",
        moq: "500 kg",
        packaging: ["10kg Tin", "25kg Carton"],
        image: "assets/images/cashew.webp",
        description: "Crunchy and creamy W-320 grade cashews, processed to perfection for export.",
        sourcingDetails: "Grown in Kollam orchards, shelled and graded to premium export W-320 standards in modern hygienic processing units."
    },
    // Fruits and vegetables
    {
        id: "onion",
        name: "Onion",
        botanicalName: "Allium cepa",
        category: "Fruits and vegetables",
        origin: "Idukki, Kerala",
        moq: "2000 kg",
        packaging: ["50kg Mesh Bag", "25kg Mesh Bag"],
        image: "assets/images/onion.webp",
        description: "Fresh, export-quality red onions with a crisp texture and long shelf life, sourced from trusted farms.",
        sourcingDetails: "Sourced from Nashik, Maharashtra's premier onion-growing belt. Specially selected for high pungency and export durability."
    },
    {
        id: "ginger",
        name: "Ginger",
        botanicalName: "Zingiber officinale",
        category: "Fruits and vegetables",
        origin: "Idukki, Kerala",
        moq: "500 kg",
        packaging: ["25kg Jute Bag", "50kg Jute Bag"],
        image: "assets/images/ginger.webp",
        description: "Premium fresh and aromatic ginger roots, washed and graded for export, featuring high pungency.",
        sourcingDetails: "Grown in the organic, nutrient-rich soils of Wayanad and Idukki. Hand-washed, bold, low-fiber fingers selected for export."
    },
    {
        id: "banana",
        name: "Banana",
        botanicalName: "Musa acuminata",
        category: "Fruits and vegetables",
        origin: "Idukki, Kerala",
        moq: "1000 kg",
        packaging: ["13.5kg Carton Box", "18kg Carton Box"],
        image: "assets/images/banana.webp",
        description: "Naturally grown, premium grade bananas, carefully harvested and packed to ensure freshness upon arrival.",
        sourcingDetails: "Sourced from the fertile river valleys of Tamil Nadu. Hand-harvested, premium Cavendish variety packed in ventilated crates."
    },
    {
        id: "mango",
        name: "Mango",
        botanicalName: "Mangifera indica",
        category: "Fruits and vegetables",
        origin: "Idukki, Kerala",
        moq: "1000 kg",
        packaging: ["5kg Box", "10kg Box"],
        image: "assets/images/mango.webp",
        description: "Succulent, fiberless export-grade mangoes with rich sweetness and exceptional flavor profile.",
        sourcingDetails: "Sourced from certified orchards in Andhra Pradesh and Konkan. Hand-picked at mature green stage to ripen perfectly."
    }
];
