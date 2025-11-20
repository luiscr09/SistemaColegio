import { useState } from 'react';
import { Search } from 'lucide-react';
import { type GuardianData } from '../../views/student';
import { supabase } from '../../lib/supabase'; // Asegúrate de importar supabase correctamente

interface GuardianSearchProps {
  guardianId: string;
  searchOpen: boolean;
  onSearchOpenChange: (open: boolean) => void;
  onSelectExisting: (existing: GuardianData, targetId: string) => void;
}

export default function GuardianSearch({ guardianId, searchOpen, onSearchOpenChange, onSelectExisting }: GuardianSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<GuardianData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchGuardians = async (query: string) => {
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.rpc('search_parents', { search_text: query });
    if (error) {
      console.error('Error searching parents:', error);
      setResults([]);
    } else {
      setResults(data ?? []);
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    fetchGuardians(val);
  };

  const handleSelectGuardian = (existing: GuardianData) => {
    onSelectExisting(existing, guardianId);
    setSearchQuery('');
    setResults([]);
    onSearchOpenChange(false);
  };

  return (
    <div className="mb-4 pb-4 border-b border-gray-200">
      <label className="block text-sm font-medium text-gray-700 mb-2">Buscar Tutor Existente</label>
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Busca por nombre o cédula..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => onSearchOpenChange(true)}
          onBlur={() => setTimeout(() => onSearchOpenChange(false), 200)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
        />
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {loading ? (
              <div className="px-4 py-3 text-sm text-gray-500">Buscando...</div>
            ) : results.length > 0 ? (
              <ul>
                {results.map((existing) => (
                  <li key={existing.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectGuardian(existing)}
                      className="w-full text-left px-4 py-3 hover:bg-sky-50 transition border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900">{existing.full_name}</div>
                      <div className="text-sm text-gray-500">
                        {existing.cedula} • {existing.phone}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : searchQuery ? (
              <div className="px-4 py-3 text-sm text-gray-500">No se encontraron tutores</div>
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500">Escribe para buscar tutores existentes</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
