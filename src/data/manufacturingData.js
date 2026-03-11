const cityProfiles = [
  {
    city: 'Mumbai',
    state: 'Maharashtra',
    cluster: 'Mumbai-Pune-Nashik',
    leadSector: 'Automotive',
    currentInvestment: 9120,
    currentGrowth: 7.2,
    vehicleRegistrations: 178000,
    sectorMix: { automotive: 34, chemicals: 24, electronics: 22, pharma: 20 },
    history: [
      { year: '2021', investment: 6650, growth: 5.2, vehicleRegistrations: 126000 },
      { year: '2022', investment: 7240, growth: 5.9, vehicleRegistrations: 138000 },
      { year: '2023', investment: 7820, growth: 6.3, vehicleRegistrations: 149000 },
      { year: '2024', investment: 8530, growth: 6.8, vehicleRegistrations: 162000 },
      { year: '2025', investment: 9120, growth: 7.2, vehicleRegistrations: 178000 }
    ]
  },
  {
    city: 'Pune',
    state: 'Maharashtra',
    cluster: 'Mumbai-Pune-Nashik',
    leadSector: 'Automotive',
    currentInvestment: 7340,
    currentGrowth: 7.5,
    vehicleRegistrations: 121000,
    sectorMix: { automotive: 42, electronics: 24, pharma: 20, chemicals: 14 },
    history: [
      { year: '2021', investment: 4980, growth: 5.8, vehicleRegistrations: 83000 },
      { year: '2022', investment: 5520, growth: 6.1, vehicleRegistrations: 92000 },
      { year: '2023', investment: 6070, growth: 6.8, vehicleRegistrations: 101000 },
      { year: '2024', investment: 6710, growth: 7.2, vehicleRegistrations: 112000 },
      { year: '2025', investment: 7340, growth: 7.5, vehicleRegistrations: 121000 }
    ]
  },
  {
    city: 'Nashik',
    state: 'Maharashtra',
    cluster: 'Mumbai-Pune-Nashik',
    leadSector: 'Auto Components',
    currentInvestment: 4360,
    currentGrowth: 6.6,
    vehicleRegistrations: 86000,
    sectorMix: { automotive: 36, chemicals: 28, food_processing: 20, electronics: 16 },
    history: [
      { year: '2021', investment: 2930, growth: 4.8, vehicleRegistrations: 56000 },
      { year: '2022', investment: 3210, growth: 5.4, vehicleRegistrations: 63000 },
      { year: '2023', investment: 3570, growth: 5.8, vehicleRegistrations: 70000 },
      { year: '2024', investment: 3970, growth: 6.2, vehicleRegistrations: 78000 },
      { year: '2025', investment: 4360, growth: 6.6, vehicleRegistrations: 86000 }
    ]
  },
  {
    city: 'Bangalore',
    state: 'Karnataka',
    cluster: 'Bangalore-Hosur',
    leadSector: 'Electronics',
    currentInvestment: 8420,
    currentGrowth: 9.4,
    vehicleRegistrations: 154000,
    sectorMix: { electronics: 44, automotive: 23, pharma: 18, aerospace: 15 },
    history: [
      { year: '2021', investment: 5590, growth: 6.7, vehicleRegistrations: 101000 },
      { year: '2022', investment: 6210, growth: 7.4, vehicleRegistrations: 114000 },
      { year: '2023', investment: 6890, growth: 8.1, vehicleRegistrations: 126000 },
      { year: '2024', investment: 7650, growth: 8.8, vehicleRegistrations: 140000 },
      { year: '2025', investment: 8420, growth: 9.4, vehicleRegistrations: 154000 }
    ]
  },
  {
    city: 'Hosur',
    state: 'Tamil Nadu',
    cluster: 'Bangalore-Hosur',
    leadSector: 'Auto Components',
    currentInvestment: 3980,
    currentGrowth: 7.7,
    vehicleRegistrations: 82000,
    sectorMix: { automotive: 41, electronics: 23, textiles: 20, heavy_engineering: 16 },
    history: [
      { year: '2021', investment: 2710, growth: 5.2, vehicleRegistrations: 53000 },
      { year: '2022', investment: 2990, growth: 5.9, vehicleRegistrations: 61000 },
      { year: '2023', investment: 3310, growth: 6.5, vehicleRegistrations: 68000 },
      { year: '2024', investment: 3640, growth: 7.1, vehicleRegistrations: 75000 },
      { year: '2025', investment: 3980, growth: 7.7, vehicleRegistrations: 82000 }
    ]
  },
  {
    city: 'Delhi',
    state: 'Delhi (NCT)',
    cluster: 'NCR-Delhi',
    leadSector: 'Electronics',
    currentInvestment: 5480,
    currentGrowth: 8.9,
    vehicleRegistrations: 205000,
    sectorMix: { electronics: 32, chemicals: 24, food_processing: 22, textiles: 22 },
    history: [
      { year: '2021', investment: 3560, growth: 5.9, vehicleRegistrations: 136000 },
      { year: '2022', investment: 3920, growth: 6.5, vehicleRegistrations: 151000 },
      { year: '2023', investment: 4380, growth: 7.3, vehicleRegistrations: 168000 },
      { year: '2024', investment: 4930, growth: 8.1, vehicleRegistrations: 186000 },
      { year: '2025', investment: 5480, growth: 8.9, vehicleRegistrations: 205000 }
    ]
  },
  {
    city: 'Noida',
    state: 'Uttar Pradesh',
    cluster: 'NCR-Delhi',
    leadSector: 'Electronics',
    currentInvestment: 5650,
    currentGrowth: 9.1,
    vehicleRegistrations: 97000,
    sectorMix: { electronics: 43, automotive: 21, chemicals: 19, food_processing: 17 },
    history: [
      { year: '2021', investment: 3430, growth: 6.1, vehicleRegistrations: 62000 },
      { year: '2022', investment: 3950, growth: 6.9, vehicleRegistrations: 70000 },
      { year: '2023', investment: 4510, growth: 7.6, vehicleRegistrations: 79000 },
      { year: '2024', investment: 5070, growth: 8.4, vehicleRegistrations: 88000 },
      { year: '2025', investment: 5650, growth: 9.1, vehicleRegistrations: 97000 }
    ]
  },
  {
    city: 'Gurgaon',
    state: 'Haryana',
    cluster: 'NCR-Delhi',
    leadSector: 'Electronics',
    currentInvestment: 6780,
    currentGrowth: 8.7,
    vehicleRegistrations: 109000,
    sectorMix: { electronics: 37, automotive: 29, chemicals: 18, pharma: 16 },
    history: [
      { year: '2021', investment: 4620, growth: 6.2, vehicleRegistrations: 72000 },
      { year: '2022', investment: 5140, growth: 6.8, vehicleRegistrations: 81000 },
      { year: '2023', investment: 5690, growth: 7.4, vehicleRegistrations: 90000 },
      { year: '2024', investment: 6240, growth: 8.0, vehicleRegistrations: 99000 },
      { year: '2025', investment: 6780, growth: 8.7, vehicleRegistrations: 109000 }
    ]
  },
  {
    city: 'Faridabad',
    state: 'Haryana',
    cluster: 'NCR-Delhi',
    leadSector: 'Automotive',
    currentInvestment: 6120,
    currentGrowth: 8.1,
    vehicleRegistrations: 93000,
    sectorMix: { automotive: 39, electronics: 26, chemicals: 20, heavy_engineering: 15 },
    history: [
      { year: '2021', investment: 4010, growth: 5.8, vehicleRegistrations: 62000 },
      { year: '2022', investment: 4520, growth: 6.4, vehicleRegistrations: 70000 },
      { year: '2023', investment: 5030, growth: 7.1, vehicleRegistrations: 79000 },
      { year: '2024', investment: 5570, growth: 7.6, vehicleRegistrations: 86000 },
      { year: '2025', investment: 6120, growth: 8.1, vehicleRegistrations: 93000 }
    ]
  },
  {
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    cluster: 'NCR-Delhi',
    leadSector: 'Engineering Goods',
    currentInvestment: 4720,
    currentGrowth: 7.6,
    vehicleRegistrations: 84000,
    sectorMix: { heavy_engineering: 36, electronics: 24, automotive: 22, chemicals: 18 },
    history: [
      { year: '2021', investment: 3090, growth: 5.4, vehicleRegistrations: 55000 },
      { year: '2022', investment: 3410, growth: 6.0, vehicleRegistrations: 62000 },
      { year: '2023', investment: 3810, growth: 6.6, vehicleRegistrations: 69000 },
      { year: '2024', investment: 4260, growth: 7.1, vehicleRegistrations: 76000 },
      { year: '2025', investment: 4720, growth: 7.6, vehicleRegistrations: 84000 }
    ]
  },
  {
    city: 'Ahmedabad',
    state: 'Gujarat',
    cluster: 'Ahmedabad-Vadodara-Surat',
    leadSector: 'Automotive',
    currentInvestment: 8890,
    currentGrowth: 8.3,
    vehicleRegistrations: 132000,
    sectorMix: { automotive: 38, chemicals: 25, textiles: 21, electronics: 16 },
    history: [
      { year: '2021', investment: 5990, growth: 5.9, vehicleRegistrations: 87000 },
      { year: '2022', investment: 6610, growth: 6.6, vehicleRegistrations: 97000 },
      { year: '2023', investment: 7280, growth: 7.2, vehicleRegistrations: 108000 },
      { year: '2024', investment: 8070, growth: 7.8, vehicleRegistrations: 120000 },
      { year: '2025', investment: 8890, growth: 8.3, vehicleRegistrations: 132000 }
    ]
  },
  {
    city: 'Vadodara',
    state: 'Gujarat',
    cluster: 'Ahmedabad-Vadodara-Surat',
    leadSector: 'Chemicals',
    currentInvestment: 5210,
    currentGrowth: 7.4,
    vehicleRegistrations: 75000,
    sectorMix: { chemicals: 41, automotive: 24, pharmaceuticals: 20, engineering_goods: 15 },
    history: [
      { year: '2021', investment: 3380, growth: 5.1, vehicleRegistrations: 50000 },
      { year: '2022', investment: 3740, growth: 5.8, vehicleRegistrations: 56000 },
      { year: '2023', investment: 4140, growth: 6.4, vehicleRegistrations: 62000 },
      { year: '2024', investment: 4670, growth: 6.9, vehicleRegistrations: 68000 },
      { year: '2025', investment: 5210, growth: 7.4, vehicleRegistrations: 75000 }
    ]
  },
  {
    city: 'Surat',
    state: 'Gujarat',
    cluster: 'Ahmedabad-Vadodara-Surat',
    leadSector: 'Textiles',
    currentInvestment: 4880,
    currentGrowth: 7.1,
    vehicleRegistrations: 69000,
    sectorMix: { textiles: 42, chemicals: 24, automotive: 19, food_processing: 15 },
    history: [
      { year: '2021', investment: 3120, growth: 4.9, vehicleRegistrations: 45000 },
      { year: '2022', investment: 3440, growth: 5.5, vehicleRegistrations: 51000 },
      { year: '2023', investment: 3810, growth: 6.1, vehicleRegistrations: 57000 },
      { year: '2024', investment: 4340, growth: 6.6, vehicleRegistrations: 63000 },
      { year: '2025', investment: 4880, growth: 7.1, vehicleRegistrations: 69000 }
    ]
  },
  {
    city: 'Hyderabad',
    state: 'Telangana',
    cluster: 'Hyderabad-Warangal',
    leadSector: 'Pharmaceuticals',
    currentInvestment: 7650,
    currentGrowth: 8.6,
    vehicleRegistrations: 176000,
    sectorMix: { pharmaceuticals: 45, electronics: 21, textiles: 19, automotive: 15 },
    history: [
      { year: '2021', investment: 5070, growth: 6.0, vehicleRegistrations: 114000 },
      { year: '2022', investment: 5650, growth: 6.7, vehicleRegistrations: 128000 },
      { year: '2023', investment: 6260, growth: 7.3, vehicleRegistrations: 143000 },
      { year: '2024', investment: 6960, growth: 8.0, vehicleRegistrations: 159000 },
      { year: '2025', investment: 7650, growth: 8.6, vehicleRegistrations: 176000 }
    ]
  },
  {
    city: 'Warangal',
    state: 'Telangana',
    cluster: 'Hyderabad-Warangal',
    leadSector: 'Textiles',
    currentInvestment: 3420,
    currentGrowth: 7.0,
    vehicleRegistrations: 64000,
    sectorMix: { textiles: 41, pharmaceuticals: 24, food_processing: 20, chemicals: 15 },
    history: [
      { year: '2021', investment: 2210, growth: 4.8, vehicleRegistrations: 41000 },
      { year: '2022', investment: 2450, growth: 5.5, vehicleRegistrations: 46000 },
      { year: '2023', investment: 2740, growth: 6.0, vehicleRegistrations: 52000 },
      { year: '2024', investment: 3060, growth: 6.5, vehicleRegistrations: 58000 },
      { year: '2025', investment: 3420, growth: 7.0, vehicleRegistrations: 64000 }
    ]
  },
  {
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    cluster: 'Visakhapatnam-Vijayawada',
    leadSector: 'Pharmaceuticals',
    currentInvestment: 6040,
    currentGrowth: 7.8,
    vehicleRegistrations: 98000,
    sectorMix: { pharmaceuticals: 39, automotive: 26, electronics: 20, food_processing: 15 },
    history: [
      { year: '2021', investment: 4020, growth: 5.5, vehicleRegistrations: 63000 },
      { year: '2022', investment: 4440, growth: 6.1, vehicleRegistrations: 71000 },
      { year: '2023', investment: 4920, growth: 6.7, vehicleRegistrations: 79000 },
      { year: '2024', investment: 5480, growth: 7.2, vehicleRegistrations: 89000 },
      { year: '2025', investment: 6040, growth: 7.8, vehicleRegistrations: 98000 }
    ]
  },
  {
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    cluster: 'Visakhapatnam-Vijayawada',
    leadSector: 'Food Processing',
    currentInvestment: 4510,
    currentGrowth: 6.9,
    vehicleRegistrations: 74000,
    sectorMix: { food_processing: 36, pharmaceuticals: 24, textiles: 21, electronics: 19 },
    history: [
      { year: '2021', investment: 2930, growth: 4.7, vehicleRegistrations: 47000 },
      { year: '2022', investment: 3250, growth: 5.4, vehicleRegistrations: 54000 },
      { year: '2023', investment: 3610, growth: 6.0, vehicleRegistrations: 61000 },
      { year: '2024', investment: 4060, growth: 6.4, vehicleRegistrations: 68000 },
      { year: '2025', investment: 4510, growth: 6.9, vehicleRegistrations: 74000 }
    ]
  },
  {
    city: 'Chennai',
    state: 'Tamil Nadu',
    cluster: 'Chennai-Coimbatore-Hosur',
    leadSector: 'Textiles',
    currentInvestment: 7120,
    currentGrowth: 8.0,
    vehicleRegistrations: 121000,
    sectorMix: { textiles: 33, electronics: 29, automotive: 23, pharmaceuticals: 15 },
    history: [
      { year: '2021', investment: 4710, growth: 5.6, vehicleRegistrations: 81000 },
      { year: '2022', investment: 5230, growth: 6.2, vehicleRegistrations: 90000 },
      { year: '2023', investment: 5790, growth: 6.8, vehicleRegistrations: 100000 },
      { year: '2024', investment: 6440, growth: 7.4, vehicleRegistrations: 111000 },
      { year: '2025', investment: 7120, growth: 8.0, vehicleRegistrations: 121000 }
    ]
  },
  {
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    cluster: 'Chennai-Coimbatore-Hosur',
    leadSector: 'Textiles',
    currentInvestment: 4630,
    currentGrowth: 7.1,
    vehicleRegistrations: 79000,
    sectorMix: { textiles: 40, automotive: 24, electronics: 19, food_processing: 17 },
    history: [
      { year: '2021', investment: 3090, growth: 4.9, vehicleRegistrations: 52000 },
      { year: '2022', investment: 3390, growth: 5.6, vehicleRegistrations: 59000 },
      { year: '2023', investment: 3760, growth: 6.1, vehicleRegistrations: 66000 },
      { year: '2024', investment: 4180, growth: 6.6, vehicleRegistrations: 73000 },
      { year: '2025', investment: 4630, growth: 7.1, vehicleRegistrations: 79000 }
    ]
  },
  {
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    cluster: 'Kanpur-Lucknow-Noida',
    leadSector: 'Chemicals',
    currentInvestment: 5120,
    currentGrowth: 7.4,
    vehicleRegistrations: 96000,
    sectorMix: { chemicals: 34, food_processing: 26, electronics: 21, automotive: 19 },
    history: [
      { year: '2021', investment: 3340, growth: 5.0, vehicleRegistrations: 62000 },
      { year: '2022', investment: 3670, growth: 5.7, vehicleRegistrations: 70000 },
      { year: '2023', investment: 4070, growth: 6.3, vehicleRegistrations: 79000 },
      { year: '2024', investment: 4580, growth: 6.8, vehicleRegistrations: 87000 },
      { year: '2025', investment: 5120, growth: 7.4, vehicleRegistrations: 96000 }
    ]
  },
  {
    city: 'Kanpur',
    state: 'Uttar Pradesh',
    cluster: 'Kanpur-Lucknow-Noida',
    leadSector: 'Leather and Chemicals',
    currentInvestment: 4670,
    currentGrowth: 6.8,
    vehicleRegistrations: 87000,
    sectorMix: { chemicals: 32, textiles: 28, automotive: 22, electronics: 18 },
    history: [
      { year: '2021', investment: 3050, growth: 4.6, vehicleRegistrations: 56000 },
      { year: '2022', investment: 3330, growth: 5.2, vehicleRegistrations: 63000 },
      { year: '2023', investment: 3710, growth: 5.8, vehicleRegistrations: 71000 },
      { year: '2024', investment: 4180, growth: 6.3, vehicleRegistrations: 79000 },
      { year: '2025', investment: 4670, growth: 6.8, vehicleRegistrations: 87000 }
    ]
  },
  {
    city: 'Indore',
    state: 'Madhya Pradesh',
    cluster: 'Central India Belt',
    leadSector: 'Automotive',
    currentInvestment: 5890,
    currentGrowth: 7.3,
    vehicleRegistrations: 91000,
    sectorMix: { automotive: 34, chemicals: 24, food_processing: 23, engineering_goods: 19 },
    history: [
      { year: '2021', investment: 3890, growth: 5.2, vehicleRegistrations: 59000 },
      { year: '2022', investment: 4290, growth: 5.9, vehicleRegistrations: 66000 },
      { year: '2023', investment: 4740, growth: 6.5, vehicleRegistrations: 74000 },
      { year: '2024', investment: 5310, growth: 6.9, vehicleRegistrations: 82000 },
      { year: '2025', investment: 5890, growth: 7.3, vehicleRegistrations: 91000 }
    ]
  },
  {
    city: 'Nagpur',
    state: 'Maharashtra',
    cluster: 'Central India Belt',
    leadSector: 'Automotive',
    currentInvestment: 4360,
    currentGrowth: 6.7,
    vehicleRegistrations: 83000,
    sectorMix: { automotive: 35, logistics: 27, food_processing: 22, chemicals: 16 },
    history: [
      { year: '2021', investment: 2810, growth: 4.7, vehicleRegistrations: 53000 },
      { year: '2022', investment: 3110, growth: 5.3, vehicleRegistrations: 60000 },
      { year: '2023', investment: 3470, growth: 5.9, vehicleRegistrations: 68000 },
      { year: '2024', investment: 3900, growth: 6.3, vehicleRegistrations: 75000 },
      { year: '2025', investment: 4360, growth: 6.7, vehicleRegistrations: 83000 }
    ]
  },
  {
    city: 'Kochi',
    state: 'Kerala',
    cluster: 'Kerala Coastal Cluster',
    leadSector: 'Food Processing',
    currentInvestment: 3920,
    currentGrowth: 6.2,
    vehicleRegistrations: 72000,
    sectorMix: { food_processing: 34, pharmaceuticals: 27, chemicals: 21, textiles: 18 },
    history: [
      { year: '2021', investment: 2580, growth: 4.2, vehicleRegistrations: 47000 },
      { year: '2022', investment: 2860, growth: 4.9, vehicleRegistrations: 54000 },
      { year: '2023', investment: 3180, growth: 5.4, vehicleRegistrations: 60000 },
      { year: '2024', investment: 3550, growth: 5.8, vehicleRegistrations: 66000 },
      { year: '2025', investment: 3920, growth: 6.2, vehicleRegistrations: 72000 }
    ]
  },
  {
    city: 'Kolkata',
    state: 'West Bengal',
    cluster: 'Eastern Industrial Corridor',
    leadSector: 'Jute and Chemicals',
    currentInvestment: 5180,
    currentGrowth: 6.1,
    vehicleRegistrations: 94000,
    sectorMix: { jute: 31, chemicals: 27, automotive: 24, food_processing: 18 },
    history: [
      { year: '2021', investment: 3470, growth: 4.3, vehicleRegistrations: 61000 },
      { year: '2022', investment: 3820, growth: 4.9, vehicleRegistrations: 69000 },
      { year: '2023', investment: 4230, growth: 5.4, vehicleRegistrations: 77000 },
      { year: '2024', investment: 4680, growth: 5.8, vehicleRegistrations: 85000 },
      { year: '2025', investment: 5180, growth: 6.1, vehicleRegistrations: 94000 }
    ]
  },
  {
    city: 'Durgapur',
    state: 'West Bengal',
    cluster: 'Eastern Industrial Corridor',
    leadSector: 'Steel and Metals',
    currentInvestment: 3640,
    currentGrowth: 5.8,
    vehicleRegistrations: 58000,
    sectorMix: { steel: 39, chemicals: 25, automotive: 20, engineering_goods: 16 },
    history: [
      { year: '2021', investment: 2410, growth: 3.9, vehicleRegistrations: 39000 },
      { year: '2022', investment: 2670, growth: 4.4, vehicleRegistrations: 44000 },
      { year: '2023', investment: 2950, growth: 4.9, vehicleRegistrations: 49000 },
      { year: '2024', investment: 3270, growth: 5.3, vehicleRegistrations: 54000 },
      { year: '2025', investment: 3640, growth: 5.8, vehicleRegistrations: 58000 }
    ]
  },
  {
    city: 'Ludhiana',
    state: 'Punjab',
    cluster: 'North Manufacturing Belt',
    leadSector: 'Auto Components',
    currentInvestment: 4330,
    currentGrowth: 5.9,
    vehicleRegistrations: 76000,
    sectorMix: { automotive: 36, textiles: 24, chemicals: 22, food_processing: 18 },
    history: [
      { year: '2021', investment: 2870, growth: 4.1, vehicleRegistrations: 50000 },
      { year: '2022', investment: 3180, growth: 4.7, vehicleRegistrations: 57000 },
      { year: '2023', investment: 3530, growth: 5.1, vehicleRegistrations: 63000 },
      { year: '2024', investment: 3920, growth: 5.5, vehicleRegistrations: 69000 },
      { year: '2025', investment: 4330, growth: 5.9, vehicleRegistrations: 76000 }
    ]
  },
  {
    city: 'Jaipur',
    state: 'Rajasthan',
    cluster: 'Rajasthan Growth Arc',
    leadSector: 'Ceramics and Textiles',
    currentInvestment: 4210,
    currentGrowth: 7.1,
    vehicleRegistrations: 78000,
    sectorMix: { ceramics: 34, textiles: 28, automotive: 21, chemicals: 17 },
    history: [
      { year: '2021', investment: 2730, growth: 4.8, vehicleRegistrations: 50000 },
      { year: '2022', investment: 3020, growth: 5.5, vehicleRegistrations: 57000 },
      { year: '2023', investment: 3380, growth: 6.0, vehicleRegistrations: 64000 },
      { year: '2024', investment: 3780, growth: 6.6, vehicleRegistrations: 71000 },
      { year: '2025', investment: 4210, growth: 7.1, vehicleRegistrations: 78000 }
    ]
  },
  {
    city: 'Jodhpur',
    state: 'Rajasthan',
    cluster: 'Rajasthan Growth Arc',
    leadSector: 'Textiles',
    currentInvestment: 3150,
    currentGrowth: 6.4,
    vehicleRegistrations: 54000,
    sectorMix: { textiles: 39, ceramics: 24, food_processing: 20, chemicals: 17 },
    history: [
      { year: '2021', investment: 2020, growth: 4.2, vehicleRegistrations: 35000 },
      { year: '2022', investment: 2240, growth: 4.8, vehicleRegistrations: 39000 },
      { year: '2023', investment: 2480, growth: 5.3, vehicleRegistrations: 44000 },
      { year: '2024', investment: 2810, growth: 5.9, vehicleRegistrations: 49000 },
      { year: '2025', investment: 3150, growth: 6.4, vehicleRegistrations: 54000 }
    ]
  },
  {
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    cluster: 'Central India Belt',
    leadSector: 'Chemicals',
    currentInvestment: 3520,
    currentGrowth: 6.6,
    vehicleRegistrations: 62000,
    sectorMix: { chemicals: 36, automotive: 24, food_processing: 22, engineering_goods: 18 },
    history: [
      { year: '2021', investment: 2280, growth: 4.5, vehicleRegistrations: 41000 },
      { year: '2022', investment: 2520, growth: 5.1, vehicleRegistrations: 46000 },
      { year: '2023', investment: 2810, growth: 5.7, vehicleRegistrations: 52000 },
      { year: '2024', investment: 3160, growth: 6.2, vehicleRegistrations: 57000 },
      { year: '2025', investment: 3520, growth: 6.6, vehicleRegistrations: 62000 }
    ]
  },
  {
    city: 'Patna',
    state: 'Bihar',
    cluster: 'Gangetic Manufacturing Belt',
    leadSector: 'Food Processing',
    currentInvestment: 2860,
    currentGrowth: 5.4,
    vehicleRegistrations: 53000,
    sectorMix: { food_processing: 34, sugar: 28, pharmaceuticals: 21, textiles: 17 },
    history: [
      { year: '2021', investment: 1890, growth: 3.8, vehicleRegistrations: 35000 },
      { year: '2022', investment: 2070, growth: 4.3, vehicleRegistrations: 39000 },
      { year: '2023', investment: 2290, growth: 4.8, vehicleRegistrations: 44000 },
      { year: '2024', investment: 2560, growth: 5.1, vehicleRegistrations: 48000 },
      { year: '2025', investment: 2860, growth: 5.4, vehicleRegistrations: 53000 }
    ]
  },
  {
    city: 'Ranchi',
    state: 'Jharkhand',
    cluster: 'Eastern Metals Belt',
    leadSector: 'Steel and Mining',
    currentInvestment: 3010,
    currentGrowth: 6.0,
    vehicleRegistrations: 51000,
    sectorMix: { steel: 38, mining: 29, automotive: 19, chemicals: 14 },
    history: [
      { year: '2021', investment: 1940, growth: 4.0, vehicleRegistrations: 33000 },
      { year: '2022', investment: 2140, growth: 4.7, vehicleRegistrations: 37000 },
      { year: '2023', investment: 2370, growth: 5.2, vehicleRegistrations: 42000 },
      { year: '2024', investment: 2670, growth: 5.6, vehicleRegistrations: 47000 },
      { year: '2025', investment: 3010, growth: 6.0, vehicleRegistrations: 51000 }
    ]
  },
  {
    city: 'Raipur',
    state: 'Chhattisgarh',
    cluster: 'Eastern Metals Belt',
    leadSector: 'Steel and Metals',
    currentInvestment: 3360,
    currentGrowth: 6.7,
    vehicleRegistrations: 57000,
    sectorMix: { steel: 42, chemicals: 21, automotive: 20, food_processing: 17 },
    history: [
      { year: '2021', investment: 2170, growth: 4.5, vehicleRegistrations: 37000 },
      { year: '2022', investment: 2390, growth: 5.1, vehicleRegistrations: 42000 },
      { year: '2023', investment: 2660, growth: 5.7, vehicleRegistrations: 47000 },
      { year: '2024', investment: 2990, growth: 6.2, vehicleRegistrations: 52000 },
      { year: '2025', investment: 3360, growth: 6.7, vehicleRegistrations: 57000 }
    ]
  }
];

const stateYearlyRecords = {
  Gujarat: [
    { year: '2021', growth: 5.4, investment: 17500, vehicleRegistrations: 150000 },
    { year: '2022', growth: 6.1, investment: 19800, vehicleRegistrations: 176000 },
    { year: '2023', growth: 6.7, investment: 22100, vehicleRegistrations: 201000 },
    { year: '2024', growth: 7.2, investment: 25200, vehicleRegistrations: 224000 },
    { year: '2025', growth: 7.8, investment: 28450, vehicleRegistrations: 245000 }
  ],
  Maharashtra: [
    { year: '2021', growth: 5.1, investment: 16900, vehicleRegistrations: 240000 },
    { year: '2022', growth: 5.7, investment: 18800, vehicleRegistrations: 271000 },
    { year: '2023', growth: 6.1, investment: 21300, vehicleRegistrations: 302000 },
    { year: '2024', growth: 6.5, investment: 24100, vehicleRegistrations: 344000 },
    { year: '2025', growth: 6.9, investment: 26890, vehicleRegistrations: 385000 }
  ],
  'Tamil Nadu': [
    { year: '2021', growth: 4.8, investment: 15800, vehicleRegistrations: 205000 },
    { year: '2022', growth: 5.2, investment: 17600, vehicleRegistrations: 231000 },
    { year: '2023', growth: 5.6, investment: 19800, vehicleRegistrations: 262000 },
    { year: '2024', growth: 5.9, investment: 22100, vehicleRegistrations: 291000 },
    { year: '2025', growth: 6.2, investment: 24560, vehicleRegistrations: 320000 }
  ],
  'Uttar Pradesh': [
    { year: '2021', growth: 5.9, investment: 13800, vehicleRegistrations: 129000 },
    { year: '2022', growth: 6.6, investment: 15400, vehicleRegistrations: 152000 },
    { year: '2023', growth: 7.3, investment: 17600, vehicleRegistrations: 176000 },
    { year: '2024', growth: 7.9, investment: 19850, vehicleRegistrations: 197000 },
    { year: '2025', growth: 8.5, investment: 22340, vehicleRegistrations: 215000 }
  ],
  Karnataka: [
    { year: '2021', growth: 6.3, investment: 14200, vehicleRegistrations: 178000 },
    { year: '2022', growth: 7.0, investment: 15800, vehicleRegistrations: 202000 },
    { year: '2023', growth: 7.7, investment: 17900, vehicleRegistrations: 227000 },
    { year: '2024', growth: 8.4, investment: 19700, vehicleRegistrations: 261000 },
    { year: '2025', growth: 9.1, investment: 21780, vehicleRegistrations: 295000 }
  ],
  Telangana: [
    { year: '2021', growth: 5.0, investment: 12200, vehicleRegistrations: 247000 },
    { year: '2022', growth: 5.8, investment: 13700, vehicleRegistrations: 286000 },
    { year: '2023', growth: 6.4, investment: 15400, vehicleRegistrations: 326000 },
    { year: '2024', growth: 6.9, investment: 17350, vehicleRegistrations: 368000 },
    { year: '2025', growth: 7.3, investment: 19450, vehicleRegistrations: 410000 }
  ],
  'West Bengal': [
    { year: '2021', growth: 3.9, investment: 10900, vehicleRegistrations: 111000 },
    { year: '2022', growth: 4.4, investment: 12200, vehicleRegistrations: 124000 },
    { year: '2023', growth: 4.9, investment: 13800, vehicleRegistrations: 138000 },
    { year: '2024', growth: 5.3, investment: 15700, vehicleRegistrations: 152000 },
    { year: '2025', growth: 5.8, investment: 17620, vehicleRegistrations: 165000 }
  ],
  Punjab: [
    { year: '2021', growth: 3.5, investment: 9800, vehicleRegistrations: 121000 },
    { year: '2022', growth: 4.0, investment: 10900, vehicleRegistrations: 136000 },
    { year: '2023', growth: 4.3, investment: 12300, vehicleRegistrations: 151000 },
    { year: '2024', growth: 4.6, investment: 13800, vehicleRegistrations: 168000 },
    { year: '2025', growth: 4.9, investment: 15340, vehicleRegistrations: 185000 }
  ],
  Rajasthan: [
    { year: '2021', growth: 4.9, investment: 8900, vehicleRegistrations: 136000 },
    { year: '2022', growth: 5.5, investment: 9900, vehicleRegistrations: 153000 },
    { year: '2023', growth: 6.0, investment: 11200, vehicleRegistrations: 170000 },
    { year: '2024', growth: 6.6, investment: 12700, vehicleRegistrations: 188000 },
    { year: '2025', growth: 7.2, investment: 14280, vehicleRegistrations: 205000 }
  ],
  'Andhra Pradesh': [
    { year: '2021', growth: 4.6, investment: 8600, vehicleRegistrations: 180000 },
    { year: '2022', growth: 5.2, investment: 9700, vehicleRegistrations: 202000 },
    { year: '2023', growth: 5.8, investment: 11000, vehicleRegistrations: 225000 },
    { year: '2024', growth: 6.3, investment: 12400, vehicleRegistrations: 251000 },
    { year: '2025', growth: 6.8, investment: 13950, vehicleRegistrations: 275000 }
  ],
  'Madhya Pradesh': [
    { year: '2021', growth: 4.4, investment: 8400, vehicleRegistrations: 124000 },
    { year: '2022', growth: 4.9, investment: 9300, vehicleRegistrations: 140000 },
    { year: '2023', growth: 5.4, investment: 10600, vehicleRegistrations: 157000 },
    { year: '2024', growth: 5.9, investment: 11900, vehicleRegistrations: 173000 },
    { year: '2025', growth: 6.4, investment: 13420, vehicleRegistrations: 190000 }
  ],
  Haryana: [
    { year: '2021', growth: 5.6, investment: 7900, vehicleRegistrations: 182000 },
    { year: '2022', growth: 6.3, investment: 8900, vehicleRegistrations: 208000 },
    { year: '2023', growth: 7.0, investment: 10100, vehicleRegistrations: 234000 },
    { year: '2024', growth: 7.7, investment: 11400, vehicleRegistrations: 263000 },
    { year: '2025', growth: 8.3, investment: 12890, vehicleRegistrations: 295000 }
  ],
  Odisha: [
    { year: '2021', growth: 4.8, investment: 7600, vehicleRegistrations: 97000 },
    { year: '2022', growth: 5.5, investment: 8500, vehicleRegistrations: 108000 },
    { year: '2023', growth: 6.1, investment: 9600, vehicleRegistrations: 120000 },
    { year: '2024', growth: 6.8, investment: 10800, vehicleRegistrations: 132000 },
    { year: '2025', growth: 7.6, investment: 12150, vehicleRegistrations: 145000 }
  ],
  Kerala: [
    { year: '2021', growth: 3.7, investment: 7300, vehicleRegistrations: 111000 },
    { year: '2022', growth: 4.2, investment: 8200, vehicleRegistrations: 124000 },
    { year: '2023', growth: 4.6, investment: 9300, vehicleRegistrations: 138000 },
    { year: '2024', growth: 5.0, investment: 10400, vehicleRegistrations: 152000 },
    { year: '2025', growth: 5.3, investment: 11780, vehicleRegistrations: 165000 }
  ],
  'Himachal Pradesh': [
    { year: '2021', growth: 4.0, investment: 6200, vehicleRegistrations: 62000 },
    { year: '2022', growth: 4.5, investment: 7000, vehicleRegistrations: 70000 },
    { year: '2023', growth: 5.1, investment: 7900, vehicleRegistrations: 78000 },
    { year: '2024', growth: 5.6, investment: 9200, vehicleRegistrations: 86000 },
    { year: '2025', growth: 6.1, investment: 10620, vehicleRegistrations: 95000 }
  ],
  Uttarakhand: [
    { year: '2021', growth: 4.2, investment: 6000, vehicleRegistrations: 72000 },
    { year: '2022', growth: 4.8, investment: 6800, vehicleRegistrations: 81000 },
    { year: '2023', growth: 5.4, investment: 7700, vehicleRegistrations: 90000 },
    { year: '2024', growth: 6.0, investment: 9000, vehicleRegistrations: 100000 },
    { year: '2025', growth: 6.7, investment: 10340, vehicleRegistrations: 110000 }
  ],
  Goa: [
    { year: '2021', growth: 3.2, investment: 5200, vehicleRegistrations: 48000 },
    { year: '2022', growth: 3.9, investment: 5900, vehicleRegistrations: 54000 },
    { year: '2023', growth: 4.4, investment: 6700, vehicleRegistrations: 61000 },
    { year: '2024', growth: 4.9, investment: 7800, vehicleRegistrations: 68000 },
    { year: '2025', growth: 5.4, investment: 8950, vehicleRegistrations: 75000 }
  ],
  Bihar: [
    { year: '2021', growth: 3.1, investment: 4700, vehicleRegistrations: 83000 },
    { year: '2022', growth: 3.6, investment: 5400, vehicleRegistrations: 93000 },
    { year: '2023', growth: 4.0, investment: 6200, vehicleRegistrations: 103000 },
    { year: '2024', growth: 4.4, investment: 7100, vehicleRegistrations: 114000 },
    { year: '2025', growth: 4.8, investment: 8120, vehicleRegistrations: 125000 }
  ],
  Assam: [
    { year: '2021', growth: 3.4, investment: 4500, vehicleRegistrations: 71000 },
    { year: '2022', growth: 3.9, investment: 5100, vehicleRegistrations: 79000 },
    { year: '2023', growth: 4.3, investment: 5800, vehicleRegistrations: 87000 },
    { year: '2024', growth: 4.8, investment: 6700, vehicleRegistrations: 96000 },
    { year: '2025', growth: 5.2, investment: 7680, vehicleRegistrations: 105000 }
  ],
  Tripura: [
    { year: '2021', growth: 2.7, investment: 3800, vehicleRegistrations: 43000 },
    { year: '2022', growth: 3.2, investment: 4300, vehicleRegistrations: 49000 },
    { year: '2023', growth: 3.6, investment: 4900, vehicleRegistrations: 54000 },
    { year: '2024', growth: 4.1, investment: 5600, vehicleRegistrations: 60000 },
    { year: '2025', growth: 4.5, investment: 6420, vehicleRegistrations: 65000 }
  ],
  'Jammu & Kashmir': [
    { year: '2021', growth: 2.2, investment: 3400, vehicleRegistrations: 35000 },
    { year: '2022', growth: 2.7, investment: 3900, vehicleRegistrations: 40000 },
    { year: '2023', growth: 3.1, investment: 4500, vehicleRegistrations: 45000 },
    { year: '2024', growth: 3.5, investment: 5200, vehicleRegistrations: 50000 },
    { year: '2025', growth: 3.9, investment: 5890, vehicleRegistrations: 55000 }
  ],
  Chhattisgarh: [
    { year: '2021', growth: 4.5, investment: 6100, vehicleRegistrations: 76000 },
    { year: '2022', growth: 5.1, investment: 6900, vehicleRegistrations: 89000 },
    { year: '2023', growth: 5.8, investment: 7700, vehicleRegistrations: 103000 },
    { year: '2024', growth: 6.4, investment: 8700, vehicleRegistrations: 119000 },
    { year: '2025', growth: 7.1, investment: 9780, vehicleRegistrations: 135000 }
  ],
  Jharkhand: [
    { year: '2021', growth: 3.8, investment: 5600, vehicleRegistrations: 56000 },
    { year: '2022', growth: 4.4, investment: 6400, vehicleRegistrations: 66000 },
    { year: '2023', growth: 5.0, investment: 7200, vehicleRegistrations: 76000 },
    { year: '2024', growth: 5.6, investment: 8100, vehicleRegistrations: 86000 },
    { year: '2025', growth: 6.3, investment: 8950, vehicleRegistrations: 95000 }
  ],
  Meghalaya: [
    { year: '2021', growth: 2.9, investment: 3600, vehicleRegistrations: 27000 },
    { year: '2022', growth: 3.4, investment: 4100, vehicleRegistrations: 32000 },
    { year: '2023', growth: 3.9, investment: 4600, vehicleRegistrations: 36000 },
    { year: '2024', growth: 4.4, investment: 5100, vehicleRegistrations: 41000 },
    { year: '2025', growth: 4.9, investment: 5670, vehicleRegistrations: 45000 }
  ],
  Manipur: [
    { year: '2021', growth: 2.1, investment: 2700, vehicleRegistrations: 21000 },
    { year: '2022', growth: 2.5, investment: 3000, vehicleRegistrations: 24000 },
    { year: '2023', growth: 2.9, investment: 3400, vehicleRegistrations: 28000 },
    { year: '2024', growth: 3.3, investment: 3800, vehicleRegistrations: 32000 },
    { year: '2025', growth: 3.6, investment: 4230, vehicleRegistrations: 35000 }
  ],
  Mizoram: [
    { year: '2021', growth: 2.3, investment: 2500, vehicleRegistrations: 17000 },
    { year: '2022', growth: 2.7, investment: 2800, vehicleRegistrations: 20000 },
    { year: '2023', growth: 3.1, investment: 3100, vehicleRegistrations: 23000 },
    { year: '2024', growth: 3.5, investment: 3500, vehicleRegistrations: 26000 },
    { year: '2025', growth: 3.8, investment: 3890, vehicleRegistrations: 28000 }
  ],
  Nagaland: [
    { year: '2021', growth: 2.7, investment: 2900, vehicleRegistrations: 23000 },
    { year: '2022', growth: 3.1, investment: 3300, vehicleRegistrations: 27000 },
    { year: '2023', growth: 3.5, investment: 3700, vehicleRegistrations: 31000 },
    { year: '2024', growth: 3.8, investment: 4100, vehicleRegistrations: 35000 },
    { year: '2025', growth: 4.2, investment: 4560, vehicleRegistrations: 38000 }
  ],
  Sikkim: [
    { year: '2021', growth: 3.2, investment: 2100, vehicleRegistrations: 15000 },
    { year: '2022', growth: 3.7, investment: 2400, vehicleRegistrations: 18000 },
    { year: '2023', growth: 4.2, investment: 2700, vehicleRegistrations: 20000 },
    { year: '2024', growth: 4.7, investment: 3100, vehicleRegistrations: 23000 },
    { year: '2025', growth: 5.1, investment: 3450, vehicleRegistrations: 25000 }
  ],
  'Arunachal Pradesh': [
    { year: '2021', growth: 2.8, investment: 3000, vehicleRegistrations: 25000 },
    { year: '2022', growth: 3.2, investment: 3400, vehicleRegistrations: 29000 },
    { year: '2023', growth: 3.6, investment: 3800, vehicleRegistrations: 33000 },
    { year: '2024', growth: 4.0, investment: 4300, vehicleRegistrations: 37000 },
    { year: '2025', growth: 4.4, investment: 4780, vehicleRegistrations: 42000 }
  ]
};

const sectorYearlyRecords = {
  Automotive: [
    { year: '2021', growth: 5.4, share: 14.1 },
    { year: '2022', growth: 6.1, share: 14.4 },
    { year: '2023', growth: 6.8, share: 14.7 },
    { year: '2024', growth: 7.5, share: 15.0 },
    { year: '2025', growth: 8.2, share: 15.3 }
  ],
  Pharmaceuticals: [
    { year: '2021', growth: 8.0, share: 16.9 },
    { year: '2022', growth: 9.2, share: 17.3 },
    { year: '2023', growth: 10.1, share: 17.8 },
    { year: '2024', growth: 11.0, share: 18.2 },
    { year: '2025', growth: 12.1, share: 18.7 }
  ],
  Textiles: [
    { year: '2021', growth: 1.2, share: 12.9 },
    { year: '2022', growth: 2.0, share: 12.6 },
    { year: '2023', growth: 2.5, share: 12.4 },
    { year: '2024', growth: 3.0, share: 12.2 },
    { year: '2025', growth: 3.4, share: 12.1 }
  ],
  Electronics: [
    { year: '2021', growth: 9.6, share: 19.2 },
    { year: '2022', growth: 11.0, share: 20.0 },
    { year: '2023', growth: 12.4, share: 20.8 },
    { year: '2024', growth: 14.2, share: 21.6 },
    { year: '2025', growth: 15.6, share: 22.4 }
  ],
  Chemicals: [
    { year: '2021', growth: 3.5, share: 13.1 },
    { year: '2022', growth: 4.2, share: 13.4 },
    { year: '2023', growth: 5.0, share: 13.7 },
    { year: '2024', growth: 5.9, share: 13.9 },
    { year: '2025', growth: 6.8, share: 14.2 }
  ],
  'Food Processing': [
    { year: '2021', growth: 2.8, share: 7.4 },
    { year: '2022', growth: 3.4, share: 7.6 },
    { year: '2023', growth: 4.0, share: 7.8 },
    { year: '2024', growth: 4.4, share: 7.9 },
    { year: '2025', growth: 4.9, share: 8.1 }
  ],
  'Steel & Metals': [
    { year: '2021', growth: 2.9, share: 9.2 },
    { year: '2022', growth: 3.5, share: 9.4 },
    { year: '2023', growth: 4.1, share: 9.7 },
    { year: '2024', growth: 4.8, share: 9.9 },
    { year: '2025', growth: 5.3, share: 10.2 }
  ]
};

const states = [
  { state: 'Gujarat', growth: 7.8, rank: 1, investment: 28450, vehicleRegistrations: 245000, portfolio: { automotive: 35, electronics: 30, pharma: 20, other: 15 }, mainCities: ['Ahmedabad', 'Vadodara', 'Surat', 'Rajkot', 'Bhavnagar', 'Anand'] },
  { state: 'Maharashtra', growth: 6.9, rank: 2, investment: 26890, vehicleRegistrations: 385000, portfolio: { automotive: 28, pharma: 32, chemicals: 25, other: 15 }, mainCities: ['Mumbai', 'Pune', 'Nashik', 'Aurangabad', 'Nagpur', 'Kolhapur'] },
  { state: 'Tamil Nadu', growth: 6.2, rank: 3, investment: 24560, vehicleRegistrations: 320000, portfolio: { textiles: 40, electronics: 35, auto: 15, other: 10 }, mainCities: ['Chennai', 'Coimbatore', 'Tiruppur', 'Madurai', 'Hosur', 'Trichy'] },
  { state: 'Uttar Pradesh', growth: 8.5, rank: 4, investment: 22340, vehicleRegistrations: 215000, portfolio: { sugar: 30, chemicals: 25, autos: 20, other: 25 }, mainCities: ['Kanpur', 'Lucknow', 'Noida', 'Varanasi', 'Ghaziabad', 'Agra'] },
  { state: 'Karnataka', growth: 9.1, rank: 5, investment: 21780, vehicleRegistrations: 295000, portfolio: { electronics: 45, auto: 25, pharma: 20, other: 10 }, mainCities: ['Bangalore', 'Belgaum', 'Hubballi', 'Mangalore', 'Mysuru', 'Tumakuru'] },
  { state: 'Telangana', growth: 7.3, rank: 6, investment: 19450, vehicleRegistrations: 410000, portfolio: { pharma: 50, textiles: 25, auto: 15, other: 10 }, mainCities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Vikarabad', 'Khammam', 'Karimnagar'] },
  { state: 'West Bengal', growth: 5.8, rank: 7, investment: 17620, vehicleRegistrations: 165000, portfolio: { jute: 35, auto: 30, chemicals: 20, other: 15 }, mainCities: ['Kolkata', 'Durgapur', 'Asansol', 'Siliguri', 'Haldia', 'Howrah'] },
  { state: 'Punjab', growth: 4.9, rank: 8, investment: 15340, vehicleRegistrations: 185000, portfolio: { auto: 40, chemicals: 35, textiles: 15, other: 10 }, mainCities: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Mohali', 'Bathinda'] },
  { state: 'Rajasthan', growth: 7.2, rank: 9, investment: 14280, vehicleRegistrations: 205000, portfolio: { ceramics: 35, textiles: 30, auto: 20, other: 15 }, mainCities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bhiwadi', 'Ajmer'] },
  { state: 'Andhra Pradesh', growth: 6.8, rank: 10, investment: 13950, vehicleRegistrations: 275000, portfolio: { pharma: 40, auto: 30, electronics: 20, other: 10 }, mainCities: ['Visakhapatnam', 'Vijayawada', 'Tirupati', 'Guntur', 'Kakinada', 'Nellore'] },
  { state: 'Madhya Pradesh', growth: 6.4, rank: 11, investment: 13420, vehicleRegistrations: 190000, portfolio: { auto: 38, chemicals: 32, steel: 20, other: 10 }, mainCities: ['Indore', 'Bhopal', 'Gwalior', 'Jabalpur', 'Ujjain', 'Dewas'] },
  { state: 'Haryana', growth: 8.3, rank: 12, investment: 12890, vehicleRegistrations: 295000, portfolio: { auto: 45, electronics: 30, chemicals: 15, other: 10 }, mainCities: ['Gurgaon', 'Faridabad', 'Hisar', 'Rohtak', 'Panipat', 'Sonipat'] },
  { state: 'Odisha', growth: 7.6, rank: 13, investment: 12150, vehicleRegistrations: 145000, portfolio: { steel: 45, auto: 25, chemicals: 20, other: 10 }, mainCities: ['Rourkela', 'Cuttack', 'Paradip', 'Sambalpur', 'Jharsuguda', 'Balasore'] },
  { state: 'Kerala', growth: 5.3, rank: 14, investment: 11780, vehicleRegistrations: 165000, portfolio: { pharma: 50, textiles: 25, food: 15, other: 10 }, mainCities: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Palakkad', 'Kannur'] },
  { state: 'Himachal Pradesh', growth: 6.1, rank: 15, investment: 10620, vehicleRegistrations: 95000, portfolio: { cement: 40, auto: 35, chemicals: 15, other: 10 }, mainCities: ['Shimla', 'Mandi', 'Solan', 'Kangra', 'Baddi', 'Una'] },
  { state: 'Uttarakhand', growth: 6.7, rank: 16, investment: 10340, vehicleRegistrations: 110000, portfolio: { chemicals: 40, pharma: 35, food: 15, other: 10 }, mainCities: ['Dehradun', 'Haridwar', 'Roorkee', 'Pithoragarh', 'Rudrapur', 'Haldwani'] },
  { state: 'Goa', growth: 5.4, rank: 17, investment: 8950, vehicleRegistrations: 75000, portfolio: { iron_ore: 50, chemicals: 25, auto: 15, other: 10 }, mainCities: ['Panaji', 'Vasco da Gama', 'Margao', 'Pernem', 'Mapusa', 'Ponda'] },
  { state: 'Bihar', growth: 4.8, rank: 18, investment: 8120, vehicleRegistrations: 125000, portfolio: { sugar: 40, pharma: 30, auto: 20, other: 10 }, mainCities: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Hajipur'] },
  { state: 'Assam', growth: 5.2, rank: 19, investment: 7680, vehicleRegistrations: 105000, portfolio: { tea: 45, chemicals: 30, auto: 15, other: 10 }, mainCities: ['Guwahati', 'Silchar', 'Dibrugarh', 'Barpeta', 'Jorhat', 'Tezpur'] },
  { state: 'Tripura', growth: 4.5, rank: 20, investment: 6420, vehicleRegistrations: 65000, portfolio: { rubber: 40, chemicals: 35, textiles: 15, other: 10 }, mainCities: ['Agartala', 'Udaipur', 'Kailashahar', 'Dharmanagar', 'Ambassa', 'Belonia'] },
  { state: 'Jammu & Kashmir', growth: 3.9, rank: 21, investment: 5890, vehicleRegistrations: 55000, portfolio: { handicrafts: 45, food: 30, auto: 15, other: 10 }, mainCities: ['Srinagar', 'Jammu', 'Leh', 'Anantnag', 'Baramulla', 'Kupwara'] },
  { state: 'Chhattisgarh', growth: 7.1, rank: 22, investment: 9780, vehicleRegistrations: 135000, portfolio: { steel: 50, auto: 30, chemicals: 15, other: 5 }, mainCities: ['Raipur', 'Bhilai', 'Durg', 'Bilaspur', 'Korba', 'Raigarh'] },
  { state: 'Jharkhand', growth: 6.3, rank: 23, investment: 8950, vehicleRegistrations: 95000, portfolio: { steel: 45, mining: 35, auto: 15, other: 5 }, mainCities: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Giridih', 'Bokaro', 'Hazaribagh'] },
  { state: 'Meghalaya', growth: 4.9, rank: 24, investment: 5670, vehicleRegistrations: 45000, portfolio: { coal: 40, food: 35, auto: 20, other: 5 }, mainCities: ['Shillong', 'Tura', 'Jowai', 'Nongstoin', 'Baghmara', 'Williamnagar'] },
  { state: 'Manipur', growth: 3.6, rank: 25, investment: 4230, vehicleRegistrations: 35000, portfolio: { textiles: 45, food: 35, handicrafts: 15, other: 5 }, mainCities: ['Imphal', 'Bishnupur', 'Churachandpur', 'Ukhrul', 'Thoubal', 'Kakching'] },
  { state: 'Mizoram', growth: 3.8, rank: 26, investment: 3890, vehicleRegistrations: 28000, portfolio: { food: 50, textiles: 30, auto: 15, other: 5 }, mainCities: ['Aizawl', 'Lunglei', 'Saiha', 'Kolasib', 'Champhai', 'Serchhip'] },
  { state: 'Nagaland', growth: 4.2, rank: 27, investment: 4560, vehicleRegistrations: 38000, portfolio: { food: 50, handicrafts: 35, auto: 10, other: 5 }, mainCities: ['Kohima', 'Dimapur', 'Mokokchung', 'Wokha', 'Tuensang', 'Mon'] },
  { state: 'Sikkim', growth: 5.1, rank: 28, investment: 3450, vehicleRegistrations: 25000, portfolio: { food: 55, tourism: 30, auto: 10, other: 5 }, mainCities: ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan', 'Singtam', 'Rangpo'] },
  { state: 'Arunachal Pradesh', growth: 4.4, rank: 29, investment: 4780, vehicleRegistrations: 42000, portfolio: { food: 50, forestry: 35, auto: 10, other: 5 }, mainCities: ['Itanagar', 'Naharlagun', 'Pasighat', 'Tezu', 'Bomdila', 'Roing'] }
];

const sectors = [
  { name: 'Automotive', growth: 8.2, share: 15.3, color: '#1e3a8a' },
  { name: 'Pharmaceuticals', growth: 12.1, share: 18.7, color: '#10b981' },
  { name: 'Textiles', growth: 3.4, share: 12.1, color: '#f59e0b' },
  { name: 'Electronics', growth: 15.6, share: 22.4, color: '#8b5cf6' },
  { name: 'Chemicals', growth: 6.8, share: 14.2, color: '#ef4444' },
  { name: 'Food Processing', growth: 4.9, share: 8.1, color: '#06b6d4' },
  { name: 'Steel & Metals', growth: 5.3, share: 10.2, color: '#6b7280' }
];

const regionalClusters = [
  {
    name: 'Mumbai-Pune-Nashik',
    cities: ['Mumbai', 'Pune', 'Nashik'],
    combinedInvestment: 20820,
    avgGrowth: 7.1,
    focusSectors: ['Automotive', 'Chemicals', 'Electronics']
  },
  {
    name: 'Bangalore-Hosur',
    cities: ['Bangalore', 'Hosur'],
    combinedInvestment: 12400,
    avgGrowth: 8.6,
    focusSectors: ['Electronics', 'Automotive', 'Aerospace']
  },
  {
    name: 'NCR-Delhi',
    cities: ['Delhi', 'Noida', 'Gurgaon', 'Faridabad', 'Ghaziabad'],
    combinedInvestment: 28750,
    avgGrowth: 8.5,
    focusSectors: ['Electronics', 'Automotive', 'Engineering Goods']
  },
  {
    name: 'Chennai-Coimbatore-Hosur',
    cities: ['Chennai', 'Coimbatore', 'Hosur'],
    combinedInvestment: 15730,
    avgGrowth: 7.6,
    focusSectors: ['Textiles', 'Electronics', 'Automotive']
  },
  {
    name: 'Ahmedabad-Vadodara-Surat',
    cities: ['Ahmedabad', 'Vadodara', 'Surat'],
    combinedInvestment: 18980,
    avgGrowth: 7.6,
    focusSectors: ['Automotive', 'Chemicals', 'Textiles']
  },
  {
    name: 'Hyderabad-Warangal',
    cities: ['Hyderabad', 'Warangal'],
    combinedInvestment: 11070,
    avgGrowth: 7.8,
    focusSectors: ['Pharmaceuticals', 'Textiles', 'Electronics']
  },
  {
    name: 'Visakhapatnam-Vijayawada',
    cities: ['Visakhapatnam', 'Vijayawada'],
    combinedInvestment: 10550,
    avgGrowth: 7.4,
    focusSectors: ['Pharmaceuticals', 'Food Processing', 'Automotive']
  },
  {
    name: 'Eastern Metals Belt',
    cities: ['Ranchi', 'Raipur', 'Durgapur'],
    combinedInvestment: 10010,
    avgGrowth: 6.2,
    focusSectors: ['Steel & Metals', 'Mining', 'Chemicals']
  }
];

const investmentLocations = cityProfiles.map((city) => ({
  city: city.city,
  state: city.state,
  amount: city.currentInvestment,
  sector: city.leadSector,
  cluster: city.cluster
}));

export const manufacturingData = {
  currentGrowth: 4.0,
  previousGrowth: 3.7,
  dataSources: [
    { name: 'Ministry of Statistics & Programme Implementation', weight: 20 },
    { name: 'VAHAN Database (Vehicle Registration)', weight: 18 },
    { name: 'Central Bank of India (RBI)', weight: 18 },
    { name: 'Corporate Affairs Ministry', weight: 15 },
    { name: 'Industry Association Reports', weight: 15 },
    { name: 'State Government Data', weight: 14 }
  ],
  iipData: [
    { month: 'Jan 2024', value: 4.2, category: 'Manufacturing' },
    { month: 'Feb 2024', value: 4.5, category: 'Manufacturing' },
    { month: 'Mar 2024', value: 4.8, category: 'Manufacturing' },
    { month: 'Apr 2024', value: 5.1, category: 'Manufacturing' },
    { month: 'May 2024', value: 5.3, category: 'Manufacturing' },
    { month: 'Jun 2024', value: 5.6, category: 'Manufacturing' },
    { month: 'Jul 2024', value: 5.2, category: 'Manufacturing' },
    { month: 'Aug 2024', value: 5.7, category: 'Manufacturing' },
    { month: 'Sep 2024', value: 6.0, category: 'Manufacturing' },
    { month: 'Oct 2024', value: 6.3, category: 'Manufacturing' },
    { month: 'Nov 2024', value: 6.5, category: 'Manufacturing' },
    { month: 'Dec 2024', value: 6.8, category: 'Manufacturing' },
    { month: 'Jan 2025', value: 5.2, category: 'Manufacturing' },
    { month: 'Feb 2025', value: 5.8, category: 'Manufacturing' },
    { month: 'Mar 2025', value: 6.1, category: 'Manufacturing' },
    { month: 'Apr 2025', value: 5.9, category: 'Manufacturing' },
    { month: 'May 2025', value: 6.3, category: 'Manufacturing' },
    { month: 'Jun 2025', value: 6.7, category: 'Manufacturing' },
    { month: 'Jul 2025', value: 7.1, category: 'Manufacturing' },
    { month: 'Aug 2025', value: 7.5, category: 'Manufacturing' },
    { month: 'Sep 2025', value: 8.2, category: 'Manufacturing' },
    { month: 'Oct 2025', value: 8.5, category: 'Manufacturing' },
    { month: 'Nov 2025', value: 8.8, category: 'Manufacturing' },
    { month: 'Dec 2025', value: 9.1, category: 'Manufacturing' }
  ],
  sectors,
  states,
  investmentLocations,
  cityProfiles,
  stateYearlyRecords,
  sectorYearlyRecords,
  regionalClusters,
  delhiNcrMetrics: {
    region: 'Delhi/NCR',
    growth: 8.5,
    investment: 28750,
    vehicleRegistrations: 588000,
    keyCities: ['Delhi', 'Noida', 'Gurgaon', 'Faridabad', 'Ghaziabad'],
    topSectors: ['Electronics', 'Automotive', 'Engineering Goods'],
    yearly: [
      { year: '2021', growth: 5.8, investment: 18200, vehicleRegistrations: 392000 },
      { year: '2022', growth: 6.5, investment: 20500, vehicleRegistrations: 439000 },
      { year: '2023', growth: 7.1, investment: 22800, vehicleRegistrations: 488000 },
      { year: '2024', growth: 7.8, investment: 25600, vehicleRegistrations: 541000 },
      { year: '2025', growth: 8.5, investment: 28750, vehicleRegistrations: 588000 }
    ]
  }
};
