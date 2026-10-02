import * as readline from "readline";

// 1. Tipo customizado
type Consumidor = {
  nome: string;
  idade: number;
  email: string;
};

// 2. Função de criação de objeto
function criarConsumidor(nome: string, idade: number, email: string): Consumidor {
  return { nome, idade, email };
}

// 3. Média das idades
function calcularMediaIdade(consumidores: Consumidor[]): number {
  if (consumidores.length === 0) return 0;
  const soma = consumidores.reduce((acc, c) => acc + c.idade, 0);
  return soma / consumidores.length;
}

// 4. Consumidor mais velho e mais novo
function obterMaiorEMenorIdade(consumidores: Consumidor[]): {
  maisVelho: Consumidor;
  maisNovo: Consumidor;
} {
  let maisVelho = consumidores[0];
  let maisNovo = consumidores[0];

  for (const c of consumidores) {
    if (c.idade > maisVelho.idade) maisVelho = c;
    if (c.idade < maisNovo.idade) maisNovo = c;
  }

  return { maisVelho, maisNovo };
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Faz uma pergunta no terminal e devolve a resposta
function perguntar(texto: string): Promise<string> {
  return new Promise((resolve) => rl.question(texto, resolve));
}

// Repete até o usuário digitar uma idade válida
async function lerIdade(texto: string): Promise<number> {
  while (true) {
    const idade = Number(await perguntar(texto));
    if (Number.isInteger(idade) && idade > 0) return idade;
    console.log("Idade inválida. Digite um número inteiro positivo.");
  }
}

// 5. Fluxo principal
async function main(): Promise<void> {
  const consumidores: Consumidor[] = [];

  for (let i = 1; i <= 5; i++) {
    console.log(`\n--- Consumidor ${i} de 5 ---`);
    const nome = (await perguntar("Nome: ")).trim();
    const idade = await lerIdade("Idade: ");
    const email = (await perguntar("E-mail: ")).trim();

    consumidores.push(criarConsumidor(nome, idade, email));
  }

  rl.close();

  const media = calcularMediaIdade(consumidores);
  const { maisVelho, maisNovo } = obterMaiorEMenorIdade(consumidores);

  console.log("\n=== Consumidores cadastrados ===");
  console.table(consumidores);

  console.log(`\nMédia das idades: ${media.toFixed(1)} anos`);
  console.log(`Consumidor mais velho: ${maisVelho.nome} (${maisVelho.idade} anos)`);
  console.log(`Consumidor mais novo: ${maisNovo.nome} (${maisNovo.idade} anos)`);
}

main();
