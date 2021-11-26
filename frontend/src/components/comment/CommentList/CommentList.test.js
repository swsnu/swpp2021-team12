/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import CommentList from './CommentList';

jest.mock('axios');
describe('<CommentList />', () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  window.prompt = jest.fn(() => '');
  const createMock = jest.fn();
  const editMock = jest.fn();
  const deleteMock = jest.fn();
  let component;
  beforeEach(() => {
    component = mount(
      <BrowserRouter>
        <CommentList
          currentUser={1}
          comments={[
            {
              id: 1,
              content: 'content 1',
              author: {
                id: 1,
                email: 'email 1',
                name: 'name 1',
                self_intro: 'self 1',
              },
            },
            {
              id: 2,
              content: 'content 2',
              author: {
                id: 2,
                email: 'email 2',
                name: 'name 2',
                self_intro: 'self 2',
              },
            },
          ]}
          articleId={1}
          createComment={createMock}
          editComment={editMock}
          deleteComment={deleteMock}
        />
      </BrowserRouter>,
    );
  });
  it('should render without error', () => {
    const wrapper = component.find('.CommentList');
    expect(wrapper.length).toBe(1);
  });
  it('should have buttons working properly', () => {
    const commentInput = component.find('.NewComment').find('textarea');
    const confirmButton = component
      .find('.ConfirmCommentButton')
      .find('button');
    const editButton = component.find('.EditCommentButton').find('button');
    const deleteButton = component.find('.DeleteCommentButton').find('button');
    commentInput.simulate('change', { target: { value: 'test' } });
    confirmButton.simulate('click');
    editButton.simulate('click');
    deleteButton.simulate('click');
    expect(createMock).toHaveBeenCalledTimes(1);
    expect(editMock).toHaveBeenCalledTimes(0);
    expect(deleteMock).toHaveBeenCalledTimes(1);
    window.prompt = jest.fn(() => 'test');
    editButton.simulate('click');
    expect(editMock).toHaveBeenCalledTimes(1);
  });
});
