import React, { useState, useEffect } from 'react';
import { ArrowLeft, Database, Search, Filter, Download, Share2, Eye, Lock, Unlock, Globe, Users, FileText, Calendar, MapPin, Mail, Phone, Hash, ExternalLink, AlertTriangle, CheckCircle, Clock, Activity, Zap, Target, Server, HardDrive, Shield, Key, Settings, RefreshCw as Refresh } from 'lucide-react';

interface DatabaseModuleProps {
  onBack: () => void;
}

interface DatabaseSource {
  id: string;
  name: string;
  type: 'public' | 'government' | 'commercial' | 'academic';
  status: 'online' | 'offline' | 'maintenance';
  description: string;
  recordCount: number;
  lastUpdate: string;
  accessLevel: 'public' | 'restricted' | 'classified';
  categories: string[];
  apiEndpoint?: string;
}

interface DatabaseRecord {
  id: string;
  sourceId: string;
  sourceName: string;
  title: string;
  content: string;
  category: string;
  timestamp: string;
  author?: string;
  location?: string;
  tags: string[];
  confidence: number;
  accessLevel: 'public' | 'restricted' | 'classified';
  metadata: Record<string, any>;
}

const DatabaseModule: React.FC<DatabaseModuleProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'sources' | 'search' | 'records' | 'analytics'>('sources');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [isSearching, setIsSearching] = useState(false);
  const [sources, setSources] = useState<DatabaseSource[]>([]);
  const [records, setRecords] = useState<DatabaseRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<DatabaseRecord | null>(null);

  const categories = [
    'Personnes',
    'Entreprises',
    'Documents officiels',
    'Registres publics',
    'Publications académiques',
    'Brevets',
    'Propriété intellectuelle',
    'Données géographiques',
    'Statistiques',
    'Archives historiques'
  ];

  // Initialisation avec des données d'exemple
  useEffect(() => {
    const sampleSources: DatabaseSource[] = [
      {
        id: '1',
        name: 'Registre du Commerce et des Sociétés',
        type: 'government',
        status: 'online',
        description: 'Base de données officielle des entreprises françaises',
        recordCount: 4250000,
        lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        accessLevel: 'public',
        categories: ['Entreprises', 'Registres publics'],
        apiEndpoint: 'https://api.infogreffe.fr'
      },
      {
        id: '2',
        name: 'Journal Officiel',
        type: 'government',
        status: 'online',
        description: 'Publications officielles de la République française',
        recordCount: 890000,
        lastUpdate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        accessLevel: 'public',
        categories: ['Documents officiels', 'Archives historiques']
      },
      {
        id: '3',
        name: 'Base Brevets INPI',
        type: 'government',
        status: 'online',
        description: 'Base de données des brevets et marques',
        recordCount: 1200000,
        lastUpdate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        accessLevel: 'public',
        categories: ['Brevets', 'Propriété intellectuelle']
      },
      {
        id: '4',
        name: 'HAL - Archives Ouvertes',
        type: 'academic',
        status: 'online',
        description: 'Archive ouverte pluridisciplinaire',
        recordCount: 3100000,
        lastUpdate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        accessLevel: 'public',
        categories: ['Publications académiques', 'Documents officiels']
      },
      {
        id: '5',
        name: 'Base Sirene INSEE',
        type: 'government',
        status: 'maintenance',
        description: 'Système d\'identification du répertoire des entreprises',
        recordCount: 28000000,
        lastUpdate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        accessLevel: 'public',
        categories: ['Entreprises', 'Statistiques']
      },
      {
        id: '6',
        name: 'Archives Nationales',
        type: 'government',
        status: 'online',
        description: 'Archives historiques numérisées',
        recordCount: 750000,
        lastUpdate: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
        accessLevel: 'restricted',
        categories: ['Archives historiques', 'Documents officiels']
      }
    ];

    const sampleRecords: DatabaseRecord[] = [
      {
        id: '1',
        sourceId: '1',
        sourceName: 'Registre du Commerce et des Sociétés',
        title: 'TECH INNOVATIONS SAS',
        content: 'Société par actions simplifiée au capital de 100 000 euros. Activité principale: Développement de logiciels.',
        category: 'Entreprises',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        author: 'Greffe du Tribunal de Commerce',
        location: 'Paris',
        tags: ['SAS', 'Technologie', 'Logiciels'],
        confidence: 95,
        accessLevel: 'public',
        metadata: {
          siret: '12345678901234',
          capital: '100000 EUR',
          dirigeant: 'Jean MARTIN',
          adresse: '123 Rue de la Tech, 75001 Paris'
        }
      },
      {
        id: '2',
        sourceId: '2',
        sourceName: 'Journal Officiel',
        title: 'Décret n° 2024-001 relatif à la cybersécurité',
        content: 'Décret portant sur les mesures de sécurité informatique dans les administrations publiques.',
        category: 'Documents officiels',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        author: 'Ministère de l\'Intérieur',
        tags: ['Cybersécurité', 'Administration', 'Décret'],
        confidence: 98,
        accessLevel: 'public',
        metadata: {
          numero: '2024-001',
          date_publication: '2024-01-15',
          ministere: 'Intérieur'
        }
      },
      {
        id: '3',
        sourceId: '3',
        sourceName: 'Base Brevets INPI',
        title: 'Brevet FR3098765 - Système d\'intelligence artificielle',
        content: 'Procédé et dispositif d\'analyse de données par intelligence artificielle pour la détection d\'anomalies.',
        category: 'Brevets',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        author: 'TECH INNOVATIONS SAS',
        tags: ['IA', 'Brevet', 'Analyse de données'],
        confidence: 92,
        accessLevel: 'public',
        metadata: {
          numero_brevet: 'FR3098765',
          date_depot: '2023-12-01',
          inventeur: 'Marie DUBOIS',
          classe_internationale: 'G06N'
        }
      }
    ];

    setSources(sampleSources);
    setRecords(sampleRecords);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulation d'une recherche
    setTimeout(() => {
      // Filtrer les enregistrements selon la requête
      let filteredRecords = records.filter(record => 
        record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      if (selectedCategory !== 'all') {
        filteredRecords = filteredRecords.filter(record => 
          record.category === selectedCategory
        );
      }

      if (selectedSource !== 'all') {
        filteredRecords = filteredRecords.filter(record => 
          record.sourceId === selectedSource
        );
      }

      setRecords(filteredRecords);
      setIsSearching(false);
    }, 1500);
  };

  const getSourceTypeIcon = (type: string) => {
    switch (type) {
      case 'government': return Shield;
      case 'academic': return FileText;
      case 'commercial': return Database;
      default: return Server;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400 bg-green-900/30';
      case 'offline': return 'text-red-400 bg-red-900/30';
      case 'maintenance': return 'text-yellow-400 bg-yellow-900/30';
      default: return 'text-slate-400 bg-slate-900/30';
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'public': return 'text-green-400';
      case 'restricted': return 'text-yellow-400';
      case 'classified': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getAccessLevelIcon = (level: string) => {
    switch (level) {
      case 'public': return Unlock;
      case 'restricted': return Key;
      case 'classified': return Lock;
      default: return Lock;
    }
  };

  const renderSources = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Sources de Données ({sources.length})</h3>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
            <Refresh className="w-4 h-4" />
            <span>Actualiser</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
            <span>Configuration</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sources.map((source) => {
          const IconComponent = getSourceTypeIcon(source.type);
          const AccessIcon = getAccessLevelIcon(source.accessLevel);
          
          return (
            <div key={source.id} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6 hover:border-cyan-500/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-cyan-900/30 rounded-lg">
                    <IconComponent className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{source.name}</h4>
                    <p className="text-sm text-slate-400">{source.type}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(source.status)}`}>
                    {source.status}
                  </span>
                  <AccessIcon className={`w-4 h-4 ${getAccessLevelColor(source.accessLevel)}`} />
                </div>
              </div>

              <p className="text-slate-300 mb-4">{source.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-400">Enregistrements</p>
                  <p className="text-lg font-semibold text-white">
                    {source.recordCount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Dernière MAJ</p>
                  <p className="text-sm text-slate-300">
                    {new Date(source.lastUpdate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {source.categories.map((category) => (
                  <span key={category} className="px-2 py-1 bg-slate-700/50 text-cyan-400 rounded-full text-xs">
                    {category}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-xs ${getAccessLevelColor(source.accessLevel)}`}>
                  Accès: {source.accessLevel}
                </span>
                {source.apiEndpoint && (
                  <a
                    href={source.apiEndpoint}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                  >
                    <span>API</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderSearch = () => (
    <div className="space-y-6">
      {/* Search Interface */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Recherche dans les Bases de Données</h3>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Requête de recherche
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nom, entreprise, document, brevet..."
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>

          <div className="lg:w-48">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Catégorie
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="all">Toutes catégories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:w-48">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Source
            </label>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="all">Toutes sources</option>
              {sources.map((source) => (
                <option key={source.id} value={source.id}>
                  {source.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Recherche...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Rechercher</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {isSearching && (
        <div className="text-center py-12">
          <div className="inline-block relative">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <Database className="w-6 h-6 text-cyan-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-cyan-400 text-lg font-medium mt-4">Recherche en cours...</p>
          <p className="text-slate-400 text-sm mt-2">Interrogation des bases de données</p>
        </div>
      )}

      {records.length > 0 && !isSearching && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">
              Résultats ({records.length})
            </h3>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filtrer</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span>Exporter</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {records.map((record) => {
              const AccessIcon = getAccessLevelIcon(record.accessLevel);
              return (
                <div 
                  key={record.id} 
                  onClick={() => setSelectedRecord(record)}
                  className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6 hover:border-cyan-500/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-cyan-900/30 rounded-lg">
                        <FileText className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{record.title}</h4>
                        <p className="text-sm text-slate-400">{record.sourceName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-xs px-2 py-1 bg-cyan-900/30 text-cyan-400 rounded-full">
                        {record.confidence}% confiance
                      </span>
                      <AccessIcon className={`w-4 h-4 ${getAccessLevelColor(record.accessLevel)}`} />
                      <div className="flex items-center text-xs text-slate-400">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(record.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 mb-4 line-clamp-2">{record.content}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded-full text-xs">
                        {record.category}
                      </span>
                      {record.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-cyan-900/30 text-cyan-400 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {record.author && (
                        <span className="text-xs text-slate-400">
                          Par: {record.author}
                        </span>
                      )}
                      {record.location && (
                        <span className="flex items-center text-xs text-slate-400">
                          <MapPin className="w-3 h-3 mr-1" />
                          {record.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-cyan-500/30 rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-cyan-900/30 rounded-lg">
                  <FileText className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedRecord.title}</h3>
                  <p className="text-sm text-slate-400">{selectedRecord.sourceName}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-700/30 rounded-lg p-4">
                <p className="text-slate-300">{selectedRecord.content}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Catégorie</p>
                  <p className="text-sm text-white">{selectedRecord.category}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Confiance</p>
                  <p className="text-sm text-white">{selectedRecord.confidence}%</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Accès</p>
                  <p className={`text-sm ${getAccessLevelColor(selectedRecord.accessLevel)}`}>
                    {selectedRecord.accessLevel}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Date</p>
                  <p className="text-sm text-white">
                    {new Date(selectedRecord.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {selectedRecord.author && (
                <div>
                  <p className="text-sm text-slate-400">Auteur</p>
                  <p className="text-sm text-white">{selectedRecord.author}</p>
                </div>
              )}

              {selectedRecord.location && (
                <div>
                  <p className="text-sm text-slate-400">Localisation</p>
                  <p className="text-sm text-white">{selectedRecord.location}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-slate-400 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRecord.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-cyan-900/30 text-cyan-400 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {selectedRecord.metadata && Object.keys(selectedRecord.metadata).length > 0 && (
                <div>
                  <p className="text-sm text-slate-400 mb-3">Métadonnées</p>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      {Object.entries(selectedRecord.metadata).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-slate-400">{key}:</span>
                          <span className="text-slate-300">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderRecords = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Enregistrements Récents</h3>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filtrer</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {records.map((record) => {
          const AccessIcon = getAccessLevelIcon(record.accessLevel);
          return (
            <div key={record.id} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-cyan-900/30 rounded-lg">
                    <FileText className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{record.title}</h4>
                    <p className="text-sm text-slate-400">{record.sourceName}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <AccessIcon className={`w-4 h-4 ${getAccessLevelColor(record.accessLevel)}`} />
                  <div className="flex items-center text-xs text-slate-400">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(record.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <p className="text-slate-300 mb-4">{record.content}</p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded-full text-xs">
                    {record.category}
                  </span>
                  {record.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-cyan-900/30 text-cyan-400 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <span className="text-xs text-slate-400">
                  Confiance: {record.confidence}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Database className="w-6 h-6 text-cyan-400" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">{sources.length}</p>
          <p className="text-sm text-slate-400">Sources connectées</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-6 h-6 text-cyan-400" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">
            {sources.reduce((total, source) => total + source.recordCount, 0).toLocaleString()}
          </p>
          <p className="text-sm text-slate-400">Enregistrements totaux</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-6 h-6 text-cyan-400" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">
            {sources.filter(s => s.status === 'online').length}
          </p>
          <p className="text-sm text-slate-400">Sources en ligne</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Search className="w-6 h-6 text-cyan-400" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">1,247</p>
          <p className="text-sm text-slate-400">Requêtes aujourd'hui</p>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Analyse des Données</h3>
        
        <div className="bg-slate-900/50 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <Activity className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
            <p className="text-xl text-white mb-2">Tableau de bord analytique</p>
            <p className="text-slate-400">Statistiques et métriques des bases de données</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-cyan-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-cyan-400" />
              </button>
              <div className="flex items-center space-x-3">
                <Database className="w-6 h-6 text-cyan-400" />
                <div>
                  <h1 className="text-xl font-bold text-cyan-400">Base de Données</h1>
                  <p className="text-xs text-slate-400">Accès aux archives et bases de données publiques</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-slate-700/50 rounded-lg">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-slate-300">Opérateur</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">BASES CONNECTÉES</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="container mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'sources', label: 'Sources', icon: Server },
              { id: 'search', label: 'Recherche', icon: Search },
              { id: 'records', label: 'Enregistrements', icon: FileText },
              { id: 'analytics', label: 'Analytique', icon: Activity }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-cyan-500 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-6 py-8">
        {activeTab === 'sources' && renderSources()}
        {activeTab === 'search' && renderSearch()}
        {activeTab === 'records' && renderRecords()}
        {activeTab === 'analytics' && renderAnalytics()}
      </main>
    </div>
  );
};

export default DatabaseModule;