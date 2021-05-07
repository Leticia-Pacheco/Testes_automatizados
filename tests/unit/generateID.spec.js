const generateId = require('../../src/utils/generateUUID');


/* Abaixo estão as fases dos testes:
Se épossível gerar um uuid único;
Se está vindo um ID;
Se esse ID é uma String;
Se o tamanho da String é o que eu espero, 36 caracteres.*/

describe("generateUUID", () => {
    it("Se épossível gerar um uuid único.", () => {
        const id = generateId();

        expect(id).toBeDefined();
        expect(typeof id).toBe("string");
        expect(id).toHaveLength(36);
    });
});