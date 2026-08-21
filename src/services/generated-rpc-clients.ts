import type { AviationServiceClient as AviationServiceClientInstance } from '@/generated/client/worldmonitor/aviation/v1/service_client';
import type { ClimateServiceClient as ClimateServiceClientInstance } from '@/generated/client/worldmonitor/climate/v1/service_client';
import type { ConflictServiceClient as ConflictServiceClientInstance } from '@/generated/client/worldmonitor/conflict/v1/service_client';
import type { ConsumerPricesServiceClient as ConsumerPricesServiceClientInstance } from '@/generated/client/worldmonitor/consumer_prices/v1/service_client';
import type { CyberServiceClient as CyberServiceClientInstance } from '@/generated/client/worldmonitor/cyber/v1/service_client';
import type { DisplacementServiceClient as DisplacementServiceClientInstance } from '@/generated/client/worldmonitor/displacement/v1/service_client';
import type { EconomicServiceClient as EconomicServiceClientInstance } from '@/generated/client/worldmonitor/economic/v1/service_client';
import type { ForecastServiceClient as ForecastServiceClientInstance } from '@/generated/client/worldmonitor/forecast/v1/service_client';
import type { GivingServiceClient as GivingServiceClientInstance } from '@/generated/client/worldmonitor/giving/v1/service_client';
import type { HealthServiceClient as HealthServiceClientInstance } from '@/generated/client/worldmonitor/health/v1/service_client';
import type { InfrastructureServiceClient as InfrastructureServiceClientInstance } from '@/generated/client/worldmonitor/infrastructure/v1/service_client';
import type { IntelligenceServiceClient as IntelligenceServiceClientInstance } from '@/generated/client/worldmonitor/intelligence/v1/service_client';
import type { MaritimeServiceClient as MaritimeServiceClientInstance } from '@/generated/client/worldmonitor/maritime/v1/service_client';
import type { MarketServiceClient as MarketServiceClientInstance } from '@/generated/client/worldmonitor/market/v1/service_client';
import type { MilitaryServiceClient as MilitaryServiceClientInstance } from '@/generated/client/worldmonitor/military/v1/service_client';
import type { NaturalServiceClient as NaturalServiceClientInstance } from '@/generated/client/worldmonitor/natural/v1/service_client';
import type { NewsServiceClient as NewsServiceClientInstance } from '@/generated/client/worldmonitor/news/v1/service_client';
import type { PositiveEventsServiceClient as PositiveEventsServiceClientInstance } from '@/generated/client/worldmonitor/positive_events/v1/service_client';
import type { PredictionServiceClient as PredictionServiceClientInstance } from '@/generated/client/worldmonitor/prediction/v1/service_client';
import type { RadiationServiceClient as RadiationServiceClientInstance } from '@/generated/client/worldmonitor/radiation/v1/service_client';
import type { ResearchServiceClient as ResearchServiceClientInstance } from '@/generated/client/worldmonitor/research/v1/service_client';
import type { ResilienceServiceClient as ResilienceServiceClientInstance } from '@/generated/client/worldmonitor/resilience/v1/service_client';
import type { SanctionsServiceClient as SanctionsServiceClientInstance } from '@/generated/client/worldmonitor/sanctions/v1/service_client';
import type { ScenarioServiceClient as ScenarioServiceClientInstance } from '@/generated/client/worldmonitor/scenario/v1/service_client';
import type { SeismologyServiceClient as SeismologyServiceClientInstance } from '@/generated/client/worldmonitor/seismology/v1/service_client';
import type { SupplyChainServiceClient as SupplyChainServiceClientInstance } from '@/generated/client/worldmonitor/supply_chain/v1/service_client';
import type { ThermalServiceClient as ThermalServiceClientInstance } from '@/generated/client/worldmonitor/thermal/v1/service_client';
import type { TradeServiceClient as TradeServiceClientInstance } from '@/generated/client/worldmonitor/trade/v1/service_client';
import type { UnrestServiceClient as UnrestServiceClientInstance } from '@/generated/client/worldmonitor/unrest/v1/service_client';
import type { WebcamServiceClient as WebcamServiceClientInstance } from '@/generated/client/worldmonitor/webcam/v1/service_client';
import type { WildfireServiceClient as WildfireServiceClientInstance } from '@/generated/client/worldmonitor/wildfire/v1/service_client';

type RpcClientOptions = { fetch?: typeof fetch; defaultHeaders?: Record<string, string> };
type RpcClientConstructor<T extends object> = new (baseURL: string, options?: RpcClientOptions) => T;
type RpcClientConstructorLoader<T extends object> = () => Promise<RpcClientConstructor<T>>;
type RpcClientMethodKey<T> = {
  [K in keyof T]-?: T[K] extends (...args: never[]) => unknown ? K : never;
}[keyof T];
// The object shape makes TypeScript require every public method. The proxy only
// needs the keys, so each value is a compact boolean marker.
type RpcClientMethodMap<T> = { readonly [K in RpcClientMethodKey<T>]: true };

export function createLazyRpcClientConstructor<T extends object>(
  loadConstructor: RpcClientConstructorLoader<T>,
  methodMap: RpcClientMethodMap<T>,
): RpcClientConstructor<T> {
  const methodNames = new Set(Object.keys(methodMap));

  return function LazyRpcClient(baseURL: string, options?: RpcClientOptions): T {
    let clientPromise: Promise<T> | undefined;
    const getClient = () => {
      if (!clientPromise) {
        clientPromise = loadConstructor()
          .then((ClientCtor) => new ClientCtor(baseURL, options))
          .catch((error) => {
            clientPromise = undefined;
            throw error;
          });
      }
      return clientPromise;
    };

    return new Proxy({}, {
      get(target, property, receiver) {
        if (property === 'then') return undefined;
        if (typeof property === 'symbol') return Reflect.get(target, property, receiver);
        const objectValue = Reflect.get(target, property, receiver);
        if (objectValue !== undefined) return objectValue;
        if (!methodNames.has(property)) {
          throw new TypeError(`Lazy RPC clients only expose generated RPC methods; ${property} is not a method`);
        }
        return (...args: unknown[]) => getClient().then((client) => {
          const value = (client as Record<PropertyKey, unknown>)[property];
          return typeof value === 'function' ? value.apply(client, args) : value;
        });
      },
    }) as T;
  } as unknown as RpcClientConstructor<T>;
}

export const AviationServiceClient = createLazyRpcClientConstructor<AviationServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/aviation/v1/service_client');
  return module.AviationServiceClient;
}, {
    listAirportDelays: true,
    getAirportOpsSummary: true,
    listAirportFlights: true,
    getCarrierOps: true,
    getFlightStatus: true,
    trackAircraft: true,
    getYoutubeLiveStreamInfo: true,
    searchFlightPrices: true,
    listAviationNews: true,
    searchGoogleFlights: true,
    searchGoogleDates: true,
  });

export const ClimateServiceClient = createLazyRpcClientConstructor<ClimateServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/climate/v1/service_client');
  return module.ClimateServiceClient;
}, {
    listClimateAnomalies: true,
    listClimateDisasters: true,
    getCo2Monitoring: true,
    getOceanIceData: true,
    listAirQualityData: true,
    listClimateNews: true,
  });

export const ConflictServiceClient = createLazyRpcClientConstructor<ConflictServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/conflict/v1/service_client');
  return module.ConflictServiceClient;
}, {
    listAcledEvents: true,
    listUcdpEvents: true,
    getHumanitarianSummary: true,
    listIranEvents: true,
    getHumanitarianSummaryBatch: true,
  });

export const ConsumerPricesServiceClient = createLazyRpcClientConstructor<ConsumerPricesServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/consumer_prices/v1/service_client');
  return module.ConsumerPricesServiceClient;
}, {
    getConsumerPriceOverview: true,
    getConsumerPriceBasketSeries: true,
    listConsumerPriceCategories: true,
    listConsumerPriceMovers: true,
    listRetailerPriceSpreads: true,
    getConsumerPriceFreshness: true,
  });

export const CyberServiceClient = createLazyRpcClientConstructor<CyberServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/cyber/v1/service_client');
  return module.CyberServiceClient;
}, {
    listCyberThreats: true,
  });

export const DisplacementServiceClient = createLazyRpcClientConstructor<DisplacementServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/displacement/v1/service_client');
  return module.DisplacementServiceClient;
}, {
    getDisplacementSummary: true,
    getPopulationExposure: true,
  });

export const EconomicServiceClient = createLazyRpcClientConstructor<EconomicServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/economic/v1/service_client');
  return module.EconomicServiceClient;
}, {
    getFredSeries: true,
    listWorldBankIndicators: true,
    getEnergyPrices: true,
    getMacroSignals: true,
    getChinaMacroSnapshot: true,
    getChinaActivityNowcast: true,
    getEnergyCapacity: true,
    getBisPolicyRates: true,
    getBisExchangeRates: true,
    getBisCredit: true,
    getFredSeriesBatch: true,
    listGroceryBasketPrices: true,
    listBigMacPrices: true,
    getNationalDebt: true,
    listFuelPrices: true,
    getBlsSeries: true,
    getEconomicCalendar: true,
    getCrudeInventories: true,
    getNatGasStorage: true,
    getEcbFxRates: true,
    getEurostatCountryData: true,
    getEuGasStorage: true,
    getEuYieldCurve: true,
    getEuFsi: true,
    getEconomicStress: true,
    getFaoFoodPriceIndex: true,
    getOilStocksAnalysis: true,
    getOilInventories: true,
    getEnergyCrisisPolicies: true,
    listGlobalTenders: true,
  });

export const ForecastServiceClient = createLazyRpcClientConstructor<ForecastServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/forecast/v1/service_client');
  return module.ForecastServiceClient;
}, {
    getForecasts: true,
    getForecastScorecard: true,
    getSimulationPackage: true,
    getSimulationOutcome: true,
    triggerSimulation: true,
  });

export const GivingServiceClient = createLazyRpcClientConstructor<GivingServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/giving/v1/service_client');
  return module.GivingServiceClient;
}, {
    getGivingSummary: true,
  });

export const HealthServiceClient = createLazyRpcClientConstructor<HealthServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/health/v1/service_client');
  return module.HealthServiceClient;
}, {
    listDiseaseOutbreaks: true,
    listAirQualityAlerts: true,
  });

export const InfrastructureServiceClient = createLazyRpcClientConstructor<InfrastructureServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/infrastructure/v1/service_client');
  return module.InfrastructureServiceClient;
}, {
    listInternetOutages: true,
    listServiceStatuses: true,
    getTemporalBaseline: true,
    getIpGeo: true,
    reverseGeocode: true,
    getBootstrapData: true,
    recordBaselineSnapshot: true,
    getCableHealth: true,
    listTemporalAnomalies: true,
    listInternetDdosAttacks: true,
    listInternetTrafficAnomalies: true,
  });

export const IntelligenceServiceClient = createLazyRpcClientConstructor<IntelligenceServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/intelligence/v1/service_client');
  return module.IntelligenceServiceClient;
}, {
    getRiskScores: true,
    getPizzintStatus: true,
    classifyEvent: true,
    getCountryRisk: true,
    getCountryIntelBrief: true,
    searchGdeltDocuments: true,
    deductSituation: true,
    listSatellites: true,
    listGpsInterference: true,
    listOrefAlerts: true,
    listTelegramFeed: true,
    listXFeed: true,
    getCompanyEnrichment: true,
    listCompanySignals: true,
    searchSecFilings: true,
    listMaterialEvents: true,
    getCountryFacts: true,
    listSecurityAdvisories: true,
    getGdeltTopicTimeline: true,
    listCrossSourceSignals: true,
    listMarketImplications: true,
    getSocialVelocity: true,
    getCountryEnergyProfile: true,
    computeEnergyShockScenario: true,
    getCountryPortActivity: true,
    getChinaDecisionSignals: true,
    getRegionalSnapshot: true,
    getRegimeHistory: true,
    getRegionalBrief: true,
    searchIntelHistory: true,
    getIntelTimeline: true,
    getSimilarEvents: true,
  });

export const MaritimeServiceClient = createLazyRpcClientConstructor<MaritimeServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/maritime/v1/service_client');
  return module.MaritimeServiceClient;
}, {
    getVesselSnapshot: true,
    listNavigationalWarnings: true,
  });

export const MarketServiceClient = createLazyRpcClientConstructor<MarketServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/market/v1/service_client');
  return module.MarketServiceClient;
}, {
    listMarketQuotes: true,
    listCryptoQuotes: true,
    listCommodityQuotes: true,
    getPhysicalPremiums: true,
    getSectorSummary: true,
    listStablecoinMarkets: true,
    listEtfFlows: true,
    getCountryStockIndex: true,
    listGulfQuotes: true,
    analyzeStock: true,
    getStockAnalysisHistory: true,
    backtestStock: true,
    listStoredStockBacktests: true,
    listCryptoSectors: true,
    listDefiTokens: true,
    listAiTokens: true,
    listOtherTokens: true,
    getFearGreedIndex: true,
    listEarningsCalendar: true,
    getCotPositioning: true,
    getInsiderTransactions: true,
    getMarketBreadthHistory: true,
    getGoldIntelligence: true,
    getHyperliquidFlow: true,
  });

export const MilitaryServiceClient = createLazyRpcClientConstructor<MilitaryServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/military/v1/service_client');
  return module.MilitaryServiceClient;
}, {
    listMilitaryFlights: true,
    getTheaterPosture: true,
    getAircraftDetails: true,
    getAircraftDetailsBatch: true,
    getWingbitsStatus: true,
    getUSNIFleetReport: true,
    listMilitaryBases: true,
    getWingbitsLiveFlight: true,
    listDefensePatents: true,
    getDefenseIndustrialBase: true,
  });

export const NaturalServiceClient = createLazyRpcClientConstructor<NaturalServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/natural/v1/service_client');
  return module.NaturalServiceClient;
}, {
    listNaturalEvents: true,
  });

export const NewsServiceClient = createLazyRpcClientConstructor<NewsServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/news/v1/service_client');
  return module.NewsServiceClient;
}, {
    summarizeArticle: true,
    getSummarizeArticleCache: true,
    listFeedDigest: true,
  });

export const PositiveEventsServiceClient = createLazyRpcClientConstructor<PositiveEventsServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/positive_events/v1/service_client');
  return module.PositiveEventsServiceClient;
}, {
    listPositiveGeoEvents: true,
  });

export const PredictionServiceClient = createLazyRpcClientConstructor<PredictionServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/prediction/v1/service_client');
  return module.PredictionServiceClient;
}, {
    listPredictionMarkets: true,
  });

export const RadiationServiceClient = createLazyRpcClientConstructor<RadiationServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/radiation/v1/service_client');
  return module.RadiationServiceClient;
}, {
    listRadiationObservations: true,
  });

export const ResearchServiceClient = createLazyRpcClientConstructor<ResearchServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/research/v1/service_client');
  return module.ResearchServiceClient;
}, {
    listArxivPapers: true,
    listTrendingRepos: true,
    listHackernewsItems: true,
    listTechEvents: true,
  });

export const ResilienceServiceClient = createLazyRpcClientConstructor<ResilienceServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/resilience/v1/service_client');
  return module.ResilienceServiceClient;
}, {
    getResilienceScore: true,
    getFoodStocks: true,
    getDemographicsCapability: true,
    getResilienceRanking: true,
    getResilienceRuntimeManifest: true,
  });

export const SanctionsServiceClient = createLazyRpcClientConstructor<SanctionsServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/sanctions/v1/service_client');
  return module.SanctionsServiceClient;
}, {
    listSanctionsPressure: true,
    lookupSanctionEntity: true,
  });

export const ScenarioServiceClient = createLazyRpcClientConstructor<ScenarioServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/scenario/v1/service_client');
  return module.ScenarioServiceClient;
}, {
    runScenario: true,
    getScenarioStatus: true,
    listScenarioTemplates: true,
  });

export const SeismologyServiceClient = createLazyRpcClientConstructor<SeismologyServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/seismology/v1/service_client');
  return module.SeismologyServiceClient;
}, {
    listEarthquakes: true,
  });

export const SupplyChainServiceClient = createLazyRpcClientConstructor<SupplyChainServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/supply_chain/v1/service_client');
  return module.SupplyChainServiceClient;
}, {
    getShippingRates: true,
    getChokepointStatus: true,
    getChokepointHistory: true,
    getCriticalMinerals: true,
    getMineralProduction: true,
    getShippingStress: true,
    getCountryChokepointIndex: true,
    getBypassOptions: true,
    getCountryCostShock: true,
    getCountryProducts: true,
    getMultiSectorCostShock: true,
    getSectorDependency: true,
    getRouteExplorerLane: true,
    getRouteImpact: true,
    listPipelines: true,
    getPipelineDetail: true,
    listStorageFacilities: true,
    getStorageFacilityDetail: true,
    listFuelShortages: true,
    getFuelShortageDetail: true,
    listEnergyDisruptions: true,
    getChinaCorridorControlTowers: true,
  });

export const ThermalServiceClient = createLazyRpcClientConstructor<ThermalServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/thermal/v1/service_client');
  return module.ThermalServiceClient;
}, {
    listThermalEscalations: true,
  });

export const TradeServiceClient = createLazyRpcClientConstructor<TradeServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/trade/v1/service_client');
  return module.TradeServiceClient;
}, {
    getTradeRestrictions: true,
    getTariffTrends: true,
    getTradeFlows: true,
    getTradeBarriers: true,
    getCustomsRevenue: true,
    listComtradeFlows: true,
  });

export const UnrestServiceClient = createLazyRpcClientConstructor<UnrestServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/unrest/v1/service_client');
  return module.UnrestServiceClient;
}, {
    listUnrestEvents: true,
  });

export const WebcamServiceClient = createLazyRpcClientConstructor<WebcamServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/webcam/v1/service_client');
  return module.WebcamServiceClient;
}, {
    listWebcams: true,
    getWebcamImage: true,
  });

export const WildfireServiceClient = createLazyRpcClientConstructor<WildfireServiceClientInstance>(async () => {
  const module = await import('@/generated/client/worldmonitor/wildfire/v1/service_client');
  return module.WildfireServiceClient;
}, {
    listFireDetections: true,
  });
