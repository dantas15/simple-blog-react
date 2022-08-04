import { Container, SimpleGrid } from '@mantine/core';
import { ImageCard } from '../components/ImageCard';

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function Home() {
  return (
    <Container mt={20} mb={30}>
      <SimpleGrid cols={3}>
        {arr.map((item, index) => (
          <ImageCard
            author="gus"
            comments={2}
            image={`https://source.unsplash.com/random/?Programming&${index}`}
            link={'/'}
            title="Programming"
            key={item}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}
