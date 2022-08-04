import {
  Button,
  Divider,
  LoadingOverlay,
  Notification,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { RichTextEditor } from '@mantine/rte';

import { FormEvent, ReactNode, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { IconX } from '@tabler/icons';

import { Post, PostForm } from '../interfaces/Post';
import api from '../services/api';

const postInitialValues = {
  title: '',
  content: '',
};

type PostReturnType = { data: Post };

export function FormPost() {
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState<PostForm>(postInitialValues);

  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (params.get('slug')) {
      (async () => {
        try {
          setLoading(true);
          showNotification({
            title: 'Looking for the post...',
            message: 'Please wait...',
            loading: true,
            autoClose: 5000,
          });

          const response = await api.get<PostReturnType>(
            `/posts/${params.get('slug')}`,
          );

          setPostData(response.data.data);

          setLoading(false);
        } catch (e) {
          showNotification({
            title: 'Error!',
            message: 'Post was not found',
            icon: <IconX size={18} />,
            color: 'red',
          });

          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, [params]);

  const form = useForm<PostForm>({
    initialValues: postData,
    validate: (values) => ({
      title: values.title ? null : 'Title is required',
      content: values.content ? null : 'Content is required',
    }),
  });

  async function handleSubmit(values: PostForm, event: FormEvent) {
    event.preventDefault();
    if (form.validate().hasErrors) {
      showNotification({
        title: 'Error!',
        message: 'Please fill all required fields',
        icon: <IconX size={18} />,
        color: 'red',
      });
      return;
    }

    setLoading(true);

    if (!postData.id) {
      try {
        const {
          data: { data },
        } = await api.post<PostReturnType>('/posts', values);

        setParams({ slug: data.slug });
      } catch (e) {
        showNotification({
          title: 'Error!',
          message: 'Something went wrong',
          icon: <IconX size={18} />,
          color: 'red',
        });
      }
      setLoading(false);
      return;
    }

    try {
      const {
        data: { data },
      } = await api.put<PostReturnType>(`/posts/${postData.id}`, values);

      setParams({ slug: data.slug });
    } catch (e) {
      showNotification({
        title: 'Error!',
        message: 'Something went wrong',
        icon: <IconX size={18} />,
        color: 'red',
      });
    }
    setLoading(false);
  }

  return (
    <>
      <Title>{postData.id ? 'Edit' : 'Create'} post</Title>

      <Divider my={15} />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay visible={loading} overlayBlur={2} />
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
