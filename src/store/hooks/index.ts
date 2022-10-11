import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

/**
 * Creates an action dispatcher.
 *
 * Uses like:
 * ```js
 * const action = useAction(actions.myAction);
 * // ...
 * <button onClick={action}>Call action</button>
 * ```
 */

export function useAction(action: any) {
  const dispatch = useDispatch();

  return useCallback(
    (...args: any) => {
      dispatch(action(...args));
    },
    [action, dispatch],
  );
}
