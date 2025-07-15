import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Upload, Search, Filter, Download, Share2, Eye, Scan, Image, File, Archive, Hash, Calendar, User, MapPin, Tag, Activity, Zap, Clock, AlertTriangle, CheckCircle, ExternalLink, Users, Settings, Camera, FileImage, File as FilePdf, FileSpreadsheet, FileVideo, FileAudio, Folder, HardDrive, Database, Shield, Lock, Unlock, Key } from 'lucide-react';

interface DocumentAnalysisModuleProps {
  onBack: () => void;
}

interface DocumentMetadata {
  id: string;
  filename: string;
  type: 'pdf' | 'image' | 'video' | 'audio' | 'document' | 'archive';
  size: number;
  uploadDate: string;
  lastModified: string;
  author?: string;
  creator?: string;
  title?: string;
  subject?: string;
  keywords?: string[];
  location?: {
    latitude?: number;
    longitude?: number;
    address?: string;
  };
  camera?: {
    make?: string;
    model?: string;
    software?: string;
  };
  technical: Record<string, any>;
  extracted: {
    text?: string;
    faces?: number;
    objects?: string[];
    sentiment?: 'positive' | 'negative' | 'neutral';
  };
  security: {
    encrypted: boolean;
    passwordProtected: boolean;
    digitalSignature: boolean;
    permissions: string[];
  };
  analysis: {
    confidence: number;
    threats: string[];
    classification: 'public' | 'internal' | 'confidential' | 'secret';
  };
}

const DocumentAnalysisModule: React.FC<DocumentAnalysisModuleProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'analysis' | 'metadata' | 'search'>('upload');
  const [documents, setDocuments] = useState<DocumentMetadata[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<DocumentMetadata | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Données d'exemple
  useEffect(() => {
    const sampleDocuments: DocumentMetadata[] = [
      {
        id: '1',
        filename: 'rapport_confidentiel_2024.pdf',
        type: 'pdf',
        size: 2048576,
        uploadDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        lastModified: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        author: 'Jean MARTIN',
        creator: 'Microsoft Word',
        title: 'Rapport d\'analyse sécuritaire 2024',
        subject: 'Évaluation des menaces cybersécurité',
        keywords: ['sécurité', 'cyber', 'menaces', '2024'],
        technical: {
          pages: 45,
          version: '1.7',
          producer: 'Adobe PDF Library',
          creationDate: '2024-01-15T10:30:00Z'
        },
        extracted: {
          text: 'Rapport détaillé sur l\'état de la cybersécurité...',
          sentiment: 'neutral'
        },
        security: {
          encrypted: true,
          passwordProtected: true,
          digitalSignature: true,
          permissions: ['print', 'copy']
        },
        analysis: {
          confidence: 95,
          threats: [],
          classification: 'confidential'
        }
      },
      {
        id: '2',
        filename: 'photo_surveillance_001.jpg',
        type: 'image',
        size: 4194304,
        uploadDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        lastModified: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        location: {
          latitude: 48.8566,
          longitude: 2.3522,
          address: 'Place du Châtelet, Paris'
        },
        camera: {
          make: 'Canon',
          model: 'EOS R5',
          software: 'Adobe Lightroom'
        },
        technical: {
          resolution: '8192x5464',
          colorSpace: 'sRGB',
          iso: 400,
          aperture: 'f/2.8',
          shutterSpeed: '1/125',
          focalLength: '85mm'
        },
        extracted: {
          faces: 3,
          objects: ['person', 'car', 'building', 'street'],
          sentiment: 'neutral'
        },
        security: {
          encrypted: false,
          passwordProtected: false,
          digitalSignature: false,
          permissions: ['view', 'download']
        },
        analysis: {
          confidence: 87,
          threats: [],
          classification: 'internal'
        }
      },
      {
        id: '3',
        filename: 'enregistrement_audio_suspect.mp3',
        type: 'audio',
        size: 15728640,
        uploadDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        lastModified: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        technical: {
          duration: '00:05:23',
          bitrate: '320 kbps',
          sampleRate: '44.1 kHz',
          channels: 'Stereo',
          codec: 'MP3'
        },
        extracted: {
          text: 'Transcription automatique: "Nous devons nous rencontrer demain..."',
          sentiment: 'negative'
        },
        security: {
          encrypted: false,
          passwordProtected: false,
          digitalSignature: false,
          permissions: ['view', 'analyze']
        },
        analysis: {
          confidence: 78,
          threats: ['suspicious_content'],
          classification: 'secret'
        }
      },
      {
        id: '4',
        filename: 'archive_documents.zip',
        type: 'archive',
        size: 52428800,
        uploadDate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        lastModified: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        technical: {
          compression: 'ZIP',
          files: 127,
          compressionRatio: '65%'
        },
        extracted: {
          text: 'Archive contenant des documents administratifs...'
        },
        security: {
          encrypted: true,
          passwordProtected: true,
          digitalSignature: false,
          permissions: ['extract', 'analyze']
        },
        analysis: {
          confidence: 92,
          threats: [],
          classification: 'internal'
        }
      }
    ];

    setDocuments(sampleDocuments);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsAnalyzing(true);
    
    // Simulation d'analyse de fichier
    setTimeout(() => {
      // Ici on ajouterait les nouveaux fichiers analysés
      setIsAnalyzing(false);
    }, 3000);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FilePdf;
      case 'image': return FileImage;
      case 'video': return FileVideo;
      case 'audio': return FileAudio;
      case 'document': return FileText;
      case 'archive': return Archive;
      default: return File;
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'public': return 'text-green-400 bg-green-900/30';
      case 'internal': return 'text-blue-400 bg-blue-900/30';
      case 'confidential': return 'text-yellow-400 bg-yellow-900/30';
      case 'secret': return 'text-red-400 bg-red-900/30';
      default: return 'text-slate-400 bg-slate-900/30';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderUpload = () => (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-8">
        <div className="text-center">
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-12 hover:border-cyan-500 transition-colors">
            <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Télécharger des documents
            </h3>
            <p className="text-slate-400 mb-6">
              Glissez-déposez vos fichiers ici ou cliquez pour sélectionner
            </p>
            
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept=".pdf,.jpg,.jpeg,.png,.mp4,.mp3,.doc,.docx,.zip,.rar"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg cursor-pointer transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Sélectionner des fichiers</span>
            </label>
            
            <p className="text-xs text-slate-500 mt-4">
              Formats supportés: PDF, Images, Vidéos, Audio, Documents, Archives
            </p>
          </div>
        </div>
      </div>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <div>
              <h4 className="text-lg font-semibold text-white">Analyse en cours...</h4>
              <p className="text-slate-400">Extraction des métadonnées et analyse du contenu</p>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Extraction des métadonnées</span>
              <span className="text-cyan-400">Terminé</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Analyse du contenu</span>
              <span className="text-yellow-400">En cours...</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Détection de menaces</span>
              <span className="text-slate-500">En attente</span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-6 h-6 text-cyan-400" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">{documents.length}</p>
          <p className="text-sm text-slate-400">Documents analysés</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-6 h-6 text-cyan-400" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">
            {documents.filter(d => d.analysis.threats.length > 0).length}
          </p>
          <p className="text-sm text-slate-400">Menaces détectées</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Lock className="w-6 h-6 text-cyan-400" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">
            {documents.filter(d => d.security.encrypted).length}
          </p>
          <p className="text-sm text-slate-400">Fichiers chiffrés</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <HardDrive className="w-6 h-6 text-cyan-400" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">
            {formatFileSize(documents.reduce((total, doc) => total + doc.size, 0))}
          </p>
          <p className="text-sm text-slate-400">Taille totale</p>
        </div>
      </div>
    </div>
  );

  const renderAnalysis = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Analyse des Documents</h3>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filtrer</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Rapport</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => {
          const IconComponent = getFileIcon(doc.type);
          return (
            <div 
              key={doc.id}
              onClick={() => setSelectedDocument(doc)}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6 hover:border-cyan-500/30 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-cyan-900/30 rounded-lg">
                    <IconComponent className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{doc.filename}</h4>
                    <p className="text-sm text-slate-400">
                      {formatFileSize(doc.size)} • {doc.type.toUpperCase()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getClassificationColor(doc.analysis.classification)}`}>
                    {doc.analysis.classification.toUpperCase()}
                  </span>
                  <span className="text-xs px-2 py-1 bg-cyan-900/30 text-cyan-400 rounded-full">
                    {doc.analysis.confidence}% confiance
                  </span>
                  <div className="flex items-center text-xs text-slate-400">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(doc.uploadDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {doc.title && (
                <p className="text-slate-300 mb-2">{doc.title}</p>
              )}

              {doc.extracted.text && (
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                  {doc.extracted.text}
                </p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {doc.security.encrypted && (
                    <div className="flex items-center space-x-1 text-xs text-green-400">
                      <Lock className="w-3 h-3" />
                      <span>Chiffré</span>
                    </div>
                  )}
                  {doc.security.digitalSignature && (
                    <div className="flex items-center space-x-1 text-xs text-blue-400">
                      <Shield className="w-3 h-3" />
                      <span>Signé</span>
                    </div>
                  )}
                  {doc.analysis.threats.length > 0 && (
                    <div className="flex items-center space-x-1 text-xs text-red-400">
                      <AlertTriangle className="w-3 h-3" />
                      <span>{doc.analysis.threats.length} menace(s)</span>
                    </div>
                  )}
                </div>
                
                {doc.author && (
                  <span className="text-xs text-slate-400">
                    Par: {doc.author}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Document Details Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-cyan-500/30 rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-cyan-900/30 rounded-lg">
                  {React.createElement(getFileIcon(selectedDocument.type), { className: "w-6 h-6 text-cyan-400" })}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedDocument.filename}</h3>
                  <p className="text-sm text-slate-400">
                    {formatFileSize(selectedDocument.size)} • {selectedDocument.type.toUpperCase()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDocument(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Classification</p>
                  <span className={`text-sm px-2 py-1 rounded-full ${getClassificationColor(selectedDocument.analysis.classification)}`}>
                    {selectedDocument.analysis.classification.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Confiance</p>
                  <p className="text-sm text-white">{selectedDocument.analysis.confidence}%</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Téléchargé</p>
                  <p className="text-sm text-white">
                    {new Date(selectedDocument.uploadDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Modifié</p>
                  <p className="text-sm text-white">
                    {new Date(selectedDocument.lastModified).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Metadata */}
              {(selectedDocument.author || selectedDocument.title) && (
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-3">Métadonnées du document</h4>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedDocument.title && (
                        <div>
                          <p className="text-xs text-slate-400">Titre</p>
                          <p className="text-sm text-white">{selectedDocument.title}</p>
                        </div>
                      )}
                      {selectedDocument.author && (
                        <div>
                          <p className="text-xs text-slate-400">Auteur</p>
                          <p className="text-sm text-white">{selectedDocument.author}</p>
                        </div>
                      )}
                      {selectedDocument.subject && (
                        <div>
                          <p className="text-xs text-slate-400">Sujet</p>
                          <p className="text-sm text-white">{selectedDocument.subject}</p>
                        </div>
                      )}
                      {selectedDocument.creator && (
                        <div>
                          <p className="text-xs text-slate-400">Créateur</p>
                          <p className="text-sm text-white">{selectedDocument.creator}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Technical Details */}
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-3">Détails techniques</h4>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {Object.entries(selectedDocument.technical).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-slate-400">{key}:</span>
                        <span className="text-slate-300">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Security */}
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-3">Sécurité</h4>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      {selectedDocument.security.encrypted ? (
                        <Lock className="w-4 h-4 text-green-400" />
                      ) : (
                        <Unlock className="w-4 h-4 text-red-400" />
                      )}
                      <span className="text-sm text-slate-300">
                        {selectedDocument.security.encrypted ? 'Chiffré' : 'Non chiffré'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {selectedDocument.security.passwordProtected ? (
                        <Key className="w-4 h-4 text-green-400" />
                      ) : (
                        <Key className="w-4 h-4 text-slate-400" />
                      )}
                      <span className="text-sm text-slate-300">
                        {selectedDocument.security.passwordProtected ? 'Protégé' : 'Non protégé'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {selectedDocument.security.digitalSignature ? (
                        <Shield className="w-4 h-4 text-green-400" />
                      ) : (
                        <Shield className="w-4 h-4 text-slate-400" />
                      )}
                      <span className="text-sm text-slate-300">
                        {selectedDocument.security.digitalSignature ? 'Signé' : 'Non signé'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Extracted Content */}
              {selectedDocument.extracted.text && (
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-3">Contenu extrait</h4>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <p className="text-sm text-slate-300">{selectedDocument.extracted.text}</p>
                  </div>
                </div>
              )}

              {/* Location Data */}
              {selectedDocument.location && (
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-3">Données de localisation</h4>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedDocument.location.latitude && (
                        <div>
                          <p className="text-xs text-slate-400">Latitude</p>
                          <p className="text-sm text-white font-mono">{selectedDocument.location.latitude}</p>
                        </div>
                      )}
                      {selectedDocument.location.longitude && (
                        <div>
                          <p className="text-xs text-slate-400">Longitude</p>
                          <p className="text-sm text-white font-mono">{selectedDocument.location.longitude}</p>
                        </div>
                      )}
                      {selectedDocument.location.address && (
                        <div>
                          <p className="text-xs text-slate-400">Adresse</p>
                          <p className="text-sm text-white">{selectedDocument.location.address}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Threats */}
              {selectedDocument.analysis.threats.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-3">Menaces détectées</h4>
                  <div className="space-y-2">
                    {selectedDocument.analysis.threats.map((threat, index) => (
                      <div key={index} className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <span className="text-sm text-red-400">{threat}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderMetadata = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Extraction de Métadonnées</h3>
        <div className="flex items-center space-x-4">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
          >
            <option value="all">Tous les types</option>
            <option value="pdf">PDF</option>
            <option value="image">Images</option>
            <option value="video">Vidéos</option>
            <option value="audio">Audio</option>
            <option value="archive">Archives</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {documents
          .filter(doc => selectedFilter === 'all' || doc.type === selectedFilter)
          .map((doc) => {
            const IconComponent = getFileIcon(doc.type);
            return (
              <div key={doc.id} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-cyan-900/30 rounded-lg">
                    <IconComponent className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{doc.filename}</h4>
                    <p className="text-sm text-slate-400">{formatFileSize(doc.size)}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {doc.author && (
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-300">Auteur: {doc.author}</span>
                    </div>
                  )}
                  
                  {doc.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-300">
                        {doc.location.address || `${doc.location.latitude}, ${doc.location.longitude}`}
                      </span>
                    </div>
                  )}
                  
                  {doc.camera && (
                    <div className="flex items-center space-x-2">
                      <Camera className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-300">
                        {doc.camera.make} {doc.camera.model}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">
                      Modifié: {new Date(doc.lastModified).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {doc.keywords && doc.keywords.length > 0 && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {doc.keywords.map((keyword) => (
                        <span key={keyword} className="px-2 py-1 bg-cyan-900/30 text-cyan-400 rounded-full text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Recherche dans les documents
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Contenu, métadonnées, auteur..."
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>
          
          <div className="flex items-end">
            <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
              <Scan className="w-4 h-4" />
              <span>Rechercher</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Résultats de Recherche</h3>
        
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <p className="text-xl text-white mb-2">Recherche dans les documents</p>
          <p className="text-slate-400">Utilisez la barre de recherche pour trouver des documents spécifiques</p>
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
                <FileText className="w-6 h-6 text-cyan-400" />
                <div>
                  <h1 className="text-xl font-bold text-cyan-400">Analyse Documentaire</h1>
                  <p className="text-xs text-slate-400">Extraction et analyse de métadonnées</p>
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
                <span className="text-sm text-green-400">ANALYSE ACTIVE</span>
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
              { id: 'upload', label: 'Téléchargement', icon: Upload },
              { id: 'analysis', label: 'Analyse', icon: Scan },
              { id: 'metadata', label: 'Métadonnées', icon: Hash },
              { id: 'search', label: 'Recherche', icon: Search }
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
        {activeTab === 'upload' && renderUpload()}
        {activeTab === 'analysis' && renderAnalysis()}
        {activeTab === 'metadata' && renderMetadata()}
        {activeTab === 'search' && renderSearch()}
      </main>
    </div>
  );
};

export default DocumentAnalysisModule;