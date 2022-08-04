import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ActionIcon,
  Divider,
  Group,
  LoadingOverlay,
  Title,
} from '@mantine/core';
import { IconPlus, IconX } from '@tabler/icons';
import { AdminImageCard } from '../components/AdminImageCard';
import { Post, PostWithUser } from '../interfaces/Post';
import api from '../services/api';
import { showNotification } from '@mantine/notifications';

export type PostsResponse = {
  data: PostWithUser[];
};

export function Admin() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await api.get<PostsResponse>('/posts');
        setPosts(response.data.data);
      } catch (e) {
        showNotification({
          title: 'Error!',
          message: "Couldn't load the posts",
          icon: <IconX size={18} />,
          color: 'red',
        });
        console.error(e);
      }

      setLoading(false);
    })();
  }, []);

  return (
    <>
      <Group grow>
        <Title>Your posts</Title>
        <div
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row-reverse',
          }}
        >
          <ActionIcon
            color={'green'}
            variant="outline"
            onClick={() => navigate('create')}
          >
            <IconPlus />
          </ActionIcon>
        </div>
      </Group>

      <Divider my={15} />

      <LoadingOverlay visible={loading} overlayBlur={2} />

      {posts.map((post) => (
        <AdminImageCard
          id={post.id}
          slug={post.slug}
          key={post.id}
          date={post.created_at}
          title={post.title}
        />
      ))}
    </>
  );
}
