import Emprestimo from '../modelos/Emprestimo.js'
import Livro      from '../modelos/Livro.js'

export async function solicitarEmprestimo(req, res) {
  try {
    const { livroId } = req.params;

    // 1. Encontre o documento do livro na coleção
    const livro = await Livro.findById(livroId);
    if (!livro) {
      return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }

    // 2. Verifique a situação atual
    if (livro.situacao === "Emprestado") {
      return res.status(400).json({ mensagem: 'Este livro já está emprestado.' });
    }

    // 3. Altere a propriedade 'situacao' diretamente no objeto do livro
    livro.situacao = "Emprestado";

    // 4. Execute as duas operações de gravação em paralelo para eficiência:
    //    - Salve o documento do livro que foi modificado.
    //    - Crie o novo registro de empréstimo.
    const [livroSalvo, novoEmprestimo] = await Promise.all([
      livro.save(), // Salva as alterações feitas no documento 'livro'
      Emprestimo.create({
        usuario: req.usuario._id,
        livro: livroId
      })
    ]);

    // 5. Retorne a resposta com o livro já salvo e o novo empréstimo
    return res.status(201).json({
      mensagem: "Empréstimo realizado com sucesso!",
      emprestimo: novoEmprestimo,
      livro: livroSalvo // Retorna o documento do livro atualizado
    });

  } catch (err) {
    console.error("Erro ao solicitar empréstimo:", err);
    return res.status(500).json({ mensagem: "Ocorreu um erro interno no servidor.", detalhes: err.message });
  }
}


// Devolver Empréstimo
export async function devolverEmprestimo(req, res) {
  try {
    const { emprestimoId } = req.params;
    const emp = await Emprestimo.findById(emprestimoId);
    if (!emp) return res.status(404).json({ mensagem: 'Empréstimo não encontrado' });

    if (emp.dataDevolucao) {
      return res.status(400).json({ mensagem: 'Empréstimo já foi devolvido' });
    }

    emp.dataDevolucao = new Date();
    await emp.save();

    // Libera o livro
    const livro = await Livro.findById(emp.livro);
    if (livro) {
      livro.situacao = "Disponível";
      await livro.save();
    }

    return res.json({ mensagem: "Devolvido com sucesso", emprestimo: emp });
  } catch (err) {
    return res.status(400).json({ mensagem: err.message });
  }
}

// Histórico do usuário
export async function meusEmprestimos(req, res) {
  try {
    const lista = await Emprestimo
      .find({ usuario: req.usuario._id })
      .populate('livro', 'titulo')
      .sort('-dataEmprestimo')
    return res.json(lista)
  } catch (err) {
    return res.status(500).json({ mensagem: err.message })
  }
}

// Histórico geral (admin)
export async function todosEmprestimos(req, res) {
  try {
    const lista = await Emprestimo
      .find()
      .populate('usuario', 'nome')
      .populate('livro',   'titulo')
      .sort('-dataEmprestimo')
    return res.json(lista)
  } catch (err) {
    return res.status(500).json({ mensagem: err.message })
  }
}
