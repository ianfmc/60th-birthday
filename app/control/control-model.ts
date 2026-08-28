import { beautifulWeek, extraordinary } from "../data/beautiful-week";
import flightMonitor from "../data/flight-monitor.json";
import lodgingMonitor from "../data/lodging-monitor.json";
import directLodgingMonitor from "../data/direct-lodging-monitor.json";
import manualLodging from "../data/manual-lodging.json";
import { calculateBudgetVariance, normalizeStatus as normalizeStatusValue } from "./control-calculations.mjs";

export type StatusKind = "current" | "estimated" | "verify" | "stale" | "unavailable";
export type CostBreakdown = { lodging:number; airfare:number; transport:number; meals:number; experiences:number; contingency:number };
export type PropertyDetails = { name:string; role:string; inventory:string; source:string; confidence:StatusKind; vegan:string; note:string; lodgingPrice?:{status:StatusKind;total:number|null;nightly:number|null;source:string|null;checkedAt:string;refundable:boolean|null;official:boolean;room:string|null;availability?:boolean|null;reason?:string|null} };
export type LiveFare = { price:number; airline:string; origin:string; destination:string; cabin:string; outboundDate:string; returnDate:string; flights:string; source:string; checkedAt:string|null; deltaPercent:number|null; alert:boolean; status:StatusKind } | null;
export type DestinationViewModel = {
  id:string; collectionId:"extraordinary"|"beautiful-week"; name:string; destination:string; dates:string; total:number; targetHigh:number; budgetVariance:number;
  budgetVarianceRange:{min:number;max:number}|null;
  confidence:StatusKind; availability:string; refundability:string; costs:CostBreakdown;
  monitoring:{ checkedAt:string; previousTotal:number|null; deltaPercent:number|null; alert:boolean; summary:string };
  flight:{ origin:string; destination:string; cabin:string; confidence:StatusKind }|null; liveFare:LiveFare; properties:PropertyDetails[];
  dining:string[]; experiences:string[]; inventory:string|null; note:string|null; source:string|null;
};
export type CollectionViewModel = { id:"extraordinary"|"beautiful-week"; label:string; targetLabel:string; description:string; destinations:DestinationViewModel[] };
export type AttentionItem = { destinationId:string; collectionId:CollectionViewModel["id"]; severity:"warning"|"critical"; title:string; summary:string };

const flightById = Object.fromEntries(flightMonitor.results.map((result) => [result.id, result]));
const allLodgingResults=[...lodgingMonitor.results,...directLodgingMonitor.results,...manualLodging.results];
const lodgingById = Object.fromEntries(allLodgingResults.map((result) => [result.id, result]));
const manualLodgingIds=new Set(manualLodging.results.map((result)=>result.id));
const lodgingIdByPropertyName:Record<string,string>={"Casa Suhana":"casa-suhana","Casa Rayrae":"casa-rayrae","Hale Naiʻa":"hale-naia","La Puesta Sayulita":"la-puesta-sayulita","Montecristo Estates":"montecristo","Hotel El Ganzo":"el-ganzo","Solaz, a Luxury Collection Resort, Los Cabos":"solaz","Garza Blanca Preserve Resort & Spa":"garza-blanca","Waikoloa Beach Villas":"waikoloa-villas","Koloa Landing Resort at Poipu, Autograph Collection":"koloa-landing","The Westin Hāpuna Beach Resort":"westin-hapuna"};
const extraordinaryFlightIds:Record<string,string> = { "Casa Suhana":"puerto-vallarta", "Casa Rayrae":"original-cabo", "Hale Naiʻa":"big-island", "The Lagoon House":"tahiti", "The Westin Hāpuna Beach Resort":"big-island", "Koloa Landing Resort at Poipu, Autograph Collection":"kauai" };
const beautifulFlightIds:Record<string,string> = { cabo:"more-cabo", "puerto-vallarta":"puerto-vallarta", "big-island":"kauai" };

function normalizeStatus(confidence:string):StatusKind { return normalizeStatusValue(confidence) as StatusKind; }
function isQualifiedLodging(result:typeof allLodgingResults[number]|undefined){return result?.status==="current"&&result.refundable===true&&typeof result.total==="number";}
function lodgingStatus(result:typeof allLodgingResults[number]|undefined,fallback:string):StatusKind {if(!result)return normalizeStatus(fallback);if(isQualifiedLodging(result))return "current";if(result.status==="stale")return "stale";if(result.status==="unavailable")return "unavailable";return "verify";}
function getLiveFare(id:string):LiveFare {
  const result=flightById[id]; if(!result?.best) return null;
  return {...result.best,source:flightMonitor.source,checkedAt:flightMonitor.checkedAt,deltaPercent:result.deltaPercent,alert:result.alert,status:normalizeStatus(result.status)};
}
function getSelectedDateAirfare(id:string,fallback:number){
  const result=flightById[id];
  const exact=[result?.best,...(result?.alternatives??[])].find((offer)=>offer?.shift===0);
  return exact?.price??result?.best?.price??fallback;
}
function lodgingSummary(destinationId:string){
  const results=allLodgingResults.filter((result)=>result.destinationId===destinationId);
  const checkedAt=[lodgingMonitor.checkedAt,manualLodging.checkedAt].sort().at(-1)??lodgingMonitor.checkedAt;
  const checked=new Date(checkedAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
  const unavailable=results.filter((result)=>!isQualifiedLodging(result)).length;
  return unavailable?`Lodging checked ${checked}; ${unavailable} ${unavailable===1?"property":"properties"} did not return a complete qualifying total. Verified prices are shown individually.`:`Lodging price verified ${checked}.`;
}
const extraordinaryTargetHigh=12_000;
const extraordinaryDestinations:DestinationViewModel[]=extraordinary.properties.map((property,index)=>{const flightId=extraordinaryFlightIds[property.name];const liveFare=getLiveFare(flightId);const airfare=getSelectedDateAirfare(flightId,property.airfare);const liveLodging=lodgingById[lodgingIdByPropertyName[property.name]];const directAvailability=liveLodging&&"availability" in liveLodging?liveLodging.availability:null;const lodging=isQualifiedLodging(liveLodging)?liveLodging!.total!:property.lodging;const total=property.total-property.airfare-property.lodging+airfare+lodging;return ({
  id:`extraordinary-${index+1}`,collectionId:"extraordinary",name:property.name,destination:property.destination,dates:property.dates,total,targetHigh:extraordinaryTargetHigh,
  budgetVariance:calculateBudgetVariance(extraordinaryTargetHigh,total),budgetVarianceRange:null,confidence:lodgingStatus(liveLodging,property.confidence),availability:directAvailability===true?"Available on direct booking engine":directAvailability===false?"Unavailable on direct booking engine":property.inventory,refundability:liveLodging?.refundable===true?"Refundable":liveLodging?.refundable===false?"Nonrefundable":"Cancellation terms not provided",
  costs:{lodging,airfare,transport:property.transport,meals:property.meals,experiences:property.experiences,contingency:property.contingency},monitoring:{...property.monitoring,checkedAt:directLodgingMonitor.checkedAt,summary:liveLodging?.reason??lodgingSummary(`extraordinary-${index+1}`)},
  flight:null,liveFare,properties:[],dining:[property.dining],experiences:[],inventory:property.inventory,note:property.note,source:property.source,
})});
const beautifulDestinations:DestinationViewModel[]=beautifulWeek.destinations.map((destination)=>{
  const flightId=beautifulFlightIds[destination.id];
  const liveFare=getLiveFare(flightId);
  const airfare=getSelectedDateAirfare(flightId,destination.cost.airfare);
  const currentTotal=destination.cost.total-destination.cost.airfare+airfare;
  const pricedLodging=[destination.cost.lodging,...destination.properties.map((property)=>lodgingById[lodgingIdByPropertyName[property.name]]).filter(isQualifiedLodging).map((result)=>result!.total!)];
  const distinctLodging=[...new Set(pricedLodging)];
  const variances=distinctLodging.map((lodging)=>calculateBudgetVariance(beautifulWeek.target.high,currentTotal-destination.cost.lodging+lodging));
  const budgetVarianceRange=variances.length>1?{min:Math.min(...variances),max:Math.max(...variances)}:null;
  return {
  id:destination.id,collectionId:"beautiful-week",name:destination.name,destination:destination.name,dates:destination.dates,total:currentTotal,targetHigh:beautifulWeek.target.high,
  budgetVariance:calculateBudgetVariance(beautifulWeek.target.high,currentTotal),budgetVarianceRange,confidence:normalizeStatus(destination.cost.confidence),availability:destination.monitoring.availability,refundability:destination.monitoring.refundability,
  costs:{...destination.cost,airfare},monitoring:{...destination.monitoring,checkedAt:[lodgingMonitor.checkedAt,manualLodging.checkedAt].sort().at(-1)??lodgingMonitor.checkedAt,summary:lodgingSummary(destination.id)},flight:{origin:destination.flight.origin,destination:destination.flight.destination,cabin:destination.flight.cabin,confidence:normalizeStatus(destination.flight.confidence)},
  liveFare,properties:destination.properties.map((property)=>{const price=lodgingById[lodgingIdByPropertyName[property.name]];const checkedAt=price&&manualLodgingIds.has(price.id)?manualLodging.checkedAt:directLodgingMonitor.results.some(result=>result.id===price?.id)?directLodgingMonitor.checkedAt:lodgingMonitor.checkedAt;return {...property,confidence:normalizeStatus(property.confidence),lodgingPrice:price?{status:lodgingStatus(price,property.confidence),total:price.total,nightly:price.nightly,source:price.source,checkedAt,refundable:price.refundable,official:price.official,room:price.room??null,availability:"availability" in price?price.availability:null,reason:price.reason}:undefined}}),dining:[...destination.dining],experiences:[...destination.experiences],inventory:null,note:null,source:null,
  };
});
export const controlCollections:CollectionViewModel[]=[
  {id:"extraordinary",label:"Original Experience",targetLabel:extraordinary.target,description:extraordinary.note,destinations:extraordinaryDestinations},
  {id:"beautiful-week",label:"More Possibilities",targetLabel:`$${beautifulWeek.target.low.toLocaleString()}–$${beautifulWeek.target.high.toLocaleString()}`,description:beautifulWeek.assumptions.note,destinations:beautifulDestinations},
];
export const attentionItems:AttentionItem[]=controlCollections.flatMap((collection)=>collection.destinations.flatMap<AttentionItem>((destination)=>{
  if(destination.budgetVariance<0) return [{destinationId:destination.id,collectionId:collection.id,severity:"critical" as const,title:`${destination.name} is over budget`,summary:`$${Math.abs(destination.budgetVariance).toLocaleString()} above the collection ceiling.`}];
  if(destination.monitoring.alert)return [{destinationId:destination.id,collectionId:collection.id,severity:"warning" as const,title:`${destination.name} changed materially`,summary:destination.monitoring.deltaPercent&&Math.abs(destination.monitoring.deltaPercent)>10?`Modeled total changed ${Math.abs(destination.monitoring.deltaPercent)}% since the previous valid check.`:destination.monitoring.summary}];
  if(destination.liveFare?.alert)return [{destinationId:destination.id,collectionId:collection.id,severity:"warning" as const,title:`${destination.name} changed materially`,summary:`Flexible-date airfare changed ${Math.abs(destination.liveFare.deltaPercent!)}% since the previous valid check.`}];
  if(destination.confidence==="stale"||destination.confidence==="unavailable") return [{destinationId:destination.id,collectionId:collection.id,severity:"critical" as const,title:`${destination.name} needs attention`,summary:destination.monitoring.summary}];
  return [];
}));
export const controlRefresh={checkedAt:[flightMonitor.checkedAt,lodgingMonitor.checkedAt,directLodgingMonitor.checkedAt,manualLodging.checkedAt].sort().at(-1)??null,source:`${flightMonitor.source}; ${lodgingMonitor.source}; ${directLodgingMonitor.source}; ${manualLodging.source}`,nextCheck:"Daily at 6:00 AM Pacific"};
