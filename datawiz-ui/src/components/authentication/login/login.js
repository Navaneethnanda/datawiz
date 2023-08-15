import React, { useState } from 'react';
import Slider from 'react-slick';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input, Button } from 'antd';
import ScrollAnimation from 'react-animate-on-scroll';
import useSimpleReactValidator from '../../../shared/hooks/useSimpleReactValidator';
import { login } from '../../../redux/actions/authActions';
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

const Login = () => {
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState({});
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const dummy = [
    {
      key: '1',
      image: `/images/DataWiz-Tab-Title-logo.svg`,
    },
  ];

  const [validator, showValidationMessage] = useSimpleReactValidator({
    validators: {
      password: {
        message:
          'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
        rule: val => {
          const patt = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          return patt.test(val);
        },
      },
      matchPassword: {
        message: 'New password & Confirm password does not match',
        rule: val => fields.password === val,
      },
    },
  });

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
      };
      const res = await dispatch(login(data));
      if (res) {
        setIsSubmitLoading(false);
        history.push('/');
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
                  <h2 className="auth-head full-width">Login</h2>
                </div>

                <FormMain onSubmit={submit} className="global-form full-width">
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

                  {/* password */}
                  <div className="full-width form-field">
                    <div className="label">Password</div>
                    <Input.Password
                      type="text"
                      placeholder="Password"
                      value={fields?.password}
                      onChange={e => handleChange('password', e)}
                      className={errors?.password ? 'invalid' : ''}
                      autocomplete="new-password"
                    />
                    {validator.message('Password', fields?.password, 'required')}
                  </div>
                  <div className="full-width form-field text-checkbox top-margin flex-center">
                    <Link className="recovery-text" to="/signup">
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      Don't have account ?
                    </Link>
                  </div>
                  <div className="full-width form-field flex-center">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="submit-btn full-width"
                      loading={isSubmitLoading}
                    >
                      <span>Login</span>
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

export default Login;
