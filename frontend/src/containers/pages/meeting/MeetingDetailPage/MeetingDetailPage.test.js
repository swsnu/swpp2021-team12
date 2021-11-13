/* eslint-disable react/display-name */
/* eslint-disable arrow-body-style */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import MeetingDetailPage from './MeetingDetailPage';

// jest.mock('../../../../components/meeting/MeetingDetail', () => {
//   return jest.fn((props) => {
//     return () => {
//       return (
//         <div className="spyDetail">
//           <div className="title">{'Hello world!'}</div>
//           <button
//             className="deleteButton"
//             onClick={props.onClickDeleteButton}
//           />
//           <button className="joinButton" onClick={props.onClickToggleButton} />
//         </div>
//       );
//     };
//   });
// });
const runAllPromises = () => new Promise(setImmediate);
jest.mock('axios');
describe('<MeetingDetailPage />', () => {
  // const stubMeetings = [
  //   {
  //     id: 1,
  //     title: 'title',
  //     content: 'content',
  //     authorId: 1,
  //     currentMembers: [1, 2],
  //     maxMembers: 4,
  //   },
  // ];
  // const stubUsers = [
  //   { id: 1, name: 'tester' },
  //   { id: 2, name: 'tester2' },
  //   { id: 3, name: 'tester3' },
  // ];
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  const mockStore = configureMockStore();
  const store = mockStore({
    auth: { auth: 1 },
  });

  let component;
  beforeEach(() => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          id: 1,
          title: 'title',
          content: 'content',
          authorId: 1,
          currentMembers: [1, 2],
          maxMembers: 4,
        },
      }),
    );
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MeetingDetailPage match={{ params: { id: 1 } }} />
        </BrowserRouter>
      </Provider>,
    );
  });
  it('should render without error', () => {
    const pageTem = component.find('PageTemplate');
    expect(pageTem.length).toBe(1);
  });

  it('should throw error with wrong fetch', () => {
    const spyAlert = jest.spyOn(window, 'alert');
    axios.get.mockImplementation(() => Promise.reject());
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MeetingDetailPage match={{ params: { id: 1 } }} />
        </BrowserRouter>
      </Provider>,
    );
    expect(spyAlert).toHaveBeenCalledTimes(0);
  });

  it('should handle onClickDeleteButton', async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          authorId: 1,
          currentMembers: [1, 2],
          name: 'name',
        },
      }),
    );
    axios.delete.mockImplementation(() => Promise.resolve({ data: 'dummy' }));
    const realUseState = React.useState;
    const stubInitialState = ['stub data'];
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => realUseState(stubInitialState))
      .mockImplementationOnce(() => realUseState(stubInitialState));
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MeetingDetailPage match={{ params: { id: 1 } }} />
        </BrowserRouter>
      </Provider>,
    );
    await runAllPromises();
    component.update();
    const deleteButton = component.find('#deleteMeetingButton').find('button');
    deleteButton.simulate('click');
    expect(axios.delete).toHaveBeenCalledTimes(1);
  });

  it('should handle onClickToggleButton', async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          authorId: 2,
          currentMembers: [1, 2],
          name: 'name',
        },
      }),
    );
    axios.put.mockImplementation(() => Promise.resolve({ data: 'dummy' }));
    const realUseState = React.useState;
    const stubInitialState = ['stub data'];
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => realUseState(stubInitialState))
      .mockImplementationOnce(() => realUseState(stubInitialState));
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MeetingDetailPage match={{ params: { id: 1 } }} />
        </BrowserRouter>
      </Provider>,
    );
    await runAllPromises();
    component.update();
    const quitButton = component.find('#quitMeetingButton').find('button');
    quitButton.simulate('click');
    expect(axios.put).toHaveBeenCalledTimes(1);
  });

  it('make error onClickToggleButton', async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          authorId: 2,
          currentMembers: [1, 2],
          name: 'name',
        },
      }),
    );
    axios.put.mockImplementation(() => Promise.reject());
    const spyAlert = jest.spyOn(window, 'alert');
    const realUseState = React.useState;
    const stubInitialState = ['stub data'];
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => realUseState(stubInitialState))
      .mockImplementationOnce(() => realUseState(stubInitialState));
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MeetingDetailPage match={{ params: { id: 1 } }} />
        </BrowserRouter>
      </Provider>,
    );
    await runAllPromises();
    component.update();
    const quitButton = component.find('#quitMeetingButton').find('button');
    quitButton.simulate('click');
    expect(spyAlert).toHaveBeenCalledTimes(0);
  });

  // it('should have buttons working(author)', () => {
  //   const meetingAuthorButton = component.find('#meetingAuthor');
  //   const editMeetingButton = component.find('.EditButton');
  //   const deleteMeetingButton = component.find('.DeleteButton');
  //   const backButton = component.find('.BackButton');
  //   meetingAuthorButton.simulate('click');
  //   editMeetingButton.simulate('click');
  //   deleteMeetingButton.simulate('click');
  //   backButton.simulate('click');
  //   expect(meetingAuthorButton.length).toBe(1);
  //   expect(editMeetingButton.length).toBe(1);
  //   expect(deleteMeetingButton.length).toBe(1);
  //   expect(backButton.length).toBe(1);
  // });

  // it('should have buttons working(participant)', () => {
  //   component = mount(
  //     <Provider store={store2}>
  //       <BrowserRouter>
  //         <MeetingDetailPage match={{ params: { id: 1 } }} />
  //       </BrowserRouter>
  //     </Provider>,
  //   );
  //   const quitMeetingButton = component.find('.QuitButton');
  //   quitMeetingButton.simulate('click');
  //   expect(quitMeetingButton.length).toBe(1);
  // });

  // it('should have buttons working(non-participant)', () => {
  //   component = mount(
  //     <Provider store={store3}>
  //       <BrowserRouter>
  //         <MeetingDetailPage match={{ params: { id: 1 } }} />
  //       </BrowserRouter>
  //     </Provider>,
  //   );
  //   const joinMeetingButton = component.find('.JoinButton');
  //   joinMeetingButton.simulate('click');
  //   expect(joinMeetingButton.length).toBe(1);
  // });
});
