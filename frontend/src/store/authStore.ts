import { create } from 'zustand';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  funcoes: {
    anciao: boolean;
    servoMinisterial: boolean;
    pioneiroRegular: boolean;
    pioneiroAuxiliar: boolean;
    publicador: boolean;
  };
  grupoId?: string;
}

interface AuthStore {
  usuario: Usuario | null;
  token: string | null;
  login: (usuario: Usuario, token: string) => void;
  logout: () => void;
  updateUsuario: (dados: Partial<Usuario>) => void;
  isAutenticado: () => boolean;
  isAnciao: () => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  usuario: localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')!) : null,
  token: localStorage.getItem('token'),
  
  login: (usuario: Usuario, token: string) => {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('token', token);
    set({ usuario, token });
  },
  
  logout: () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    set({ usuario: null, token: null });
  },

  updateUsuario: (dados: Partial<Usuario>) => {
    const { usuario } = get();
    if (usuario) {
      const usuarioAtualizado = { ...usuario, ...dados };
      localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
      set({ usuario: usuarioAtualizado });
    }
  },
  
  isAutenticado: () => {
    const { token } = get();
    return !!token;
  },
  
  isAnciao: () => {
    const { usuario } = get();
    return usuario?.funcoes?.anciao ?? false;
  }
}));
