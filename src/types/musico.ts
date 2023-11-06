export interface Contact {
  instagram: string;
  email: string;
  phone: string;
}

export interface Musico {
  id: string;
  nombre: string;
  descripcion: string;
  email: string;
  telefono: string;
  instagram: string;
  instrumento_id: number;
  experiencia: string;
  tiempo: number;
  image: string;
  intrumento_nombre: string;
}

export interface Instrumento {
  id: number;
  nombre: string;
}
