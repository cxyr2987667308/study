import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import {Input} from 'antd';
import style from './index.less';

class Loading extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className={style.Loading}>
				Loading...
			</div>
    );
  }
}

export default Loading;
