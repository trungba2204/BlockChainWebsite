#!/bin/bash

echo "🛑 Stopping Blockchain Company Website..."
echo ""

docker-compose down

echo ""
echo "✅ All services stopped!"
echo ""
echo "To remove all data (including database):"
echo "  docker-compose down -v"
echo ""
