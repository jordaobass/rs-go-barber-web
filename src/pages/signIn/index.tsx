import React, {useCallback, useRef, useContext} from "react";
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi'
import Input from '../../components/Input'
import Button from '../../components/Button'
import {Form} from '@unform/web'
import {FormHandles} from '@unform/core'
import {Container, Content, BackGround} from './style';
// @ts-ignore
import logiImg from '../../assets/logo.svg';
import * as Yup from "yup";
import getValidationErrors from "../../utils/getValidationErrors";
import {AuthContext} from "../../context/AuthContext";



interface SignInFormData{
  email:string;
  password:string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {token,signIn} = useContext(AuthContext);

  console.log(token);

  const HandleSubmit = useCallback(async (data: SignInFormData) => {
    try {

      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required("Obrigatorio").email("Digite um email valido"),
        password: Yup.string().required("Obrigatorio")
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      signIn( {
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      console.log(err)

      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, [signIn]);

  return (
    <Container>
      <Content>
        <img src={logiImg} alt="logo"/>
        <Form ref={formRef} onSubmit={HandleSubmit}>
          <h1>Faça seu Logon</h1>
          <Input name="email" icon={FiMail} placeholder="email"/>
          <Input name="password" icon={FiLock} type="password" placeholder="senha"/>

          <Button type="submit">Entrar</Button>
        </Form>

        <a href=""><FiLogIn/> CriarConta</a>

      </Content>
      <BackGround>

      </BackGround>
    </Container>

  );
}
export default SignIn
