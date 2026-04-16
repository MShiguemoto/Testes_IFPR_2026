const {Livro} = require("../../src/Model/Dto/Livro");
const {Usuario} = require("../../src/Model/Dto/Usuario");
const {ServicoEmprestimo} = require("../../src/Model/Services/ServicoEmprestimo");
const {constantes} =  require("../../src/util/constants");
const casos = require("../dados/Emprestimo.json");
const mensagens = require("../../src/util/messages");


describe("Emprestimo", ()=> {

    test('Testa usuário e livro válido', () =>{
    //Arrange
    const user = new Usuario({id: 1,nome: "Katchau",ativo: true, emprestimosAtivos: 0, multaPendente: 0});
    const livro = new Livro({id: 1, titulo: "livrao", disponivel: true});
    //Act
        const saida = ServicoEmprestimo.autorizarEmprestimo(user, livro);
    //Assert
        expect(true).toBe(saida);
    })

    test('Testa usuário e livro inválido (indisponível)', () =>{
    //Arrange
    const user = new Usuario({id: 1,nome: "Katchau",ativo: true, emprestimosAtivos: 0, multaPendente: 0});
    const livro = new Livro({id: 1, titulo: "livrao", disponivel: false});
    //Act
        //const saida = ServicoEmprestimo.autorizarEmprestimo(user, livro);
    //Assert
        //expect(false).toBe(saida);
        expect(()=>ServicoEmprestimo.autorizarEmprestimo(user, livro)).toThrow(mensagens.LIVRO_INDISPONIVEL);
    })

    test('Testa usuário inválido (limite_livros) e livro válido', () =>{
    //Arrange
    const user = new Usuario({id: 1,nome: "Katchau",ativo: false, emprestimosAtivos: constantes.LIMITE_LIVROS + 1, multaPendente: 0});
    const livro = new Livro({id: 1, titulo: "livrao", disponivel: true});
    //Act
        const saida = ServicoEmprestimo.autorizarEmprestimo(user, livro);
    //Assert
        expect(false).toBe(saida);
    })

    test('Testa usuário inválido (limite_multas) e livro válido', () =>{
    //Arrange
    const user = new Usuario({id: 1,nome: "Katchau",ativo: false, emprestimosAtivos: constantes.LIMITE_LIVROS, multaPendente: constantes.LIMITE_MULTA + 1});
    const livro = new Livro({id: 1, titulo: "livrao", disponivel: true});
    //Act
        const saida = ServicoEmprestimo.autorizarEmprestimo(user, livro);
    //Assert
        expect(false).toBe(saida);
    })

    test('Testa usuário inválido e livro indisponível (excessão)', () =>{
    //Arrange
    const user = new Usuario({id: 1,nome: "Katchau",ativo: true, emprestimosAtivos: constantes.LIMITE_LIVROS -1, multaPendente: constantes.LIMITE_MULTA -1});
    const livro = new Livro({id: 1, titulo: "livrao", disponivel: false});
    //Act
    //Assert
        expect(()=>ServicoEmprestimo.autorizarEmprestimo(user, livro)).toThrow(mensagens.LIVRO_INDISPONIVEL);
    })

    test.each(casos)('$descricao', (caso) => {
            //Arrange
    const user = new Usuario({id: 1,nome: "Katchau",ativo: caso.ativo, emprestimosAtivos: caso.emprestimosAtivos, multaPendente: caso.multaPendente});
    const livro = new Livro({id: 1, titulo: "livrao", disponivel: caso.livro_disponivel});

    if(caso.livro_disponivel){
        const saida = ServicoEmprestimo.autorizarEmprestimo(user, livro);
        expect(caso.saida).toBe(saida);
    }
    else
        expect(()=>ServicoEmprestimo.autorizarEmprestimo(user, livro)).toThrow(mensagens.LIVRO_INDISPONIVEL);
    })
})