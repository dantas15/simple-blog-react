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
} from '@mantine/core';
import { UserForm } from '../interfaces/User';

export function AuthenticationForm(props: PaperProps) {
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

        <form
          onSubmit={form.onSubmit((values) => {
            console.log(values);
          })}
        >
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue('name', event.currentTarget.value)
                }
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email && 'Invalid email'}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password &&
                'Password should include at least 6 characters'
              }
            />

            {type === 'register' && (
              <>
                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  value={form.values.password_confirmation}
                  onChange={(event) =>
                    form.setFieldValue(
                      'password_confirmation',
                      event.currentTarget.value,
                    )
                  }
                  error={
                    type === 'register' &&
                    form.errors.password_confirmation &&
                    'Passwords do not match'
                  }
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
