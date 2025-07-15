import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  MapPin,
  Search,
  Filter,
  Download,
  Share2,
  Eye,
  Globe,
  Satellite,
  Navigation,
  Target,
  Activity,
  Zap,
  Clock,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Users,
  Settings,
  Layers,
  Crosshair,
  Map,
  Compass,
  Route,
  Camera,
  Image,
  FileText,
  Calendar,
  Hash,
  Signal,
  Wifi,
  Smartphone
} from 'lucide-react';

interface GeolocationModuleProps {
  onBack: () => void;
}

interface LocationData {
  id: string;
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  country?: string;
  accuracy: number;
  source: string;
  timestamp: string;
  type: 'ip' | 'gps' | 'cell' | 'wifi' | 'manual';
  confidence: number;
  metadata?: Record<string, any>;
}

interface GeofenceAlert {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
  type: 'enter' | 'exit' | 'both';
  status: 'active' | 'inactive';
  created: string;
  triggered: number;
}

const GeolocationModule: React.FC<GeolocationModuleProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'map' | 'tracking' | 'analysis' | 'geofencing'>('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [geofences, setGeofences] = useState<GeofenceAlert[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 48.8566, lng: 2.3522 }); // Paris par défaut

  // Données d'exemple
  useEffect(() => {
    const sampleLocations: LocationData[] = [
      {
        id: '1',
        latitude: 48.8566,
        longitude: 2.3522,
        address: '1 Place du Châtelet, 75001 Paris',
        city: 'Paris',
        country: 'France',
        accuracy: 95,
        source: 'GPS Mobile',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        type: 'gps',
        confidence: 92,
        metadata: {
          device: 'iPhone 13',
          carrier: 'Orange',
          signal_strength: -65
        }
      },
      {
        id: '2',
        latitude: 48.8606,
        longitude: 2.3376,
        address: 'Musée du Louvre, 75001 Paris',
        city: 'Paris',
        country: 'France',
        accuracy: 87,
        source: 'Triangulation Cellulaire',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        type: 'cell',
        confidence: 78,
        metadata: {
          cell_towers: 3,
          network_type: '4G',
          operator: 'SFR'
        }
      },
      {
        id: '3',
        latitude: 48.8738,
        longitude: 2.2950,
        address: 'Arc de Triomphe, 75008 Paris',
        city: 'Paris',
        country: 'France',
        accuracy: 76,
        source: 'Géolocalisation IP',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        type: 'ip',
        confidence: 65,
        metadata: {
          ip_address: '192.168.1.100',
          isp: 'Free SAS',
          connection_type: 'Fiber'
        }
      },
      {
        id: '4',
        latitude: 48.8584,
        longitude: 2.2945,
        address: 'Tour Eiffel, 75007 Paris',
        city: 'Paris',
        country: 'France',
        accuracy: 91,
        source: 'WiFi Positioning',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        type: 'wifi',
        confidence: 83,
        metadata: {
          wifi_networks: 12,
          strongest_signal: 'TourEiffel_Public',
          mac_addresses: ['AA:BB:CC:DD:EE:FF']
        }
      }
    ];

    const sampleGeofences: GeofenceAlert[] = [
      {
        id: '1',
        name: 'Zone Sensible - Ministère',
        latitude: 48.8566,
        longitude: 2.3522,
        radius: 500,
        type: 'enter',
        status: 'active',
        created: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        triggered: 3
      },
      {
        id: '2',
        name: 'Périmètre de Sécurité',
        latitude: 48.8606,
        longitude: 2.3376,
        radius: 1000,
        type: 'both',
        status: 'active',
        created: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        triggered: 7
      }
    ];

    setLocations(sampleLocations);
    setGeofences(sampleGeofences);
  }, []);

  const handleLocationSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulation d'une recherche géographique
    setTimeout(() => {
      // Ici on pourrait ajouter de nouvelles localisations basées sur la recherche
      setIsSearching(false);
    }, 2000);
  };

  const getLocationTypeIcon = (type: string) => {
    switch (type) {
      case 'gps': return Satellite;
      case 'cell': return Signal;
      case 'wifi': return Wifi;
      case 'ip': return Globe;
      case 'manual': return MapPin;
      default: return Target;
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-400';
    if (accuracy >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400 bg-green-900/30';
    if (confidence >= 60) return 'text-yellow-400 bg-yellow-900/30';
    return 'text-red-400 bg-red-900/30';
  };

  const renderMap = () => (
    <div className="space-y-6">
      {/* Map Controls */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Recherche géographique
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Adresse, coordonnées, lieu..."
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch()}
              />
            </div>
          </div>
          
          <div className="flex items-end space-x-4">
            <button
              onClick={handleLocationSearch}
              disabled={isSearching}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Recherche...</span>
                </>
              ) : (
                <>
                  <Crosshair className="w-4 h-4" />
                  <span>Localiser</span>
                </>
              )}
            </button>
            
            <button className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
              <Layers className="w-4 h-4" />
            </button>
            
            <button className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Carte Interactive</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <MapPin className="w-4 h-4" />
              <span>{locations.length} localisations</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Target className="w-4 h-4" />
              <span>{geofences.length} géofences</span>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900/50 rounded-lg min-h-[500px] flex items-center justify-center relative overflow-hidden">
          {/* Simulation d'une carte */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-green-900/20"></div>
          <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center space-x-2 text-sm text-white">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Paris, France</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              48.8566°N, 2.3522°E
            </div>
          </div>
          
          <div className="text-center">
            <Map className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <p className="text-xl text-white mb-2">Carte Géospatiale</p>
            <p className="text-slate-400">Visualisation interactive des données de géolocalisation</p>
          </div>
          
          {/* Points de localisation simulés */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute bottom-1/3 right-1/3 transform translate-x-1/2 translate-y-1/2">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Location List */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Localisations Récentes</h3>
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
          {locations.map((location) => {
            const IconComponent = getLocationTypeIcon(location.type);
            return (
              <div 
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-cyan-900/30 rounded-lg">
                      <IconComponent className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        {location.address || `${location.latitude}, ${location.longitude}`}
                      </h4>
                      <p className="text-sm text-slate-400">{location.source}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${getConfidenceColor(location.confidence)}`}>
                      {location.confidence}%
                    </span>
                    <div className="flex items-center text-xs text-slate-400">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(location.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Précision</p>
                    <p className={`font-medium ${getAccuracyColor(location.accuracy)}`}>
                      {location.accuracy}%
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Type</p>
                    <p className="text-white">{location.type.toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Ville</p>
                    <p className="text-white">{location.city || 'Inconnue'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Pays</p>
                    <p className="text-white">{location.country || 'Inconnu'}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Location Details Modal */}
      {selectedLocation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-cyan-500/30 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-cyan-900/30 rounded-lg">
                  {React.createElement(getLocationTypeIcon(selectedLocation.type), { className: "w-6 h-6 text-cyan-400" })}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Détails de Localisation</h3>
                  <p className="text-sm text-slate-400">{selectedLocation.source}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLocation(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Latitude</p>
                  <p className="text-sm text-white font-mono">{selectedLocation.latitude}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Longitude</p>
                  <p className="text-sm text-white font-mono">{selectedLocation.longitude}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Précision</p>
                  <p className={`text-sm font-medium ${getAccuracyColor(selectedLocation.accuracy)}`}>
                    {selectedLocation.accuracy}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Confiance</p>
                  <p className="text-sm text-white">{selectedLocation.confidence}%</p>
                </div>
              </div>

              {selectedLocation.address && (
                <div>
                  <p className="text-sm text-slate-400">Adresse</p>
                  <p className="text-sm text-white">{selectedLocation.address}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Ville</p>
                  <p className="text-sm text-white">{selectedLocation.city || 'Inconnue'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Pays</p>
                  <p className="text-sm text-white">{selectedLocation.country || 'Inconnu'}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-400">Horodatage</p>
                <p className="text-sm text-white">
                  {new Date(selectedLocation.timestamp).toLocaleString()}
                </p>
              </div>

              {selectedLocation.metadata && Object.keys(selectedLocation.metadata).length > 0 && (
                <div>
                  <p className="text-sm text-slate-400 mb-3">Métadonnées techniques</p>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      {Object.entries(selectedLocation.metadata).map(([key, value]) => (
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

  const renderTracking = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-6 h-6 text-cyan-400" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">{locations.length}</p>
          <p className="text-sm text-slate-400">Points de tracking</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Route className="w-6 h-6 text-cyan-400" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">2.4 km</p>
          <p className="text-sm text-slate-400">Distance parcourue</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-6 h-6 text-cyan-400" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">6h 30m</p>
          <p className="text-sm text-slate-400">Durée de suivi</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-6 h-6 text-cyan-400" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">85%</p>
          <p className="text-sm text-slate-400">Précision moyenne</p>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Suivi en Temps Réel</h3>
        
        <div className="bg-slate-900/50 rounded-lg p-6 min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <Navigation className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
            <p className="text-xl text-white mb-2">Tracking actif</p>
            <p className="text-slate-400">Suivi des déplacements en temps réel</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Analyse Géospatiale</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-700/30 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-4">Répartition par Source</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Satellite className="w-4 h-4 text-green-400" />
                  <span className="text-slate-300">GPS</span>
                </div>
                <span className="text-white">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Signal className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-300">Cellulaire</span>
                </div>
                <span className="text-white">30%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-300">WiFi</span>
                </div>
                <span className="text-white">15%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-yellow-400" />
                  <span className="text-slate-300">IP</span>
                </div>
                <span className="text-white">10%</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-4">Précision par Heure</h4>
            <div className="bg-slate-800/50 rounded p-4 min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                <Activity className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
                <p className="text-slate-400">Graphique de précision</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Zones d'Activité</h3>
        
        <div className="space-y-4">
          <div className="bg-slate-700/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-white">Centre de Paris</h4>
              <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">
                Zone fréquente
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-2">
              12 localisations dans un rayon de 2km
            </p>
            <div className="flex items-center space-x-4 text-xs text-slate-400">
              <span>Première visite: Il y a 6h</span>
              <span>Dernière visite: Il y a 30min</span>
              <span>Durée totale: 4h 15min</span>
            </div>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-white">Quartier des Affaires</h4>
              <span className="text-xs px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full">
                Zone occasionnelle
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-2">
              3 localisations dans un rayon de 1km
            </p>
            <div className="flex items-center space-x-4 text-xs text-slate-400">
              <span>Première visite: Il y a 4h</span>
              <span>Dernière visite: Il y a 2h</span>
              <span>Durée totale: 1h 45min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGeofencing = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Géofences Actives ({geofences.length})</h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors">
          <Target className="w-4 h-4" />
          <span>Nouvelle géofence</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {geofences.map((geofence) => (
          <div key={geofence.id} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-cyan-900/30 rounded-lg">
                  <Target className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{geofence.name}</h4>
                  <p className="text-sm text-slate-400">
                    Rayon: {geofence.radius}m
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  geofence.status === 'active' 
                    ? 'text-green-400 bg-green-900/30' 
                    : 'text-red-400 bg-red-900/30'
                }`}>
                  {geofence.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-slate-400">Type d'alerte</p>
                <p className="text-sm text-white">{geofence.type}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Déclenchements</p>
                <p className="text-sm text-white">{geofence.triggered}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Latitude</p>
                <p className="text-sm text-white font-mono">{geofence.latitude}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Longitude</p>
                <p className="text-sm text-white font-mono">{geofence.longitude}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Créée le {new Date(geofence.created).toLocaleDateString()}
              </span>
              <div className="flex items-center space-x-2">
                <button className="p-1 hover:bg-slate-700 rounded transition-colors">
                  <Eye className="w-4 h-4 text-slate-400" />
                </button>
                <button className="p-1 hover:bg-slate-700 rounded transition-colors">
                  <Settings className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Alertes Récentes</h3>
        
        <div className="space-y-4">
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h4 className="font-medium text-red-400">Entrée dans zone sensible</h4>
            </div>
            <p className="text-sm text-slate-300 mb-2">
              Détection d'entrée dans "Zone Sensible - Ministère"
            </p>
            <p className="text-xs text-slate-400">
              Il y a 15 minutes - Coordonnées: 48.8566, 2.3522
            </p>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Target className="w-5 h-5 text-yellow-400" />
              <h4 className="font-medium text-yellow-400">Sortie de périmètre</h4>
            </div>
            <p className="text-sm text-slate-300 mb-2">
              Sortie du "Périmètre de Sécurité" détectée
            </p>
            <p className="text-xs text-slate-400">
              Il y a 2 heures - Coordonnées: 48.8606, 2.3376
            </p>
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
                <MapPin className="w-6 h-6 text-cyan-400" />
                <div>
                  <h1 className="text-xl font-bold text-cyan-400">Géolocalisation</h1>
                  <p className="text-xs text-slate-400">Analyse géospatiale et tracking de localisation</p>
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
                <span className="text-sm text-green-400">GÉOLOCALISATION ACTIVE</span>
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
              { id: 'map', label: 'Carte', icon: Map },
              { id: 'tracking', label: 'Suivi', icon: Navigation },
              { id: 'analysis', label: 'Analyse', icon: Activity },
              { id: 'geofencing', label: 'Géofences', icon: Target }
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
        {activeTab === 'map' && renderMap()}
        {activeTab === 'tracking' && renderTracking()}
        {activeTab === 'analysis' && renderAnalysis()}
        {activeTab === 'geofencing' && renderGeofencing()}
      </main>
    </div>
  );
};

export default GeolocationModule;