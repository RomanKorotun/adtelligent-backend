import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-node";
import {
  ConsoleMetricExporter,
  PeriodicExportingMetricReader,
} from "@opentelemetry/sdk-metrics";
import {
  SimpleLogRecordProcessor,
  ConsoleLogRecordExporter,
} from "@opentelemetry/sdk-logs";
import {
  diag,
  DiagConsoleLogger,
  DiagLogLevel,
  metrics,
} from "@opentelemetry/api";

import FastifyOtelInstrumentation from "@fastify/otel";
import { MongoDBInstrumentation } from "@opentelemetry/instrumentation-mongodb";
import { PinoInstrumentation } from "@opentelemetry/instrumentation-pino";

export const initOpenTelemetry = async () => {
  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

  const sdk = new NodeSDK({
    traceExporter: new ConsoleSpanExporter(),
    metricReader: new PeriodicExportingMetricReader({
      exporter: new ConsoleMetricExporter(),
      exportIntervalMillis: 20000,
    }),
    logRecordProcessors: [
      new SimpleLogRecordProcessor(new ConsoleLogRecordExporter()),
    ],
    instrumentations: [
      new FastifyOtelInstrumentation({
        servername: "app",
        registerOnInitialization: true,
      }),
      new MongoDBInstrumentation({ enhancedDatabaseReporting: true }),
      new PinoInstrumentation({
        enabled: true,
        logHook: (_span, record) => {
          record["resourse.service.name"] = "fastify-app";
          record["resourse.service.version"] = "1.0.0";
        },
      }),
    ],
  });

  try {
    sdk.start();
    diag.info("OpenTelemetry initialized");
  } catch (error) {
    diag.error("Error OpenTelemetry initialized", error);
  }

  const meter = metrics.getMeter("app");

  return { sdk, meter };
};
