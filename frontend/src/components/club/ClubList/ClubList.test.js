/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import ClubList from './ClubList';

describe('<ClubList />', () => {
  let component;
  const historyMock = { push: jest.fn() };
  const pushSpy = jest.spyOn(historyMock, 'push');
  beforeEach(() => {
    component = mount(
      <BrowserRouter>
        <ClubList
          currentUser={1}
          clubs={[
            {
              title: 'test title',
              content: 'test content',
              author: {
                id: 1,
                name: 'name1',
                self_intro: 'self1',
              },
              members: [
                {
                  id: 2,
                  name: 'name2',
                  self_intro: 'self2',
                },
              ],
            },
            {
              title: 'test title',
              content: 'test content',
              author: {
                id: 2,
                name: 'name2',
                self_intro: 'self2',
              },
              members: [
                {
                  id: 1,
                  name: 'name1',
                  self_intro: 'self1',
                },
              ],
            },
          ]}
          history={historyMock}
        />
      </BrowserRouter>,
    );
  });

  it('should render without error', () => {
    const wrapper = component.find('.ClubList');
    expect(wrapper.length).toBe(1);
  });

  it('should handle search button', () => {
    const searchButton = component.find('.SearchButton').find('button');
    searchButton.simulate('click');
    expect(pushSpy).toHaveBeenCalledTimes(0);
  });

  it('should handle create button', () => {
    const createButton = component.find('.CreateButton').find('button');
    createButton.simulate('click');
    expect(pushSpy).toHaveBeenCalledTimes(0);
  });

  it('should handle back button', () => {
    const backButton = component.find('.BackButton').find('button');
    backButton.simulate('click');
    expect(pushSpy).toHaveBeenCalledTimes(0);
  });
});
