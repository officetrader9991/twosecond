#!/bin/bash

echo "Starting local server for Bunny Breeding Simulator..."

# First kill any existing Python HTTP servers
echo "Checking for existing HTTP servers..."
pkill -f "python3 -m http.server" 2>/dev/null || true
pkill -f "python -m http.server" 2>/dev/null || true
sleep 1  # Give servers time to shut down

# Try to find an available port
PORT=8000
MAX_PORT=8020

while netstat -an | grep -q "LISTEN" | grep -q ":$PORT "; do
    echo "Port $PORT is already in use, trying next port..."
    PORT=$((PORT+1))
    if [ $PORT -ge $MAX_PORT ]; then
        echo "Error: Could not find available port between 8000-8019"
        echo "Please manually close whatever is using these ports and try again."
        exit 1
    fi
done

echo "Opening http://localhost:$PORT in your default browser..."

# Open browser
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open "http://localhost:$PORT"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open "http://localhost:$PORT"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows
    start "http://localhost:$PORT"
fi

# Start server
echo "Server running at http://localhost:$PORT - Press Ctrl+C to stop"
python3 -m http.server $PORT || python -m http.server $PORT 