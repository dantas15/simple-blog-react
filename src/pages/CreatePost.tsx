import { Button, Divider, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { RichTextEditor } from '@mantine/rte';
import { useState } from 'react';
import { PostForm } from '../interfaces/Post';

export function CreatePost() {
  const form = useForm<PostForm>({
    initialValues: {
      title: '',
      content:
        '<p>Your initial <b>html value</b> or an empty string to init editor without value</p>',
    },
    validate: (values) => ({
      title: values.title ? null : 'Title is required',
      content: values.content ? null : 'Content is required',
    }),
  });

  return (
    <>
      <Title>Create post</Title>

      <Divider my={15} />

      <form
        onSubmit={form.onSubmit((values, event) => {
          event.preventDefault();
          console.log(values);
        })}
      >
        <TextInput
          placeholder="Title here"
          label="Title"
          required
          {...form.getInputProps('title')}
        />

        <Title mt={12} order={4}>
          Content
        </Title>
        <RichTextEditor my={12} {...form.getInputProps('content')} />

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
