import { StatisticsCollectorBody } from "../schemas/statisticsCollector.schema";

export const prepareRowForClickhouse = (event: StatisticsCollectorBody) => {
  return {
    eventType: event.event,
    message: JSON.stringify(event.data),
  };
};

export const prepareRowsForClickhouse = (
  events: Set<StatisticsCollectorBody>
) => {
  return Array.from(events).map(prepareRowForClickhouse);
};
