import { beautifulWeek, extraordinary } from "../data/beautiful-week";
import flightMonitor from "../data/flight-monitor.json";
import { calculateBudgetVariance, normalizeStatus as normalizeStatusValue } from "./control-calculations.mjs";

export type StatusKind = "current" | "estimated" | "verify" | "stale" | "unavailable";
export type CostBreakdown = { lodging:number; airfare:number; transport:number; meals:number; experiences:number; contingency:number };
export type PropertyDetails = { name:string; role:string; inventory:string; source:string; confidence:StatusKind; vegan:string; note:string };
export type LiveFare = { price:number; airline:string; origin:string; destination:string; cabin:string; outboundDate:string; returnDate:string; flights:string; source:string; checkedAt:string|null; deltaPercent:number|null; alert:boolean } | null;
export type DestinationViewModel = {
  id:string; collectionId:"extraordinary"|"beautiful-week"; name:string; destination:string; dates:string; total:number; targetHigh:number; budgetVariance:number;
  confidence:StatusKind; availability:string; refundability:string; costs:CostBreakdown;
  monitoring:{ checkedAt:string; previousTotal:number|null; deltaPercent:number|null; alert:boolean; summary:string };
  flight:{ origin:string; destination:string; cabin:string; confidence:StatusKind }|null; liveFare:LiveFare; properties:PropertyDetails[];
  dining:string[]; experiences:string[]; inventory:string|null; note:string|null; source:string|null;
};
export type CollectionViewModel = { id:"extraordinary"|"beautiful-week"; label:string; targetLabel:string; description:string; destinations:DestinationViewModel[] };
export type AttentionItem = { destinationId:string; collectionId:CollectionViewModel["id"]; severity:"warning"|"critical"; title:string; summary:string };

const flightById = Object.fromEntries(flightMonitor.results.map((result) => [result.id, result]));
const extraordinaryFlightIds:Record<string,string> = { "Casa Suhana":"puerto-vallarta", "Casa Rayrae":"original-cabo", "Hale Naiʻa":"big-island", "The Lagoon House":"tahiti", "Sofitel Kia Ora · Horizon Overwater Villa":"tahiti" };
const beautifulFlightIds:Record<string,string> = { cabo:"more-cabo", "puerto-vallarta":"puerto-vallarta", "big-island":"kauai" };

function normalizeStatus(confidence:string):StatusKind { return normalizeStatusValue(confidence) as StatusKind; }
function getLiveFare(id:string):LiveFare {
  const result=flightById[id]; if(!result?.best) return null;
  return {...result.best,source:flightMonitor.source,checkedAt:flightMonitor.checkedAt,deltaPercent:result.deltaPercent,alert:result.alert};
}
const extraordinaryTargetHigh=12_000;
const extraordinaryDestinations:DestinationViewModel[]=extraordinary.properties.map((property,index)=>({
  id:`extraordinary-${index+1}`,collectionId:"extraordinary",name:property.name,destination:property.destination,dates:property.dates,total:property.total,targetHigh:extraordinaryTargetHigh,
  budgetVariance:calculateBudgetVariance(extraordinaryTargetHigh,property.total),confidence:normalizeStatus(property.confidence),availability:property.inventory,refundability:"Direct verification required",
  costs:{lodging:property.lodging,airfare:property.airfare,transport:property.transport,meals:property.meals,experiences:property.experiences,contingency:property.contingency},monitoring:property.monitoring,
  flight:null,liveFare:getLiveFare(extraordinaryFlightIds[property.name]),properties:[],dining:[property.dining],experiences:[],inventory:property.inventory,note:property.note,source:property.source,
}));
const beautifulDestinations:DestinationViewModel[]=beautifulWeek.destinations.map((destination)=>({
  id:destination.id,collectionId:"beautiful-week",name:destination.name,destination:destination.name,dates:destination.dates,total:destination.cost.total,targetHigh:beautifulWeek.target.high,
  budgetVariance:calculateBudgetVariance(beautifulWeek.target.high,destination.cost.total),confidence:normalizeStatus(destination.cost.confidence),availability:destination.monitoring.availability,refundability:destination.monitoring.refundability,
  costs:destination.cost,monitoring:destination.monitoring,flight:{origin:destination.flight.origin,destination:destination.flight.destination,cabin:destination.flight.cabin,confidence:normalizeStatus(destination.flight.confidence)},
  liveFare:getLiveFare(beautifulFlightIds[destination.id]),properties:destination.properties.map((property)=>({...property,confidence:normalizeStatus(property.confidence)})),dining:[...destination.dining],experiences:[...destination.experiences],inventory:null,note:null,source:null,
}));
export const controlCollections:CollectionViewModel[]=[
  {id:"extraordinary",label:extraordinary.label,targetLabel:extraordinary.target,description:extraordinary.note,destinations:extraordinaryDestinations},
  {id:"beautiful-week",label:beautifulWeek.label,targetLabel:`$${beautifulWeek.target.low.toLocaleString()}–$${beautifulWeek.target.high.toLocaleString()}`,description:beautifulWeek.assumptions.note,destinations:beautifulDestinations},
];
export const attentionItems:AttentionItem[]=controlCollections.flatMap((collection)=>collection.destinations.flatMap<AttentionItem>((destination)=>{
  if(destination.budgetVariance<0) return [{destinationId:destination.id,collectionId:collection.id,severity:"critical" as const,title:`${destination.name} is over budget`,summary:`$${Math.abs(destination.budgetVariance).toLocaleString()} above the collection ceiling.`}];
  if(destination.monitoring.alert||destination.liveFare?.alert){const delta=destination.liveFare?.deltaPercent??destination.monitoring.deltaPercent;return [{destinationId:destination.id,collectionId:collection.id,severity:"warning" as const,title:`${destination.name} changed materially`,summary:delta===null?destination.monitoring.summary:`Live airfare changed ${Math.abs(delta)}% since the previous valid check.`}];}
  if(destination.confidence==="stale"||destination.confidence==="unavailable") return [{destinationId:destination.id,collectionId:collection.id,severity:"critical" as const,title:`${destination.name} needs attention`,summary:destination.monitoring.summary}];
  return [];
}));
export const controlRefresh={checkedAt:flightMonitor.checkedAt,source:flightMonitor.source,nextCheck:"Daily at 6:00 AM Pacific"};
