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

import { Baby, CheckCircle, Users, Asterisk, User, AlertTriangle, FileText, BookOpen } from 'lucide-react';

export default function HomePage({ onNavigate }) {
  const categories = [
    // Secció Infantil (morat)
    {
      section: 'infantil',
      items: [
        { id: 'infants', icon: Baby, label: 'Infants', sublabel: '(0-6 anys)', color: 'purple' },
        { id: 'repesca', icon: CheckCircle, label: 'Repesca', sublabel: '(4m-18a)', color: 'purple' },
        { id: 'adolescents', icon: Users, label: 'Adolescents', sublabel: '(7-18 anys)', color: 'purple' },
        { id: 'condicions-infantils', icon: Asterisk, label: 'Condicions', sublabel: 'infantils', color: 'purple' }
      ]
    },
    // Secció Adults (blau)
    {
      section: 'adults',
      items: [
        { id: 'adults', icon: User, label: 'Adults', sublabel: '(19+ anys)', color: 'blue' },
        { id: 'condicions-adults', icon: Asterisk, label: 'Condicions', sublabel: 'adults', color: 'blue' }
      ]
    },
    // Secció Recursos (blau amb interior taronja)
    {
      section: 'recursos',
      items: [
        { id: 'contraindicacions', icon: AlertTriangle, label: 'Contraindicacions', sublabel: '', color: 'orange' },
        { id: 'addenda', icon: FileText, label: 'Addenda', sublabel: '', color: 'orange' },
        { id: 'recursos', icon: BookOpen, label: 'Recursos', sublabel: 'generals', color: 'orange' }
      ]
    }
  ];

  const getButtonClasses = (color) => {
    const baseClasses = "flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer";
    
    if (color === 'purple') {
      return `${baseClasses} bg-purple-600 hover:bg-purple-700`;
    } else if (color === 'orange') {
      return `${baseClasses} bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700`;
    } else {
      return `${baseClasses} bg-blue-500 hover:bg-blue-600`;
    }
  };

  const getIconContainerClasses = (color) => {
    if (color === 'orange') {
      return "bg-orange-500 p-4 rounded-xl mb-3";
    }
    return "mb-3";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Banner Beta */}
      <div className="bg-amber-500 text-white px-4 py-2 text-center text-sm font-medium">
        ⚠️ Versió Beta en proves - No usar per decisions clíniques
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Agenda Vacunal Catalunya</h1>
          <p className="text-blue-100 text-base">Calendari oficial de vacunació</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {categories.map((category, categoryIndex) => (
          <div key={category.section}>
            {/* Secció */}
            <div className={`grid grid-cols-2 gap-4 mb-6 ${category.section === 'recursos' && 'grid-cols-2'}`}>
              {category.items.map((item, index) => {
                const Icon = item.icon;
                const isLastInResources = category.section === 'recursos' && index === category.items.length - 1;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`${getButtonClasses(item.color)} ${
                      isLastInResources ? 'col-span-2 mx-auto w-1/2' : ''
                    }`}
                  >
                    <div className={getIconContainerClasses(item.color)}>
                      <Icon size={48} className="text-white" strokeWidth={2} />
                    </div>
                    <div className="text-white text-center">
                      <div className="font-bold text-lg">{item.label}</div>
                      {item.sublabel && (
                        <div className="text-sm opacity-90">{item.sublabel}</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Línia separadora (excepte l'última secció) */}
            {categoryIndex < categories.length - 1 && (
              <div className="border-t-2 border-gray-300 my-8"></div>
            )}
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-600 text-sm py-6 mt-8">
        <p>Font: Departament de Salut - Generalitat de Catalunya</p>
      </footer>
    </div>
  );
}
