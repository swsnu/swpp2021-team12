/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Main from './Main';

describe('<Main />', () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  let component;
  const historyMock = { push: jest.fn() };
  beforeEach(() => {
    component = mount(
      <BrowserRouter>
        <Main
          history={historyMock}
          meetings={[
            {
              id: 1,
              title: 'title',
              content: 'content',
              author: { id: 1 },
              maxMembers: 10,
              currentMembers: [{ id: 1 }],
              location: {
                position: { lat: 1, lng: 1 },
                description: 'sibal',
              },
              time: 1,
            },
          ]}
          rooms={[
            {
              id: 1,
              title: 'title',
              description: 'dese',
              capacity: 10,
              address: 'aas',
              host_id: 1,
            },
          ]}
        />
      </BrowserRouter>,
    );
  });

  it('should render without error', () => {
    // console.log(component.debug());
    const wrapper = component.find('.Main');
    expect(wrapper.length).toBe(1);
  });
});
