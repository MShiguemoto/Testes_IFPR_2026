export class ServicoEmprestimo {
    
    static autorizarEmprestimo(usuario, livro){
        return this.validarUsuario(usuario) && this.validarLivro(livro);
    }

    static validarUsuario(usuario){
        if(!usuario.ativo) return false;
        if(usuario.emprestimosAtivos >= constantes.LIMITE_LIVROS) return false;
        if(usuario.multaPendente >= constantes.LIMITE_MULTA) return false;
        return true;
    }

    static validarLivro(livro) {
        if (!livro.disponivel) throw new Error(mensagens.LIVRO_INDISPONIVEL);
        return true;
    }
}