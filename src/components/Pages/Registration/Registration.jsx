import React from 'react';
import Input from "../../Input";
import {SnippetsOutlined, UserOutlined} from "@ant-design/icons";

const Registration = () => {
  return (
    <div className="registration">
      <div className="container">
        <div className="registration__body">
          <form className="registration__form">
            <div className="registration__form-body">
              <div className="registration__field">
                <div className="registration__field-input">
                  <Input name={"name"} placeholder={'Как тебя зовут?'} icon={<UserOutlined />} required={true}/>
                </div>
              </div>
              <div className="registration__field">
                <div className="registration__field-input">
                  <Input name={"notation"} placeholder={'Примечание'} icon={<SnippetsOutlined />}/>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
