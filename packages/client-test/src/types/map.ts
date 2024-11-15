import { Endpoint } from "@/types/client";
import Api from "@/api";

type EndpointToSchemaMap<T extends Endpoint> = {
  "/api": Api;
}[T];

export type EndpointSchemas = {
  [K in Endpoint]: EndpointToSchemaMap<K>;
};
