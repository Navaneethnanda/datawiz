import React, { useState } from 'react';
import Slider from 'react-slick';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input, Button } from 'antd';
import ScrollAnimation from 'react-animate-on-scroll';
import useSimpleReactValidator from '../../../shared/hooks/useSimpleReactValidator';
import { register } from '../../../redux/actions/authActions';
import { AuthenticationManin, FormMain } from '../authentication-style';

const settings = {
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: false,
  dots: false,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5500,
  fade: true,
  cssEase: 'linear',
};

const Register = () => {
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState({
    name: undefined,
    username: undefined,
    password: undefined,
    confirmPassword: undefined,
  });
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const dummy = [
    {
      key: '1',
      image: `/images/DataWiz-Tab-Title-logo.svg`,
    },
  ];

  const [validator, showValidationMessage] = useSimpleReactValidator(
    {},
    {
      matchPassword: {
        message: 'New password & Confirm password does not match',
        rule: val => fields.password === val,
      },
    }
  );

  const handleChange = (field, value) => {
    setFields(prev => ({
      ...prev,
      [field]: value.target.value.trim() === '' ? '' : value.target.value.trim(),
    }));
  };

  const submit = async e => {
    e.preventDefault();
    if (validator.allValid()) {
      setIsSubmitLoading(true);
      const data = {
        username: fields?.username,
        password: fields?.password,
        name: fields?.name,
      };
      const res = await dispatch(register(data));
      if (res) {
        localStorage.setItem('username', fields?.username);
        setIsSubmitLoading(false);
        history.push('/login');
      } else {
        setFields(prev => ({
          ...prev,
          password: null,
        }));
      }
      setIsSubmitLoading(false);
    } else {
      setIsSubmitLoading(false);
      setErrors(validator.getErrorMessages());
      showValidationMessage(true);
    }
  };

  return (
    <AuthenticationManin className="full-width">
      <div className="left-auth">
        <Slider {...settings}>
          {dummy.map(element => (
            <div className="full-width" key={element.key}>
              <div
                className="full-width slide-image bgimg-main"
                style={{ backgroundImage: `url(${element.image})` }}
              />
            </div>
          ))}
        </Slider>

        <div className="title-section full-width">
          <ScrollAnimation animateOnce className="full-width" animateIn="fadeInLeft" delay={500}>
            <div className="full-width auth-top-logo mobile-show">
              <Link to="/">
                <img className="" src="images/DataWiz-logo.svg" alt="logo" />
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </div>
      <div className="right-auth large-screen-height-center single-section">
        <div className="full-width right-auth-inner">
          <ScrollAnimation animateOnce className="full-width" animateIn="fadeIn" delay={500}>
            <div className="full-width auth-top-logo desktop-show">
              <Link to="/">
                <img className="logo" src="images/DataWiz-logo.svg" alt="logo" />
              </Link>
            </div>

            <div className="full-width left-right-auth">
              <div className="right-auth-right">
                <div className="full-width flex-center my-lang-switch">
                  <h2 className="auth-head full-width">Register</h2>
                </div>

                <FormMain onSubmit={submit} className="global-form full-width">
                  {/* Name */}
                  <div className="full-width form-field">
                    <div className="label">Name</div>
                    <Input
                      type="text"
                      value={fields?.name}
                      onChange={e => handleChange('name', e)}
                      placeholder="Name"
                      className={errors?.name ? 'invalid' : ''}
                    />
                    {validator.message('Name', fields?.name, `required`)}
                  </div>

                  {/* Username */}
                  <div className="full-width form-field">
                    <div className="label">Username</div>
                    <Input
                      type="text"
                      value={fields?.username}
                      onChange={e => handleChange('username', e)}
                      placeholder="Username"
                      className={errors?.username ? 'invalid' : ''}
                    />
                    {validator.message('Username', fields?.username, `required`)}
                  </div>

                  {/* Password */}
                  <div className="full-width form-field">
                    <div className="label">Password</div>
                    <Input.Password
                      type="text"
                      placeholder="Password"
                      value={fields?.password}
                      onChange={e => handleChange('password', e)}
                      className={errors?.password ? 'invalid' : ''}
                      autoComplete="new-password"
                    />
                    {validator.message('Password', fields?.password, 'required')}
                  </div>

                  {/* Confirm Password */}
                  <div className="full-width form-field">
                    <div className="label">Confirm Password</div>
                    <Input.Password
                      type="text"
                      placeholder="Confirm Password"
                      value={fields?.confirmPassword}
                      onChange={e => handleChange('confirmPassword', e)}
                      className={errors?.confirmPassword ? 'invalid' : ''}
                    />
                    {validator.message(
                      'Password',
                      fields?.confirmPassword,
                      'required|matchPassword'
                    )}
                  </div>

                  <div className="full-width form-field text-checkbox top-margin flex-center">
                    <Link className="recovery-text" to="/login">
                      Already have an account?
                    </Link>
                  </div>

                  <div className="full-width form-field flex-center">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="submit-btn full-width"
                      loading={isSubmitLoading}
                    >
                      <span>Sign Up</span>
                    </Button>
                  </div>
                </FormMain>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </AuthenticationManin>
  );
};

export default Register;
