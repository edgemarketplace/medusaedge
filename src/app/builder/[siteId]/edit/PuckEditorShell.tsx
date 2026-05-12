"use client";

import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";

export default function PuckEditorShell({ config, data, onPublish }: { config: any; data: any; onPublish: (data: any) => void }) {
  return <Puck config={config} data={data} onPublish={onPublish} />;
}
