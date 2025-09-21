// Radix UI dark color variants
const RADIX_DARK_COLORS = [
  '#dc2626', // red-600
  '#ea580c', // orange-600
  '#d97706', // amber-600
  '#ca8a04', // yellow-600
  '#65a30d', // lime-600
  '#16a34a', // green-600
  '#059669', // emerald-600
  '#0d9488', // teal-600
  '#0891b2', // cyan-600
  '#0284c7', // sky-600
  '#2563eb', // blue-600
  '#4f46e5', // indigo-600
  '#7c3aed', // violet-600
  '#9333ea', // purple-600
  '#c026d3', // fuchsia-600
  '#e11d48', // pink-600
  '#be185d', // rose-600
  '#374151', // gray-700
  '#1f2937', // slate-800
  '#0f172a', // zinc-900
];

export const getRandomDarkColors = (count: number = 8): string[] => {
  if (count <= 0) {
    throw new Error('Count must be a positive number');
  }
  
  const colors: string[] = [];
  const availableColors = [...RADIX_DARK_COLORS]; // Create a copy to avoid mutating original
  
  for (let i = 0; i < count; i++) {
    if (availableColors.length === 0) {
      // If we need more colors than available, return black
      colors.push('#000000');
    } else {
      const randomIndex = Math.floor(Math.random() * availableColors.length);
      const selectedColor = availableColors.splice(randomIndex, 1)[0];
      colors.push(selectedColor);
    }
  }
  
  return colors;
};

export const getRadixDarkColorPalette = (): string[] => {
  return [...RADIX_DARK_COLORS];
};
