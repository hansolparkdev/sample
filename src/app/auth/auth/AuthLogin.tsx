import React from "react";
import { AuthParams, authState } from "@/recoil/auth/state";
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { APICore } from '@/../../axiosConfig';
import { useForm, Controller } from 'react-hook-form'
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { useSetRecoilState } from "recoil";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const api = new APICore()

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const methods = useForm<AuthParams>();
  const setLoginUser = useSetRecoilState(authState);
  const alert = withReactContent(Swal);
  const router = useRouter()
  const {
      register,
      formState: { errors },
      reset,
      getValues,
      control,
      handleSubmit,
  } = methods;
  const onSubmit = async (data: any) => {
    const params: AuthParams = {
      username: data.username,
      password: data.password,
      grant_type: "password",
    }
    const response = await api.auth("/oauth/token", params);
    console.log(response)
    if (response?.data?.access_token) {
        console.log("Login Success", response?.data);
        api.setLoggedInUser(response.data.access_token, data.username);
        setCookie('token', response?.data?.access_token)
        setLoginUser({
            access_token: response.data?.accessToken,
            refresh_token: response.data?.refresh_token,
            expires_in: response.data?.expires_in,
            userLoggedIn: true,
            userId: data.username,
        });
        router.push('/')
        router.refresh()
    } else {
        await alert
          .fire({
            title: "로그인",
            text: "ID 또는 비밀번호가 일치하지 않습니다",
            icon: "error",
          })
          .then((result) => {
            console.log("alert closed status callback function", result);
            //return alert.fire(<p>Shorthand works too</p>);
            api.setLoggedInUser(null);
            setLoginUser({});
          });
        return false;
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Username
          </Typography>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (<CustomTextField variant="outlined" fullWidth {...field}/>)}
          />
          
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (<CustomTextField type="password" variant="outlined" fullWidth {...field}/>)}
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remeber this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          // component={Link}
          // href="#"
          type="submit"
        >
          Sign In
        </Button>
      </Box>
      {subtitle}
    </form>
  )
}

export default AuthLogin;
