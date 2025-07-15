import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Globe, 
  Users, 
  MapPin, 
  Calendar,
  Database,
  Eye,
  Download,
  Share2,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowLeft,
  Zap,
  Target,
  Network,
  FileText,
  Image,
  Video,
  Mail,
  Phone,
  Hash,
  ExternalLink,
  Volume2,
  X,
  ZoomIn,
  Camera
} from 'lucide-react';

interface SearchModuleProps {
  onBack: () => void;
}

interface SearchResult {
  id: string;
  type: 'social' | 'web' | 'document' | 'image' | 'person' | 'location';
  title: string;
  description: string;
  source: string;
  confidence: number;
  timestamp: string;
  url?: string;
  metadata?: Record<string, any>;
  profileImage?: {
    url: string;
    source: string;
    verified: boolean;
    lastUpdated: string;
  };
}

const SearchModule: React.FC<SearchModuleProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');
  const [selectedImage, setSelectedImage] = useState<{url: string, source: string} | null>(null);

  // Fonction pour générer des résultats basés sur la requête
  const generatePersonalizedResults = (query: string, type: string): SearchResult[] => {
    const results: SearchResult[] = [];
    
    // Générer une image de profil simulée pour les recherches Facebook
    const generateProfileImage = (query: string, platform: string = 'Facebook') => {
      // Simulation d'images de profil basées sur la requête
      const imageId = Math.abs(query.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % 100;
      return {
        url: `https://images.unsplash.com/photo-${1500000000 + imageId}?w=400&h=400&fit=crop&crop=face`,
        source: platform,
        verified: Math.random() > 0.3,
        lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      };
    };
    const isEmail = query.includes('@');
    const isPhone = /^\+?[\d\s\-\(\)]+$/.test(query);
    const isIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(query);
    const isDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(query);
    const queryLower = query.toLowerCase();

    if (isEmail) {
      // Résultats pour email - Plus de résultats
      results.push({
        id: '1',
        type: 'social',
        title: `Profil trouvé - ${query}`,
        description: `Compte professionnel associé à l'email ${query}`,
        source: getSourceByType(type),
        confidence: 92,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        url: `https://linkedin.com/in/${query.split('@')[0]}`,
        metadata: { 
          email: query, 
          verified: true, 
          connections: Math.floor(Math.random() * 500) + 100,
          industry: 'Technology'
        }
      });

      results.push({
        id: '2',
        type: 'web',
        title: `Mentions web - ${query}`,
        description: `Email trouvé dans ${Math.floor(Math.random() * 5) + 1} bases de données publiques`,
        source: getSourceByType(type),
        confidence: 85,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        profileImage: generateProfileImage(query, 'Instagram'),
        metadata: { 
          email: query,
          sources: ['GitHub', 'Stack Overflow', 'Company Directory'],
          lastSeen: '2024-01-15'
        }
      });

      results.push({
        id: '3',
        type: 'document',
        title: `Documents associés - ${query}`,
        description: `Email mentionné dans des documents PDF et présentations`,
        source: getSourceByType(type),
        confidence: 78,
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        metadata: { 
          email: query,
          documentTypes: ['PDF', 'DOCX', 'PPTX'],
          totalDocuments: Math.floor(Math.random() * 10) + 1
        }
      });

      results.push({
        id: '4',
        type: 'social',
        title: `Comptes sociaux - ${query}`,
        description: `Profils Facebook et Instagram associés à ${query}`,
        source: 'Social Media Aggregator',
        confidence: 73,
        timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
        metadata: { 
          email: query,
          platforms: ['Facebook', 'Instagram', 'Twitter'],
          profilesFound: 3
        }
      });

      results.push({
        id: '5',
        type: 'web',
        title: `Fuites de données - ${query}`,
        description: `Email trouvé dans des bases de données compromises`,
        source: 'Breach Database Monitor',
        confidence: 89,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        metadata: { 
          email: query,
          breaches: ['LinkedIn 2021', 'Adobe 2019'],
          riskLevel: 'Medium'
        }
      });

    } else if (isPhone) {
      // Résultats pour numéro de téléphone - Plus de résultats
      results.push({
        id: '1',
        type: 'person',
        title: `Propriétaire - ${query}`,
        description: `Numéro enregistré au nom d'une personne physique`,
        source: getSourceByType(type),
        confidence: 94,
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        metadata: { 
          phone: query,
          operator: 'Orange',
          type: 'Mobile',
          region: 'Île-de-France'
        }
      });

      results.push({
        id: '2',
        type: 'location',
        title: `Localisation approximative - ${query}`,
        description: `Zone géographique associée au numéro`,
        source: getSourceByType(type),
        confidence: 76,
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        metadata: { 
          phone: query,
          city: 'Paris',
          region: 'Île-de-France',
          country: 'France'
        }
      });

      results.push({
        id: '3',
        type: 'social',
        title: `Comptes liés - ${query}`,
        description: `Profils sociaux associés à ce numéro`,
        source: 'Social Phone Lookup',
        confidence: 68,
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        metadata: { 
          phone: query,
          platforms: ['WhatsApp', 'Telegram', 'Signal'],
          verified: true
        }
      });

      results.push({
        id: '4',
        type: 'web',
        title: `Annuaires publics - ${query}`,
        description: `Numéro trouvé dans des annuaires en ligne`,
        source: 'Public Directory Search',
        confidence: 82,
        timestamp: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
        metadata: { 
          phone: query,
          directories: ['Pages Jaunes', 'Annuaire Inversé'],
          businessListing: false
        }
      });

    } else if (isIP) {
      // Résultats pour adresse IP
      results.push({
        id: '1',
        type: 'location',
        title: `Géolocalisation IP - ${query}`,
        description: `Localisation géographique de l'adresse IP`,
        source: 'IP Geolocation Service',
        confidence: 91,
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        metadata: { 
          ip: query,
          country: 'France',
          city: 'Lyon',
          isp: 'Free SAS',
          organization: 'Free SAS'
        }
      });

      results.push({
        id: '2',
        type: 'web',
        title: `Informations réseau - ${query}`,
        description: `Détails techniques sur l'adresse IP`,
        source: 'Network Intelligence',
        confidence: 95,
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        metadata: { 
          ip: query,
          type: 'Residential',
          asn: 'AS12322',
          threatLevel: 'Low'
        }
      });

      results.push({
        id: '3',
        type: 'web',
        title: `Historique de menaces - ${query}`,
        description: `Activité malveillante associée à cette IP`,
        source: 'Threat Intelligence Platform',
        confidence: 77,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        metadata: { 
          ip: query,
          threats: ['None detected'],
          lastScan: '2024-01-20',
          reputation: 'Clean'
        }
      });

    } else if (isDomain) {
      // Résultats pour domaine
      results.push({
        id: '1',
        type: 'web',
        title: `Informations WHOIS - ${query}`,
        description: `Données d'enregistrement du domaine`,
        source: 'Domain Intelligence',
        confidence: 96,
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        metadata: { 
          domain: query,
          registrar: 'OVH',
          created: '2020-03-15',
          expires: '2025-03-15'
        }
      });

      results.push({
        id: '2',
        type: 'web',
        title: `Sous-domaines - ${query}`,
        description: `Sous-domaines découverts pour ${query}`,
        source: 'Subdomain Scanner',
        confidence: 88,
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        metadata: { 
          domain: query,
          subdomains: ['www', 'mail', 'ftp', 'admin'],
          totalFound: 12
        }
      });

      results.push({
        id: '3',
        type: 'web',
        title: `Certificats SSL - ${query}`,
        description: `Certificats de sécurité associés au domaine`,
        source: 'Certificate Transparency',
        confidence: 92,
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        profileImage: generateProfileImage(query, 'Facebook'),
        metadata: { 
          domain: query,
          certificates: 3,
          issuer: 'Let\'s Encrypt',
          validUntil: '2024-06-15'
        }
      });

    } else {
      // Résultats pour nom/pseudonyme/entreprise - Plus de résultats
      results.push({
        id: '1',
        type: 'social',
        title: `Profils sociaux - ${query}`,
        description: `Comptes trouvés sur différentes plateformes sociales`,
        source: getSourceByType(type),
        confidence: 88,
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        profileImage: type === 'facebook' ? generateProfileImage(query) : undefined,
        metadata: { 
          searchTerm: query,
          platforms: ['Twitter', 'Facebook', 'Instagram'],
          totalProfiles: Math.floor(Math.random() * 8) + 2,
          imagesFound: type === 'facebook' ? Math.floor(Math.random() * 5) + 1 : 0
        }
      });

      results.push({
        id: '2',
        type: 'web',
        title: `Mentions web - ${query}`,
        description: `Références trouvées dans articles, forums et sites web`,
        source: getSourceByType(type),
        confidence: 82,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        metadata: { 
          searchTerm: query,
          totalMentions: Math.floor(Math.random() * 20) + 5,
          topDomains: ['lemonde.fr', 'reddit.com', 'linkedin.com']
        }
      });

      results.push({
        id: '3',
        type: 'document',
        title: `Documents publics - ${query}`,
        description: `Nom/terme trouvé dans des documents officiels et publications`,
        source: getSourceByType(type),
        confidence: 75,
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        metadata: { 
          searchTerm: query,
          documentSources: ['Journal Officiel', 'Publications académiques', 'Rapports publics'],
          relevanceScore: Math.floor(Math.random() * 30) + 70
        }
      });

      results.push({
        id: '4',
        type: 'image',
        title: `Images associées - ${query}`,
        description: `Photos et images liées à ${query}`,
        source: 'Reverse Image Search',
        confidence: 71,
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        metadata: { 
          searchTerm: query,
          imagesFound: Math.floor(Math.random() * 15) + 3,
          sources: ['Google Images', 'TinEye', 'Yandex']
        }
      });

      results.push({
        id: '5',
        type: 'person',
        title: `Registres publics - ${query}`,
        description: `Informations trouvées dans les bases de données officielles`,
        source: 'Public Records Database',
        confidence: 86,
        timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
        metadata: { 
          searchTerm: query,
          recordTypes: ['Registre du commerce', 'Annuaires professionnels'],
          matches: Math.floor(Math.random() * 5) + 1
        }
      });

      results.push({
        id: '6',
        type: 'web',
        title: `Forums et communautés - ${query}`,
        description: `Activité sur forums, Reddit et communautés en ligne`,
        source: 'Community Forums Scraper',
        confidence: 69,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        metadata: { 
          searchTerm: query,
          platforms: ['Reddit', 'Stack Overflow', 'Discord'],
          posts: Math.floor(Math.random() * 25) + 5
        }
      });

      results.push({
        id: '7',
        type: 'web',
        title: `Données de fuites - ${query}`,
        description: `Informations trouvées dans des bases de données compromises`,
        source: 'Breach Database Monitor',
        confidence: 91,
        timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
        metadata: { 
          searchTerm: query,
          breaches: ['Collection #1', 'LinkedIn 2021'],
          dataTypes: ['Email', 'Username', 'Password Hash']
        }
      });
    }

    // Ajouter des résultats spécifiques selon le type sélectionné
    if (type !== 'all') {
      const additionalResults = generateTypeSpecificResults(query, type);
      results.push(...additionalResults);
    }

    // Filtrer selon le type de recherche sélectionné
    if (type !== 'all') {
      return results.filter(result => {
        switch (type) {
          case 'facebook':
          case 'twitter':
          case 'instagram':
          case 'linkedin':
          case 'communities':
          case 'social': return result.type === 'social';
          case 'web': return result.type === 'web';
          case 'email': return isEmail || result.metadata?.email;
          case 'phone': return isPhone || result.metadata?.phone;
          case 'domains': return isDomain || result.metadata?.domain;
          case 'ip': return isIP || result.metadata?.ip;
          case 'documents': return result.type === 'document';
          case 'images': return result.type === 'image';
          case 'maps': return result.type === 'location';
          case 'person': return result.type === 'person';
          case 'usernames': return result.type === 'social' || result.type === 'web';
          case 'names': return result.type === 'person' || result.type === 'social';
          case 'addresses': return result.type === 'location';
          case 'pastes': return result.type === 'document';
          case 'videos': return result.type === 'image'; // Traité comme média
          case 'business': return result.type === 'web' || result.type === 'document';
          case 'vehicles': return result.type === 'web';
          case 'crypto': return result.type === 'web';
          case 'breaches': return result.metadata?.breaches;
          case 'audio': return result.type === 'web';
          case 'video_live': return result.type === 'web';
          case 'apis': return result.type === 'web';
          default: return true;
        }
      });
    }

    return results;
  };

  // Fonction pour générer des résultats spécifiques selon le type
  const generateTypeSpecificResults = (query: string, type: string): SearchResult[] => {
    const results: SearchResult[] = [];
    const baseId = Date.now().toString();

    switch (type) {
      case 'facebook':
        // Profil principal
        results.push({
          id: `${baseId}_fb_profile`,
          type: 'social',
          title: `Profil Facebook - ${query}`,
          description: `Profil principal avec informations de base et présentation complète`,
          source: 'Facebook Profile Scanner',
          confidence: 94,
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          metadata: { 
            section: 'Profil',
            profileId: `fb_${Math.random().toString(36).substr(2, 9)}`,
            verified: Math.random() > 0.7,
            publicProfile: true,
            lastActive: '2024-01-20'
          }
        });

        // À propos - Informations personnelles
        results.push({
          id: `${baseId}_fb_about`,
          type: 'social',
          title: `Informations personnelles - ${query}`,
          description: `Présentation complète, centres d'intérêt, langues et description personnelle`,
          source: 'Facebook About Section',
          confidence: 89,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          metadata: { 
            section: 'À propos',
            languages: ['Français', 'Anglais'],
            interests: ['Technologie', 'Voyage', 'Photographie'],
            bio: `Passionné de ${Math.random() > 0.5 ? 'technologie' : 'voyage'}...`,
            relationship: Math.random() > 0.5 ? 'En couple' : 'Célibataire'
          }
        });

        // Fil d'actualité et publications
        results.push({
          id: `${baseId}_fb_posts`,
          type: 'social',
          title: `Fil d'actualité - ${query}`,
          description: `Historique des publications, activités et interactions visibles (${Math.floor(Math.random() * 200) + 50} publications)`,
          source: 'Facebook Timeline Analyzer',
          confidence: 91,
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          metadata: { 
            section: 'Publications',
            totalPosts: Math.floor(Math.random() * 200) + 50,
            lastPost: '2024-01-19',
            avgLikes: Math.floor(Math.random() * 50) + 10,
            mostActiveHour: '20:00-22:00'
          }
        });

        // Emploi et formation
        results.push({
          id: `${baseId}_fb_work_education`,
          type: 'social',
          title: `Parcours professionnel et académique - ${query}`,
          description: `Historique d'emploi, formation et parcours éducatif complet`,
          source: 'Facebook Work & Education Parser',
          confidence: 86,
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          metadata: { 
            section: 'Emploi & Formation',
            currentJob: 'Ingénieur Logiciel chez TechCorp',
            education: 'Master Informatique - Université Paris',
            workHistory: ['TechCorp (2022-présent)', 'StartupXYZ (2020-2022)'],
            skills: ['JavaScript', 'Python', 'React']
          }
        });

        // Lieux et géolocalisation
        results.push({
          id: `${baseId}_fb_places`,
          type: 'social',
          title: `Lieux et géolocalisation - ${query}`,
          description: `Villes de résidence, check-ins et emplacements visités (${Math.floor(Math.random() * 50) + 10} lieux)`,
          source: 'Facebook Places & Check-ins',
          confidence: 83,
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          metadata: { 
            section: 'Lieux',
            currentCity: 'Paris, France',
            hometown: 'Lyon, France',
            recentCheckins: ['Café Central', 'Musée du Louvre', 'Parc des Buttes-Chaumont'],
            totalCheckins: Math.floor(Math.random() * 50) + 10
          }
        });

        // Photos et médias
        results.push({
          id: `${baseId}_fb_media`,
          type: 'social',
          title: `Photos et médias - ${query}`,
          description: `Albums photos, vidéos, reels et contenus visuels (${Math.floor(Math.random() * 300) + 100} éléments)`,
          source: 'Facebook Media Analyzer',
          confidence: 88,
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          metadata: { 
            section: 'Médias',
            totalPhotos: Math.floor(Math.random() * 300) + 100,
            albums: ['Vacances 2023', 'Famille', 'Travail', 'Amis'],
            videos: Math.floor(Math.random() * 20) + 5,
            reels: Math.floor(Math.random() * 15) + 3
          }
        });

        // Amis et réseau social
        results.push({
          id: `${baseId}_fb_friends`,
          type: 'social',
          title: `Réseau social - ${query}`,
          description: `Liste d'amis, famille et connexions sociales (${Math.floor(Math.random() * 800) + 200} amis)`,
          source: 'Facebook Social Network Mapper',
          confidence: 79,
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          metadata: { 
            section: 'Amis & Famille',
            totalFriends: Math.floor(Math.random() * 800) + 200,
            mutualFriends: Math.floor(Math.random() * 50) + 10,
            familyMembers: ['Marie Dupont (Sœur)', 'Jean Dupont (Père)'],
            topFriends: ['Alice Martin', 'Bob Durand', 'Claire Moreau']
          }
        });

        // Intérêts et préférences
        results.push({
          id: `${baseId}_fb_interests`,
          type: 'social',
          title: `Intérêts et préférences - ${query}`,
          description: `Pages aimées, sports, musique, films, livres et centres d'intérêt`,
          source: 'Facebook Interests Profiler',
          confidence: 85,
          timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
          metadata: { 
            section: 'Intérêts',
            likedPages: Math.floor(Math.random() * 100) + 50,
            sports: ['Football', 'Tennis'],
            music: ['Rock', 'Jazz', 'Électronique'],
            movies: ['Science-fiction', 'Thriller'],
            books: ['Romans', 'Biographies'],
            games: ['Chess.com', 'Candy Crush']
          }
        });

        // Activités et événements
        results.push({
          id: `${baseId}_fb_activities`,
          type: 'social',
          title: `Activités et événements - ${query}`,
          description: `Événements, avis, notes et activités récentes sur la plateforme`,
          source: 'Facebook Activity Tracker',
          confidence: 82,
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          metadata: { 
            section: 'Activités',
            upcomingEvents: ['Conférence Tech 2024', 'Concert Jazz Club'],
            pastEvents: Math.floor(Math.random() * 30) + 10,
            reviewsWritten: Math.floor(Math.random() * 15) + 3,
            reviewsReceived: Math.floor(Math.random() * 10) + 1,
            notes: Math.floor(Math.random() * 5) + 1
          }
        });

        // Coordonnées et contact
        results.push({
          id: `${baseId}_fb_contact`,
          type: 'social',
          title: `Informations de contact - ${query}`,
          description: `Email, téléphone, liens sociaux et moyens de contact disponibles`,
          source: 'Facebook Contact Extractor',
          confidence: 77,
          timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
          metadata: { 
            section: 'Contact',
            email: Math.random() > 0.5 ? `${query.toLowerCase().replace(/\s+/g, '.')}@email.com` : 'Non public',
            phone: Math.random() > 0.7 ? '+33 6 XX XX XX XX' : 'Non public',
            website: Math.random() > 0.8 ? `www.${query.toLowerCase().replace(/\s+/g, '')}.com` : 'Aucun',
            socialLinks: ['Instagram', 'LinkedIn']
          }
        });
        break;

      case 'twitter':
        results.push({
          id: `${baseId}_tw1`,
          type: 'social',
          title: `Compte X (Twitter) - ${query}`,
          description: `Profil Twitter actif pour ${query}`,
          source: 'X (Twitter) API',
          confidence: 92,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          metadata: { 
            platform: 'Twitter',
            handle: `@${query.replace(/\s+/g, '_').toLowerCase()}`,
            followers: Math.floor(Math.random() * 5000) + 100,
            tweets: Math.floor(Math.random() * 2000) + 50
          }
        });
        break;

      case 'instagram':
        results.push({
          id: `${baseId}_ig1`,
          type: 'social',
          title: `Profil Instagram - ${query}`,
          description: `Compte Instagram avec contenu public`,
          source: 'Instagram Basic Display API',
          confidence: 84,
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          metadata: { 
            platform: 'Instagram',
            username: query.replace(/\s+/g, '.').toLowerCase(),
            followers: Math.floor(Math.random() * 3000) + 200,
            posts: Math.floor(Math.random() * 800) + 20
          }
        });
        break;

      case 'linkedin':
        results.push({
          id: `${baseId}_li1`,
          type: 'social',
          title: `Profil LinkedIn - ${query}`,
          description: `Profil professionnel LinkedIn`,
          source: 'LinkedIn API',
          confidence: 95,
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          metadata: { 
            platform: 'LinkedIn',
            position: 'Software Engineer',
            company: 'Tech Corp',
            connections: Math.floor(Math.random() * 500) + 100
          }
        });
        break;

      case 'breaches':
        results.push({
          id: `${baseId}_breach1`,
          type: 'web',
          title: `Données compromises - ${query}`,
          description: `Informations trouvées dans des fuites de données`,
          source: 'Breach Database Monitor',
          confidence: 96,
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          metadata: { 
            breaches: ['Collection #1', 'LinkedIn 2021', 'Adobe 2019'],
            dataTypes: ['Email', 'Password Hash', 'Username'],
            riskLevel: 'High'
          }
        });
        break;

      case 'crypto':
        results.push({
          id: `${baseId}_crypto1`,
          type: 'web',
          title: `Adresses crypto - ${query}`,
          description: `Portefeuilles et transactions blockchain`,
          source: 'Blockchain Explorer',
          confidence: 89,
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          metadata: { 
            wallets: ['Bitcoin', 'Ethereum'],
            transactions: Math.floor(Math.random() * 50) + 5,
            totalValue: `${Math.floor(Math.random() * 10000) + 100} USD`
          }
        });
        break;

      case 'vehicles':
        results.push({
          id: `${baseId}_vehicle1`,
          type: 'web',
          title: `Véhicules enregistrés - ${query}`,
          description: `Informations sur les véhicules associés`,
          source: 'Vehicle Registration DB',
          confidence: 78,
          timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
          metadata: { 
            vehicles: ['Renault Clio 2019', 'BMW X3 2021'],
            registrations: 2,
            status: 'Active'
          }
        });
        break;

      case 'business':
        results.push({
          id: `${baseId}_biz1`,
          type: 'document',
          title: `Registres d'entreprise - ${query}`,
          description: `Informations commerciales et gouvernementales`,
          source: 'Business Registry Database',
          confidence: 93,
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          metadata: { 
            companies: [`${query} SARL`, `${query} SAS`],
            siret: `${Math.floor(Math.random() * 900000000) + 100000000}`,
            status: 'Active'
          }
        });
        break;
    }

    return results;
  };

  // Fonction pour obtenir la source selon le type de recherche
  const getSourceByType = (type: string): string => {
    switch (type) {
      case 'facebook': return 'Facebook Graph API';
      case 'twitter': return 'X (Twitter) API';
      case 'instagram': return 'Instagram Basic Display API';
      case 'linkedin': return 'LinkedIn API';
      case 'communities': return 'Community Forums Scraper';
      case 'email': return 'Email Intelligence';
      case 'usernames': return 'Username Search Engine';
      case 'names': return 'People Search Database';
      case 'addresses': return 'Address Verification Service';
      case 'phone': return 'Telecom Database';
      case 'maps': return 'Geospatial Intelligence';
      case 'documents': return 'Document Analysis Engine';
      case 'pastes': return 'Pastebin Monitor';
      case 'images': return 'Reverse Image Search';
      case 'videos': return 'Video Analysis Platform';
      case 'domains': return 'Domain Intelligence';
      case 'ip': return 'IP Geolocation Service';
      case 'business': return 'Business Registry Database';
      case 'vehicles': return 'Vehicle Registration DB';
      case 'crypto': return 'Blockchain Explorer';
      case 'breaches': return 'Breach Database Monitor';
      case 'audio': return 'Audio Stream Monitor';
      case 'video_live': return 'Live Stream Tracker';
      case 'apis': return 'API Intelligence Platform';
      default: return 'Multi-Source Aggregator';
    }
  };
  const searchTypes = [
    { id: 'all', label: 'Toutes sources', icon: Globe },
    { id: 'facebook', label: 'Facebook', icon: Users }
  ];

  const filters = [
    'Haute confiance',
    'Sources vérifiées',
    'Récent (24h)',
    'Géolocalisé',
    'Avec métadonnées',
    'Publique uniquement'
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setResults([]);
    
    // Simulation d'une recherche
    setTimeout(() => {
      const personalizedResults = generatePersonalizedResults(searchQuery, searchType);
      setResults(personalizedResults);
      setIsSearching(false);
    }, 1500);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'social': return Users;
      case 'web': return Globe;
      case 'document': return FileText;
      case 'image': return Image;
      case 'person': return Users;
      case 'location': return MapPin;
      default: return FileText;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400 bg-green-900/30';
    if (confidence >= 70) return 'text-yellow-400 bg-yellow-900/30';
    return 'text-red-400 bg-red-900/30';
  };

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
                <Search className="w-6 h-6 text-cyan-400" />
                <div>
                  <h1 className="text-xl font-bold text-cyan-400">Recherche Avancée</h1>
                  <p className="text-xs text-slate-400">Module d'analyse multi-sources</p>
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
                <span className="text-sm text-green-400">OPÉRATIONNEL</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Search Interface */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-900/30 rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Input */}
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
                  placeholder="Nom, email, pseudonyme, entreprise..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>

            {/* Search Type */}
            <div className="lg:w-64">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Type de recherche
              </label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              >
                {searchTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
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
                    <span>Lancer</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-400">Filtres:</span>
              </div>
              
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilters(prev => 
                      prev.includes(filter) 
                        ? prev.filter(f => f !== filter)
                        : [...prev, filter]
                    );
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    activeFilters.includes(filter)
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {isSearching && (
          <div className="text-center py-12">
            <div className="inline-block relative">
              <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              <Target className="w-6 h-6 text-cyan-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-cyan-400 text-lg font-medium mt-4">Analyse en cours...</p>
            <p className="text-slate-400 text-sm mt-2">Corrélation des sources multiples</p>
          </div>
        )}

        {results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                Résultats de recherche ({results.length})
              </h3>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Exporter</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Partager</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {results.map((result) => {
                const IconComponent = getResultIcon(result.type);
                return (
                  <div key={result.id} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6 hover:border-cyan-500/30 transition-colors">
                    {/* Profile Image Section */}
                    {result.profileImage && (
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="relative group">
                          <img
                            src={result.profileImage.url}
                            alt={`Photo de profil - ${result.title}`}
                            className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500/30 cursor-pointer hover:border-cyan-500 transition-colors"
                            onClick={() => setSelectedImage({
                              url: result.profileImage!.url,
                              source: result.profileImage!.source
                            })}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(searchQuery)}&size=64&background=0f172a&color=06b6d4`;
                            }}
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                            <ZoomIn className="w-4 h-4 text-white" />
                          </div>
                          {result.profileImage.verified && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Camera className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm text-cyan-400">Image de profil trouvée</span>
                            {result.profileImage.verified && (
                              <span className="text-xs px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full">
                                Vérifiée
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400">
                            Source: {result.profileImage.source} • 
                            Mise à jour: {new Date(result.profileImage.lastUpdated).toLocaleDateString()}
                          </p>
                          {result.metadata?.additionalImages && (
                            <p className="text-xs text-slate-500 mt-1">
                              +{result.metadata.additionalImages} autres images trouvées
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-cyan-900/30 rounded-lg">
                          <IconComponent className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">{result.title}</h4>
                          <p className="text-sm text-slate-400">{result.source}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(result.confidence)}`}>
                          {result.confidence}% confiance
                        </span>
                        <div className="flex items-center text-xs text-slate-400">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(result.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-300 mb-4">{result.description}</p>

                    {result.metadata && (
                      <div className="bg-slate-700/30 rounded-lg p-4 mb-4">
                        <h5 className="text-sm font-medium text-slate-300 mb-2">Métadonnées:</h5>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                          {Object.entries(result.metadata).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-slate-400">{key}:</span>
                              <span className="text-slate-300">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${
                          result.confidence >= 90 ? 'bg-green-500' :
                          result.confidence >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></span>
                        <span className="text-xs text-slate-400">
                          {result.confidence >= 90 ? 'Haute fiabilité' :
                           result.confidence >= 70 ? 'Fiabilité moyenne' : 'Fiabilité faible'}
                        </span>
                      </div>
                      
                      {result.url && (
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                        >
                          <span>Voir la source</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative max-w-4xl max-h-[90vh] mx-4">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-cyan-400 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Camera className="w-5 h-5 text-cyan-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Image de profil</h3>
                    <p className="text-sm text-slate-400">Source: {selectedImage.source}</p>
                  </div>
                </div>
                
                <img
                  src={selectedImage.url}
                  alt="Image de profil agrandie"
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(searchQuery)}&size=400&background=0f172a&color=06b6d4`;
                  }}
                />
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Télécharger</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                      <Search className="w-4 h-4" />
                      <span>Recherche inversée</span>
                    </button>
                  </div>
                  
                  <div className="text-xs text-slate-400">
                    Cliquez en dehors pour fermer
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isSearching && results.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <p className="text-xl text-white mb-2">Aucun résultat trouvé</p>
            <p className="text-slate-400">Essayez avec d'autres termes de recherche ou ajustez les filtres</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModule;