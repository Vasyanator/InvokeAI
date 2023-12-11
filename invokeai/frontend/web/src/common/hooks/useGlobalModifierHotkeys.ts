import { atom, map } from 'nanostores';
import { useCallback, useEffect } from 'react';

export type ModifierHotkeysState = {
  shift: boolean;
  ctrl: boolean;
  meta: boolean;
  alt: boolean;
};

export const $modifierHotkeys = map<ModifierHotkeysState>({
  shift: false,
  ctrl: false,
  meta: false,
  alt: false,
});

const $isInitialized = atom(false);

export const useGlobalModifierHotkeysInit = () => {
  useEffect(() => {
    if ($isInitialized.get()) {
      // singleton!
      return;
    }
    const listener = (e: KeyboardEvent) => {
      $modifierHotkeys.setKey('shift', e.shiftKey);
      $modifierHotkeys.setKey('ctrl', e.ctrlKey);
      $modifierHotkeys.setKey('alt', e.altKey);
      $modifierHotkeys.setKey('meta', e.metaKey);
    };

    window.addEventListener('keydown', listener);
    window.addEventListener('keyup', listener);
    $isInitialized.set(true);
    return () => {
      window.removeEventListener('keydown', listener);
      window.removeEventListener('keyup', listener);
    };
  }, []);
};

export const useGlobalModifierHotkeysSetters = () => {
  const setShift = useCallback((shift: boolean) => {
    $modifierHotkeys.setKey('shift', shift);
  }, []);
  const setCtrl = useCallback((shift: boolean) => {
    $modifierHotkeys.setKey('ctrl', shift);
  }, []);
  const setAlt = useCallback((shift: boolean) => {
    $modifierHotkeys.setKey('alt', shift);
  }, []);
  const setMeta = useCallback((shift: boolean) => {
    $modifierHotkeys.setKey('meta', shift);
  }, []);
  return { setShift, setCtrl, setAlt, setMeta };
};
