/* Abaixo estão as fases dos testes:
Subir o servidor no supertest
Criar variável de ambiente para rodar o teste no BD de teste*/

const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/");
const { cpf } = require("cpf-cnpj-validator");
const truncate = require("./truncate");

describe("MANAGERS", () => {

    afterAll(() => {
        connection.close();
    });

    beforeEach(async (done) => {
        await truncate(connection.models)
        done();
    });

    it("É possível criar um novo gerente.", async () => {
        const response = await request(app).post("/managers").send({
            name: "Letícia Pacheco",
            cpf: cpf.generate(),
            email: "le.pacheco0310@hotmail.com",
            cellphone: "5511963025478",
            password: "123456",
        });

        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty("id");
    });

    it("Não é possível cadastrar um gerente com cpf existente.", async () => {
        let cpfGerente = cpf.generate();
        let response = await request(app).post("/managers").send({
            name: "Letícia Pacheco",
            cpf: cpfGerente,
            email: "le.pacheco0310@hotmail.com",
            cellphone: "5511963025478",
            password: "123456",
        });

        let response = await request(app).post("/managers").send({
            name: "Larissa Pacheco",
            cpf: cpfGerente,
            email: "le.pacheco@hotmail.com",
            cellphone: "5511963025230",
            password: "123456",
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("cpf alredy exists.");
    });
});