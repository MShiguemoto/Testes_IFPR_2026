const {ServicoValidacao} = require("../../src/Model/Services/ServicoValidacao");
const casos = require("../dados/Senhas.json");

test("Invalidar senha 6 digitos", () => {
    // Arrange
    const senha = "123456";
    // Act
    const resultado = ServicoValidacao.validarSenha(senha);
    // Assert
    expect(resultado).toBe(false);
});

test("Validar senha forte", () => {
    // Arrange
    const senha = "!SenhaSegura123";
    // Act
    const resultado = ServicoValidacao.validarSenha(senha);
    // Assert
    expect(resultado).toBe(true);
});

test.each(casos)('$descricao', (caso) => {
            
    const resultado = ServicoValidacao.validarSenha(caso.senha);
    
    expect(resultado).toBe(caso.saida);
});
