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
import { X, Info, Calendar, Shield, AlertCircle, Loader2, ExternalLink } from 'lucide-react';

const AGE_GROUPS = [
  { id: '0m', label: '0m', sort: 0 },
  { id: '2m', label: '2m', sort: 2 },
  { id: '4m', label: '4m', sort: 4 },
  { id: '6m', label: '6m', sort: 6 },
  { id: '11m', label: '11m', sort: 11 },
  { id: '12m', label: '12m', sort: 12 },
  { id: '15m', label: '15m', sort: 15 },
  { id: '3-4a', label: '3-4a', sort: 42 },
  { id: '6a', label: '6a', sort: 72 },
  { id: '11-12a', label: '11-12a', sort: 138 },
  { id: '14a', label: '14a', sort: 168 },
  { id: '40a', label: '40a', sort: 480 },
  { id: '65a', label: '65a', sort: 780 },
  { id: '80a', label: '80a', sort: 960 }
];

function normalizeAge(age) {
  const map = {
    '0 mesos': '0m',
    '2 mesos': '2m',
    '4 mesos': '4m',
    '6 mesos': '6m',
    '11 mesos': '11m',
    '12 mesos': '12m',
    '15 mesos': '15m',
    '3-4 anys': '3-4a',
    '6 anys': '6a',
    '11-12 anys': '11-12a',
    '14 anys': '14a',
    '40 anys': '40a',
    '65 anys': '65a',
    '80 anys': '80a'
  };
  return map[age] || age;
}

const VACCINE_COLORS = {
  'hexavalent': 'bg-blue-500',
  'dtpa-pi': 'bg-blue-400',
  'dtpa5': 'bg-blue-300',
  'td': 'bg-blue-200',
  'pneumococ-conjugada': 'bg-purple-500',
  'triple-virica': 'bg-pink-500',
  'meningococ-b': 'bg-red-500',
  'meningococ-c': 'bg-red-400',
  'meningococ-acwy': 'bg-red-300',
  'varicel·la': 'bg-green-500',
  'hepatitis-a': 'bg-yellow-500',
  'vph': 'bg-orange-500',
  'herpes-zoster': 'bg-indigo-500',
  'rotavirus': 'bg-teal-500',
  'vrs': 'bg-cyan-500'
};

function VaccineModal({ vaccine, onClose }) {
  if (!vaccine) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{vaccine.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="text-blue-600" size={20} />
              <h3 className="font-semibold text-lg">Edats d'aplicació</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {vaccine.applies_at.map((age, i) => (
                <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {age}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="text-green-600" size={20} />
              <h3 className="font-semibold text-lg">Protegeix contra</h3>
            </div>
            <ul className="space-y-2">
              {vaccine.protects_against.map((disease, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-gray-700">{disease}</span>
                </li>
              ))}
            </ul>
          </div>

          {vaccine.infoextra && vaccine.infoextra.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="text-amber-600" size={20} />
                <h3 className="font-semibold text-lg">Informació addicional</h3>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                {vaccine.infoextra.map((info, i) => (
                  <p key={i} className="text-gray-700 text-sm">{info}</p>
                ))}
              </div>
            </div>
          )}

          {vaccine.link && (
            <div className="pt-2 border-t">
              <a 
                href={vaccine.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <ExternalLink size={18} />
                Consultar fitxa tècnica (PDF)
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Dades mock per desenvolupament i visualització
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

export default function App() {
  const [vaccines, setVaccines] = useState(MOCK_VACCINES); // Començar amb dades mock
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [loading, setLoading] = useState(false); // No carregar per defecte
  const [error, setError] = useState(null);

  useEffect(() => {
    // Intentar carregar dades reals del JSON
    setLoading(true);
    fetch('/data/vaccines_complet.json')
      .then(res => {
        if (!res.ok) throw new Error('Error carregant dades');
        return res.json();
      })
      .then(data => {
        setVaccines(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error carregant vacunes, usant dades mock:', err);
        // Mantenir les dades mock si falla la càrrega
        setLoading(false);
        // No mostrar error si tenim dades mock
      });
  }, []);

  const vaccinesByAge = {};
  AGE_GROUPS.forEach(group => {
    vaccinesByAge[group.id] = [];
  });

  vaccines.forEach(vaccine => {
    vaccine.applies_at.forEach(age => {
      const normalized = normalizeAge(age);
      if (vaccinesByAge[normalized]) {
        vaccinesByAge[normalized].push(vaccine);
      }
    });
  });

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
      {/* Beta Banner */}
      <div className="bg-amber-500 text-white px-4 py-2 text-center text-sm font-medium">
        ⚠️ Versió Beta en proves - No usar per decisions clíniques
      </div>
      
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Shield size={32} />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Agenda Vacunal Catalunya</h1>
              <p className="text-blue-100 text-sm mt-1">Calendari oficial de vacunació</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <div className="flex items-center gap-2">
              <Info size={20} className="text-blue-600" />
              <p className="text-sm text-gray-600">
                Fes clic sobre qualsevol vacuna per veure'n els detalls
              </p>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {/* Desktop view amb millores visuals */}
              <div className="hidden md:block">
                {/* Contenidor amb altura màxima per habilitar scroll vertical amb header sticky */}
                <div className="max-h-[600px] overflow-y-auto relative">
                  <table className="min-w-full border-collapse">
                    <thead className="sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 bg-gray-100 border-r border-gray-300">
                          Vacuna
                        </th>
                        {AGE_GROUPS.map((group, index) => (
                          <th 
                            key={group.id} 
                            className={`px-2 py-3 text-center text-xs font-semibold text-gray-700 min-w-[60px] border-r border-gray-200 ${
                              index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'
                            }`}
                          >
                            {group.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {vaccines.map((vaccine, rowIndex) => (
                        <tr 
                          key={vaccine.id} 
                          className={`hover:bg-blue-50 transition ${
                            rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                          }`}
                        >
                          <td className="px-4 py-3 sticky left-0 z-5 bg-white border-r border-gray-300">
                            <button
                              onClick={() => setSelectedVaccine(vaccine)}
                              className="text-left hover:text-blue-600 font-medium text-sm"
                            >
                              {vaccine.name}
                            </button>
                          </td>
                          {AGE_GROUPS.map((group, colIndex) => {
                            const hasVaccine = vaccinesByAge[group.id]?.some(v => v.id === vaccine.id);
                            return (
                              <td 
                                key={group.id} 
                                className={`px-2 py-3 text-center border-r border-gray-200 ${
                                  colIndex % 2 === 0 ? '' : 'bg-gray-100/100'
                                }`}
                              >
                                {hasVaccine && (
                                  <button
                                    onClick={() => setSelectedVaccine(vaccine)}
                                    className={`w-8 h-8 rounded-full ${VACCINE_COLORS[vaccine.id] || 'bg-gray-400'} hover:opacity-80 transition shadow-sm hover:shadow-md`}
                                    title={vaccine.name}
                                  />
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile view */}
              <div className="md:hidden">
                {AGE_GROUPS.map(group => {
                  const groupVaccines = vaccinesByAge[group.id];
                  if (groupVaccines.length === 0) return null;
                  
                  return (
                    <div key={group.id} className="border-b last:border-b-0">
                      <div className="px-4 py-3 bg-gray-100 font-semibold text-gray-700">
                        {group.label}
                      </div>
                      <div className="px-4 py-3 space-y-2">
                        {groupVaccines.map(vaccine => (
                          <button
                            key={vaccine.id}
                            onClick={() => setSelectedVaccine(vaccine)}
                            className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition flex items-center gap-3"
                          >
                            <div className={`w-4 h-4 rounded-full ${VACCINE_COLORS[vaccine.id] || 'bg-gray-400'} flex-shrink-0`} />
                            <span className="font-medium text-gray-900">{vaccine.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Llegenda de vacunes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {vaccines.map(vaccine => (
              <div key={vaccine.id} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${VACCINE_COLORS[vaccine.id] || 'bg-gray-400'} flex-shrink-0`} />
                <span className="text-sm text-gray-700">{vaccine.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {selectedVaccine && (
        <VaccineModal vaccine={selectedVaccine} onClose={() => setSelectedVaccine(null)} />
      )}
    </div>
  );
}
