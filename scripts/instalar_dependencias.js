#!/usr/bin/env node
/**
 * ============================================================================
 *  instalar_dependencias.js
 *  ----------------------------------------------------------------------------
 *  Instala APENAS as dependências do projeto (npm install) e garante os
 *  arquivos de referência de variáveis de ambiente (.env / .env.example).
 *
 *  Uso:
 *      node scripts/instalar_dependencias.js
 *
 *  O que ele faz:
 *   1. Verifica se Node.js e npm estão disponíveis.
 *   2. Cria o package.json (se ainda não existir) já com as dependências.
 *   3. Baixa apenas as dependências listadas em DEPENDENCIAS.
 *   4. Cria o .env.example (modelo de referência), se não existir.
 *   5. Cria o .env a partir do .env.example, se não existir (nunca sobrescreve).
 * ============================================================================
 */

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Raiz do projeto (pasta pai desta pasta "scripts")
const ROOT = path.join(__dirname, '..');

// ---------------------------------------------------------------------------
// Dependências reais usadas no código (require/import)
// ---------------------------------------------------------------------------
const DEPENDENCIAS = {
    express: '^4.21.2',     // app.js, rotas
    pg: '^8.13.1',          // src/config/db.js (PostgreSQL)
    dotenv: '^16.4.7',      // server.js, src/config/db.js
    jsonwebtoken: '^9.0.2', // authMiddleware, usuarioController
    bcrypt: '^5.1.1'        // usuarioController (hash de senhas)
};

// ---------------------------------------------------------------------------
// Conteúdo de referência do .env
// ---------------------------------------------------------------------------
const CONTEUDO_ENV_EXAMPLE = `# Referência do arquivo .env — copie este arquivo para .env e ajuste os valores
# cp .env.example .env

DB_USER=postgres
DB_HOST=localhost
DB_NAME=postgres
DB_PASSWORD=sua_senha_do_banco
DB_PORT=5432
PORT=3000
JWT_SECRET=chave_secreta_almoxarifado_2026
`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const log = (msg) => console.log(msg);
const passo = (n, msg) => log(`\n[${n}] ${msg}`);

function comandoExiste(comando) {
    const result = spawnSync(comando, ['--version'], { shell: true, stdio: 'ignore' });
    return result.status === 0;
}

// ---------------------------------------------------------------------------
// 1. Verificar Node e npm
// ---------------------------------------------------------------------------
passo(1, 'Verificando Node.js e npm...');

if (!comandoExiste('node')) {
    console.error('   ✖ Node.js não encontrado. Instale em https://nodejs.org');
    process.exit(1);
}
if (!comandoExiste('npm')) {
    console.error('   ✖ npm não encontrado. Reinstale o Node.js em https://nodejs.org');
    process.exit(1);
}
log('   ✔ Node.js e npm disponíveis.');

// ---------------------------------------------------------------------------
// 2. Garantir o package.json
// ---------------------------------------------------------------------------
passo(2, 'Verificando package.json...');

const pkgPath = path.join(ROOT, 'package.json');
let pkg = null;

if (fs.existsSync(pkgPath)) {
    pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg.dependencies = pkg.dependencies || {};
} else {
    pkg = {
        name: 'produtos-almoxarife',
        version: '1.0.0',
        description: 'API de gestão de produtos do almoxarifado corporativo',
        main: 'src/server.js',
        scripts: {
            start: 'node src/server.js'
        },
        dependencies: {}
    };
    log('   • package.json não encontrado — será criado.');
}

let pkgAlterado = false;
for (const [nome, versao] of Object.entries(DEPENDENCIAS)) {
    if (!pkg.dependencies[nome]) {
        pkg.dependencies[nome] = versao;
        pkgAlterado = true;
        log(`   + ${nome}@${versao}`);
    }
}

if (!fs.existsSync(pkgPath) || pkgAlterado) {
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 4) + '\n', 'utf8');
    log('   ✔ package.json atualizado.');
} else {
    log('   ✔ package.json já contém todas as dependências.');
}

// ---------------------------------------------------------------------------
// 3. Baixar apenas as dependências (node_modules)
// ---------------------------------------------------------------------------
passo(3, 'Baixando as dependências (npm install)...');

const install = spawnSync('npm', ['install', '--no-fund', '--no-audit'], {
    cwd: ROOT,
    stdio: 'inherit',
    shell: true
});

if (install.status !== 0) {
    console.error('\n   ✖ Falha ao instalar as dependências.');
    console.error('     Dica: o "bcrypt" precisa de compilação no Windows.');
    console.error('     Se aparecer erro de build, instale as ferramentas:');
    console.error('     npm install -g windows-build-tools');
    console.error('     ou substitua "bcrypt" por "bcryptjs" (mesma API, sem compilação).');
    process.exit(install.status);
}
log('   ✔ Dependências instaladas em node_modules.');

// ---------------------------------------------------------------------------
// 4. Garantir o .env.example (referência versionada)
// ---------------------------------------------------------------------------
passo(4, 'Verificando .env.example (referência)...');

const envExamplePath = path.join(ROOT, '.env.example');
if (!fs.existsSync(envExamplePath)) {
    fs.writeFileSync(envExamplePath, CONTEUDO_ENV_EXAMPLE, 'utf8');
    log('   ✔ .env.example criado.');
} else {
    log('   ✔ .env.example já existe.');
}

// ---------------------------------------------------------------------------
// 5. Garantir o .env (nunca sobrescreve o existente)
// ---------------------------------------------------------------------------
passo(5, 'Verificando .env (configuração local)...');

const envPath = path.join(ROOT, '.env');
if (fs.existsSync(envPath)) {
    log('   ✔ .env já existe — nada foi alterado.');
} else {
    fs.copyFileSync(envExamplePath, envPath);
    log('   ✔ .env criado a partir do .env.example.');
    log('     → Edite o .env e preencha DB_PASSWORD e JWT_SECRET.');
}

// ---------------------------------------------------------------------------
// Resumo
// ---------------------------------------------------------------------------
log('\n============================================================================');
log(' ✔ Setup concluído!');
log('----------------------------------------------------------------------------');
log(' Dependências instaladas:');
Object.entries(DEPENDENCIAS).forEach(([nome, versao]) => log(`   - ${nome}@${versao}`));
log(' Arquivos de referência:');
log('   - .env.example (modelo — versionado no Git)');
log('   - .env (sua configuração local — ignorado pelo Git)');
log('----------------------------------------------------------------------------');
log(' Próximos passos:');
log('   1. Edite o arquivo .env (senha do banco e JWT_SECRET)');
log('   2. Rode o schema.sql no seu PostgreSQL');
log('   3. Inicie a API com:  npm start');
log('============================================================================\n');
