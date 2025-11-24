import { TestBed } from '@angular/core/testing';
import { ItemsStore } from './items.store';
import { MockApiService } from '../../../core/services/mock-api.service';
import { of } from 'rxjs';

describe('ItemsStore', () => {
  let mockApi: jasmine.SpyObj<MockApiService>;

  beforeEach(() => {
    mockApi = jasmine.createSpyObj('MockApiService', ['getItems']);
    
    TestBed.configureTestingModule({
      providers: [
        ItemsStore,
        { provide: MockApiService, useValue: mockApi }
      ]
    });
  });

  it('should load items and update state', () => {
    const mockData = [{ id: 1, name: 'Test', description: 'Desc' }];
    mockApi.getItems.and.returnValue(of(mockData));

    const store = TestBed.inject(ItemsStore);
    
    // Initial state
    expect(store.items().length).toBe(0);

    // Trigger action
    store.loadItems();

    // Assert state update
    expect(store.items()).toEqual(mockData);
    expect(store.isLoading()).toBe(false);
  });
});