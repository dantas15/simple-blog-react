import { FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  PaperProps,
  Button,
  Anchor,
  Stack,
  Container,
  LoadingOverlay,
} from '@mantine/core';
import { AuthContext } from '../contexts/AuthContext';
import { LoginRequest, LoginResponse } from '../hooks/useAuth';
import { UserForm } from '../interfaces/User';
import api from '../services/api';
import axios, { AxiosError } from 'axios';

export function AuthenticationForm(props: PaperProps) {
  const { authenticated, handleLogin } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm<UserForm>({
    initialValues: {
      email: '',
      name: '',
      password: '',
      password_confirmation: '',
    },

    validate: (values) => {
      if (type === 'register') {
        return {
          email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
          password:
            values.password.length <= 6
              ? 'Password should include at least 6 characters'
              : null,
          password_confirmation:
            values.password_confirmation !== values.password
              ? 'Passwords do not match'
              : null,
        };
      }

      return {
        email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
        password: values.password ? null : 'Enter your password',
      };
    },
  });

  if (authenticated) {
    navigate('/');
    return;
  }

  const handleSubmit = async (
    values: UserForm,
    event: FormEvent<HTMLFormElement>,
  ) => {
    setLoading(true);

    if (type === 'login') {
      await handleLogin({ email: values.email, password: values.password });
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.post<Omit<LoginResponse, 'user'>>(
        '/register',
        values,
      );
      if (data.access_token) {
        await handleLogin({ email: values.email, password: values.password });
        setLoading(false);
        return;
      }

      setLoading(false);
    } catch (err) {
      const e = err as AxiosError;
      const errors = e!.response!.data!.errors ?? false;
      form.setErrors({
        email: errors.email ? errors.email[0] : null,
        password: errors.password ? errors.password[0] : null,
        password_confirmation: errors.password_confirmation
          ? errors.password_confirmation[0]
          : null,
      });
      setLoading(false);
    }
  };

  return (
    <Container size={'xs'} mt={40} mb={40}>
      <Paper radius="md" p="xl" withBorder {...props}>
        {/* <Text size="lg" weight={500}>
          Welcome to my blog, {type} with
        </Text>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        /> */}
        <LoadingOverlay visible={loading} overlayBlur={2} />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                {...form.getInputProps('name')}
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              {...form.getInputProps('email')}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              {...form.getInputProps('password')}
            />

            {type === 'register' && (
              <>
                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  value={form.values.password_confirmation}
                  {...form.getInputProps('password_confirmation')}
                />
              </>
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit">{upperFirst(type)}</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
