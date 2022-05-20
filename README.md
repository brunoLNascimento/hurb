# hurb


### Rodando o sistema

```sh
$ npm install -- Instalar as dependências.
$ npm start -- Rodar o sistema.
$ npm test -- Executar os testes do sistema.
```
1. get: localhost:3000/quotation/from/amount 
- EX: localhost:3000/quotation/USD/100
- Endpoint para buscar cotação da moedas: Ao consultar a api passando esses valores, o endpoint busca na api http://economia.awesomeapi.com.br/ o valor da cotação, e retorna para o cliente, antes de ser enviado é salvo uma cópia no banco de dados de forma sequêncial, para consultas futuras;

2. get: localhost:3000/findQuotation/id?
- EX: localhost:3000/findQuotation/ ou localhost:3000/findQuotation/1 ou localhost:3000/findQuotation/?code=usd ou localhost:3000/findQuotation/?page=1
- Está consulta é feita no banco de dados, e pode ser consultada das formas citadas acima, sem passar nem parametro, a api vai buscar os 10 últimos resultados, incluindo o ID no final da url, dessa forma busca o id (sequêncial), pode ser consultado também passando a query ??code=moeda&page=0, dessa forma será consultada as moedas e haverá a paginação, ou consultar apenas por páginas, passando a query ?page=0

3. delete: localhost:3000/removeQuotation/id
- Endpoint para remover deletar a cotação. Delete lógico, a cotação é setada como active = false.

* OBS
Foi criado um WORKER, que busca todas as cotações a cada hora no intervalo de 09:00 até 18:00. Essa busca é feita e armazenada na base. E toda vez que é solicitada uma cotação (passo 1), é feita uma validação para validar o horário. Caso a hora da última cotação salva pelo WORKER esteja no intervalo de 1 hora (hora da consulta da nova cotação) é utilizada os valores da cotação salva. Caso seja maior a hora, é feita a consulta na API awesomeapi. 
