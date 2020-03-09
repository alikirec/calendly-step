
import React, { useRef, useEffect, useState } from 'react';
import { setQuestionSize, setAnswerValue, getAllAnswerValues } from '@formsort/custom-question-api';

import { getCalendlyEventType, CalendlyEvent, getCalendlyUrl } from '../utils'
import './styles.css'

const getMessageListener = (containerElement: HTMLDivElement | null) => function messageListener(event: MessageEvent) {
  const eventType = getCalendlyEventType(event);
  switch (eventType) {
    case CalendlyEvent.VIEWED:
      if (containerElement) {
        setQuestionSize(containerElement.offsetWidth, containerElement.offsetHeight);
      }
      break;
    case CalendlyEvent.SCHEDULED:
      setAnswerValue(true);
      break;
    default:
      break;
  }
};

const CalendlyStep: React.FunctionComponent = () => {
  const containerElementRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const containerElement = containerElementRef.current;
    const messageListener = getMessageListener(containerElement);

    const calendlyUrl = getCalendlyUrl();
    if (!calendlyUrl) {
      setError('Please provide a valid calendly url.');
      return;
    }
    window.addEventListener('message', messageListener);
    getAllAnswerValues().then(({ name, firstName, lastName, email, ...rest }) => {
      if (containerElement && Calendly) {
        Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: containerElement,
          prefill: {
            name,
            firstName,
            lastName,
            email,
            customAnswers: rest
          },
        });
      }
    });

    return () => {
      window.removeEventListener('message', messageListener);
    }
  }, []);

  if (error !== '') {
    return (<p className='error'>{error}</p>)
  }

  return (<div ref={containerElementRef} className='calendly-inline-widget' />);
};

export default CalendlyStep;


