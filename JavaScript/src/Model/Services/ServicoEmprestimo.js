export class ServicoEmprestimo {
    
    static autorizarEmprestimo(usuario, livro){
        return this.validarUsuario(usuario);
    }

    static validarUsuario(usuario){
        if(!usuario.ativo) return false;
        if(usuario.emprestimosAtivos >= LIMITE_LIVROS) return false;
        if(usuario.multaPendente >= LIMITE_MULTA) return false;
        return true;
    }

    static validarLivro(livro) {

    }
}