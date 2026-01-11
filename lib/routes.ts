/**
 * Sistema de rutas tipado para la aplicación
 * Esto previene errores de typo y proporciona autocompletado
 */

/**
 * Rutas estáticas de la aplicación
 */
export enum AppRoutes {
  HOME = "/",
  SEARCH = "/buscar",
  PROFILE = "/perfil",
  NEW_MUSICIAN = "/perfil/nuevo-musico",
  EDIT_PROFILE = "/perfil/editar",
  ONBOARDING = "/onboarding",
  LOGIN = "/login",
  REGISTER = "/registro",
}

/**
 * Rutas dinámicas de la aplicación
 */
export const DynamicRoutes = {
  /**
   * Ruta al perfil público de un músico
   * @param id - ID del músico
   */
  musician: (id: string | number) => `/musico/${id}` as const,
} as const;

/**
 * Todas las rutas de la aplicación (para validación y type guards)
 */
export type Route = AppRoutes | ReturnType<typeof DynamicRoutes.musician>;

/**
 * Helper para verificar si una ruta es válida
 */
export function isValidRoute(path: string): path is Route {
  return (
    Object.values(AppRoutes).includes(path as AppRoutes) ||
    path.startsWith("/musico/")
  );
}

/**
 * Helper para obtener el nombre de una ruta (útil para analytics)
 */
export function getRouteName(path: string): string {
  if (path === AppRoutes.HOME) return "Home";
  if (path === AppRoutes.SEARCH) return "Búsqueda";
  if (path === AppRoutes.PROFILE) return "Perfil";
  if (path === AppRoutes.NEW_MUSICIAN) return "Nuevo Músico";
  if (path === AppRoutes.EDIT_PROFILE) return "Editar Perfil";
  if (path === AppRoutes.ONBOARDING) return "Onboarding";
  if (path === AppRoutes.LOGIN) return "Login";
  if (path === AppRoutes.REGISTER) return "Registro";
  if (path.startsWith("/musico/")) return "Perfil de Músico";
  return "Desconocido";
}
