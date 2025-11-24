import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { MockApiService, Item } from '../../../core/services/mock-api.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, of, finalize } from 'rxjs';

type ItemsState = {
  items: Item[];
  isLoading: boolean;
  error: string | null;
};

const initialState: ItemsState = {
  items: [],
  isLoading: false,
  error: null,
};

export const ItemsStore = signalStore(
  withState(initialState),
  withMethods((store, apiService = inject(MockApiService)) => ({
    loadItems: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() =>
          apiService.getItems().pipe(
            tap((items) => patchState(store, { items })),
            catchError((err) => {
              patchState(store, { error: 'Failed to load items.' });
              return of([]);
            }),
            finalize(() => patchState(store, { isLoading: false }))
          )
        )
      )
    ),
  }))
);