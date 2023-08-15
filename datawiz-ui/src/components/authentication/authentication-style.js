import styled from 'styled-components';

export const AuthenticationManin = styled.div`
  @media (max-width: 767px) {
    color: #fff;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: #fff !important;
    }
  }
  padding-left: 550px;
  @media (max-width: 1700px) {
    padding-left: 470px;
    @media (max-width: 1400px) {
      // padding-left: 400px;
      @media (max-width: 1240px) {
        padding-left: 440px;
        @media (max-width: 992px) {
          padding-left: 320px;
          @media (max-width: 767px) {
            padding-left: 00px;
          }
        }
      }
    }
  }
  .left-right-auth {
    @media (min-width: 768px) {
    }
  }
  .left-auth {
    float: left;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 570px;
    @media (max-width: 1700px) {
      width: 470px;
      @media (max-width: 1400px) {
        // width: 420px;
        @media (max-width: 1240px) {
          width: 440px;
          @media (max-width: 992px) {
            width: 320px;
            @media (max-width: 767px) {
              width: 100%;
            }
          }
        }
      }
    }
    .slick-slider {
      float: left;
      width: 100%;
    }
    .slide-image {
      height: 100vh;
      @media (max-width: 767px) {
        // height:200px;
      }
      float: left;
      width: 100%;
      position: relative;
      &:after {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        content: '';
        background-image: linear-gradient(-45deg, rgba(43, 40, 54, 0.5), rgba(255, 122, 0, 0.2));
        background-size: 400% 400%;
        -webkit-animation: Gradient 3s ease infinite;
        -moz-animation: Gradient 3s ease infinite;
        animation: Gradient 3s ease infinite;
        @-webkit-keyframes Gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @-moz-keyframes Gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes Gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      }
    }
  }
  .right-auth {
    float: left;
    padding: 80px;
    @media (max-width: 1400px) {
      @media (max-width: 1240px) {
        padding: 80px 50px;
        @media (max-width: 992px) {
          padding: 50px 40px;

          @media (max-width: 767px) {
            padding: 30px 30px 30px;
            min-height: initial !important;
            // background: rgba(0, 0, 0, 0.5) !important;
            border-radius: 0 !important;
            margin-top: 0px;
          }
        }
      }
      .auth-top-logo {
        img {
          max-width: 150px;
          @media (max-width: 992px) {
            max-width: 140px;
            @media (max-width: 767px) {
              max-width: 120px;
            }
          }
        }
      }
    }
    margin-top: 0px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    width: 100%;
    position: relative;
    z-index: 1;
    min-height: 100vh;
    .auth-top-logo {
      padding-bottom: 60px;
      &.forgot-logo {
        padding-bottom: 40px;
      }
      @media (max-width: 1240px) {
        padding-bottom: 50px;
        @media (max-width: 992px) {
          padding-bottom: 40px;
          @media (max-width: 767px) {
            padding-bottom: 16px;
            margin-bottom: 30px;
            text-align: center;
            border-bottom: 1px solid #fff;
          }
        }
      }
    }
    .right-auth-left {
      float: left;
      width: 365px;
      @media (max-width: 1600px) {
        width: 325px;
        @media (max-width: 1500px) {
          width: 310px;
          @media (max-width: 1400px) {
            width: 320px;
            padding-right: 10px;
            @media (max-width: 1240px) {
              width: 260px;
              padding-right: 0;
              @media (max-width: 992px) {
                width: 100%;
              }
            }
          }
        }
      }
      max-width: 100%;
      .auth-signin-btn {
        font-weight: 700;
        border-radius: 7px;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
        background-color: #fff;
        color: #2b2b2b;
        width: 120px;
        height: 40px;
        @media (max-width: 767px) {
          width: 80px;
          height: 35px;
        }
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0s;
        &:hover {
          color: #fff;
          background-image: linear-gradient(100deg, #027fc5 -62%, #92fbbc 193%);
        }
      }
      .right-auth-left-text {
        line-height: normal;
        padding-top: 30px;
        @media (max-width: 767px) {
          padding-top: 20px;
        }
      }
    }
    .pt-80 {
      padding-top: 80px;
      @media (max-width: 992px) {
        padding-top: 10px;
        @media (max-width: 767px) {
          padding-top: 5px;
        }
      }
    }
    .right-auth-right {
      float: left;
      width: 465px;
      @media (max-width: 1500px) {
        width: 450px;
        @media (max-width: 1400px) {
          // width: 400px;
          @media (max-width: 1240px) {
            // width: 330px;
            @media (max-width: 992px) {
              width: 100%;
              padding-left: 0;
            }
          }
        }
      }
      max-width: 100%;
      .signup-tab-title {
        padding-bottom: 25px;
        margin-top: -53px;
        @media (max-width: 992px) {
          margin-top: 0px;
          padding-bottom: 20px;
          @media (max-width: 767px) {
            padding-bottom: 15px;
          }
        }
        text-align: right;
        a {
          margin-left: 8px;
          padding-right: 8px;
          color: #8e8e8e;
          &.active {
            color: #000000;
            font-weight: 700;
          }
          @media (max-width: 767px) {
            color: #fff !important;
            font-size: 13px;
          }
        }
      }
      .signup-tab-dots {
        a {
          width: 8px;
          height: 8px;
          opacity: 0.2;
          margin-left: 5px;
          background-color: #8e8e8e;
          border-radius: 100%;
          &.active {
            background: #000000;
            opacity: 1;
          }
          @media (max-width: 767px) {
            background: #fff !important;
          }
        }
      }
    }
  }
`;

export const FormMain = styled.form`
  @media (min-width: 768px) {
    .half-form-field {
      display: flex;
      justify-content: space-between;
      &.half-form-field-new {
        .form-field {
          width: auto !important;
          padding-right: 25px;
        }
      }
      .form-field {
        width: 48.5% !important;
      }
      &.three-field {
        .form-field {
          width: 32.3% !important;
        }
      }
    }
  }
  float: left;
  width: 100%;
  .full-width,
  .label,
  .ant-input {
    float: left;
    color: #1d2a3b;
    width: 100%;
  }
  .wrapper {
    margin: 0 auto !important;
    width: 1170px;
    max-width: 100%;
    float: none !important;
  }
  .form-field {
    .default-dropdown {
      .ant-dropdown-trigger {
        float: left;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 5px;
        height: 40px;
        color: #1d2a3b;
        padding: 4px 11px;
        background: #fff !important;
      }
    }
    textarea.ant-input {
      border: 1px solid #d8d8d8;
      padding: 10px;
      height: 120px;
      @media (max-width: 767px) {
        height: 70px;
      }
    }
    .ant-input {
      &::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        color: #1d2a3b;
      }
      &::-moz-placeholder {
        /* Firefox 19+ */
        color: #1d2a3b;
      }
      &:-ms-input-placeholder {
        /* IE 10+ */
        color: #1d2a3b;
      }
      &:-moz-placeholder {
        /* Firefox 18- */
        color: #1d2a3b;
      }
      // &.invalid { background:#ffcccc !important; }
    }
    .select-tag {
      position: relative;
      .ant-select-selection-item {
        color: #999999 !important;
        opacity: 1 !important;
        display: flex;
        align-items: center;
      }
      &.invalid {
        // .ant-select-selector { background:#ffcccc !important; }
      }
      .ant-select-selector {
        &:focus {
          box-shadow: none;
        }
        &.invalid {
          border-bottom: 1px solid red;
          background: transparent !important;
        }
      }
    }
    .ant-select-arrow {
      &:after {
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
      }
    }
  }
  // .srv-validation-message { display:none !important;}
`;
