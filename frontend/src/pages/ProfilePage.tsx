import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usersAPI } from '@/services/api';
import { useAuthStore } from '@/store/authStore';
import { User, Mail, Phone, Save } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { usuario, updateUsuario } = useAuthStore();
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    nome: usuario?.nome || '',
    email: usuario?.email || '',
    telefone: usuario?.telefone || ''
  });

  const handleSave = async () => {
    try {
      await usersAPI.atualizarPerfil(formData);
      updateUsuario(formData);
      setEditando(false);
    } catch (error) {
      console.error('Erro ao atualizar perfil', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Meu Perfil</h1>
              <p className="text-gray-600">{usuario?.email}</p>
            </div>
          </div>

          {!editando ? (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Nome Completo</p>
                <p className="text-xl font-semibold text-gray-800">{usuario?.nome}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Mail size={16} />
                  <p>E-mail</p>
                </div>
                <p className="text-lg font-semibold text-gray-800">{usuario?.email}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Phone size={16} />
                  <p>Telefone</p>
                </div>
                <p className="text-lg font-semibold text-gray-800">
                  {usuario?.telefone || 'Não informado'}
                </p>
              </div>

              <button
                onClick={() => setEditando(true)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Editar Perfil
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  Salvar
                </button>
                <button
                  onClick={() => setEditando(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Funções Espirituais */}
          <div className="mt-8 pt-8 border-t-2">
            <h2 className="text-xl font-bold mb-4">Funções Espirituais</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {usuario?.funcoes.anciao && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg text-sm font-semibold">
                  👨‍⚖️ Ancião
                </span>
              )}
              {usuario?.funcoes.servoMinisterial && (
                <span className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm font-semibold">
                  🙏 Servo Ministerial
                </span>
              )}
              {usuario?.funcoes.pioneiroRegular && (
                <span className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-semibold">
                  🌟 Pioneiro Regular
                </span>
              )}
              {usuario?.funcoes.pioneiroAuxiliar && (
                <span className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-semibold">
                  ⭐ Pioneiro Auxiliar
                </span>
              )}
              {usuario?.funcoes.publicador && (
                <span className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm font-semibold">
                  📖 Publicador
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
