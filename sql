CREATE TABLE usuario (
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	nome VARCHAR(40) NOT NULL,
	cpf VARCHAR(14) NOT NULL,
	email varchar(40) unique not null,
	password_hash varchar(200) not null,
	criado_em timestamp not null
);

create table insumo (
id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
nome_insumo varchar(45) not null,
quantidade decimal not null,
preco_unitario decimal not null
);


create table veiculo(
id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
chassi varchar(70) unique not null,
modelo varchar(45) not null,
cor varchar(45) not null,
inicio_producao timestamp not null,
fim_producao timestamp not null,

)

create table insumo_por_veiculo(
id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
fk_veiculo uuid not null,
fk_insumo uuid not null,
FOREIGN KEY (fk_veiculo) REFERENCES veiculo(id),
FOREIGN KEY (fk_insumo) REFERENCES insumo(id)

);


create table manutencao(
id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
descricao varchar(200) not null,
data_manutencao timestamp not null,
valor integer not null,
fk_veiculo uuid not null,
FOREIGN KEY (fk_veiculo) REFERENCES veiculo(id)
);

------------------------------------------------------------------
INSERT INTO insumo (id, nome_insumo, quantidade, preco_unitario)
VALUES (default, 'motor', 20, 5000),
(default, 'suspensão', 20, 2000),
(default, 'freios', 20, 1500),
(default, 'direção', 20, 6000),
(default, 'chicote', 20, 4000),
(default, 'arrefecimento', 20, 1500),
(default, 'tanque', 20, 800),
(default, 'ar-condicionado', 70, 3000),
(default, 'lanternas', 80, 900),
(default, 'pneu', 100, 600),
(default, 'parabrisa', 30, 800),
(default, 'pastilha', 200, 100),
(default, 'banco', 40, 3000);

INSERT INTO veiculo (id, chassi, modelo, cor, inicio_producao, fim_producao)
values (default, 2334343443, 'omega 3.0', 'prata', 'Mon, 02 Dec 2024 19:30:01 GMT', 'Mon, 02 Dec 2024 19:33:01 GMT')
