import os
import json

# Ruta del fitxer d'entrada (assumint que s'està dins la carpeta 'dades')
INPUT_FILE = "vaccines_complet.json"
OUTPUT_DIR = "vacunes"

# Crear la carpeta 'vacunes/' si no existeix
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Assignació de grups d'edat a esquemes
def assign_schemes(applies_at):
    schemes = []
    for age in applies_at:
        age = age.lower()
        if any(x in age for x in ["0 mesos", "2 mesos", "4 mesos", "6 mesos", "11 mesos", "12 mesos", "15 mesos", "3 anys", "4 anys", "6 anys"]):
            if "infants-naixement-6anys" not in schemes:
                schemes.append("infants-naixement-6anys")
        if any(x in age for x in ["7 anys", "11-12 anys", "14 anys", "18 anys"]):
            if "adolescents-7-18anys" not in schemes:
                schemes.append("adolescents-7-18anys")
        if any(x in age for x in ["40 anys", "65 anys", "80 anys", "a partir", "anualment", "19"]):
            if "adults-19-endavant" not in schemes:
                schemes.append("adults-19-endavant")
    return schemes

# Carregar les dades del fitxer JSON principal
with open(INPUT_FILE, "r", encoding="utf-8") as f:
    vaccines_data = json.load(f)

# Processar i desar cada vacuna com a fitxer individual
for vaccine in vaccines_data:
    vaccine["schemes"] = assign_schemes(vaccine.get("applies_at", []))
    vaccine["catchup"] = True
    vaccine["contraindications"] = None
    vaccine["notes"] = []

    output_file = os.path.join(OUTPUT_DIR, f"{vaccine['id']}.json")
    with open(output_file, "w", encoding="utf-8") as out:
        json.dump(vaccine, out, indent=2, ensure_ascii=False)

print(f"{len(vaccines_data)} fitxers individuals generats a la carpeta '{OUTPUT_DIR}/'")
