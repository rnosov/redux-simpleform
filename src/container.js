/*
 * SimpleForm Redux Container
 *
 * Copyright © Roman Nosov 2016
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { connect } from 'react-redux';
import RestForm from './RestForm';

const mapStateToProps = ({ simpleform }, { formName }) => simpleform[formName] || {};

const mapDispatchToProps = (dispatch, { formName }) => ({
  setStatus: (formStatus = '', formMsg = false) => dispatch({
    type: 'simpleform/SET_STATUS',
    formName,
    formStatus,
    formMsg,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(RestForm);

