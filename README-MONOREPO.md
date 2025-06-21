# Amazon Books - Monorepo Deployment

A full-stack application with **Python FastAPI backend** and **Next.js frontend** deployed as a single service on Railway.

## 🏗️ **Architecture**

```
┌─────────────────────────────────────┐
│           Railway Service           │
├─────────────────────────────────────┤
│  Next.js Frontend (Port 3000)      │
│  ├── Serves UI at /                │
│  └── Proxies API calls to /api/*   │
├─────────────────────────────────────┤
│  Python Backend (Port 8000)        │
│  ├── FastAPI server                │
│  └── Handles all /api/* requests   │
└─────────────────────────────────────┘
```

## 🚀 **Deployment**

### **Option 1: Railway CLI (Recommended)**
```bash
./deploy-monorepo.sh
```

### **Option 2: Railway Dashboard**
1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select this repository
4. Railway will auto-detect the monorepo setup
5. Deploy automatically

## 📁 **Project Structure**

```
amazonbooks/
├── backend/                 # Python FastAPI
│   ├── main.py             # FastAPI app
│   ├── requirements.txt    # Python dependencies
│   └── test_api.py         # API tests
├── frontend/               # Next.js React app
│   ├── app/                # Next.js app directory
│   ├── components/         # React components
│   ├── lib/                # Utilities
│   ├── types/              # TypeScript types
│   └── package.json        # Node.js dependencies
├── nixpacks.toml           # Multi-language build config
├── railway.json            # Railway deployment config
├── start.js                # Startup script
└── package.json            # Root package.json
```

## 🔧 **How It Works**

### **1. Single URL Deployment**
- **Frontend**: Served at the root URL (e.g., `https://your-app.railway.app`)
- **Backend**: API routes proxied through `/api/*` (e.g., `https://your-app.railway.app/api/books`)

### **2. API Proxy**
- Next.js API routes in `frontend/app/api/[...path]/route.ts`
- Proxies all `/api/*` requests to the Python backend
- Handles CORS and request/response forwarding

### **3. Startup Process**
1. **Nixpacks** installs Python and Node.js
2. **Python dependencies** installed from `backend/requirements.txt`
3. **Node.js dependencies** installed from both root and frontend
4. **start.js** runs both services concurrently
5. **Frontend** builds and serves the UI
6. **Backend** handles API requests

## 🌐 **URL Structure**

| URL | Service | Description |
|-----|---------|-------------|
| `/` | Frontend | Main UI (book list, forms) |
| `/api/books` | Backend | Get all books |
| `/api/books` | Backend | Add new book (POST) |
| `/api/books/{id}` | Backend | Get specific book |
| `/api/books/{id}/reviews` | Backend | Add review (POST) |

## 🛠️ **Local Development**

### **Prerequisites**
- Python 3.8+
- Node.js 18+
- npm

### **Setup**
```bash
# Install Python dependencies
pip install -r backend/requirements.txt

# Install Node.js dependencies
npm install
cd frontend && npm install && cd ..

# Start both services
npm start
```

### **Access**
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **API**: http://localhost:3000/api/* (proxied)

## 🔍 **Environment Variables**

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Frontend port | 3000 |
| `BACKEND_PORT` | Backend port | 8000 |
| `BACKEND_URL` | Backend URL for proxy | http://localhost:8000 |

## 📊 **API Endpoints**

### **Books**
- `GET /api/books` - Get all books
- `POST /api/books` - Add new book
- `GET /api/books/{id}` - Get specific book

### **Reviews**
- `POST /api/books/{id}/reviews` - Add review to book

## 🎯 **Benefits of This Setup**

### **✅ Single Deployment**
- One Railway service
- One URL for everything
- Simplified deployment

### **✅ No CORS Issues**
- Frontend and backend on same domain
- API calls work seamlessly

### **✅ Easy Development**
- Single repository
- Shared types and utilities
- Consistent environment

### **✅ Cost Effective**
- One service instead of two
- Shared resources

## 🚨 **Troubleshooting**

### **Common Issues**

1. **Build Fails**
   ```bash
   # Check Nixpacks logs
   railway logs
   ```

2. **API Not Working**
   - Verify backend is running on port 8000
   - Check proxy configuration in `frontend/app/api/[...path]/route.ts`

3. **Frontend Not Loading**
   - Check if Next.js build completed
   - Verify port 3000 is accessible

### **Debug Commands**
```bash
# View logs
railway logs

# Check service status
railway status

# Redeploy
railway up

# Access service shell
railway shell
```

## 🎉 **Success!**

After deployment, your full-stack app will be available at:
- **Main URL**: `https://your-app.railway.app`
- **API Docs**: `https://your-app.railway.app/api/docs`

Both frontend and backend served from the same URL! 🚀 