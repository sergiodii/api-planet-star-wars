# API - StarWars Planets
Está é uma API desenvolvida para um teste e para ensino. Esta api foi desenvolvida em **Node JS**. Foram utilizadas as seguintes ferramentas;
##### - Node JS | Adonis JS | MongoDB
.
## Instalação / Necessário :

Instale o **Node JS** a partir da versão 10, após instalar o Node JS instale a framework **Adonis JS** de maneira global utilizando o gerenciador de pacotes de sua preferencia (ex.: **npm**). 
O banco de dados escolhido para a api foi o **MongoDB**, nele é preciso criar um **Data-Base** com o nome **star-wars**, ou escolha outro nome e coloque na variável de ambiente **DB_DATABASE**  dentro do arquivo .env (existe um arquivo .env.example no projeto, outras variáveis devem ser alteradas dentro deste arquivo e o mesmo deve ter o nome alterado para .env)

## Migration & Seed

Com o Adonis JS instalado de forma global no sistema digite o seguinte comando; 
>$ adonis migration:run

Esse comando irá criar as Collections necessárias para o funcionamento do sistema.
Se desejar implementar de forma automática todos os planetas existentes na api pública do Star Wars https://swapi.io. Digite o seguinte comando;
>$ adonis seed

Ao final serão inserido no sistema os 61 planetas além dos quantidades de vezes em que esses planetas apareceram em um filme da série Star Wars e uma lista com os nomes dos filmes (Caso o planeta tenha aparecido em algum filme)

## Subindo o Servidor

O arquivo **MAIN/INDEX** do projeto está na raiz e tem o nome de **server.js** o mesmo deve ser iniciado a partir deste arquivo.

## Requisições
Toda requisição deve ter no header da requisição a Key: **Accept** Value: **application/json**

## Rotas
**#Listar Planetas:** GET /api/planets
A requisição deve ser do tipo GET enviada para a rota **/api/planets**.

**#Buscar por Nome:** GET /api/planet/name/NOME+AQUI
A requisição deve ser do tipo GET enviada para a rota **/api/planet/name/NOME+AQUI**, onde a última parte, NOME+AQUI, deve ser substituída pelo nome do planeta. O nome o planeta pode ser requisitado com espaço ou com o caracter + para simbolizar o espaço, fazendo assim a separação de palavras.

**#Busca por ID:** GET /api/planet/id/IDAQUI
A requisição deve ser do tipo GET enviada para a rota **/api/planet/id/IDAQUI**, onde a última parte, IDAQUI, deve ser substituída pelo ID do planeta.

**#Adicionar Planeta** POST /api/planet
A requisição deve ser do tipo POST enviada para a rota **/api/planet** ou **/api/planets**.

**#Remover/Deletar por Nome** DELETE /api/planet/name/NOME+AQUI
A requisição deve ser do tipo DELETE enviada para a rota **/api/planet/name/NOME+AQUI**, onde a última parte, NOME+AQUI, deve ser substituída pelo nome do planeta. O nome o planeta pode ser requisitado/deletado com espaço ou com o caracter + para simbolizar o espaço, fazendo assim a separação de palavras.

**#Remover/Deletar por ID** DELETE /api/planet/name/IDAQUI
A requisição deve ser do tipo DELETE enviada para a rota **/api/planet/id/IDAQUI**, onde a última parte, IDAQUI, deve ser substituída pelo ID do planeta.

## Funcionalidades

### **#Adicionando planeta#**
Para adicionar um planeta a requisição deve ser do tipo POST para /api/planet ou /api/planets devendo conter o seguinte conteúdo no corpo da requisição;

| name: String |
| climate: String |
| terrain: String |
(Todos os 3 itens são obrigatórios)

A partir do nome do planeta será feito uma pesquisa automaticamente na API pública do Star Wars para achar os possíveis filmes a qual o novo planeta inserido tenha aparecido.

Não será permitido a duplicidade de nomes de planetas.

Criado com sucesso retorna status http 201.
Nome duplicado retorna status http 400.
Erro no servidor retorna status http 500.

### **#Deletando Planeta#**
Existe duas maneiras de deletar um planeta do sistema, utilizando o ID ou Nome.

-Deletando por NOME:
O nome do planeta deve ser enviado no endereço da requisição. A requisição deve ser do tipo DELETE para; /api/planet/name/NOME+DO+PLANETA
Se existir espaço no nome do planeta o mesmo pode ser separado pelo caracter **"+"** ou por espaço em si. O sistema aceita os dois formatos de separação. O nome não é CASE-SENSITIVE, ou seja, se existir um planeta chamado, Benjamim, e na hora da exclusão no parâmetro da requisição for o nome BenJaMim o planeta Benjamim será deletado.

-Deletando por ID:
O ID o planeta deve ser enviado no endereço da requisição.
A requisição deve ser do tipo DELETE para;
/api/planet/id/IDDOPLANET

Deletado com sucesso retorna status http 200.
Se nome ou id não existir retorna status http 400.
Caso envie delete para uma rota diferente retorna status http 404.
Erro no servidor retorna status http 500.

### **#Listando Planetas#**

#### Todos os planetas:#
Para listar todos os planetas inseridos no banco de dados a requisição deve ser do tipo GET para /api/planets.
Existe dois parâmetros que podem ser passados na url da requisição.

**Parâmetro  limit - ex.:  ?limit=10**
O parâmetro "limit" por padrão é 5 e o mesmo serve para limitar a quantidade de planetas listados de uma única vez na resposta da requisição.

**Parâmetro  page - ex.:  ?page=2**
O parâmetro "page" é um parâmetro passado caso exista paginação dos dados devido ao "limit" exibido na resposta da requisição.

Corpo da Resposta**
O corpo da resposta é um JSON que contem caso exista uma chave, NEXT, onde contem o endereço url para a próxima página, assim como na chave, PREVIOUS que caso exista, contem o endereço url da página anterior.
Dentro da chave results existe uma lista dos planetas enviados na resposta da requisição.

#### Único planeta:#
Para exibir informações de um planeta especifico, de ser usado para referenciar tal planeta, o ID ou o Nome do planeta.
A requisição 




## Testes

Foram criados alguns testes de funcionalidade. E os testes se encontram na pasta (a partir da raiz do projeto) , ./test/functional.
Para iniciar os testes o comando utilizado deve ser:
>$ adonis test


## Logs do Sistema

Todo log do sistema fica em um arquivo json dentro da pasta (a partir da raiz do projeto), ./Log.

## Final

Este projeto nada mais é que um simples teste e para ensino e sendo assim, não tem nenhuma finalidade comercial.