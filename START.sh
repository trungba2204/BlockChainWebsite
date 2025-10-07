#!/bin/bash

echo "🚀 Starting Blockchain Company Website..."
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

echo ""
echo "🏗️  Building and starting containers..."
echo ""

# Build and start containers
docker-compose up -d --build

echo ""
echo "⏳ Waiting for services to start..."
sleep 10

# Check if containers are running
echo ""
echo "📊 Container Status:"
docker-compose ps

echo ""
echo "✅ Application is starting up!"
echo ""
echo "📍 Access URLs:"
echo "   - Frontend:    http://localhost"
echo "   - Backend API: http://localhost:8080/api"
echo "   - Swagger UI:  http://localhost:8080/api/swagger-ui.html"
echo ""
echo "👤 Default Admin Account:"
echo "   Create admin user with:"
echo '   curl -X POST http://localhost:8080/api/auth/signup -H "Content-Type: application/json" -d '"'"'{"username":"admin","email":"admin@blockchain.com","password":"Admin@123","roles":["ADMIN"]}'"'"''
echo ""
echo "📝 View logs with: docker-compose logs -f"
echo "🛑 Stop with: docker-compose down"
echo ""
echo "🎉 Done! Happy coding!"
