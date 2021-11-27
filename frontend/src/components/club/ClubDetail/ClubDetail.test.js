/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import ClubDetail from './ClubDetail';

describe('<ClubDetail />', () => {
  let component;
  const historyMock = { push: jest.fn() };
  const pushSpy = jest.spyOn(historyMock, 'push');
  beforeEach(() => {
    component = mount(
      <BrowserRouter>
        <ClubDetail
          club={{
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
          }}
          history={historyMock}
          currentUser={1}
        />
      </BrowserRouter>,
    );
  });

  it('should render without error', () => {
    const wrapper = component.find('.ClubDetail');
    expect(wrapper.length).toBe(1);
  });

  it('should handle delete button', () => {
    const spyDelete = jest.fn();
    component = mount(
      <BrowserRouter>
        <ClubDetail
          club={{
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
          }}
          history={historyMock}
          currentUser={1}
          onClickDeleteButton={spyDelete}
        />
      </BrowserRouter>,
    );
    const deleteButton = component.find('#deleteClubButton').find('button');
    deleteButton.simulate('click');
    expect(spyDelete).toHaveBeenCalledTimes(1);
  });

  it('should handle edit button', () => {
    const editButton = component.find('#editClubButton').find('button');
    editButton.simulate('click');
    expect(pushSpy).toHaveBeenCalledTimes(0);
  });

  it('should handle quit button', () => {
    const spyToggle = jest.fn();
    component = mount(
      <BrowserRouter>
        <ClubDetail
          club={{
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
          }}
          history={historyMock}
          currentUser={2}
          onClickToggleButton={spyToggle}
        />
      </BrowserRouter>,
    );
    const quitButton = component.find('#quitClubButton').find('button');
    quitButton.simulate('click');
    expect(spyToggle).toHaveBeenCalledTimes(1);
  });

  it('should handle join button', () => {
    const spyToggle = jest.fn();
    component = mount(
      <BrowserRouter>
        <ClubDetail
          club={{
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
          }}
          history={historyMock}
          currentUser={3}
          onClickToggleButton={spyToggle}
        />
      </BrowserRouter>,
    );
    const joinButton = component.find('#joinClubButton').find('button');
    joinButton.simulate('click');
    expect(spyToggle).toHaveBeenCalledTimes(1);
  });
});
