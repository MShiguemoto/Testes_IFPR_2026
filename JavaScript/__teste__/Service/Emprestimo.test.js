import { Livro } from "../../src/Model/Dto/Livro";
import { Usuario } from "../../src/Model/Dto/Usuario";
import { ServicoEmprestimo } from "../../src/Model/Services/ServicoEmprestimo";
import { constantes, LIMITE_LIVROS } from "../../src/util/constants";
const casos = require("../dados/Emprestimo.json")

describe("Emprestimo", ()=> {

    test('Testa usuário e livro válido', () =>{
    //Arrange
    const user = new Usuario({id: 1,nome: "Katchau",ativo: true, emprestimosAtivo: 0, multasPendentes: 0});
    const livro = new Livro({id: 1, titulo: "livrao", disponivel: true});
    //Act
        const saida = ServicoEmprestimo.autorizarEmprestimo(user, livro);
    //Assert
        expect(true).toBe(saida);
    })

    test('Testa usuário e livro inválido (indisponível)', () =>{
    //Arrange
    const user = new Usuario({id: 1,nome: "Katchau",ativo: true, emprestimosAtivo: 0, multasPendentes: 0});
    const livro = new Livro({id: 1, titulo: "livrao", disponivel: false});
    //Act
        const saida = ServicoEmprestimo.autorizarEmprestimo(user, livro);
    //Assert
        expect(false).toBe(saida);
    })

    test('Testa usuário inválido (limite_livros) e livro válido', () =>{
    //Arrange
    const user = new Usuario({id: 1,nome: "Katchau",ativo: false, emprestimosAtivo: constantes.LIMITE_LIVROS + 1, multasPendentes: 0});
    const livro = new Livro({id: 1, titulo: "livrao", disponivel: true});
    //Act
        const saida = ServicoEmprestimo.autorizarEmprestimo(user, livro);
    //Assert
        expect(false).toBe(saida);
    })

    test('Testa usuário inválido (limite_multas) e livro válido', () =>{
    //Arrange
    const user = new Usuario({id: 1,nome: "Katchau",ativo: false, emprestimosAtivo: constantes.LIMITE_LIVROS, multasPendentes: constantes.LIMITE_MULTA + 1});
    const livro = new Livro({id: 1, titulo: "livrao", disponivel: true});
    //Act
        const saida = ServicoEmprestimo.autorizarEmprestimo(user, livro);
    //Assert
        expect(false).toBe(saida);
    })

    test('Testa usuário inválido e livro indisponível (excessão)', () =>{
    //Arrange
    const user = new Usuario({id: 1,nome: "Katchau",ativo: false, emprestimosAtivo: constantes.LIMITE_LIVROS, multasPendentes: constantes.LIMITE_MULTA});
    const livro = new Livro({id: 1, titulo: "livrao", disponivel: true});
    //Act
    //Assert
        expect(()=>ServicoEmprestimo.autorizarEmprestimo(user, livro)).toThrow(mensagens.LIVRO_INDISPONIVEL);
    })

    test("", ()=>{

    })

    test.each(casos)('$descricao', (caso) => {
            //Arrange
    const user = new Usuario({id: 1,nome: "Katchau",ativo: caso.ativo, emprestimosAtivo: caso.emprestimosAtivo, multasPendentes: caso.multasPendentes});
    const livro = new Livro({id: 1, titulo: "livrao", disponivel: caso.livro_disponivel});

    const saida = ServicoEmprestimo.autorizarEmprestimo(user, livro);

    if(caso.livro_disponivel)
    expect(caso.saida).toBe(saida);
    
    expect(()=>ServicoEmprestimo.autorizarEmprestimo(user, livro)).toThrow(mensagens.LIVRO_INDISPONIVEL);
    })
})