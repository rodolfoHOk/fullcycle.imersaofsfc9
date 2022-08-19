# Imersão Full Cycle Full Stack 9

> Integração

## Tecnologias

- Apache Kafka : Sistema de mensageria
- Kafka Connect : Ferramenta de streaming de dados entre Apache Kafka e outros sistemas de dados
- Elasticsearch : Ferramenta para mecanismo de busca e análise de dados distribuído
- Kibana : Interface de visualização de dados para o Elasticsearch
- Docker : Plataforma de software empacotados em contêineres

## Guia

- subir os containers com comando do terminal: docker-compose up -d
- criar arquivo de configuração do kafka connect (connector/elasticsearch.properties)
- carregar o arquivo de configuração:
  - acessar localhost:9021
  - -> Cluster 1 -> Connect -> connect-default -> Add connector
  - -> Upload connector config file : selecionar o arquivo criado
  - -> Continue -> Launch
- kibana:
  - acessar localhost:
  - # adicionar mapping de payments:
  - Management: -> Dev Tools
  - Console: PUT payments {...};
  - # criar index pattern para payments:
  - Management: -> Stack Management
  - Kibana: -> Index Patterns
  - -> Create index pattern
  - preencher name: payments* -> next
  - selecionar Time field: payment_date -> Create index pattern
  - # discover
  - -> Menu: Analytics: -> Discover (para ver os json que chegam no elasticsearch)
  - # Visualize
  - -> Analytics: -> Visualize -> Create new visualization (para criar os gráficos)
  - -> Lens: arrastar Records & Selecionar chart type: Metric
  - -> Metric: -> count of records
  - preencher Display name: Quantidade de transações
  - -> Save: Title: Quantidade de transações -> Save
  - Analytics: -> Visualize -> Create new visualization
  - Lens: arrastar status.keyword & Selecionar chart type: Donuts
  - seguir passos semelhantes e salvar (Aprovados vs Rejeitados)
  - Analytics: -> Visualize -> Create new visualization
  - fazer tabela de description.keyword
  - criar uma métrica de média de valor (amount / average)
  - criar top 5 produtos
  - # Dashboard
  - -> Create new dashboard
  - -> Add from library: selecionar as visualizações e posicionar como queira
  - -> Save: Title: '???' -> Save

## Problem

- elasticsearch failure running machine learning native code: 
  add in environments: xpack.ml.enabled=false
