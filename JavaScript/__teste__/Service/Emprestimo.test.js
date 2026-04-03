import { Livro } from "../../src/Model/Dto/Livro";
import { Usuario } from "../../src/Model/Dto/Usuario";
import { ServicoEmprestimo } from "../../src/Model/Services/ServicoEmprestimo";

test('Testa usuário e livro válido', () =>{
//Arrange
const user = new Usuario({id: 1,nome: "Katchau",ativo: true, emprestimosAtivo: 0, multasPendentes: 0});
const livro = new Livro({id: 1, titulo: "livrao", disponivel: true});
//Act
    const saida = ServicoEmprestimo.autorizarEmprestimo(user, livro);
//Assert
    expect(true).toBe(saida);
})