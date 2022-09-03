import React from 'react';
import './styles.css';

const EmptyView = () => (
  <div className='emptyView-wrap'>
    <img src={require('../../../../Images/gif/no-result.gif')} alt='' />
  </div>
);

export default EmptyView;
