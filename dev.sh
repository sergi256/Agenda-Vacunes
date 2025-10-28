#!/bin/bash

docker run -it --rm \
  -v "$(pwd)":/app \
  -p 5173:5173 \
  agenda-vacunes /bin/bash -c "cd /app && pnpm install && pnpm run dev --host 0.0.0.0"
