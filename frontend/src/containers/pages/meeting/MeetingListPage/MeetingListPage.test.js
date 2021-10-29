import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MeetingListPage from './MeetingListPage';

describe('<MeetingListPage />', () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    auth: { auth: null, authError: null },
  });
  let component;

  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MeetingListPage />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('should render without error', () => {
    const PageTem = component.find('MeetingListPage');
    expect(PageTem.length).toBe(1);
  });
});
