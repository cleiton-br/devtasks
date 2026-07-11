# 🚀 DevTasks

Gerenciador de tarefas para desenvolvedores com Kanban Board e Dashboard de métricas.

---

## 📸 Screenshots

### Kanban Board
![Kanban Board](docs/tela_kanban.png)

### Dashboard
![Dashboard](docs/tela_dashboard.png)

---

## ✨ Funcionalidades

- Criar, editar e excluir tarefas
- Mover tarefas entre colunas (Pendente > Em andamento > Concluído)
- Definir Prioridade (Alta / Média / Baixa)
- Tags personalizadas
- Dashboard com métricas e gráficos

---

## 🛠️ Stack

### Frontend
| Tecnologia | Versão |
|------------|--------|
| React | 19 |
| Vite | 8 |
| Axios | 1.18 |
| Chart.js | 4.5 |
| Context API | - |

### Backend
| Tecnologia | Versão |
|------------|--------|
| Node.js | 24 |
| Express | 5 |
| PostgreSQL | 16 |
| pg (driver) | 8 |

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js 24+
- PostgreSQL 16+

### 1. Clone o repositório

```bash
git clone https://github.com/cleiton-br/devtasks.git
cd devtasks
```

### 2. Backend

```bash
cd backend
cp .env.example .env # configure as credenciais do banco
npm install
npm start # rode em http://localhost:3001
```
### 3. Frontend

```bash
cd frontend
npm install
npm run dev # roda em http://localhost:5173
```
### 4. Banco de dados

```bash
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  priority VARCHAR(20) DEFAULT 'media',
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📝 Licença

Este projeto foi desenvolvido exclusivamente para fins de estudo, como parte do programa **Salvador Tech** — uma política pública da **Prefeitura Municipal de Salvador**, em parceria com a **Unifel Educação Corporativa**.

Sinta-se livre para usar como referência.

---

Feito por [Cleiton](https://github.com/cleiton-br)