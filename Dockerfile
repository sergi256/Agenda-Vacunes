# --- Etapa única per desenvolupament i build ---
FROM node:22-alpine

# Variables d'entorn útils
ENV PNPM_HOME="/usr/local/bin"
ENV PATH="${PNPM_HOME}:${PATH}"
ENV NODE_ENV=development

# Instal·lació de dependències bàsiques (bash, git, etc.)
RUN apk add --no-cache bash git curl openssh

# Instal·lació de pnpm i vite
RUN npm install -g pnpm vite tailwindcss postcss autoprefixer
RUN pnpm approve-builds --all

# Directori de treball
WORKDIR /app

# Copia el projecte (només els fitxers essencials primer per aprofitar cache)
COPY package.json pnpm-lock.yaml* ./

# Instal·la dependències
RUN pnpm install

# Copia el codi font
COPY . .

# Port de desenvolupament
EXPOSE 5173

# Comanda per defecte (mode desenvolupament)
CMD ["pnpm", "run", "dev", "--", "--host", "0.0.0.0"]

