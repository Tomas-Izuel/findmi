/**
 * Calcula el seniority ponderado de un músico
 *
 * Fórmula: seniority = base_weight + min(ln(1 + num_experiences) * 2, 5)
 *
 * - base_weight: peso del rango de antigüedad (1-5)
 * - ln(1 + n): logaritmo natural que hace que cada experiencia adicional sume menos
 * - Factor * 2: amplifica el efecto de las experiencias
 * - min(..., 5): tope máximo de bonus por experiencias
 *
 * Ejemplos:
 * - 0 exp = base
 * - 5 exp = base + 3.6
 * - 20 exp = base + 5 (tope)
 * - 1000 exp = base + 5 (mismo tope, la función está limitada)
 *
 * @param baseWeight - Peso del rango de antigüedad (1-5)
 * @param numExperiences - Número de experiencias del músico
 * @returns Seniority calculado (redondeado a entero)
 */
export function calculateSeniority(
  baseWeight: number,
  numExperiences: number
): number {
  // Limitar el peso base entre 1 y 5
  const clampedBase = Math.max(1, Math.min(5, baseWeight));

  // Calcular bonus por experiencias con tope
  // ln(1 + n) crece logarítmicamente, así que 1000 experiencias no rompe la función
  const experienceBonus = Math.min(Math.log(1 + numExperiences) * 2, 5);

  // Seniority total = base + bonus, redondeado
  const totalSeniority = clampedBase + experienceBonus;

  // Redondear a entero (multiplicado por 10 para tener más granularidad)
  return Math.round(totalSeniority * 10);
}

/**
 * Obtiene el nivel de seniority como texto descriptivo
 *
 * @param seniority - Valor de seniority calculado
 * @returns Descripción del nivel
 */
export function getSeniorityLabel(seniority: number): string {
  const normalized = seniority / 10; // Volver al valor original

  if (normalized < 2) return "Principiante";
  if (normalized < 4) return "Intermedio";
  if (normalized < 6) return "Avanzado";
  if (normalized < 8) return "Experto";
  return "Maestro";
}
