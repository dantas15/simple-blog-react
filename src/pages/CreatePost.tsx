import { Button, Divider, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { RichTextEditor } from '@mantine/rte';
import { useState } from 'react';

export function CreatePost() {
  const form = useForm();

  const [value, onChange] = useState(
    '<p>Your initial <b>html value</b> or an empty string to init editor without value</p>',
  );

  return (
    <>
      <Title>Criar post</Title>

      <Divider my={15} />

      <form
        onSubmit={form.onSubmit((values, event) => {
          event.preventDefault();
          console.log(values);
        })}
      >
        <TextInput placeholder="Title here" label="Title" required />

        <Title mt={12} order={4}>
          Content
        </Title>
        <RichTextEditor my={12} value={value} onChange={onChange} />

        <Button
          type={'submit'}
          variant="gradient"
          gradient={{ from: 'teal', to: 'lime', deg: 105 }}
        >
          Save post
        </Button>
      </form>
    </>
  );
}
