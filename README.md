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
- `api/criar-preferencia.js` – função que valida o pedido, recalcula preços/frete e gera o link de pagamento no Mercado Pago
- `api/webhook.js` – recebe o aviso do Mercado Pago e te manda um **e-mail com itens e endereço** a cada pedido pago

## Editar os produtos

Abra `js/produtos.js` e edite a lista `PRODUTOS`. Para cada produto, preencha
`id`, `nome`, `preco` (use ponto, ex: 119.90), `imagem` e `descricao`. Coloque
as fotos reais na pasta `img/`.

## Frete

Abra `js/produtos.js` e ajuste no final do arquivo:

- `FRETE_FIXO` – valor cobrado em todo pedido (ex: `19.90`; use `0` se embutir o frete no preço)
- `FRETE_GRATIS_ACIMA` – pedidos a partir desse valor têm frete grátis (use `0` para desativar)

O servidor recalcula preços e frete a partir desse arquivo, então o cliente
não consegue alterar o valor da compra pelo navegador.

## Receber o aviso de cada pedido por e-mail

1. Crie uma conta grátis em https://resend.com e gere uma **API Key**.
2. Na Vercel, em **Settings > Environment Variables**, adicione:
   - `RESEND_API_KEY` = a chave do Resend
   - `EMAIL_PEDIDOS` = o e-mail que vai receber os avisos (o **mesmo** e-mail da conta no Resend)
3. Faça um **Redeploy** (Deployments > ... > Redeploy).

Sem essas variáveis o pedido pago aparece só nos logs da Vercel.
Não precisa configurar nada no painel do Mercado Pago: o endereço de aviso
já é enviado junto com cada pagamento.

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

- **Controle de estoque automático**: hoje o campo `estoque` só limita a quantidade por pedido.
- **Frete por região**: hoje o frete é fixo (veja `js/produtos.js`).
- **E-mail de confirmação para o cliente**: o aviso atual vai só para você.

Qualquer uma dessas melhorias, é só pedir.
