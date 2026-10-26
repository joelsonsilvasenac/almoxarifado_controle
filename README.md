# Divisão de Atribuições — Grupo 2: Produtos e Validade

## 🚀 Início Rápido (Instalação)

Antes de codar, instale **apenas as dependências** do projeto e gere os arquivos de configuração (`.env`):

```bash
node scripts/instalar_dependencias.js
```

Esse comando:
1. Cria o `package.json` (se não existir) com as dependências: `express`, `pg`, `dotenv`, `jsonwebtoken` e `bcrypt`;
2. Baixa tudo para a pasta `node_modules`;
3. Cria o `.env` a partir do modelo `.env.example` (**sem sobrescrever** um `.env` já existente).

Depois da instalação:

```bash
# 1. Edite o .env com a senha do banco e o JWT_SECRET
# 2. Rode o schema.sql no seu PostgreSQL
# 3. Inicie a API
npm start
```

> **Dica para novos integrantes:** se o `.env` não existir, copie o modelo com `cp .env.example .env` e ajuste os valores.

---

## 1. Contexto do Módulo
O **Grupo 2** é responsável pela gestão de produtos do almoxarifado corporativo. A divisão abaixo é baseada no modelo **CRUD de ponta a ponta**, onde cada um dos 4 integrantes assume um fluxo completo (Repository, Controller e Routes), garantindo aprendizado igualitário em todas as camadas da aplicação (banco de dados, regras HTTP e controle de acesso RBAC).

---

## 2. Matriz de Atribuições por Integrante

| Integrante | Operação | Endpoint / Método | Nível de Acesso (RBAC) | Arquivos Afetados |
| :--- | :--- | :--- | :--- | :--- |
| **Gustavo** | Cadastro de Produto | `POST /produtos` | `admin` e `SuperAdmin` | `produtoRepository.js`<br>`produtoController.js`<br>`produtoRoutes.js` |
| **Vinicios** | Listagem e Consulta | `GET /produtos`<br>`GET /produtos/:id` | Autenticado (`usuario`, `admin`, `SuperAdmin`) | `produtoRepository.js`<br>`produtoController.js`<br>`produtoRoutes.js` |
| **Heluisa** | Atualização de Dados | `PUT /produtos/:id` | `admin` e `SuperAdmin` | `produtoRepository.js`<br>`produtoController.js`<br>`produtoRoutes.js` |
| **Francisco** | Exclusão de Produto | `DELETE /produtos/:id` | `admin` e `SuperAdmin` | `produtoRepository.js`<br>`produtoController.js`<br>`produtoRoutes.js` |

---

## 3. Detalhamento das Tarefas por Membro

### 👤 Gustavo: Fluxo de Criação (`POST /produtos`)
* **`produtoRepository.js`**:
  * Implementar o método `inserir(produto)`.
  * Escrever a query SQL:  
    `INSERT INTO produtos (nome, descricao, quantidade_estoque, data_validade) VALUES ($1, $2, $3, $4) RETURNING *;`
* **`produtoController.js`**:
  * Implementar a função `criarProduto`.
  * Validar campos obrigatórios no `req.body`: `nome`, `quantidade_estoque` e `data_validade`.
  * Validar regras de negócio básicas (ex.: `quantidade_estoque` não pode ser negativa; formato de data válido).
  * Respostas esperadas: `201 Created` com os dados inseridos ou `400 Bad Request` em caso de dados inválidos.
* **`produtoRoutes.js`**:
  * Configurar a rota:  
    `router.post('/', authMiddleware, roleMiddleware(['admin', 'SuperAdmin']), produtoController.criarProduto);`

---

### 👤 Vinicios: Fluxo de Leitura e Consulta (`GET /produtos`)
* **`produtoRepository.js`**:
  * Implementar `listarTodos()` com a query:  
    `SELECT * FROM produtos ORDER BY id ASC;`
  * Implementar `buscarPorId(id)` com a query:  
    `SELECT * FROM produtos WHERE id = $1;`  
    *(Método crucial para conferência e suporte à validação de estoque/validade do Grupo 3).*
* **`produtoController.js`**:
  * Implementar a função `listarProdutos`.
  * Tratar retorno de array vazio (`200 OK` com `[]`) e formatar a exibição da `data_validade` para padrão legível/ISO.
  * Opcional/Recomendado: Implementar `buscarProdutoPorId` para permitir ver detalhes de um item específico.
* **`produtoRoutes.js`**:
  * Configurar a rota:  
    `router.get('/', authMiddleware, produtoController.listarProdutos);`  
    *(Permitido a qualquer colaborador autenticado).*

---

### 👤 Heluisa: Fluxo de Atualização (`PUT /produtos/:id`)
* **`produtoRepository.js`**:
  * Implementar `atualizar(id, dados)`.
  * Escrever a query SQL:  
    `UPDATE produtos SET nome = $1, descricao = $2, quantidade_estoque = $3, data_validade = $4 WHERE id = $5 RETURNING *;`
* **`produtoController.js`**:
  * Implementar a função `atualizarProduto`.
  * Capturar o ID via `req.params.id`.
  * Verificar se o produto existe no banco antes de atualizar (usar `buscarPorId`).
  * Validar campos atualizados e tratar erros.
  * Respostas esperadas: `200 OK` com o produto alterado, `404 Not Found` se não existir, ou `400 Bad Request` se os dados forem inválidos.
* **`produtoRoutes.js`**:
  * Configurar a rota:  
    `router.put('/:id', authMiddleware, roleMiddleware(['admin', 'SuperAdmin']), produtoController.atualizarProduto);`

---

### 👤 Francisco: Fluxo de Exclusão (`DELETE /produtos/:id`) & Apoio Estrutural
* **`produtoRepository.js`**:
  * Implementar `deletar(id)`.
  * Escrever a query SQL:  
    `DELETE FROM produtos WHERE id = $1 RETURNING *;`
* **`produtoController.js`**:
  * Implementar a função `deletarProduto`.
  * Obter o ID via `req.params.id`.
  * Verificar se a exclusão foi bem-sucedida; retornar `200 OK` (ou `204 No Content`) ou `404 Not Found` se o registro não existir.
  * Tratar possível erro de chave estrangeira (`FK`) caso o produto já possua solicitações vinculadas.
* **`produtoRoutes.js`**:
  * Configurar a rota:  
    `router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'SuperAdmin']), produtoController.deletarProduto);`
* **Atribuição Adicional (Qualidade & Testes)**:
  * Fornecer o "esqueleto" inicial com os `module.exports` corretos para evitar conflito de importação entre os colegas.
  * Montar a coleção de testes no Insomnia/Postman cobrindo o fluxo completo e garantindo que usuários com cargo `usuario` recebam `403 Forbidden` nas rotas restritas.

---

## 4. Guia de Boas Práticas no Git

1. **Estrutura base compartilhada**: Antes de começar a codificar, subam um commit inicial com a assinatura de todas as funções e exportações (`criarProduto`, `listarProdutos`, `atualizarProduto`, `deletarProduto`).
2. **Branch de trabalho**:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/produtos
   ```
3. **Comunicação interna**: Como todos editarão os mesmos 3 arquivos (`repository`, `controller`, `routes`), façam commits atômicos e alinhem merges frequentes para evitar conflitos de código (*merge conflicts*).