import React, { useState, useEffect } from 'react';
import { Input, Button, Modal, notification, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import useSimpleReactValidator from '../../shared/hooks/useSimpleReactValidator';
import { FormMain } from '../authentication/authentication-style';
import ApiUtils from '../../helpers/APIUtils';

const api = msg => new ApiUtils(msg);

const EditDBConfig = ({ visible, onCancel, getData, data, type }) => {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [isView, setIsView] = useState(type === 'view');
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const [validator, showValidationMessage] = useSimpleReactValidator({}, {});

  useEffect(() => {
    setFields(prev => ({
      ...prev,
      id: data.id,
      userId: data.userId,
      dbUsername: data.dbUsername,
      dbPassword: data.dbPassword,
      url: data.url,
      name: data.name,
    }));
  }, [data]);

  const handleChange = field => e => {
    setFields(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleDelete = async () => {
    const bodyData = {
      id: fields.id,
    };

    try {
      await api().deleteDBConfig(bodyData);
      getData();

      onCancel(false, 'edit', null);
    } catch (e) {
      // console.log(e);
    }
  };

  const testDBConnection = async () => {
    if (validator.allValid()) {
      const bodyData = {
        url: fields.url,
        dbUsername: fields.dbUsername,
        dbPassword: fields.dbPassword,
      };

      try {
        const res = await api().testDBConfig(bodyData);

        if (res.data.data) {
          notification.success({
            message: 'Success',
            description: 'Connected',
            duration: 10,
          });
        } else {
          notification.error({
            message: 'Error',
            description: 'Not able to Connect',
          });
        }
      } catch (e) {
        // console.log(e);
      }
    } else {
      setErrors(validator.getErrorMessages());
      showValidationMessage(true);
    }
  };

  const submit = async e => {
    e.preventDefault();

    if (validator.allValid()) {
      setIsSubmitLoading(true);

      try {
        await api(true).editDBConfig(fields);
        getData();

        onCancel(false, 'edit', null);
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
      onCancel={() => onCancel(false, 'edit', null)}
      className="site-modal"
    >
      <FormMain onSubmit={submit} className="global-form full-width">
        <div className="full-width form-field">
          <div className="icon-class">
            <Tooltip title="Delete">
              <DeleteOutlined onClick={handleDelete} />
            </Tooltip>
            {!isView ? (
              <Tooltip title="View">
                <EyeOutlined onClick={() => setIsView(true)} />
              </Tooltip>
            ) : (
              <Tooltip title="Edit">
                <EditOutlined onClick={() => setIsView(false)} />
              </Tooltip>
            )}
          </div>
          <div className="label">DB URL</div>
          {isView ? (
            <p>{fields?.url}</p>
          ) : (
            <React.Fragment>
              <Input
                placeholder="DB URL"
                value={fields?.url ? fields?.url : null}
                onChange={handleChange('url')}
                classname={errors?.url ? 'invalid' : ''}
              />
              {validator.message(`DB URL`, fields?.url, `required`)}
            </React.Fragment>
          )}
        </div>

        <div className="full-width form-field">
          <div className="label">DB Name</div>
          {isView ? (
            <p>{fields?.name}</p>
          ) : (
            <React.Fragment>
              <Input
                placeholder="DB Name"
                value={fields?.name ? fields?.name : null}
                onChange={handleChange('name')}
                classname={errors?.name ? 'invalid' : ''}
              />
              {validator.message(`DB Name`, fields?.name, `required`)}
            </React.Fragment>
          )}
        </div>

        <div className="full-width form-field">
          <div className="label">Username</div>
          {isView ? (
            <p>{fields?.dbUsername}</p>
          ) : (
            <React.Fragment>
              <Input
                placeholder="Username"
                value={fields?.dbUsername ? fields?.dbUsername : null}
                onChange={handleChange('dbUsername')}
                classname={errors?.dbUsername ? 'invalid' : ''}
              />
              {validator.message(`Username`, fields?.dbUsername, `required`)}
            </React.Fragment>
          )}
        </div>

        <div className="full-width form-field">
          <div className="label">Password</div>
          {isView ? (
            <p>*******</p>
          ) : (
            <React.Fragment>
              <Input.Password
                placeholder="Password"
                value={fields?.dbPassword ? fields?.dbPassword : null}
                onChange={handleChange('dbPassword')}
                classname={errors?.dbPassword ? 'invalid' : ''}
              />
              {validator.message(`Password`, fields?.dbPassword, `required`)}
            </React.Fragment>
          )}
        </div>

        <div className="full-width form-field flex-center mb-0">
          <Button
            type="primary"
            htmlType="button"
            className="submit-btn"
            loading={isSubmitLoading}
            onClick={testDBConnection}
          >
            <span>Test Connection</span>
          </Button>
          {isView ? (
            <Button
              type="primary"
              htmlType="button"
              className="submit-btn"
              loading={isSubmitLoading}
              onClick={() => onCancel(false, 'edit', null)}
            >
              <span>Close</span>
            </Button>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              className="submit-btn"
              loading={isSubmitLoading}
            >
              <span>Edit</span>
            </Button>
          )}
        </div>
      </FormMain>
    </Modal>
  );
};

EditDBConfig.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default EditDBConfig;
