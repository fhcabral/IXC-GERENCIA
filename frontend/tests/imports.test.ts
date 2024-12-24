
describe("import vue components", () => {
    test("Imports CardCadastroDeTransacao", async () => {
        const cmp = await import('../components/dashboard/CardCadastroDeTransacao.vue')
        expect(cmp).toBeDefined()
    })

    test("Imports CardHistoricoDeTransacao", async () => {
        const cmp = await import('../components/dashboard/CardHistoricoDeTransacao.vue')
        expect(cmp).toBeDefined()
    })

    test("Imports CardResumo", async () => {
        const cmp = await import('../components/dashboard/CardResumo.vue')
        expect(cmp).toBeDefined()
    })
})