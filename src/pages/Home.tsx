import { useEffect, useState } from 'react';
import { Container, LoadingOverlay, SimpleGrid } from '@mantine/core';
import { IconX } from '@tabler/icons';

import { ImageCard } from '../components/ImageCard';
import { Post, PostWithUser } from '../interfaces/Post';
import { showNotification } from '@mantine/notifications';
import { PostsResponse } from './Admin';
import api from '../services/api';

export function Home() {
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [loading, setLoading] = useState(false);

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
    <Container mt={20} mb={30}>
      <LoadingOverlay visible={loading} overlayBlur={2} />

      <SimpleGrid cols={3}>
        {posts.map((post, index) => (
          <ImageCard
            date={post.created_at}
            author={post.user.name}
            image={`https://source.unsplash.com/random/?Programming&${index}`}
            link={`/post/${post.slug}`}
            title={post.title}
            key={post.id}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}
