# Frost Térmicas — Loja Online

Site de vendas com catálogo de produtos, carrinho de compras e checkout via
**Mercado Pago** (aceita Pix, cartão de crédito, débito e boleto
automaticamente).

## O que já vem pronto

- `index.html` – página inicial com carrossel de banners, selos de confiança, vitrine de produtos, "Sobre nós", FAQ e política de trocas/entrega
- `carrinho.html` – carrinho de compras
- `sucesso.html`, `pendente.html`, `falha.html` – páginas de retorno do pagamento
- `js/produtos.js` – **lista de produtos** (edite aqui nome, preço, foto e descrição)
- `js/whatsapp.js` – **número do WhatsApp** do botão flutuante (edite aqui quando tiver o número)
- `js/carrinho.js`, `js/catalogo.js`, `js/pagina-carrinho.js`, `js/carrossel.js` – lógica do site
- `css/style.css` – visual do site
- `favicon.svg` – ícone que aparece na aba do navegador
- `api/criar-preferencia.js` – função que gera o link de pagamento no Mercado Pago
- `api/webhook.js` – endpoint opcional para automatizar confirmações de pagamento no futuro

## Editar os produtos

Abra `js/produtos.js` e edite a lista `PRODUTOS`. Para cada produto, preencha
`id`, `nome`, `preco` (use ponto, ex: 119.90), `imagem` e `descricao`. Coloque
as fotos reais na pasta `img/`.

## Configurar o WhatsApp

Abra `js/whatsapp.js` e troque o valor de `NUMERO_WHATSAPP` pelo seu número,
no formato DDI + DDD + número, só dígitos (ex: `5511912345678` pro número
(11) 91234-5678). O botão flutuante aparece automaticamente em todas as
páginas do site depois disso.

## Configurar o Mercado Pago

1. Crie/entre na sua conta em https://www.mercadopago.com.br
2. Acesse **Suas integrações** em https://www.mercadopago.com.br/developers/panel
3. Copie o **Access Token** (de teste pra simular compras, ou de produção pra
   receber pagamentos reais).

## Publicar (Vercel)

1. Suba os arquivos desta pasta para um repositório no GitHub.
2. Em https://vercel.com, importe esse repositório.
3. Em **Environment Variables**, adicione `MP_ACCESS_TOKEN` com o token do
   Mercado Pago.
4. Clique em **Deploy**.

## Próximos passos (quando a loja crescer)

- **Controle de estoque automático**: hoje o campo `estoque` é só informativo.
- **Cálculo de frete**: hoje o site não calcula frete automaticamente.
- **E-mail de confirmação automático**: pode ser adicionado no `api/webhook.js`.

Qualquer uma dessas melhorias, é só pedir.
