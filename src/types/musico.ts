export interface Contact {
  instagram: string;
  email: string;
  phone: string;
}

export interface Musico {
  id: string;
  nombre: string;
  descripcion: string;
  contacto: Contact;
  instrumento_id: number;
  experiencia: string;
  tiempo: number;
  image: string;
  intrumento_nombre: string;
}
