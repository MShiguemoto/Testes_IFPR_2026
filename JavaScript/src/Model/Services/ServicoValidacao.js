class ServicoValidacao {
    
    static validarSenha(senha){
        // Lógica de validação da senha
        if (senha.length < 8) return false;
        return true;
    }
}
module.exports = { ServicoValidacao };