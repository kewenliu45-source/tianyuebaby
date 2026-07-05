/**
 * Sanity 写入客户端 — 仅在服务端 API 路由中使用
 * 使用 SANITY_API_WRITE_TOKEN，不暴露为 NEXT_PUBLIC_* 变量
 */

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

const writeToken = process.env.SANITY_API_WRITE_TOKEN;

if (!writeToken) {
  console.warn(
    "SANITY_API_WRITE_TOKEN is not set. Write operations will fail."
  );
}

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
});
