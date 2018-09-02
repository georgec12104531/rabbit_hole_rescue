import { connect } from 'react-redux';
import { fetchWindows } from '../../util/window_api_util';
import { fetchVisit, fetchVisits } from '../../util/visit_api_util';
import Show from './show';
import {selectVisits, selectWindows} from '../../reducers/selectors';

const msp = (state) => {
  let date = Date.now();
  let windows = state.windows;
  let visits = state.visits;
  return {date, windows, visits};
};

const mdp = dispatch => {
  return {
    fetchVisits: (windowId) => dispatch(fetchVisits(windowId)),
    fetchWindows: (date) => dispatch(fetchWindows(date))
  };
};

export default connect(msp,mdp)(Show);
