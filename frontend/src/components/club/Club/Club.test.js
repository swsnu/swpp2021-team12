/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Club from './Club';

jest.mock('axios');
describe('<Club/>', () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  let component;
  const historyMock = { push: jest.fn() };

  beforeEach(() => {
    component = mount(
      <BrowserRouter>
        <Club
          isEdit={true}
          existingClub={{
            title: 'test title',
            content: 'test content',
            author: {
              id: 1,
              name: 'name1',
              email: 'email1',
              self_intro: 'self1',
            },
            members: [
              {
                id: 2,
                name: 'name2',
                email: 'email2',
                self_intro: 'self2',
              },
            ],
            pendings: [],
          }}
          onClickDeleteHandler={jest.fn()}
          onClickConfirmHandler={jest.fn()}
          history={historyMock}
        />
      </BrowserRouter>,
    );
  });

  it('should have member lists', () => {
    const kickButton = component.find('#kick-button').find('button');
    kickButton.simulate('click');
    const undoneButton = component.find('#undone-button').find('button');
    undoneButton.simulate('click');
    const backButton = component.find('#back-button').find('button');
    backButton.simulate('click');
    expect(historyMock.push).toHaveBeenCalledTimes(0);
  });
});
