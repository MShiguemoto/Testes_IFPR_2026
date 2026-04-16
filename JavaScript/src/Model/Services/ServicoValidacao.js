class ServicoValidacao {
    
    static validarSenha(senha){
        // Lógica de validação da senha
        if (senha.length < 8) return false;
        if (!/[a-z]/.test(senha)) return false;
        return true;
    }
}
module.exports = { ServicoValidacao };