import React, { useState } from 'react';
import { Input, Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useSimpleReactValidator from '../../shared/hooks/useSimpleReactValidator';
import { FormMain } from '../authentication/authentication-style';
import ApiUtils from '../../helpers/APIUtils';

const api = msg => new ApiUtils(msg);

const AddCustomDashboard = ({ visible, onCancel, getData }) => {
  const { userId } = useSelector(state => state.auth.user);

  const [fields, setFields] = useState({
    userId: userId.toString(),
  });
  const [errors, setErrors] = useState({});
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const [validator, showValidationMessage] = useSimpleReactValidator({}, {});

  const handleChange = field => e => {
    setFields(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const submit = async e => {
    e.preventDefault();

    if (validator.allValid()) {
      setIsSubmitLoading(true);

      try {
        await api(true).saveCustomDashboard(fields);
        getData();

        onCancel(false, 'add', null);
      } catch {
        setIsSubmitLoading(false);
      }
    } else {
      setIsSubmitLoading(false);
      setErrors(validator.getErrorMessages());
      showValidationMessage(true);
    }
  };

  return (
    <Modal
      centered
      maskClosable={false}
      open={visible}
      footer={null}
      onCancel={() => onCancel(false, 'add', null)}
      className="site-modal"
    >
      <FormMain onSubmit={submit} className="global-form full-width">
        <div className="full-width form-field">
          <div className="label">Custom Dashboard Name</div>
          <Input
            placeholder="Custom Dashboard Name"
            value={fields?.name ? fields?.name : null}
            onChange={handleChange('name')}
            classname={errors?.name ? 'invalid' : ''}
          />
          {validator.message(`DB Name`, fields?.name, `required`)}
        </div>

        <div className="full-width form-field flex-center mb-0">
          <Button type="primary" htmlType="submit" className="submit-btn" loading={isSubmitLoading}>
            <span>Add</span>
          </Button>
        </div>
      </FormMain>
    </Modal>
  );
};

AddCustomDashboard.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};

export default AddCustomDashboard;
