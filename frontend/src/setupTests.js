import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-17-updated';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true,
});
