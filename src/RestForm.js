/*
 * RestForm React Component
 *
 * Copyright © Roman Nosov 2016
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import React, { Component, PropTypes } from 'react';
import SimpleForm from 'simpleform/dist/SimpleForm';
import scroller from 'react-scroll/lib/mixins/scroller';

const
  propTypes = {
    formName: PropTypes.string,
    formMsg: PropTypes.any,
    formStatus: PropTypes.string,
    endpoint: PropTypes.string.isRequired,
    setStatus: PropTypes.func.isRequired,
    onResponse: PropTypes.func,
    onFormWillFetch: PropTypes.func,
    fetchFunc: PropTypes.func,
    waitText: PropTypes.string,
    errorText: PropTypes.string,
    successText: PropTypes.string,
    welcomeText: PropTypes.string,
    scrollOrigin: PropTypes.string,
  },
  defaultProps = {
    formName: 'redux-form',
    waitText: 'Uploading form. Please wait ...',
    errorText: 'Houston, we have a problem!',
    successText: 'Your form has been submitted successfully',
    welcomeText: 'Welcome, please fill in the form below:',
  };

class RestForm extends Component {

  isProcessing = false;

  jsonFetch(body) {
    return fetch(this.props.endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(body),
    });
  }

  async handleApiCall(form) {
    if (this.props.onFormWillFetch)
      form = await this.props.onFormWillFetch(form);
    const response = await  (typeof this.props.fetchFunc === 'function'
                              ? this.props.fetchFunc(form)
                              : this.jsonFetch(form)
                            );

    if (response.status < 200 || response.status >= 300)
      throw new Error(`${response.status} (${response.statusText})`);
    return  typeof this.props.onResponse === 'function'
            ? await this.props.onResponse(response)
            : this.props.successText;
  }

  async handleSubmit(form) {
    if (this.isProcessing) return;
    this.isProcessing = true;
    this.props.setStatus('info', this.props.waitText, true);
    if (this.props.scrollOrigin)
      scroller.scrollTo(this.props.scrollOrigin, { duration: 500, delay: 0, smooth: true });
    try {
      this.props.setStatus('success', await this.handleApiCall(form));
    }
    catch (err) {
      this.props.setStatus('danger', err.message || err);
    }
    finally {
      this.isProcessing = false;
    }
  }

  render() {
    const {
      store,
      formName,
      formMsg,
      formStatus,
      endpoint,
      setStatus,
      onResponse,
      onFormWillFetch,
      waitText,
      errorText,
      successText,
      welcomeText,
      scrollOrigin,
      formType,
      fetchFunc,
      ...props
    } = this.props;
    if (typeof formMsg === 'string') {
      const goBack = <button onClick={ () => setStatus() } className={ "btn btn-outline-" + formStatus }>Go back to the form</button>;
      return (
        <div key={"alert" + formStatus} style={SimpleForm.animate()} className={`simpleform-fadeIn alert alert-` + formStatus} role="alert">
          {formStatus === 'danger' ?<h4 className="alert-heading">{this.props.errorText}</h4>:void 0}
          <p>{formMsg}</p>
          {goBack}
        </div>
      );
    }
    return(
      <div key="form" style={SimpleForm.animate()} className="simpleform-fadeIn">
        <p>{this.props.welcomeText}</p>
        <SimpleForm
          {...props}
          onSubmit={ ::this.handleSubmit }
        />
      </div>
    );
  }

}

RestForm.propTypes = propTypes;
RestForm.defaultProps = defaultProps;

export default RestForm;
