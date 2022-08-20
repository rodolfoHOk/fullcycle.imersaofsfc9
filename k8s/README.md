# Kubernetes

## Na máquina de desenvolvimento

- instalar o kind (Kubernetes local)

- instalar o kubectl

- criar cluster [codebank] com kind

## Confluence Cloud - Criar cluster Apache Kafka

- criar cluster basic na Confluence Cloud [fullcycle]

- criar Tópico [payments] [6 partições, 3 réplicas] em Topics

- criar novo Client [go] em Clients e copiar os dados para adicionar no .env da app

- criar kafka cluster API key & secret e copiar os dados para adicionar no .env da app

## Continuando na máquina de desenvolvimento

- Mudar o contexto para o cluster criado com o kind [kind-codebank] no kubectl

- Ver nodes no kubectl para ver o que está criado [codebank-control-plane]

## Criar PostgreSQL no Kubernetes e alimentar

* [info](https://bitnami.com/stack/postgresql/helm)

- helm repo add bitnami https://charts.bitnami.com/bitnami

- helm install postgres bitnami/postgresql

- copiar o host name (DNS name)

- copiar e executar o comando para pegar a senha do postgres

- echo $POSTGRES_PASSWORD

- copiar e executar o comando para rodar o postgres

- create database codebank;

- \connect codebank;

- copiar e colar os sql das criações de tabelas um de cada vez (../codebank/db.sql)

- \dt

- copiar e colar os sql para inserir os credit card (../codebank/db.sql)

- verificar os dados inseridos

- create database invoices;

- create database store;

- \q

## Continuando na máquina de desenvolvimento

- criar a docker image de produção do codebank

- fazer o push da image (fazer o docker login de preciso)

- abrir o configmap.yaml do codebank e editar os environments

- fazer a aplicação do configmap no kubectl

- ver os configmaps

- fazer a aplicação do deploy do codebank no kubectl

- ver os pods

- ver os logs do pod do codebank

- fazer a aplicação do service do codebank no kubectl

- ver os serviços

- fazer o port-forward do codebank (se quiser acessar serviço localmente para testes)

- fazer a aplicação do configmap do invoices-api no kubectl

- fazer o push da image do invoices-api

- fazer a aplicação do deploy do invoices-api no kubectl

- ver os pods

- ver os logs do pod do invoices-api

- fazer a aplicação do service do invoices-api no kubectl

- ver os serviços

- fazer o port-forward do invoices-api (para testar localmente no cloud seria gerado um ip externo para acessar)

## Lista de Comandos

### Comandos kind

- Criar cluster:

        kind create cluster --name=nome_do_cluster

### Comandos kubectl

- Mudar o contexto (onde todos os comandos seguintes serão aplicados):

        kubectl cluster-info --context nome_do_cluster_kind

- Aplicar:

        kubectl apply -f nome-do-arquivo.yaml

- Ver nós:

        kubectl get nodes

- Ver pods:

        kubectl get pods

- Ver logs:

        kubectl logs nome-do-pod

- Ver services:

        kubectl get svc

- Ver os configmaps:

        kubectl get configmaps

- Port-forward:

        kubectl port-forward svc/nome_do_serviço porta_externa:porta_serviço

### Docker

- Fazer o build das images docker para produção:

        docker build -t nome-conta-docker-hub/nome-da-imagem -f Dockerfile.prod

- Fazer o push das images para o docker hub:

        docker push nome-conta-docker-hub/nome-da-imagem
