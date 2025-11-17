/**
 * Agenda Vacunal Catalunya
 * Copyright (C) 2025 Sergi Catà de la Torra
 * 
 * Aquest programa és programari lliure: podeu redistribuir-lo i/o modificar-lo
 * sota els termes de la Llicència Pública General Affero de GNU publicada per
 * la Free Software Foundation, ja sigui la versió 3 de la Llicència o
 * (a la vostra elecció) qualsevol versió posterior.
 * 
 * Aquest programa es distribueix amb l'esperança que sigui útil,
 * però SENSE CAP GARANTIA; fins i tot sense la garantia implícita de
 * COMERCIALITZACIÓ o IDONEÏTAT PER A UN PROPÒSIT PARTICULAR. Consulteu la
 * Llicència Pública General Affero de GNU per a més detalls.
 * 
 * Hauríeu d'haver rebut una còpia de la Llicència Pública General Affero de GNU
 * juntament amb aquest programa. Si no és així, consulteu <https://www.gnu.org/licenses/>.
 */

import { useState, useEffect } from 'react';
import { Shield, Loader2, AlertCircle, Home, Calendar } from 'lucide-react';
import HomePage from './components/HomePage';
import CalendarView from './components/CalendarView';
import UnderConstruction from './components/UnderConstruction';

// Dades mock per desenvolupament
const MOCK_VACCINES = [
  {
    "id": "hexavalent",
    "name": "Hexavalent",
    "applies_at": ["2 mesos", "4 mesos", "11 mesos"],
    "protects_against": ["Diftèria", "Tètanus", "Tos ferina", "Poliomielitis", "Haemophilus influenzae b", "Hepatitis B"]
  },
  {
    "id": "dtpa-pi",
    "name": "DTPa-PI",
    "applies_at": ["15 mesos"],
    "protects_against": ["Diftèria", "Tètanus", "Tos ferina", "Poliomielitis"]
  },
  {
    "id": "dtpa5",
    "name": "dTpa5",
    "applies_at": ["6 anys"],
    "protects_against": ["Diftèria", "Tètanus", "Tos ferina"],
    "infoextra": ["S'ha d'administrar la vacuna dTpa a les embarassades, en cada embaràs, a partir de les 27 setmanes, preferentment entre les setmanes 27 i 32."]
  },
  {
    "id": "td",
    "name": "Td",
    "applies_at": ["14 anys", "40 anys"],
    "protects_against": ["Diftèria", "Tètanus"]
  },
  {
    "id": "pneumococ-conjugada",
    "name": "Pneumococ conjugada",
    "applies_at": ["2 mesos", "4 mesos", "11 mesos", "65 anys"],
    "protects_against": ["Malaltia per pneumococ"]
  },
  {
    "id": "triple-virica",
    "name": "Triple vírica",
    "applies_at": ["12 mesos", "3-4 anys"],
    "protects_against": ["Xarampió", "Rubèola", "Parotiditis"]
  },
  {
    "id": "meningococ-b",
    "name": "Meningococ B",
    "applies_at": ["2 mesos", "4 mesos", "6 mesos", "11 mesos"],
    "protects_against": ["Malaltia per meningococ"]
  },
  {
    "id": "meningococ-c",
    "name": "Meningococ C conjugada",
    "applies_at": ["12 mesos"],
    "protects_against": ["Malaltia per meningococ"]
  },
  {
    "id": "meningococ-acwy",
    "name": "Meningococ ACWY",
    "applies_at": ["11-12 anys"],
    "protects_against": ["Malaltia per meningococ"],
    "infoextra": ["S'han de vacunar els adolescents d'11-12 anys d'edat que no hagin rebut cap dosi de la vacuna MACWY a partir dels 10 anys d'edat."]
  },
  {
    "id": "varicel·la",
    "name": "Varicel·la",
    "applies_at": ["15 mesos", "3-4 anys", "11-12 anys"],
    "protects_against": ["Varicel·la"]
  },
  {
    "id": "hepatitis-a",
    "name": "Hepatitis A",
    "applies_at": ["15 mesos", "3-4 anys", "11-12 anys"],
    "protects_against": ["Hepatitis A"]
  },
  {
    "id": "vph",
    "name": "VPH",
    "applies_at": ["11-12 anys"],
    "protects_against": ["Infecció per virus del papil·loma humà"]
  },
  {
    "id": "herpes-zoster",
    "name": "Herpes zòster",
    "applies_at": ["65 anys", "80 anys"],
    "protects_against": ["Herpes zòster"],
    "infoextra": ["S'han d'administrar dues dosis de la vacuna contra l'herpes zòster a les persones que compleixin 65 anys o 80 anys."]
  },
  {
    "id": "rotavirus",
    "name": "Rotavirus",
    "applies_at": ["2 mesos"],
    "protects_against": ["Infecció per rotavirus"]
  },
  {
    "id": "vrs",
    "name": "VRS",
    "applies_at": ["0 mesos"],
    "protects_against": ["Infecció per virus respiratori sincicial"]
  }
];

const VIEW_TITLES = {
  'infants': 'Infants (0-6 anys)',
  'repesca': 'Repesca vacunal (4 mesos - 18 anys)',
  'adolescents': 'Adolescents (7-18 anys)',
  'condicions-infantils': 'Condicions especials infantils',
  'adults': 'Adults (19+ anys)',
  'condicions-adults': 'Condicions especials adults',
  'contraindicacions': 'Contraindicacions',
  'addenda': 'Addenda i actualitzacions',
  'recursos': 'Recursos generals'
};

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [vaccines, setVaccines] = useState(MOCK_VACCINES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.BASE_URL}/data/vaccines_complet.json`)
      .then(res => {
        if (!res.ok) throw new Error('Error carregant dades');
        return res.json();
      })
      .then(data => {
        setVaccines(Array.isArray(data.vaccines) ? data.vaccines : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error carregant vacunes, usant dades mock:', err);
        setLoading(false);
      });
  }, []);

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregant dades del calendari vacunal...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Error carregant les dades</h2>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Beta Banner - només mostrar si no estem a la home */}
      {currentView !== 'home' && (
        <div className="bg-amber-500 text-white px-4 py-2 text-center text-sm font-medium">
          ⚠️ Versió Beta en proves - No usar per decisions clíniques
        </div>
      )}

      {/* Header amb navegació - només mostrar si no estem a la home */}
      {currentView !== 'home' && (
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield size={28} />
                <div>
                  <h1 className="text-xl md:text-2xl font-bold">Agenda Vacunal Catalunya</h1>
                  <p className="text-blue-100 text-xs mt-1">Calendari oficial de vacunació</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleNavigate('home')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg transition text-sm font-medium"
                >
                  <Home size={18} />
                  <span className="hidden sm:inline">Inici</span>
                </button>
                <button
                  onClick={() => handleNavigate('calendar')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg transition text-sm font-medium"
                >
                  <Calendar size={18} />
                  <span className="hidden sm:inline">Calendari</span>
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Content */}
      <main>
        {currentView === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}
        
        {currentView === 'calendar' && (
          <CalendarView vaccines={vaccines} />
        )}

        {currentView !== 'home' && currentView !== 'calendar' && (
          <UnderConstruction title={VIEW_TITLES[currentView]} />
        )}
      </main>
    </div>
  );
}
