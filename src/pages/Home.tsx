import { useState } from 'react';
import { Container, SimpleGrid } from '@mantine/core';

import { ImageCard } from '../components/ImageCard';
import { Post } from '../interfaces/Post';

export function Home() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '123',
      title: 'Hello world',
      content: '<h1>Hello World</h1>',
      slug: 'hello-world',
      created_at: '2020-01-01',
      updated_at: '2020-01-01',
      user_id: '123',
    },
  ]);

  return (
    <Container mt={20} mb={30}>
      <SimpleGrid cols={3}>
        {posts.map((item) => (
          <ImageCard
            author="gus"
            comments={2}
            image={`https://source.unsplash.com/random/?Programming&${item.slug}`}
            link={`/post/${item.slug}`}
            title="Programming"
            key={item.id}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}
