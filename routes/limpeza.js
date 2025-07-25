import express from 'express';
//import { supabase } from '../supabaseClient.js';

const router = express.Router();

// DELETE /limpeza/limpar-desativados
router.delete('/limpar-desativados', async (req, res) => {
  try {
    const { data: desativadas, error } = await supabase
      .from('pessoa_db')
      .select('id_pessoa')
      .eq('ativo', false);

    if (error) return res.status(500).json({ erro: error.message });

    const idsParaExcluir = desativadas.map(p => p.id_pessoa);

    if (idsParaExcluir.length > 0) {
      const { error: erroDel } = await supabase
        .from('pessoa')
        .delete()
        .in('id', idsParaExcluir);

      if (erroDel) return res.status(500).json({ erro: erroDel.message });
    }

    res.json({
      mensagem: 'Pessoas desativadas removidas com sucesso',
      total: idsParaExcluir.length
    });
  } catch (e) {
    res.status(500).json({ erro: 'Erro interno ao executar limpeza' });
  }
});

export default router;
