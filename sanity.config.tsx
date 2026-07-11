"use client";

/**
 * Sanity Studio 配置
 * 嵌入式 Studio 路由: /studio
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemas";
import { structure } from "./sanity/structure";
import { PortableImageEditProvider } from "./sanity/components/PortableImageEditProvider";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  studio: {
    components: {
      layout: (props) => (
        <PortableImageEditProvider>
          {props.renderDefault(props)}
        </PortableImageEditProvider>
      ),
    },
  },
});
