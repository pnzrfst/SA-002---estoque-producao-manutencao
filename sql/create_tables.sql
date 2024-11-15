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
