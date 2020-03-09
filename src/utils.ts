export const getCalendlyEventType = (event: MessageEvent): string => event.data.event || '';

export enum CalendlyEvent {
  VIEWED = 'calendly.event_type_viewed',
  SCHEDULED = 'calendly.event_scheduled'
}

export const getCalendlyUrl = (): string => {
  const hash = window.location.hash || ''
  return decodeURIComponent(hash.substring(1));
};
