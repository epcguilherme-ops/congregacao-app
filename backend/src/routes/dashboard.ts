import express, { Router } from 'express';
import { verificarToken, verificarAnciao } from '@/middleware/auth';
import User from '@/models/User';
import RelatorioServico from '@/models/RelatorioServico';

const router = Router();

// GET /api/dashboard/resumo - Dados gerais do dashboard
router.get('/resumo', verificarToken, verificarAnciao, async (req, res) => {
  try {
    const totalPioneiros = await User.countDocuments({
      $or: [
        { 'funcoes.pioneiroRegular': true },
        { 'funcoes.pioneiroAuxiliar': true }
      ]
    });

    const totalPublicadores = await User.countDocuments({
      'funcoes.publicador': true
    });

    const mesAtual = new Date().getMonth() + 1;
    const anoAtual = new Date().getFullYear();

    const relatoriosEnviados = await RelatorioServico.countDocuments({
      mes: mesAtual,
      ano: anoAtual,
      enviado: true
    });

    const assistenciaMedia = 0; // TODO: calcular de reuniões

    res.json({
      totalPioneiros,
      totalPublicadores,
      relatoriosEnviados,
      assistenciaMedia
    });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar dados do dashboard' });
  }
});

// GET /api/dashboard/relatorios-nao-enviados
router.get('/relatorios-nao-enviados', verificarToken, verificarAnciao, async (req, res) => {
  try {
    const mesAtual = new Date().getMonth() + 1;
    const anoAtual = new Date().getFullYear();

    const relatoriosEnviados = await RelatorioServico.find({
      mes: mesAtual,
      ano: anoAtual,
      enviado: true
    }).select('usuarioId');

    const userIdsComRelatorio = relatoriosEnviados.map(r => r.usuarioId);

    const publicadores = await User.find({
      _id: { $nin: userIdsComRelatorio },
      'funcoes.publicador': true
    }).select('nome email funcoes');

    res.json(publicadores);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar relatórios não enviados' });
  }
});

// GET /api/dashboard/designacoes - Estatísticas de designações
router.get('/designacoes', verificarToken, verificarAnciao, async (req, res) => {
  try {
    // TODO: implementar com modelo de Designação
    res.json({
      totalDesignacoes: 0,
      designacoesEste Mes: 0
    });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar estatísticas' });
  }
});

export default router;
