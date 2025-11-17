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

import { Construction } from 'lucide-react';

export default function UnderConstruction({ title }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Construction size={64} className="text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">En construcció</h2>
          {title && (
            <p className="text-lg text-gray-700 mb-4">{title}</p>
          )}
          <p className="text-gray-600 text-sm">
            Aquesta secció estarà disponible properament.
          </p>
        </div>
      </div>
    </div>
  );
}
