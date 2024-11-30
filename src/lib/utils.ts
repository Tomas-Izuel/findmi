import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getProvince = async (defaultProvince = 'Mendoza') => {
  try {
    const response = await fetch("http://ip-api.com/json/");
    if (!response.ok) {
      throw new Error("Error en la solicitud de geolocalización.");
    }
    const data = await response.json();
    return data.regionName || defaultProvince; // Devuelve la provincia o la predeterminada
  } catch (error) {
    console.error("Error:", error);
    return defaultProvince; // Devuelve la predeterminada en caso de error
  }
};
