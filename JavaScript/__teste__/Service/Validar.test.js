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