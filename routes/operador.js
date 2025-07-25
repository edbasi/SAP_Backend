import express from 'express';
//import { supabase } from '../supabase.js';

const router = express.Router();
const filtro = { descricao: 'Operador' };

// POST /operadores
router.post('/', async (req, res) => {
  const { pessoa, operador } = req.body;

  const { data: pessoaData, error: pessoaErr } = await supabase
    .from('pessoa')
    .insert([pessoa])
    .select();

  if (pessoaErr) return res.status(500).json({ erro: pessoaErr.message });

  const novaPessoa = pessoaData[0];
  operador.id = novaPessoa.id;

  const { data: operadorData, error: opErr } = await supabase
    .from('operador')
    .insert([operador]);

  if (opErr) return res.status(500).json({ erro: opErr.message });

  res.status(201).json({ pessoa: novaPessoa, operador: operadorData });
});

// GET /operadores
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('view_pessoa_completa')
    .select('*')
    .eq('descricao', filtro.descricao);

  if (error) return res.status(500).json({ erro: error.message });
  res.json(data);
});

// PUT /operadores/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { pessoa, operador } = req.body;

  const { error: pErr } = await supabase
    .from('pessoa')
    .update(pessoa)
    .eq('id', id);

  if (pErr) return res.status(500).json({ erro: pErr.message });

  const { error: oErr } = await supabase
    .from('operador')
    .update(operador)
    .eq('id', id);

  if (oErr) return res.status(500).json({ erro: oErr.message });

  res.json({ sucesso: true });
});

// DELETE /operadores/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const { error: oErr } = await supabase
    .from('operador')
    .delete()
    .eq('id', id);

  if (oErr) return res.status(500).json({ erro: oErr.message });

  const { error: pErr } = await supabase
    .from('pessoa')
    .delete()
    .eq('id', id);

  if (pErr) return res.status(500).json({ erro: pErr.message });

  res.json({ sucesso: true });
});

export default router;
