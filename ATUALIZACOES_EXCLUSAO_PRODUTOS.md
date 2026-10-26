# Atribuição Francisco: exclusão de produtos

## Endpoint

`DELETE /produtos/:id` — rota montada pelo servidor sob `/produtos`.

## O que foi implementado

- `src/repositories/produtoRepository.js`: método `deletar(id)` com `DELETE FROM produtos WHERE id = $1 RETURNING *;`. O parâmetro é enviado separadamente; retorna a linha removida ou `null`.
- `src/controllers/produtoController.js`: handler `deletarProduto`, valida ID positivo, usa `req.params.id`, responde `200` quando remove, `404` quando não encontra, `409` para FK PostgreSQL `23503` e `500` para falhas não previstas.
- `src/routes/produtoRoutes.js`: registra a rota protegida para `admin` e `SuperAdmin`.
- `src/middlewares/roleMiddleware.js`: valida `req.usuario_cargo`, responde `403` se não permitido e aceita chamadas com argumentos separados ou array de cargos.
- `src/middlewares/authMiddleware.js`: valida Bearer JWT e expõe `req.usuario_id` e `req.usuario_cargo`; token ausente/inválido retorna `401`.
- Os `module.exports` mantêm os handlers existentes e acrescentam `deletar`/`deletarProduto`, evitando substituir exportações de outros integrantes.
- Coleção Postman: `postman/Produtos_Exclusao.postman_collection.json`.

## Códigos de resposta

| Caso | Código |
| --- | ---: |
| Produto removido | 200 |
| ID inválido | 400 |
| Produto não encontrado | 404 |
| Produto usado em solicitação (FK) | 409 |
| Cargo autenticado sem permissão | 403 |
| Token ausente ou inválido | 401 |
| Falha inesperada | 500 |

## Como usar a coleção

Importe o JSON no Postman. Ajuste `baseUrl` e preencha `tokenAdmin` e `tokenUsuario` com JWTs válidos assinados pelo `JWT_SECRET` do servidor, contendo `id` e `cargo` (ou `usuario_id` e `usuario_cargo`). Configure IDs adequados no ambiente: `idProdutoExcluivel` deve existir sem solicitações vinculadas; `idProdutoVinculado` deve possuir solicitação; `idInexistente` não pode existir. A requisição de sucesso remove o produto, então rode-a com um ID de teste apropriado.

Os testes automatizados da coleção verificam os status esperados para sucesso, usuário comum (`403`), FK (`409`), inexistente (`404`), ID inválido (`400`) e ausência de token (`401`). A coleção não cria os dados nem emite tokens; prepare-os no ambiente antes da execução.
