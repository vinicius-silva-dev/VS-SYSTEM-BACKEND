-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participante" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'fisica',
    "tipo_contribuinte" TEXT NOT NULL,
    "inscricao_estadual" INTEGER NOT NULL,
    "inscricao_municipal" INTEGER NOT NULL,
    "situacao" TEXT NOT NULL DEFAULT 'ativo',
    "endereco_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "Participante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" TEXT NOT NULL,
    "cod_prod" INTEGER NOT NULL,
    "cod_barras" INTEGER NOT NULL,
    "cod_ncm" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "tipo_prod" TEXT NOT NULL,
    "unidade_medida" TEXT NOT NULL,
    "custo_mercadoria" TEXT NOT NULL,
    "preco_venda" TEXT NOT NULL,
    "estoque_inicial" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estoque" (
    "id" TEXT NOT NULL,
    "codProd" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "estoque_contabil" INTEGER NOT NULL,
    "estoque_disponivel" INTEGER NOT NULL,
    "estoque_area_vendas" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Estoque_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "produtos_cod_prod_key" ON "produtos"("cod_prod");

-- CreateIndex
CREATE UNIQUE INDEX "produtos_cod_barras_key" ON "produtos"("cod_barras");

-- AddForeignKey
ALTER TABLE "Participante" ADD CONSTRAINT "Participante_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "Endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estoque" ADD CONSTRAINT "Estoque_codProd_fkey" FOREIGN KEY ("codProd") REFERENCES "produtos"("cod_prod") ON DELETE RESTRICT ON UPDATE CASCADE;
