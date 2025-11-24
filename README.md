# Meu Projeto CI/CD na AWS

![Deploy to AWS ECS](https://github.com/jpedrosousa74/meu-projeto-cicd-aws/actions/workflows/aws-deploy.yml/badge.svg)

## 📝 Descrição

Projeto prático de CI/CD com deploy automático na AWS usando:
- Node.js + Express
- Docker
- AWS ECR (Elastic Container Registry)
- AWS ECS Fargate
- Application Load Balancer
- GitHub Actions

## 🏗️ Arquitetura

GitHub → GitHub Actions → AWS ECR → AWS ECS Fargate → ALB → Internet

## 🚀 Tecnologias
- Backend: Node.js 18, Express
- Testes: Jest, Supertest
- Container: Docker
- CI/CD: GitHub Actions
- Cloud: AWS (ECR, ECS, ALB, CloudWatch)

## 📦 Deploy
O deploy é automático via GitHub Actions quando há push na branch main.

**Pipeline:**
✅ Executar testes  
🐳 Build da imagem Docker  
📤 Push para AWS ECR  
🚀 Deploy no ECS Fargate  
🔄 Atualização do serviço (zero downtime)

**🔗 Acesso**
A aplicação está disponível em: [URL do ALB será exibida após o deploy]

## 🧪 Endpoints
- `GET /` - Mensagem de boas-vindas  
- `GET /health` - Health check  
- `GET /info` - Informações da aplicação  
- `GET /env` - Variáveis de ambiente

## 💰 Custos
Custos estimados na AWS (com créditos do Academy):  
- ECR: ~$0.50/mês  
- ECS Fargate: ~$3/mês  
- ALB: ~$16/mês  
- CloudWatch: ~$0.10/mês  

**Total:** ~$20/mês (considere desligar recursos quando não usar!)

## 🧹 Limpeza
Para evitar custos, execute:

```bash
# Deletar serviço
aws ecs delete-service --cluster meu-projeto-cluster --service meu-projeto-service --force

# Deletar cluster
aws ecs delete-cluster --cluster meu-projeto-cluster

# Deletar ALB, Target Group, etc.
