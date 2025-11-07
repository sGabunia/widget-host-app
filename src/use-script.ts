import type { ComponentProps } from 'react';

import { useEffect, useState } from 'react';

/** The use script status */
export type UseScriptStatus = 'error' | 'loading' | 'ready' | 'unknown';
export const SCRIPT_STATUS_ATTRIBUTE_NAME = 'script-status';

/** The use script options extends from attributes script tag */
export interface UseScriptOptions extends ComponentProps<'script'> {
  /** Whether to remove the script on unmount */
  removeOnUnmount?: boolean;
  "data-brand-id"?: string;
  "data-host"?: string;
}

export const useScript = (src: string, options: UseScriptOptions = {}) => {
  const [status, setStatus] = useState<UseScriptStatus>(() => {
    const script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;
    const scriptStatus = script?.getAttribute(SCRIPT_STATUS_ATTRIBUTE_NAME) as UseScriptStatus;
    if (scriptStatus) return scriptStatus;
    if (script) return 'unknown';

    return 'loading';
  });
  const { removeOnUnmount = true, async = true } = options;

  useEffect(() => {
    const existedScript = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;
    const scriptStatus = existedScript?.getAttribute(
      SCRIPT_STATUS_ATTRIBUTE_NAME
    ) as UseScriptStatus;
    if (scriptStatus) return setStatus(scriptStatus);
    if (existedScript) return setStatus('unknown');

    const script = document.createElement('script');
    script.src = src;
    script.async = async;

    for (const [key, value] of Object.entries(options)) {
        console.log(`Setting script attribute ${key} = ${value}`);
      script.setAttribute(key, String(value));
    }

    script.setAttribute(SCRIPT_STATUS_ATTRIBUTE_NAME, 'loading');
    document.body.appendChild(script);

    const onLoad = () => {
      script.setAttribute(SCRIPT_STATUS_ATTRIBUTE_NAME, 'ready');
      setStatus('ready');
    };

    const onError = () => {
      script.setAttribute(SCRIPT_STATUS_ATTRIBUTE_NAME, 'error');
      setStatus('error');
    };

    script.addEventListener('load', onLoad);
    script.addEventListener('error', onError);

    return () => {
      if (removeOnUnmount) script.remove();
      script.removeEventListener('load', onLoad);
      script.removeEventListener('error', onError);
    };
  }, [src, removeOnUnmount]);

  return status;
};