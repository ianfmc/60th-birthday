import type { Metadata } from "next";
import ControlDashboard from "./ControlDashboard";
import { attentionItems, controlCollections, controlRefresh } from "./control-model";
import "./control.css";

export const metadata: Metadata = { title: "Trip planner · Calimac Productions", robots: { index: false, follow: false } };

export default function ControlPlane() {
  return <ControlDashboard collections={controlCollections} attentionItems={attentionItems} {...controlRefresh} />;
}
